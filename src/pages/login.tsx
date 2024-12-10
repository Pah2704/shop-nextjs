//** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'

//** View
import BlankLayout from 'src/views/layouts/BlankLayout'
import LoginPage from 'src/views/pages/login'

type TProps = {}
const Login: NextPage<TProps> = () => {
  return <LoginPage />
}

export default Login

Login.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>