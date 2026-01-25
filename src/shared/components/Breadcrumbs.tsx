import { useTranslation } from 'react-i18next'
import { Fragment } from 'react'
import { Link, useLocation } from 'react-router'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { generateBreadcrumbs } from '@/shared/utils/helpers'

const Breadcrumbs = () => {
  const { t } = useTranslation('shared')
  const { pathname } = useLocation()
  const breadcrumbs = generateBreadcrumbs(pathname, true)

  const fixTranslation = (key: string) => {
    const isObject = typeof t(key, { returnObjects: true }) === 'object'
    return isObject ? t(`${key}.root`) : t(key)
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb) => (
          <Fragment key={breadcrumb.url}>
            <BreadcrumbItem>
              {breadcrumb.isLink ? (
                <Link to={breadcrumb.url}>
                  {fixTranslation(breadcrumb.title)}
                </Link>
              ) : (
                <BreadcrumbPage>
                  {fixTranslation(breadcrumb.title)}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {breadcrumbs.indexOf(breadcrumb) < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
