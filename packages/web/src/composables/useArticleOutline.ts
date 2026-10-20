import { onBeforeUnmount, ref, watch } from "vue";
import type { Ref } from "vue";
import { useRouter } from "vue-router";
import { slugify } from "@/utils/slugify";

export interface ArticleOutlineItem {
  id: string;
  label: string;
  nested: boolean;
}

// Headings inside `[data-toc-root]` blocks, so the CTA and author headings stay
// out, plus elements that opt in with `data-toc-label` (add `data-toc-nested`
// to indent them)
const SELECTOR = "[data-toc-root] h2, [data-toc-root] h3, [data-toc-label]";
const HEADINGS = "[data-toc-root] h2, [data-toc-root] h3";
// Same offset the router uses for hash links, clearing the fixed nav
const SCROLL_OFFSET = 80;
// A section counts as current once its top passes the upper third of the viewport
const ACTIVE_RATIO = 0.3;
const ANCHOR_CLASS =
  "not-prose text-inherit font-[inherit] no-underline after:ml-2 after:text-slate-600 after:opacity-0 after:transition-opacity after:content-['#'] hover:after:opacity-100 focus-visible:after:opacity-100";

/**
 * Builds an article's section list from its rendered content, gives each
 * heading an id and a link to itself, and tracks which section is in view.
 */
export function useArticleOutline(root: Ref<HTMLElement | null>) {
  const router = useRouter();
  const items = ref<ArticleOutlineItem[]>([]);
  const activeId = ref("");
  let elements: HTMLElement[] = [];
  let observer: MutationObserver | null = null;
  let initialHashHandled = false;

  const updateActive = () => {
    const threshold = Math.max(
      SCROLL_OFFSET + 40,
      window.innerHeight * ACTIVE_RATIO,
    );
    let current = elements[0]?.id ?? "";
    for (const el of elements) {
      if (el.getBoundingClientRect().top <= threshold) current = el.id;
      else break;
    }
    activeId.value = current;
  };

  // Wraps each heading's text in a link to itself. The article body is static,
  // so Vue never re-renders these headings after the link is added
  const linkHeadings = (container: HTMLElement) => {
    container.querySelectorAll<HTMLElement>(HEADINGS).forEach((heading) => {
      if (heading.querySelector("a[data-heading-anchor]")) return;
      const anchor = document.createElement("a");
      anchor.href = `#${heading.id}`;
      anchor.dataset.headingAnchor = "";
      anchor.className = ANCHOR_CLASS;
      anchor.append(...Array.from(heading.childNodes));
      heading.append(anchor);
    });
  };

  // The router's hash scroll runs before the async body renders, so a shared
  // link to a section is honored here once that section exists
  const scrollToInitialHash = () => {
    if (initialHashHandled) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) {
      initialHashHandled = true;
      return;
    }
    const target = elements.find((el) => el.id === id);
    if (!target) return;
    initialHashHandled = true;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET,
    });
  };

  const build = () => {
    const container = root.value;
    if (!container) return;
    elements = Array.from(container.querySelectorAll<HTMLElement>(SELECTOR));
    items.value = elements.map((el) => {
      const label = el.dataset.tocLabel ?? el.textContent?.trim() ?? "";
      if (!el.id) el.id = slugify(label);
      return {
        id: el.id,
        label,
        nested: el.tagName === "H3" || el.dataset.tocNested !== undefined,
      };
    });
    linkHeadings(container);
    scrollToInitialHash();
    updateActive();
  };

  // Each task gets its own frame. With a shared one, a scroll event right
  // after the body loaded cancelled the pending rebuild and left the outline
  // with only the sections outside the body
  const perFrame = (fn: () => void) => {
    let frame = 0;
    return {
      run: () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(fn);
      },
      cancel: () => cancelAnimationFrame(frame),
    };
  };
  const rebuild = perFrame(build);
  const refreshActive = perFrame(updateActive);
  const onScroll = () => refreshActive.run();

  // Route heading links through the router so they get its smooth scroll and offset
  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>(
      "a[data-heading-anchor]",
    );
    if (!anchor) return;
    event.preventDefault();
    router.push({ hash: anchor.hash });
  };

  watch(
    root,
    (container, previous) => {
      observer?.disconnect();
      previous?.removeEventListener("click", onClick);
      if (!container) return;
      // The article body loads asynchronously, so rebuild when its content lands
      observer = new MutationObserver(() => rebuild.run());
      observer.observe(container, { childList: true, subtree: true });
      container.addEventListener("click", onClick);
      build();
    },
    { immediate: true },
  );

  window.addEventListener("scroll", onScroll, { passive: true });

  onBeforeUnmount(() => {
    observer?.disconnect();
    root.value?.removeEventListener("click", onClick);
    rebuild.cancel();
    refreshActive.cancel();
    window.removeEventListener("scroll", onScroll);
  });

  return { items, activeId };
}
