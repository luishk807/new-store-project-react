import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Link,
  Grid,
  makeStyles,
} from '@material-ui/core';

import LogoWhite from 'public/images/logo-white.svg';
import Logo from 'public/images/logo.svg';
import Order from 'public/images/svg/order.svg';
import Wishlist from 'public/images/svg/wishlist.svg';
import AddressBook from 'public/images/svg/notebook.svg';
import Shield from 'public/images/svg/shield.svg';
import CarWheel from 'public/images/svg/car_wheel.svg';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Delivery from 'public/images/svg/delivery.svg';
import Paypal from 'public/images/svg/cc-pay.svg';
import Mastercard from 'public/images/svg/cc-master.svg';
import Visa from 'public/images/svg/cc-visa.svg';
import Discovery from 'public/images/svg/cc-discover.svg';
import Cart from 'public/images/svg/cart.svg';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Twitter from 'public/images/svg/social-twitter.svg';
import Facebook from 'public/images/svg/social-facebook.svg';
import Pininterest from 'public/images/svg/social-pinterest.svg';
import Youtube from 'public/images/svg/social-youtube.svg';
import Instagram from 'public/images/svg/social-instagram.svg';
import Whatssap from 'public/images/svg/social-whatssap.svg';
import Chat from 'public/images/svg/chat.svg';
import Clothe from 'public/images/svg/categories/cloth.svg';
import Toy from 'public/images/svg/categories/toy.svg';
import Appliance from 'public/images/svg/categories/appliance.svg';
import Beauty from 'public/images/svg/categories/beauty.svg';
import Computer from 'public/images/svg/categories/computer.svg';
import Furniture from 'public/images/svg/categories/furniture.svg';
import Sport from 'public/images/svg/categories/sport.svg';
import Baby from 'public/images/svg/categories/baby.svg';
import AddIcon from '@material-ui/icons/Add';
import Car from 'public/images/svg/categories/car.svg';
import Garden from 'public/images/svg/categories/garden.svg';
import Health from 'public/images/svg/categories/health.svg';
import Broken from 'public/images/svg/categories/broken.svg';
import Jewerly from 'public/images/svg/categories/jewerly.svg';
import LogoIcon from 'public/images/logoIcon.svg';
import Products from 'public/images/svg/products.svg';
import Category from 'public/images/svg/category.svg';
import Vendor from 'public/images/svg/vendor.svg';
import Brand from 'public/images/svg/brand.svg';
import Supplies from 'public/images/svg/supplies.svg';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LogoIconWhite from 'public/images/logoIconWhite.svg';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import StoreMallDirectoryOutlinedIcon from '@material-ui/icons/StoreMallDirectoryOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import StorefrontIcon from '@material-ui/icons/Storefront';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import PrintIcon from '@material-ui/icons/Print';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import Bag from 'public/images/svg/categories/bag.svg';
import CloseBag from 'public/images/svg/categories/closebag.svg';
import Ballons from 'public/images/svg/categories/ballons.svg';
import OpenBox from 'public/images/svg/categories/openbox.svg';
import GlassBottle from 'public/images/svg/categories/glassbottle.svg';
import Basket from 'public/images/svg/categories/basket.svg';
import Ribbon from 'public/images/svg/categories/ribbon.svg';
import LifeSaver from 'public/images/svg/categories/lifesaver.svg';
import Paw from 'public/images/svg/categories/paw.svg';
import Costmetic from 'public/images/svg/categories/cosmetic.svg';
import BoxRibbon from 'public/images/svg/categories/boxribbon.svg';
import Mask from 'public/images/svg/categories/mask.svg';
import Special from 'public/images/svg/categories/special.svg';
import Manualidades from 'public/images/svg/categories/manualidades.svg';
import Fiestas from 'public/images/svg/categories/fiestas.svg';
import Envases from 'public/images/svg/categories/envases.svg';
import Covid from 'public/images/svg/categories/covid.svg';
import Accesorios from 'public/images/svg/categories/accesorios.svg';
import PaymentIcon from '@material-ui/icons/Payment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Christmas from 'public/images/svg/categories/christmas.svg';
import Others from 'public/images/svg/categories/others.svg';
import NoImages from 'public/images/svg/noimage.svg';
import Coupon from 'public/images/svg/coupon.svg';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import ExtensionIcon from '@material-ui/icons/ExtensionOutlined';

import Typography from './Typography';

const styles = (theme) => ({
  icon: {
    width: '100%',
    height: 'auto',
  }
});

const Icons = ({classes, name}) => {
  const getIcon = () => {
    switch(name) {
      case 'special':
        return <Special className={classes.icon}/>
      case 'christmas':
        return <Christmas className={classes.icon}/>
      case 'sad':
        return <SentimentVeryDissatisfiedIcon className={classes.icon}/>
      case 'coupon':
        return <Coupon className={classes.icon}/>
      case 'noimages':
        return <NoImages className={classes.icon}/>
      case 'christmas':
        return <Christmas className={classes.icon}/>
      case 'others':
        return <Others className={classes.icon}/>
      case 'success':
        return <CheckCircleOutlineIcon className={classes.icon}/>
      case 'error':
        return <ErrorOutlineIcon className={classes.icon}/>
      case 'manualidades':
        return <Manualidades className={classes.icon}/>
      case 'covid':
        return <Covid className={classes.icon}/>
      case 'accesorios':
        return <Accesorios className={classes.icon}/>
      case 'fiestas':
        return <Fiestas className={classes.icon}/>
      case 'envases':
        return <Envases className={classes.icon}/>
      case 'money':
        return <AttachMoneyIcon className={classes.icon}/>
      case 'mask':
        return <Mask className={classes.icon}/>
      case 'bag':
        return <Bag className={classes.icon}/>
      case 'closeBag':
        return <CloseBag className={classes.icon}/>
      case 'payment':
        return <PaymentIcon className={classes.icon}/>
      case 'ballons':
        return <Ballons className={classes.icon}/>
      case 'openBox':
        return <OpenBox className={classes.icon}/>
      case 'glassBottle':
        return <GlassBottle className={classes.icon}/>
      case 'basket':
        return <Basket className={classes.icon}/>
      case 'ribbon':
        return <Ribbon className={classes.icon}/>
      case 'lifeSaver':
        return <LifeSaver className={classes.icon}/>
      case 'cosmetic':
        return <Costmetic className={classes.icon}/>
      case 'boxRibbon':
        return <BoxRibbon className={classes.icon}/>
      case 'paw':
        return <Paw className={classes.icon}/>
      case 'addCircle':
        return <AddCircleIcon className={classes.icon}/>
      case 'color':
        return <ColorLensIcon className={classes.icon}/>
      case 'backArrow':
        return <KeyboardBackspaceIcon className={classes.icon}/>
      case 'edit':
        return <EditIcon className={classes.icon}/>
      case 'print':
        return <PrintIcon className={classes.icon}/>
      case 'listBullets':
        return <FormatListBulletedIcon className={classes.icon}/>
      case 'back':
        return <ArrowBackIcon className={classes.icon}/>
      case 'home':
        return <HomeIcon className={classes.icon}/>
      case 'products':
        return <Products className={classes.icon}/>
      case 'import':
        return <ImportExportIcon className={classes.icon}/>
      case 'search':
        return <SearchIcon className={classes.icon}/>
      case 'delete':
        return <DeleteOutlinedIcon className={classes.icon}/>
      case 'sweetbox':
        return <Supplies className={classes.icon}/>
      case 'imagebox':
      case 'imageBox':
        return <ImageSearchIcon className={classes.icon}/>
      case 'logo':
        return <LogoIcon className={classes.icon}/>
      case 'logoFull':
        return <Logo className={classes.icon}/>
      case 'logoNameWhite':
        return <LogoWhite className={classes.icon}/>
      case 'logout':
        return <ExitToAppIcon className={classes.icon}/>
      case 'store':
        return <StorefrontIcon className={classes.icon}/>
      case 'add':
        return <AddIcon className={classes.icon}/>
      case 'heart1':
        return <FavoriteBorderIcon className={classes.icon}/>
      case 'heart2':
        return <FavoriteIcon className={classes.icon}/>
      case 'user':
        return <PersonAddOutlinedIcon className={classes.icon}/>
      case 'user2':
        return <PermIdentityOutlinedIcon className={classes.icon}/>
      case 'store':
        return <StoreMallDirectoryOutlinedIcon className={classes.icon}/>
      case 'category':
        return <Category className={classes.icon}/>
      case 'vendor':
        return <Vendor className={classes.icon}/>
      case 'brand':
        return <Brand className={classes.icon}/>
      case 'product':
        return <Order className={classes.icon}/>
      case 'logoIconWhite':
        return <LogoIconWhite className={classes.icon}/>
      case 'order':
        return <Order className={classes.icon}/>
      case 'wishlist':
        return <Wishlist className={classes.icon}/>
      case 'close':
        return <CloseIcon className={classes.icon}/>
      case 'address':
        return <AddressBook className={classes.icon}/>
      case 'security':
        return <Shield className={classes.icon}/>
      case 'carwheel':
        return <CarWheel className={classes.icon}/>
      case 'delivery':
        return <Delivery className={classes.icon}/>
      case 'paypal':
        return <Paypal className={classes.icon}/>
      case 'visa':
        return <Visa className={classes.icon}/>
      case 'mastercard':
        return <Mastercard className={classes.icon}/>
      case 'amex':
        return <Amex className={classes.icon}/>
      case 'discovery':
        return <Discovery className={classes.icon}/>
      case 'cart':
        return <ShoppingCartOutlinedIcon className={classes.icon}/>
      case 'chat':
        return <Chat className={classes.icon}/>
      case 'facebook':
        return <Facebook className={classes.icon}/>
      case 'youtube':
        return <Youtube className={classes.icon}/>
      case 'twitter':
        return <Twitter className={classes.icon}/>
      case 'whatssap':
        return <Whatssap className={classes.icon}/>
      case 'pininterest':
        return <Pininterest className={classes.icon}/>
      case 'instagram':
        return <Instagram className={classes.icon}/>
      case 'clothe':
        return <Clothe className={classes.icon} />
      case 'car':
        return <Car className={classes.icon} />
      case 'baby':
        return <Baby className={classes.icon} />
      case 'sport':
        return <Sport className={classes.icon} />
      case 'garden':
        return <Garden className={classes.icon} />
      case 'toy':
        return <Toy className={classes.icon} />
      case 'fitness':
        return <Fitness className={classes.icon} />
      case 'health':
        return <Health className={classes.icon} />
      case 'appliance':
        return <Appliance className={classes.icon} />
      case 'beauty':
        return <Beauty className={classes.icon} />
      case 'computer':
        return <Computer className={classes.icon} />
      case 'furniture':
        return <Furniture className={classes.icon} />
      case 'jewerly':
        return <Jewerly className={classes.icon} />
      case 'integration':
        return <ExtensionIcon className={classes.icon} />
      default:
        return <Broken className={classes.icon} />
    }
  }
  return getIcon();
}
 
Icons.protoTypes = {
  classes: T.object,
  name: T.string.isRequired,
}
export default withStyles(styles)(Icons);