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

import LogoWhite from '../../../public/images/logo-white.svg';
import Logo from '../../../public/images/logo.svg';
import Order from '../../../public/images/svg/order.svg';
import Wishlist from '../../../public/images/svg/wishlist.svg';
import AddressBook from '../../../public/images/svg/notebook.svg';
import Shield from '../../../public/images/svg/shield.svg';
import CarWheel from '../../../public/images/svg/car_wheel.svg';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Delivery from '../../../public/images/svg/delivery.svg';
import Paypal from '../../../public/images/svg/cc-pay.svg';
import Mastercard from '../../../public/images/svg/cc-master.svg';
import Visa from '../../../public/images/svg/cc-visa.svg';
import Discovery from '../../../public/images/svg/cc-discover.svg';
import Cart from '../../../public/images/svg/cart.svg';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Twitter from '../../../public/images/svg/social-twitter.svg';
import Facebook from '../../../public/images/svg/social-facebook.svg';
import Pininterest from '../../../public/images/svg/social-pinterest.svg';
import Youtube from '../../../public/images/svg/social-youtube.svg';
import Instagram from '../../../public/images/svg/social-instagram.svg';
import Whatssap from '../../../public/images/svg/social-whatssap.svg';
import Chat from '../../../public/images/svg/chat.svg';
import Clothe from '../../../public/images/svg/categories/cloth.svg';
import Toy from '../../../public/images/svg/categories/toy.svg';
import Appliance from '../../../public/images/svg/categories/appliance.svg';
import Beauty from '../../../public/images/svg/categories/beauty.svg';
import Computer from '../../../public/images/svg/categories/computer.svg';
import Furniture from '../../../public/images/svg/categories/furniture.svg';
import Sport from '../../../public/images/svg/categories/sport.svg';
import Baby from '../../../public/images/svg/categories/baby.svg';
import AddIcon from '@material-ui/icons/Add';
import Car from '../../../public/images/svg/categories/car.svg';
import Garden from '../../../public/images/svg/categories/garden.svg';
import Health from '../../../public/images/svg/categories/health.svg';
import Broken from '../../../public/images/svg/categories/broken.svg';
import Jewerly from '../../../public/images/svg/categories/jewerly.svg';
import LogoIcon from '../../../public/images/logoIcon.svg';
import Products from '../../../public/images/svg/products.svg';
import Category from '../../../public/images/svg/category.svg';
import Vendor from '../../../public/images/svg/vendor.svg';
import Brand from '../../../public/images/svg/brand.svg';
import Supplies from '../../../public/images/svg/supplies.svg';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LogoIconWhite from '../../../public/images/logoIconWhite.svg';
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
import Bag from '../../../public/images/svg/categories/bag.svg';
import CloseBag from '../../../public/images/svg/categories/closebag.svg';
import Ballons from '../../../public/images/svg/categories/ballons.svg';
import OpenBox from '../../../public/images/svg/categories/openbox.svg';
import GlassBottle from '../../../public/images/svg/categories/glassbottle.svg';
import Basket from '../../../public/images/svg/categories/basket.svg';
import Ribbon from '../../../public/images/svg/categories/ribbon.svg';
import LifeSaver from '../../../public/images/svg/categories/lifesaver.svg';
import Paw from '../../../public/images/svg/categories/paw.svg';
import Costmetic from '../../../public/images/svg/categories/cosmetic.svg';
import BoxRibbon from '../../../public/images/svg/categories/boxribbon.svg';
import Mask from '../../../public/images/svg/categories/mask.svg';
import Special from '../../../public/images/svg/categories/special.svg';
import Manualidades from '../../../public/images/svg/categories/manualidades.svg';
import Fiestas from '../../../public/images/svg/categories/fiestas.svg';
import Envases from '../../../public/images/svg/categories/envases.svg';
import Covid from '../../../public/images/svg/categories/covid.svg';
import Accesorios from '../../../public/images/svg/categories/accesorios.svg';
import PaymentIcon from '@material-ui/icons/Payment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Christmas from '../../../public/images/svg/categories/christmas.svg';
import Others from '../../../public/images/svg/categories/others.svg';

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
      break;
      case 'christmas':
        return <Christmas className={classes.icon}/>
      break;
      case 'others':
        return <Others className={classes.icon}/>
      break;
      case 'success':
        return <CheckCircleOutlineIcon className={classes.icon}/>
      break;
      case 'error':
        return <ErrorOutlineIcon className={classes.icon}/>
      break;
      case 'manualidades':
        return <Manualidades className={classes.icon}/>
      break;
      case 'covid':
        return <Covid className={classes.icon}/>
      break;
      case 'accesorios':
        return <Accesorios className={classes.icon}/>
      break;
      case 'fiestas':
        return <Fiestas className={classes.icon}/>
      break;
      case 'envases':
        return <Envases className={classes.icon}/>
      break;
      case 'money':
        return <AttachMoneyIcon className={classes.icon}/>
      break;
      case 'mask':
        return <Mask className={classes.icon}/>
      break;
      case 'bag':
        return <Bag className={classes.icon}/>
      break;
      case 'closeBag':
        return <CloseBag className={classes.icon}/>
      break;
      case 'payment':
        return <PaymentIcon className={classes.icon}/>
      break;
      case 'ballons':
        return <Ballons className={classes.icon}/>
      break;
      case 'openBox':
        return <OpenBox className={classes.icon}/>
      break;
      case 'glassBottle':
        return <GlassBottle className={classes.icon}/>
      break;
      case 'basket':
        return <Basket className={classes.icon}/>
      break;
      case 'ribbon':
        return <Ribbon className={classes.icon}/>
      break;
      case 'lifeSaver':
        return <LifeSaver className={classes.icon}/>
      break;
      case 'cosmetic':
        return <Costmetic className={classes.icon}/>
      break;
      case 'boxRibbon':
        return <BoxRibbon className={classes.icon}/>
      break;
      case 'paw':
        return <Paw className={classes.icon}/>
      break;
      case 'addCircle':
        return <AddCircleIcon className={classes.icon}/>
      break;
      case 'color':
        return <ColorLensIcon className={classes.icon}/>
      break;
      case 'backArrow':
        return <KeyboardBackspaceIcon className={classes.icon}/>
      break;
      case 'edit':
        return <EditIcon className={classes.icon}/>
      break;
      case 'print':
        return <PrintIcon className={classes.icon}/>
      break;
      case 'listBullets':
        return <FormatListBulletedIcon className={classes.icon}/>
      break;
      case 'back':
        return <ArrowBackIcon className={classes.icon}/>
      break;
      case 'home':
        return <HomeIcon className={classes.icon}/>
      break;
      case 'products':
        return <Products className={classes.icon}/>
      break;
      case 'import':
        return <ImportExportIcon className={classes.icon}/>
      break;
      case 'search':
        return <SearchIcon className={classes.icon}/>
      break;
      case 'delete':
        return <DeleteOutlinedIcon className={classes.icon}/>
      break;
      case 'sweetbox':
        return <Supplies className={classes.icon}/>
      break;
      case 'imagebox':
      case 'imageBox':
        return <ImageSearchIcon className={classes.icon}/>
      break;
      case 'logo':
        return <LogoIcon className={classes.icon}/>
      break;
      case 'logoFull':
        return <Logo className={classes.icon}/>
      break;
      case 'logoNameWhite':
        return <LogoWhite className={classes.icon}/>
      break;
      case 'logout':
        return <ExitToAppIcon className={classes.icon}/>
      break;
      case 'store':
        return <StorefrontIcon className={classes.icon}/>
      break;
      case 'add':
        return <AddIcon className={classes.icon}/>
      break;
      case 'heart1':
        return <FavoriteBorderIcon className={classes.icon}/>
      break;
      case 'heart2':
        return <FavoriteIcon className={classes.icon}/>
      break;
      case 'user':
        return <PersonAddOutlinedIcon className={classes.icon}/>
      break;
      case 'user2':
        return <PermIdentityOutlinedIcon className={classes.icon}/>
      break;
      case 'store':
        return <StoreMallDirectoryOutlinedIcon className={classes.icon}/>
      break;
      case 'category':
        return <Category className={classes.icon}/>
      break;
      case 'vendor':
        return <Vendor className={classes.icon}/>
      break;
      case 'brand':
        return <Brand className={classes.icon}/>
      break;
      case 'product':
        return <Order className={classes.icon}/>
      break;
      case 'logoWhite':
        return <LogoIconWhite className={classes.icon}/>
      break;
      case 'order':
        return <Order className={classes.icon}/>
      break;
      case 'wishlist':
        return <Wishlist className={classes.icon}/>
      break;
      case 'close':
        return <CloseIcon className={classes.icon}/>
      break;
      case 'address':
        return <AddressBook className={classes.icon}/>
      break;
      case 'security':
        return <Shield className={classes.icon}/>
      break;
      case 'carwheel':
        return <CarWheel className={classes.icon}/>
      break;
      case 'delivery':
        return <Delivery className={classes.icon}/>
      break;
      case 'paypal':
        return <Paypal className={classes.icon}/>
      break;
      case 'visa':
        return <Visa className={classes.icon}/>
      break;
      case 'mastercard':
        return <Mastercard className={classes.icon}/>
      break;
      case 'amex':
        return <Amex className={classes.icon}/>
      break;
      case 'discovery':
        return <Discovery className={classes.icon}/>
      break;
      case 'cart':
        return <ShoppingCartOutlinedIcon className={classes.icon}/>
      break;
      case 'chat':
        return <Chat className={classes.icon}/>
      break;
      case 'facebook':
        return <Facebook className={classes.icon}/>
      break;
      case 'youtube':
        return <Youtube className={classes.icon}/>
      break;
      case 'twitter':
        return <Twitter className={classes.icon}/>
      break;
      case 'whatssap':
        return <Whatssap className={classes.icon}/>
      break;
      case 'pininterest':
        return <Pininterest className={classes.icon}/>
      break;
      case 'instagram':
        return <Instagram className={classes.icon}/>
      break;
      case 'clothe':
        return <Clothe className={classes.icon} />
      break;
      case 'car':
        return <Car className={classes.icon} />
      break;
      case 'baby':
        return <Baby className={classes.icon} />
      break;
      case 'sport':
        return <Sport className={classes.icon} />
      break;
      case 'garden':
        return <Garden className={classes.icon} />
      break;
      case 'toy':
        return <Toy className={classes.icon} />
      break;
      case 'fitness':
        return <Fitness className={classes.icon} />
      break;
      case 'health':
        return <Health className={classes.icon} />
      break;
      case 'appliance':
        return <Appliance className={classes.icon} />
      break;
      case 'beauty':
        return <Beauty className={classes.icon} />
      break;
      case 'computer':
        return <Computer className={classes.icon} />
      break;
      case 'furniture':
        return <Furniture className={classes.icon} />
      break;
      case 'jewerly':
        return <Jewerly className={classes.icon} />
      break;
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