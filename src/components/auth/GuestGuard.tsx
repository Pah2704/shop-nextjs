// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Configs
import { ACCESS_TOKEN, USER_DATA } from 'src/configs/auth'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props

  // ** router
  const router = useRouter()

  // ** auth
  const authContext = useAuth()
  useEffect(() => {
    if (!router.isReady) return
    if (window.localStorage.getItem(ACCESS_TOKEN) && window.localStorage.getItem(USER_DATA)) {
      router.replace({ pathname: '/' })
    }
  }, [router.route])

  if (authContext.loading) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
