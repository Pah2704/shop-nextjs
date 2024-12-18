// ** React
import React from 'react'

// ** MUI

import IconButton from '@mui/material/IconButton'
import { useSettings } from 'src/hooks/useSettings'
import { Mode } from 'src/types/layouts'
import Icon from 'src/components/Icon'
import { Box, BoxProps, Menu, MenuItem, Popover, styled, Typography } from '@mui/material'

// ** Hooks
import { useTranslation } from 'next-i18next'
import { LANGUAGE_OPTIONS } from 'src/configs/i18n'

// import PersonAdd from '@mui/icons-material/PersonAdd'
// import Settings from '@mui/icons-material/Settings'
// import Logout from '@mui/icons-material/Logout'

type TProps = {}

const LanguageDropdown = (props: TProps) => {
  // ** State
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  // ** Hooks
  const { i18n } = useTranslation()
  const { settings, saveSettings } = useSettings()

  const handleModeChange = (mode: Mode) => {
    saveSettings({ ...settings, mode })
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleOnchangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    handleClose()
  }

  return (
    <>
      <IconButton color='inherit' id='language-dropdown' onClick={handleClick}>
        <Icon icon='material-symbols-light:translate' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {LANGUAGE_OPTIONS.map((item: { value: string; lang: string }, index) => {
          return (
            <MenuItem key={item.value} selected={item.value === i18n.language} onClick={() => handleOnchangeLanguage(item.value)}>
              {item.lang}
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}

export default LanguageDropdown
