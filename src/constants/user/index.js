export const USER_URL = {
  account: 'settings',
  home: 'account',
  index: '/',
  orders: 'orders',
  security: 'security',
  wishlists: 'wishlists',
  addresses: 'addresses'
}

export const USER_ACCOUNT_SECTIONS = [
  {
    name: 'order',
    label: 'Your Orders',
    url: USER_URL.orders,
  },
  {
    name: 'wishlist',
    label: 'Wish List',
    url: USER_URL.wishlists,
  },
  {
    name: 'address',
    label: 'Address Book',
    url: USER_URL.addresses,
  },
  {
    name: 'security',
    label: 'Security and Login',
    url: USER_URL.account,
  }
]