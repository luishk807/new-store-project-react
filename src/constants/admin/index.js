export const ADMIN_SECTIONS = {
  'vendor': {
    name: 'Vendor',
    names: 'Vendors',
    key: 'vendor',
    url: 'vendors',
    option: 'vendor'
  },
  'product': {
    name: 'Product',
    names: 'Products',
    key: 'products',
    url: 'products',
    option: 'product'
  },
  'brand': {
    name: 'Brand',
    names: 'Brands',
    key: 'brand',
    url: 'brands',
    option: 'brand',
  },
  'order': {
    name: 'Order',
    names: 'Orders',
    key: 'order',
    url: 'orders',
    option: 'order',
  },
  'category': {
    name: 'Category',
    names: 'Categories',
    key: 'category',
    url: 'categories',
    option: 'category',
  },
  'status': {
    name: 'Status',
    names: 'Statuses',
    key: 'status',
    url: 'statuses',
    option: 'status',
  },
  'workRole': {
    name: 'Work Position',
    names: 'Work Positions',
    key: 'workrole',
    url: 'workroles',
    option: 'position',
  },
  'user': {
    name: 'User',
    names: 'Users',
    key: 'user',
    url: 'users',
    option: 'user',
  },
  'userRole': {
    name: 'User Role',
    names: 'User Roles',
    key: 'userroles',
    url: 'userroles',
    option: 'userrole',
  },
  'userAddress': {
    name: 'User Address',
    names: 'User Addresses',
    key: 'userAddress',
    url: 'user-addresses/user',
    option: 'useraddress'
  },
  'country': {
    name: 'Country',
    names: 'Countries',
    key: 'country',
    url: 'countries',
    option: 'country'
  },
  'gender': {
    name: 'Gender',
    names: 'Genders',
    key: 'gender',
    url: 'genders',
    option: 'gender'
  },
  'productItem': {
    name: 'Product Item',
    names: 'Product Items',
    key: 'productItems',
    url: 'product-items',
    option: 'productItem'
  },
  'size': {
    name: 'Size',
    names: 'Sizes',
    key: 'size',
    url: 'product-sizes',
    option: 'size'
  },
  'color': {
    name: 'Color',
    names: 'Colors',
    key: 'color',
    url: 'product-colors',
    option: 'color'
  },
  'productDiscount': {
    name: 'Product Discount',
    names: 'Product Discounts',
    key: 'productDiscount',
    url: 'product-discounts',
    option: 'productDiscount'
  },
  'rate': {
    name: 'Rate',
    names: 'rates',
    key: 'rate',
    url: 'productrates',
    option: 'rate'
  },
  'address': {
    name: 'Address',
    names: 'address',
    key: 'address',
    url: 'user-addresses',
    option: 'address'
  },
  'imageBox': {
    name: 'Image Box',
    names: 'Image Boxes',
    key: 'imagebox',
    url: 'image-boxes',
    option: 'imagebox'
  },
  'imageBoxImages': {
    name: 'Image Box Image',
    names: 'Image Box Images',
    key: 'imageBoxImages',
    url: 'image-box-images',
    option: 'imageboximages',
    parent: 'imageBox'
  },
  'imageBoxType': {
    name: 'Image Box Type',
    names: 'Image Box Types',
    key: 'imageboxtype',
    url: 'image-box-types',
    option: 'imageboxtype'
  },
  'sweetbox': {
    name: 'Sweetbox',
    names: 'Sweetboxes',
    key: 'sweetbox',
    url: 'sweet-boxes',
    option: 'sweetbox',
    listItems: 'sweetBoxSweetboxProduct',
  },
  'sweetBoxType': {
    name: 'Sweet Box Type',
    names: 'Sweet Box Types',
    key: 'sweetboxtype',
    url: 'sweet-box-types',
    option: 'sweetboxtype'
  },
  'sweetboxProducts': {
    name: 'Sweetbox',
    names: 'Sweetboxes',
    key: 'sweetboxproduct',
    url: 'sweet-box-products',
    option: 'sweetboxproduct',
    parent: 'sweetbox'
  },
  'color': {
    name: 'Color',
    names: 'Colors',
    key: 'color',
    url: 'colors',
    option: 'color'
  },
  'productBundle': {
    name: 'Product Bundle',
    names: 'Product Bundles',
    key: 'productbundle',
    url: 'product-bundles',
    option: 'productbundle'
  },
  'productColor': {
    name: 'Product Color',
    names: 'Product Colors',
    key: 'productcolor',
    url: 'product-colors',
    option: 'productcolor'
  },
  'deliveryOption': {
    name: 'Delivery Option',
    names: 'Delivery Options',
    key: 'delivery',
    url: 'delivery-options',
    option: 'deliveryoption'
  },
  'deliveryOptionService': {
    name: 'Delivery Option Service',
    names: 'Delivery Option Services',
    key: 'delivery',
    url: 'delivery-option-services',
    option: 'deliveryoptionservice'
  },
  'deliveryServiceCost': {
    name: 'Delivery Service Cost',
    names: 'Delivery Service Costs',
    key: 'money',
    url: 'delivery-service-costs',
    option: 'deliveryservicecost'
  },
  'deliveryServiceGroupCost': {
    name: 'Delivery Service Cost',
    names: 'Delivery Service Costs',
    key: 'money',
    url: 'delivery-service-group-costs',
    option: 'deliveryservicegroupcost'
  },
  'paymentOption': {
    name: 'Payment Option',
    names: 'Payment Options',
    key: 'payment',
    url: 'payment-options',
    option: 'paymentoption'
  },
  'promotionCode': {
    name: 'Promotion Code',
    names: 'Promotion Codes',
    key: 'coupon',
    url: 'promotion-codes',
    option: 'promotioncode'
  },
  'integration': {
    name: 'Integration',
    names: 'Integrations',
    key: 'integration',
    url: 'integration',
    option: 'integration'
  }
}

export const SECTIONS = {
  1: ['user','order','vendor','color','category','brand','product', 'imageBox', 'sweetbox', 'deliveryOption', 'paymentOption',  'deliveryServiceGroupCost', 'promotionCode', 'integration'],
  3: ['order','product', 'sweetbox']
}
export const ADMIN_URL = {
  account: 'settings',
  home: 'home',
  index: 'admin',
}