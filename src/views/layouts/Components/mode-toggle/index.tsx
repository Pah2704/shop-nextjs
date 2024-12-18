// ** React
import React, { use } from 'react'

//** Next
import Image from 'next/image'

// ** MUI

import IconButton from '@mui/material/IconButton'

import Icon from 'src/components/Icon'
import { useSettings } from 'src/hooks/useSettings'
import { Mode } from 'src/types/layouts'

// import PersonAdd from '@mui/icons-material/PersonAdd'
// import Settings from '@mui/icons-material/Settings'
// import Logout from '@mui/icons-material/Logout'

type TProps = {}

const ModeToggle = (props: TProps) => {
  const { settings, saveSettings } = useSettings()

  const handleModeChange = (mode: Mode) => {
    saveSettings({ ...settings, mode })
  }

  const handleToggleMode = () => {
    if (settings.mode === 'light') {
      handleModeChange('dark')
    } else {
      handleModeChange('light')
    }
  }

  return (
    <>
      <IconButton color='inherit' onClick={handleToggleMode}>
        <Icon icon={settings.mode === 'light' ? 'material-symbols:light-mode-outline' : 'material-symbols:dark-mode-outline'} />
      </IconButton>
    </>
  )
}

export default ModeToggle
