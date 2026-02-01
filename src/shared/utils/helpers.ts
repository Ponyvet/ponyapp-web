import type { BreadcrumbItem, Option } from './types'
import { DISABLE_BREADCRUMBS } from './const'

export const getUserInitials = (name: string) => {
  const names = name.split(' ')
  const initials = names.map((n) => n.charAt(0).toUpperCase()).join('')
  return initials.slice(0, 2)
}

export const getLabelFromCatalog = (key: string, catalog: Option[]): string => {
  const item = catalog.find((item) => item.value === key)
  return item ? item.label : key
}

export const calculateAge = (birthDate: Date | null) => {
  if (!birthDate) return 'N/A'
  const today = new Date()
  const birth = new Date(birthDate)
  const diffTime = Math.abs(today.getTime() - birth.getTime())
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25))
  const diffMonths = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44),
  )

  if (diffYears > 0) {
    return `${diffYears} año${diffYears !== 1 ? 's' : ''}`
  } else {
    return `${diffMonths} mes${diffMonths !== 1 ? 'es' : ''}`
  }
}

export const formatPhoneNumber = (phoneNumber: string) => {
  if (phoneNumber.length < 10) return phoneNumber
  const formattedNumber = phoneNumber.replace(
    /(\d{3})(\d{3})(\d{4})/,
    '$1-$2-$3',
  )
  return `${formattedNumber}`
}

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

export const containsUuid = (str: string) => {
  const uuidRegex =
    /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
  return uuidRegex.test(str)
}
