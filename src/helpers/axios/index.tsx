// ** Libraries
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

/// ** Config
import { BASE_URL, CONFIG_API } from 'src/configs/api'

// ** Helpers
import { clearLocalUserData, getLocalUserData } from '../storage'

// ** Next
import { NextRouter, useRouter } from 'next/router'

// ** React
import { FC } from 'react'

// ** Types
import { UserDataType } from 'src/contexts/types'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

type TAxiosInterceptors = {
  children: React.ReactNode
}
const instanceAxios = axios.create({
  baseURL: BASE_URL
})

const AxiosInterceptors: FC<TAxiosInterceptors> = ({ children }) => {
  const router = useRouter()
  const { setUser } = useAuth()
  const { accessToken, refreshToken } = getLocalUserData()

  const handleRedirectLogin = (router: NextRouter, setUser: (data: UserDataType | null) => void) => {
    if (router.asPath !== '/') {
      router.replace({ pathname: '/login', query: { returnUrl: router.asPath } })
    } else {
      router.replace('/login')
    }
    setUser(null)
    clearLocalUserData()
  }

  instanceAxios.interceptors.request.use(
    async config => {
      if (accessToken) {
        const decodedAccessToken: any = jwtDecode(accessToken)
        if (decodedAccessToken?.exp > Date.now() / 1000) {
          config.headers['Authorization'] = `Bearer ${accessToken}`
        } else {
          if (refreshToken) {
            const decodedRefreshToken: any = jwtDecode(refreshToken)
            if (decodedRefreshToken?.exp > Date.now() / 1000) {
              await axios
                .post(
                  `${CONFIG_API.AUTH.INDEX.REFRESH_TOKEN}`,
                  {},
                  {
                    headers: {
                      Authorization: `Bearer ${refreshToken}`
                    }
                  }
                )
                .then(res => {
                  const newAccessToken = res?.data?.data?.access_token
                  if (newAccessToken) {
                    config.headers['Authorization'] = `Bearer ${newAccessToken}`
                  } else {
                    handleRedirectLogin(router, setUser)
                  }
                })
                .catch(err => {
                  handleRedirectLogin(router, setUser)
                })
            } else {
              handleRedirectLogin(router, setUser)
            }
          } else {
            handleRedirectLogin(router, setUser)
          }
        }
      } else {
        handleRedirectLogin(router, setUser)
      }

      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  instanceAxios.interceptors.response.use(
    response => {
      console.log('response', response)

      return response
    },
    error => {
      return Promise.reject(error)
    }
  )

  return <>{children}</>
}

export default instanceAxios
export { AxiosInterceptors }
