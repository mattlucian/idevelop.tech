import { useRouter } from "vue-router";

/**
 * Composable for breadcrumb navigation functionality
 *
 * Provides a consistent way to handle breadcrumb navigation
 * across service pages and other views.
 *
 * @returns handleBreadcrumbNavigate function to navigate to paths
 */
export function useBreadcrumbNavigation() {
  const router = useRouter();

  /**
   * Navigate to a path when breadcrumb is clicked
   * @param path - The route path to navigate to
   */
  const handleBreadcrumbNavigate = (path: string) => {
    router.push(path);
  };

  return {
    handleBreadcrumbNavigate,
  };
}
