// **  Next
import { NextPage } from 'next'
import Link from 'next/link'

// ** React
import { useState } from 'react'

// ** MUI
import { Box, Button, Checkbox, CssBaseline, FormControlLabel, IconButton, InputAdornment, Typography, useTheme } from '@mui/material'

// ** Components
import CustomTextField from 'src/components/text-field'
import Icon from 'src/components/Icon'

// ** Third Party
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import Image from 'next/image'

// ** Image
import LoginDark from '/public/images/login-dark.png'
import LoginLight from '/public/images/login-light.png'
import GoogleSvg from '/public/svgs/google-logo.svg'
import FacebookSvg from '/public/svgs/facebook-logo.svg'

type TProps = {}
const LoginPage: NextPage<TProps> = () => {
  //State
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  // ** Theme
  const theme = useTheme()
  const schema = yup
    .object()
    .shape({
      email: yup.string().required('Email is required').matches(EMAIL_REG, 'Invalid email address'),
      password: yup
        .string()
        .required('Password is required')
        .matches(PASSWORD_REG, 'Password must include at least 8 characters, with one uppercase letter, one lowercase letter, one number, and one special character.')
    })
    .required()
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const onsubmit = (data: { email: string; password: string }) => {
    console.log('data', data)
  }

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        alignItems: 'center',
        padding: '40px',
        gap: '10px'
      }}
    >
      <Box
        display={{ xs: 'none', md: 'flex' }}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20px',
          backgroundColor: theme.palette.customColors.bodyBg,
          height: '100%',
          minWidth: '50vw'
        }}
      >
        <Image src={theme.palette.mode === 'light' ? LoginLight : LoginDark} alt='login image' style={{ height: '100%', width: 'auto' }} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onsubmit)}>
            <Box sx={{ mt: 2, width: '300px' }}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label='Email'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='Input your email'
                    error={Boolean(errors?.email)}
                    helperText={errors?.email?.message}
                  />
                )}
                name='email'
              />
            </Box>
            <Box sx={{ mt: 2, width: '300px' }}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    label='Password'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='Input your password'
                    error={Boolean(errors?.password)}
                    helperText={errors?.password?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                            {showPassword ? <Icon icon='mdi:eye-outline' /> : <Icon icon='mdi:eye-off-outline' />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
                name='password'
              />
            </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FormControlLabel control={<Checkbox value='remember' color='primary' checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />} label='Remember me' />
              <Typography variant='body2'>Forgot password?</Typography>
            </Box>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
              <Typography>Don't have an account?</Typography>
              <Link style={{ color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white }} href='/register'>
                {'Register'}
              </Link>
            </Box>
            <Typography sx={{ textAlign: 'center', mt: 2, mb: 2 }}>Or</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
              <IconButton>
                <Image src={GoogleSvg} alt='google' style={{ height: '1em', width: '1em' }} />
              </IconButton>
              <IconButton>
                <Image src={FacebookSvg} alt='google' style={{ height: '1em', width: '1em' }} />
              </IconButton>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginPage
