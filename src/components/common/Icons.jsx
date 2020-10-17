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

import Order from '../../../public/images/svg/order.svg';
import Wishlist from '../../../public/images/svg/wishlist.svg';
import AddressBook from '../../../public/images/svg/notebook.svg';
import Shield from '../../../public/images/svg/shield.svg';
import CarWheel from '../../../public/images/svg/car_wheel.svg';
import Delivery from '../../../public/images/svg/delivery.svg';
import Paypal from '../../../public/images/svg/cc-pay.svg';
import Mastercard from '../../../public/images/svg/cc-master.svg';
import Visa from '../../../public/images/svg/cc-visa.svg';
import Discovery from '../../../public/images/svg/cc-discover.svg';
import Cart from '../../../public/images/svg/cart.svg';
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
import Car from '../../../public/images/svg/categories/car.svg';
import Garden from '../../../public/images/svg/categories/garden.svg';
import Health from '../../../public/images/svg/categories/health.svg';
import Broken from '../../../public/images/svg/categories/broken.svg';
import Jewerly from '../../../public/images/svg/categories/jewerly.svg';
import LogoIcon from '../../../public/images/logoIcon.svg';
import LogoIconWhite from '../../../public/images/logoIconWhite.svg';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import StoreMallDirectoryOutlinedIcon from '@material-ui/icons/StoreMallDirectoryOutlined';
import AvenidazWhite from '../../../public/images/avenidazWhite.svg';

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
      case 'logo':
        return <LogoIcon className={classes.icon}/>
      break;
      case 'logoWhite':
        return <AvenidazWhite className={classes.icon}/>
      break;
      case 'user':
        return <PersonAddOutlinedIcon className={classes.icon}/>
      break;
      case 'store':
        return <StoreMallDirectoryOutlinedIcon className={classes.icon}/>
      break;
      case 'category':
        return <PersonAddOutlinedIcon className={classes.icon}/>
      break;
      case 'vendor':
        return <PersonAddOutlinedIcon className={classes.icon}/>
      break;
      case 'brand':
        return <PersonAddOutlinedIcon className={classes.icon}/>
      break;
      case 'product':
        return <Order className={classes.icon}/>
      break;
      case 'logoIconWhite':
        return <LogoIconWhite className={classes.icon}/>
      break;
      case 'order':
        return <Order className={classes.icon}/>
      break;
      case 'wishlist':
        return <Wishlist className={classes.icon}/>
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
        return <Cart className={classes.icon}/>
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
        return <Intangram className={classes.icon}/>
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