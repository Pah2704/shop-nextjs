const BASE_URL = process.env.API_URL

export const CONFIG_API = {
  AUTH: {
    INDEX: {
      LOGIN: 'https://api-shop-lks2.onrender.com/api/auth/login', //`${BASE_URL}/auth/login`,
      REGISTER: 'auth/register',
      LOGOUT: 'auth/logout',
      CHECK: 'auth/check',
      FORGOT_PASSWORD: 'auth/forgot-password'
    }
  }
}
