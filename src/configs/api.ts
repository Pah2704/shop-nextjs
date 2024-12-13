import { REFRESH_TOKEN } from './auth'

export const BASE_URL = process.env.NEXT_PUBLIC_API_HOST

export const CONFIG_API = {
  AUTH: {
    INDEX: {
      LOGIN: `${BASE_URL}/auth/login`,
      REFRESH_TOKEN: `${BASE_URL}/auth/refresh-token`,
      // REGISTER: 'auth/register',
      LOGOUT: `${BASE_URL}/auth/logout`
      // CHECK: 'auth/check',
      // FORGOT_PASSWORD: 'auth/forgot-password'
    },
    AUTH_ME: `${BASE_URL}/auth/me`
  }
}
