interface BaseNavigationItem {
  id: number
  name: string
  showInDemo: boolean
}

interface NavigationSubItem {
  name: string
  url: string
  hideIfAuthed?: boolean
}

interface NavigationItemWithUrl extends BaseNavigationItem {
  url: string
  submenu?: NavigationSubItem[]
}

interface NavigationItemWithSubmenu extends BaseNavigationItem {
  url?: never
  submenu: NavigationSubItem[]
}

export type NavigationItem = NavigationItemWithUrl | NavigationItemWithSubmenu

const buyHashrateSubmenu: NavigationSubItem[] = [
  { name: 'Auctions', url: '/auction-market' },
  { name: 'Buy Hashrate Now', url: '/direct-sale' },
  { name: 'Test Drive', url: '/test-drive', hideIfAuthed: true },
]

const learnSubmenu: NavigationSubItem[] = [
  { name: 'Upendo', url: '/learn/upendo' },
  /* { name: 'FAQ', url: '/faq' }, */
]

export const headerNavURL: NavigationItem[] = [
  { id: 1, name: 'Buy', url: '/', showInDemo: true },
  { id: 2, name: 'Learn', showInDemo: true, submenu: learnSubmenu },
  { id: 3, name: 'Dashboard', url: '/pages/dashboard', showInDemo:true },
  { id: 3, name: 'Rigly', url: 'https://rigly.io', showInDemo: true },
]
