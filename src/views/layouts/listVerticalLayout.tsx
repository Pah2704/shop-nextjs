import * as React from 'react'
import { NextPage } from 'next/types'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import IconifyIcon from 'src/components/Icon'
import { VerticalItem } from 'src/configs/layout'

type TProps = {
  open: boolean
}

type TListItems = {
  level: number
  openItems: { [key: string]: boolean }
  items: any
  setOpenItems: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
  disabled: boolean
}

const RecursiveListItems: NextPage<TListItems> = ({
  items,
  level,
  openItems,
  setOpenItems,
  disabled
}: {
  items: any
  level: number
  openItems: { [key: string]: boolean }
  setOpenItems: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
  disabled: boolean
}) => {
  const handleClick = (title: string) => {
    if (!disabled)
      setOpenItems((prev: any) => {
        return { ...prev, [title]: !prev[title] }
      })
  }

  return (
    <>
      {items?.map((item: any) => {
        return (
          <React.Fragment key={item.title}>
            <ListItemButton onClick={item.children && (() => handleClick(item.title))} sx={{ padding: `8px 10px 8px ${level * (level === 1 ? 28 : 20)}px` }}>
              <ListItemIcon>
                <IconifyIcon icon={item.icon}></IconifyIcon>
              </ListItemIcon>
              {!disabled && <ListItemText primary={item?.title} />}
              {item?.children && item.children.length > 0 && (
                <>{openItems[item.title] ? <IconifyIcon icon='mdi:chevron-up' transform='rotate(180deg)'></IconifyIcon> : <IconifyIcon icon='mdi:chevron-down'></IconifyIcon>}</>
              )}
            </ListItemButton>
            {item.children && item.children.length > 0 && (
              <>
                <Collapse in={openItems[item.title]} timeout='auto' unmountOnExit>
                  <RecursiveListItems items={item.children} level={level + 1} openItems={openItems} setOpenItems={setOpenItems} disabled={disabled} />
                </Collapse>
              </>
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}
const ListVerticalLayout: NextPage<TProps> = ({ open }) => {
  const [openItems, setOpenItems] = React.useState<{ [key: string]: boolean }>({})
  React.useEffect(() => {
    if (!open) {
      setOpenItems({})
    }
  }, [open])

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component='nav' aria-labelledby='nested-list-subheader'>
      <RecursiveListItems disabled={!open} items={VerticalItem} level={1} openItems={openItems} setOpenItems={setOpenItems} />
    </List>
  )
}

export default ListVerticalLayout
