import { lazy } from 'react'

const Dashboard = lazy(() => import('@/pages').then(module => ({ default: module.Dashboard })))
const Calendar = lazy(() => import('@/pages').then(module => ({ default: module.Calendar })))

export const routes = [
    {
        id: 0,
        path: '/dashboard', // the url
        component: Dashboard, // view rendered
    },
    {
        id: 1,
        path: '/calendar',
        component: Calendar,
    },
    // {
    //   path: '/404',
    //   component: Page404,
    // },
]