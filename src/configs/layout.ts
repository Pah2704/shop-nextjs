export const VerticalItem = [
  {
    title: 'Parent 1',
    icon: 'mdi:email',
    path: '/email',
    children: [{ title: 'Children 1 1', icon: 'mdi:email', path: '/email/inbox', children: [{ title: 'Children 1 1 1', icon: 'mdi:email', path: '/email/inbox' }] }]
  },
  {
    title: 'Parent 2',
    icon: 'mdi:email',
    path: '/email',
    children: [
      { title: 'Children 2 1', icon: 'mdi:email', path: '/email/inbox', children: [{ title: 'Children 2 1 1', icon: 'mdi:email', path: '/email/inbox' }] },
      {
        title: 'Children 2 2',
        icon: 'mdi:email',
        path: '/email/inbox',
        children: [
          { title: 'Children 2 2 1', icon: 'mdi:email', path: '/email/inbox' },
          { title: 'Children 2 2 2', icon: 'mdi:email', path: '/email/inbox' }
        ]
      },
      { title: 'Children 2 3', icon: 'mdi:email', path: '/email/inbox', children: [{ title: 'Children 2 3 1', icon: 'mdi:email', path: '/email/inbox' }] }
    ]
  }
]
