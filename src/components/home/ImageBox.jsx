import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import cn from 'classnames';
import * as T from 'prop-types';
import { 
  withStyles, 
  Grid,
  Paper,
  Link,
} from '@material-ui/core';
import Slider from "react-slick";
import {isMobile} from 'react-device-detect';

import { getImageBoxesByType, getActiveImageBoxesByKey } from '@/api/imageBoxes';

const styles = (theme) => ({
  root: {
    margin: '20px 0px',
  },
  imageBoxItem: {
    padding: 5,
    display: 'inline-block'
  },
  // table: {
  //   display: 'table'
  // },
  // row: {
  //   display: 'table-row',
  //   textAlign: 'center',
  // },
  rowTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2em',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  columnMiniImageBox: {
    display: 'table-cell',
    padding: 5,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      display: 'inline-block',
    }
  },
  columnStoreImageBox: {
    display: 'inline-block',
    width: '10%',
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      width: '30%',
      padding: 10,
    }
  },
  columnBrandImageBox: {
    display: 'inline-block',
    width: '10%',
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      width: '30%',
      padding: 10,
    }
  },
  sliderItem: {
    height: '100%',
  },
  sliderClass: {
    '& li button:before': {
      fontSize: '12px'
    }
  }
});


const ImageBox = ({classes, name, showTitle = false, isSlider = false}) => {
  const imageUrl = `${process.env.IMAGE_URL}/slideImages`;
  const [imageBoxes, setImageBoxes] = useState([]);
  const [showData, setShowData] = useState(false);

  const loadImageBoxes = async() => {
    const data = await getActiveImageBoxesByKey(name);
    if (data) {
      setImageBoxes(data)
      setShowData(true);
    }
  }

  const sliderSetting = {
    dots: true,
    infinite: true,
    accessibility: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    className: classes.sliderClass
  };
  useEffect(() => {
    loadImageBoxes();
  }, [showData]);

  const getClassNameBySweetBoxType = (sweetBoxType) => {
    switch(sweetBoxType) {
      case 1:
      case 2:
        return classes.columnMiniImageBox;
      case 3:
        return classes.columnBrandImageBox;
      case 4:
        return classes.columnStoreImageBox;
      default:
        return classes.columnMiniImageBox;
    }
  }

  const getImageComponent = (imageBox, index, sweetBoxType, imageUrl) => {
    const className = getClassNameBySweetBoxType(sweetBoxType);
    return (
      <div key={index} className={className}>
        <Link href={imageBox.url}>
          <img className='img-fluid' src={imageUrl} alt=""/>
        </Link>
      </div>
    )
  }

  /** ImageBox does not have img_thumb_url implemented */
  const getThumbnailOrFullUrl = (imageBox) => {
    return `${imageUrl}/${imageBox.img_thumb_url ? imageBox.img_thumb_url : imageBox.img_url}`;
  }

  return showData && (
    <Grid container className={classes.root}>
        {
          showTitle && (
            <Grid item lg={12} xs={12} className={`${classes.row} ${classes.rowTitle}`}>
              {
                imageBoxes.name
              }
            </Grid>
          )
        }
        <Grid item lg={12} xs={12} className={classes.sliderItem}>
        {
          isSlider ? (
            <Slider {...sliderSetting}>
              {
                imageBoxes.productImages.map((imageBox, index) => {
                  const imageBoxUrl = getThumbnailOrFullUrl(imageBox);
                  const sweetBoxType = Number(imageBoxes.imageBoxType);
                  return getImageComponent(imageBox, index, sweetBoxType, imageBoxUrl);
                })
              }
            </Slider>
          ) : (
            imageBoxes.productImages.map((imageBox, index) => {
              const imageBoxUrl = getThumbnailOrFullUrl(imageBox);
              const sweetBoxType = Number(imageBoxes.imageBoxType);
              return getImageComponent(imageBox, index, sweetBoxType, imageBoxUrl);
            })
          )
        }
        </Grid>
    </Grid>
  );
}

ImageBox.protoTypes = {
  classes: T.object,
  isSlider: T.bool,
  name: T.string,
  showTitle: T.bool,
}

export default withStyles(styles)(ImageBox);