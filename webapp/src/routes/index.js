import { lazy } from 'react'

const Home = lazy(() => import('./Home'))
const Affiliate = lazy(() => import('./Affiliate'))
const Admin = lazy(() => import('./Admin'))
const Join = lazy(() => import('./Join'))
const About = lazy(() => import('./About'))
const Help = lazy(() => import('./Help'))
const Page404 = lazy(() => import('./Route404'))

const routes = [
  {
    name: 'home',
    component: Home,
    path: '/',
    exact: true,
    roles: ['guest', 'NON-AFFILIATED']
  },
  {
    name: 'affiliate',
    component: Affiliate,
    path: '/affiliate',
    exact: true,
    roles: ['ADMIN', 'REFERRER']
  },
  {
    component: Admin,
    path: '/admin',
    exact: true,
    roles: ['ADMIN']
  },
  {
    component: Join,
    path: '/join/:referrer',
    exact: true,
    roles: ['guest']
  },
  {
    name: 'about',
    component: About,
    path: '/about',
    exact: true
  },
  {
    name: 'help',
    component: Help,
    path: '/help',
    exact: true
  },
  {
    component: Join,
    path: '/join',
    exact: true
  },
  {
    component: Page404
  }
]

export default role => {
  const routesForRole = routes.filter(
    route => !route.roles || route.roles.includes(role)
  )

  return {
    sidebar: routesForRole.filter(route => !!route.name),
    browser: routesForRole
      .reduce(
        (routes, route) => [
          ...routes,
          ...(route.childrens ? route.childrens : [route])
        ],
        []
      )
      .filter(route => !!route.component)
  }
}
