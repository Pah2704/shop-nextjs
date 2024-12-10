import axios from 'axios'

// ** Config
import { CONFIG_API } from 'src/configs/api'

// ** Types
import { TLoginAuth } from 'src/types/auth'

export const loginAuth = async (data: TLoginAuth) => {
  try {
    console.log(CONFIG_API.AUTH.INDEX.LOGIN)
    const response = await axios.post(CONFIG_API.AUTH.INDEX.LOGIN, data)

    return response.data
  } catch (error) {
    return null
  }
}
