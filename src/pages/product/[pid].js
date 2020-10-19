import React, {useState, useEffect} from 'react';
import * as T from 'prop-types';
import ImageGallery from 'react-image-gallery';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import {
  Grid,
  withStyles,
  Link,
  FormControl,
  Button,
  TextField,
  Typography,
  Divider,
} from '@material-ui/core';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';

//import Typography from '../components/common/Typography';
import { getImageUrlByType } from '../../utils/form';
import { ADMIN_SECTIONS } from '../../constants/admin';
import LayoutTemplate from '../../components/common/Layout/LayoutTemplate';
import { ProductSample } from '../../constants/samples/ProductSample';
import Rate from '../../components/common/Rate';
import RateBox from '../../components/common/RateBox';
import Select from '../../components/common/QuanitySelector';
import Icons from '../../components/common/Icons';

import { getItemById } from '../../api';
import { setProducts } from '../../redux/actions/main';

const styles = (theme) => ({
  root: {
    padding:10
  },
  deliveryText: {
    color: '#51DC55',
    margin: '10px 0px',
  },
  deliveryIcon: {
    width: 80,
    height: 80,
    fill: '#51DC55',
  },
  productBottomSec: {
    padding: 10,
  },
  qaItem: {
    display: 'flex',
  },
  qaTitleContainer: {
    margin: '20px 0px',
  },
  qaDivider: {
    margin: '5px 0px',
  },
  textContainer: {
    width: '100%',
    margin: '20px 0px',
  },
  textInput: {
    // flexGrow: 2,
    width: '100%',

  },
  textButton: {
    width: '100%',
    height: '100%'
  }
});

const Index = ({classes, data = ProductSample}) => {
  const router = useRouter()
  const id = router.query.pid;
  const [images, setImages] = useState({});
  const [rate, setRate] = React.useState(2);
  const [productInfo, setProductInfo] = useState({});
  const [hover, setHover] = React.useState(-1);
  const [showData, setShowData] = useState(false);

  const handleSelectChange = async(resp) => {
    const index = resp.id.split("-")[1]
    cart[index]['quantity'] = resp.value;
    await updateCart(cart[index])
  };
  
  const loadImages = (data) => {
    const imageUrl = getImageUrlByType('product');
    const imgs = data.product_images.map((img) => {
        return {
          original: `${imageUrl}/${img.img_url}`,
          thumbnail: `${imageUrl}/${img.img_url}`,
        }
    });
    console.log('image', imgs)
    setImages(imgs);
  }

  useEffect(()=>{
    const loadProductInfo = async() => {
      const getProductInfo = await getItemById(ADMIN_SECTIONS.product.url, id)
      console.log('product', getProductInfo)
      loadImages(getProductInfo)
      setProductInfo(getProductInfo);
      setShowData(true);
    }
    loadProductInfo();
  }, [])

  return showData && (
    <LayoutTemplate>
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={9} sm={12}>
            <Grid container spacing={2}>
              <Grid item lg={8} sm={12}>
                <Grid container>
                  <Grid item lg={12} sm={12}>
                    <ImageGallery items={images} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={4} sm={12}>
                <Typography align="center" variant="h4" component="h3">{productInfo.name}</Typography>
                <Typography align="center" variant="h1" component="h2">US ${productInfo.amount}</Typography>
                <Select onChange={handleSelectChange} title="quant" id="quant-select" />
                <Typography align="left" variant="h5" component="h5">Disponibilidad {productInfo.stock}</Typography>
                <Typography className={classes.deliveryText} align="left" variant="body1" component="p">
                  <Icons name="delivery" classes={{icon: classes.deliveryIcon}}  />&nbsp;Entrega a todo Panama
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} sm={12}>
            <Grid container>
              <Grid item lg={12} sm={12}>
                <Typography align="center" variant="h4" component="h3">Opiniones del Cliente</Typography>
              </Grid>
              {/* <Grid item lg={12} sm={12} align="center">
                <Rate data={rate} onChange={(event, newValue)=>setRate(newValue)} onChangeActive={(event, newHover)=>setHover(newHover)} />
              </Grid>
              <Grid item lg={12} sm={12}>
                <RateBox data={rate} />
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
        {/* Review and Seller */}
        <Grid container spacing={2}>
          <Grid item lg={8} sm={12}>
            <Typography align="left" variant="h4" component="h4">Description</Typography>
            <Typography align="left" variant="body1" component="p">{productInfo.description}</Typography>
          </Grid>
          <Grid item lg={4} sm={12}>
            <Typography align="left" variant="h4" component="h4">Acerca del Vendedor</Typography>
            <Typography align="left" variant="body1" component="p">seller[<Link href="#">Ver Mas</Link>]</Typography>
            <Typography align="left" variant="body1" component="div">
                {/* <Rate data={productInfo.seller.rate} disabled={true} /> */}
            </Typography>
            {/* <Typography align="left" variant="body1" component="p">{productInfo.seller.desc}</Typography> */}
          </Grid>
        </Grid>
        {/* Q&A section */}
        <Grid container>
          <Grid item lg={12}>
            <Typography align="left" variant="h4" component="h4">Preguntas y respuestas</Typography>
          </Grid>
          <Grid item lg={12}>
            <FormControl className={classes.textContainer}>
              <Grid container spacing={2}>
                <Grid item lg={10} sm={12}>
                  <TextField className={classNames(classes.textInput)} id="outlined-basic" label="Tu pregunta" variant="outlined" />
                </Grid>
                <Grid item lg={2} sm={12}>
                  <Button className={classNames(classes.textButton)} variant="contained" color="primary" component="span">
                    Preguntar
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </Grid>
          <Grid item lg={12} sm={12} className={classes.qaTitleContainer}>
            <Typography align="left" variant="h5" component="h5">Ultima Preguntas</Typography>
            <Divider className={classes.qaDivider} />
          </Grid>
          <Grid item lg={12}>
            <Grid container spacing={2}>
            {/* {
              productInfo.qa.map((question, index) => {
                return (index % 2 !== 0) ? (
                  <Grid key={index} item lg={12}>
                    <Grid container>
                      <Grid item lg={12} className={classes.qaItem}>
                        <MessageOutlinedIcon width="20" height="20"/>
                         &nbsp;&nbsp;<Typography align="left" variant="body1" component="div">{question.question}</Typography>
                      </Grid>
                      <Grid item lg={12}>
                        <Typography align="left" variant="caption" component="legend">{question.name}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid key={index} item lg={12}>
                    <Grid container>
                      <Grid item lg={12} className={classes.qaItem}>
                        <CommentOutlinedIcon width="20" height="20"/>
                         &nbsp;&nbsp;<Typography align="left" variant="body1" component="div">{question.question}</Typography>
                      </Grid>
                      <Grid item lg={12}>
                        <Typography align="left" variant="caption" component="legend">{question.name}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                )
              })
            } */}
            </Grid>
          </Grid>
        </Grid>
        {/* Gallery thumb */}
        <Grid container>
          <Grid item></Grid>
        </Grid>
      </div>

    </LayoutTemplate>
  );
}

Index.protoTypes = {
  classes: T.object,
  data: T.object,
}

export default withStyles(styles)(Index);