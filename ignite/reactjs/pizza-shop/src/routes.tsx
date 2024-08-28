import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { Dashboard } from './pages/app/dashboard'
import { SignIn } from './pages/auth/sign-in'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [{ path: '/', Component: Dashboard }],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [{ path: '/sign-in', Component: SignIn }],
  },
])
