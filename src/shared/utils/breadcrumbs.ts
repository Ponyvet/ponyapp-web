import { DISABLE_BREADCRUMBS } from './const'
import type { BreadcrumbItem } from './types'

const formatUuidRoute = (key: string) => {
  const segments = key.split('.')
  if (containsUuid(segments[segments.length - 1])) {
    return segments[segments.length - 1].split('-')[0]
  }
  const pathWithoutUuid = segments
    .filter((segment) => !containsUuid(segment))
    .join('.')
  return `breadcrumbs.${pathWithoutUuid}`
}

/**
 * Generates an array of breadcrumb items based on the given pathname.
 *
 * @param pathname - The current path from which to generate breadcrumbs.
 * @param includeCurrentPath - A boolean indicating whether to include the current path as the last breadcrumb. Defaults to `false`.
 * @returns An array of breadcrumb items, each containing a title and a URL.
 *
 * @example
 * ```typescript
 * generateBreadcrumbs('/home/products/electronics', true);
 * // Returns:
 * // [
 * //   { title: 'breadcrumbs.home', url: '/' },
 * //   { title: 'breadcrumbs.home.products', url: '/home/products' },
 * //   { title: 'breadcrumbs.home.products.electronics', url: '/home/products/electronics' }
 * // ]
 * ```
 */
export const generateBreadcrumbs = (
  pathname: string,
  includeCurrentPath: boolean = false,
): BreadcrumbItem[] => {
  const segments = pathname.split('/').filter(Boolean)
  const partialBreadcrumbs = segments.map(
    (_, i) => '/' + segments.slice(0, i + 1).join('/'),
  )
  const breadcrumbs = includeCurrentPath
    ? ['/', ...partialBreadcrumbs]
    : ['/', ...partialBreadcrumbs].slice(0, -1)
  return breadcrumbs.map<BreadcrumbItem>((breadcrumb, index) => {
    const title = breadcrumb.replace(/\//g, '.').slice(1) || 'home'
    const formattedTitle = containsUuid(title)
      ? formatUuidRoute(title)
      : `breadcrumbs.${title}`
    const isDisabled = DISABLE_BREADCRUMBS.includes(
      formattedTitle.replace('breadcrumbs.', ''),
    )

    return {
      title: formattedTitle,
      url: breadcrumb,
      isLink: index < breadcrumbs.length - 1 && !isDisabled,
    }
  })
}

const containsUuid = (str: string) => {
  const uuidRegex =
    /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
  return uuidRegex.test(str)
}
