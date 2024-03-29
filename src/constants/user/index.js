// export const USER_URL = {
//   account: 'settings',
//   home: 'account',
//   index: '/',
//   orders: 'orders',
//   security: 'security',
//   wishlists: 'wishlists',
//   addresses: 'addresses',
//   vendor: 'vendor'
// }

export const USER_ACCOUNT_SECTIONS = [
  {
    tKey: 'your_orders', // Translation key
    name: 'order',
    label: 'Your Orders',
    url: 'orders',
  },
  // {
  //   tKey: 'wishlist',
  //   name: 'wishlist',
  //   label: 'Wish List',
  //   url: 'wishlists',
  // },
  {
    tKey: 'address_book',
    name: 'address',
    label: 'Address Book',
    url: 'addresses',
  },
  {
    tKey: 'security_login',
    name: 'security',
    label: 'Security and Login',
    url: 'settings',
  },
  // {
  //   name: 'store',
  //   label: 'Business Account',
  //   url: 'vendor',
  // }
]

export const USER_SECTIONS = {
  'vendor': {
    name: 'Vendor',
    names: 'Vendors',
    key: 'vendor',
    url: 'vendors',
    option: 'vendor',
    product: {
      name: 'Product',
      names: 'Products',
      key: 'productsvendor',
      url: 'products',
    }
  },
  'user': {
    name: 'User',
    names: 'Users',
    key: 'user',
    url: 'users',
    option: 'user',
  },
  'userAddress': {
    name: 'User Address',
    names: 'User Addresses',
    key: 'userAddress',
    url: 'user-addresses',
    option: 'useraddress'
  },
}
