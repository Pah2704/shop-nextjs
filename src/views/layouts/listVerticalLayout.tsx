import * as React from 'react'
import { NextPage } from 'next/types'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import IconifyIcon from 'src/components/Icon'
import { VerticalItem } from 'src/configs/layout'

type TProps = {}

const RecursiveListItem = ({ items, level }: { items: any; level: number }) => {
  const [openItems, setOpenItems] = React.useState<{ [key: string]: boolean }>({})

  const handleClick = (title: string) => {
    setOpenItems((prev: any) => {
      return { ...prev, [title]: !prev[title] }
    })
  }

  return (
    <>
      {items?.map((item: any) => {
        return (
          <React.Fragment key={item.title}>
            <ListItemButton onClick={item.children && (() => handleClick(item.title))} sx={{ paddingLeft: `${level * 20}px` }}>
              <ListItemIcon>
                <IconifyIcon icon={item.icon}></IconifyIcon>
              </ListItemIcon>
              <ListItemText primary={item?.title} />
              {item.children && item.children.length > 0 && <>{openItems[item.title] ? <IconifyIcon icon='mdi:chevron-up'></IconifyIcon> : <IconifyIcon icon='mdi:chevron-down'></IconifyIcon>}</>}
            </ListItemButton>
            {item.children && item.children.length > 0 && (
              <>
                <Collapse in={openItems[item.title]} timeout='auto' unmountOnExit>
                  <RecursiveListItem items={item.children} level={level + 1} />
                </Collapse>
              </>
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}
const ListVerticalLayout: NextPage<TProps> = () => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component='nav' aria-labelledby='nested-list-subheader'>
      <RecursiveListItem items={VerticalItem} level={1} />
      {/* <ListItemButton>
        <ListItemIcon>
          <IconifyIcon icon='mdi:email'></IconifyIcon>
        </ListItemIcon>
        <ListItemText primary='Sent mail' />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <IconifyIcon icon='mdi:draft'></IconifyIcon>
        </ListItemIcon>
        <ListItemText primary='Drafts' />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <IconifyIcon icon='ri:inbox-archive-line'></IconifyIcon>
        </ListItemIcon>
        <ListItemText primary='Inbox' />
        {openState ? <IconifyIcon icon='ic:round-expand-less'></IconifyIcon> : <IconifyIcon icon='si:expand-more-fill'></IconifyIcon>}
      </ListItemButton>
      <Collapse in={openState} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <IconifyIcon icon='tabler:tag-starred'></IconifyIcon>
            </ListItemIcon>
            <ListItemText primary='Starred' />
          </ListItemButton>
        </List>
      </Collapse> */}
    </List>
  )
}

export default ListVerticalLayout
