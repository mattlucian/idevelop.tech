/**
 * Keeps an open tab on the current deploy.
 *
 * Each build writes /version.json with its build ID (see vite.config.ts).
 * Before an in-app navigation, the router compares it with the build this tab
 * is running. If a newer deploy is live, the destination is loaded as a full
 * page, so it uses the new build's files rather than this build's page files,
 * which the deploy may have deleted.
 */
const CHECK_TIMEOUT_MS = 1500;
const RELOAD_KEY = "deploy-check-reload";
const RELOAD_WINDOW_MS = 10_000;

/** Build ID of the live deploy, or null if it can't be read quickly */
export async function fetchDeployedBuild(): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CHECK_TIMEOUT_MS);
  try {
    const response = await fetch("/version.json", {
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) return null;
    const data: unknown = await response.json();
    if (
      typeof data === "object" &&
      data !== null &&
      "build" in data &&
      typeof data.build === "string"
    ) {
      return data.build;
    }
    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

interface ReloadRecord {
  path: string;
  at: number;
}

function isReloadRecord(value: unknown): value is ReloadRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    "path" in value &&
    "at" in value &&
    typeof value.path === "string" &&
    typeof value.at === "number"
  );
}

/**
 * Full page load to `path`. Skipped if the same path was just loaded this way,
 * so a file that's genuinely missing can't cause a reload loop.
 * Returns whether the page load was started.
 */
export function loadPageFresh(path: string): boolean {
  try {
    const stored: unknown = JSON.parse(
      sessionStorage.getItem(RELOAD_KEY) ?? "null",
    );
    if (
      isReloadRecord(stored) &&
      stored.path === path &&
      Date.now() - stored.at < RELOAD_WINDOW_MS
    ) {
      return false;
    }
    const record: ReloadRecord = { path, at: Date.now() };
    sessionStorage.setItem(RELOAD_KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable (e.g. private mode): load anyway
  }
  window.location.assign(path);
  return true;
}
