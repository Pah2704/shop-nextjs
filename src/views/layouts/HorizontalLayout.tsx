// ** React
import React from 'react'

// ** next
import { NextPage } from 'next/types'

// ** MUI
import { Badge, IconButton, styled, Toolbar, Typography, useTheme } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

// ** Components
import IconifyIcon from 'src/components/Icon'

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.customColors.lightPaperBg : theme.palette.customColors.darkPaperBg,
  color: theme.palette.primary.main,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

type TProps = {
  open?: boolean
  toggleDrawer?: () => void
}
const HorizontalLayout: NextPage<TProps> = ({ open, toggleDrawer }) => {
  const theme = useTheme()

  return (
    <AppBar position='absolute' open={open}>
      <Toolbar
        sx={{
          pr: '30px', // keep right padding when drawer closed
          margin: '0 20px'
        }}
      >
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            padding: '10px',
            ...(open && { display: 'none' })
          }}
        >
          <IconifyIcon icon='clarity:menu-line'></IconifyIcon>
        </IconButton>
        <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <IconButton color='inherit'>
          <Badge badgeContent={4} color='primary'>
            <IconifyIcon icon='mingcute:notification-fill'></IconifyIcon>
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default HorizontalLayout
