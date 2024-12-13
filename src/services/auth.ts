import axios from 'axios'

// ** Config
import { CONFIG_API } from 'src/configs/api'

// ** Helpers
import instanceAxios from 'src/helpers/axios'

// ** Types
import { TLoginAuth } from 'src/types/auth'

export const loginAuth = async (data: TLoginAuth) => {
  try {
    console.log('CONFIG_API', CONFIG_API)
    const res = await instanceAxios.post(CONFIG_API.AUTH.INDEX.LOGIN, data)

    return res.data
  } catch (error) {
    return null
  }
}

export const logoutAuth = async () => {
  try {
    const res = await instanceAxios.post(CONFIG_API.AUTH.INDEX.LOGOUT)

    return res.data
  } catch (error) {
    return null
  }
}
