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

import { getImageBoxesByType, getActiveImageBoxesByKey } from '../../api/imageBoxes';

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
  };
  useEffect(() => {
    loadImageBoxes();
  }, [showData]);

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
        <Grid item lg={12} xs={12}>
        {
          isSlider ? (
            <Slider {...sliderSetting}>
              {
                imageBoxes.productImages.map((imageBox, index) => {
                  const imageBoxUrl = `${imageUrl}/${imageBox.img_url}`;
                  const sweetBoxType = Number(imageBoxes.imageBoxType);
                  switch(sweetBoxType) {
                    case 2:
                    case 1: {
                      return (
                        <div key={index} className={classes.columnMiniImageBox}>
                          <Link href={imageBox.url}>
                            <img className='img-fluid' src={imageBoxUrl} alt=""/>
                          </Link>
                        </div>
                      )
                      break;
                    }
                    case 3: {
                      return (
                        <div key={index} className={classes.columnBrandImageBox}>
                          <Link href={imageBox.url}>
                            <img className='img-fluid' src={imageBoxUrl} alt=""/>
                          </Link>
                        </div>
                      )
                      break;
                    }
                    case 4: {
                      return (
                        <div key={index} className={classes.columnStoreImageBox}>
                          <Link href={imageBox.url}>
                            <img className='img-fluid' src={imageBoxUrl} alt=""/>
                          </Link>
                        </div>
                      )
                      break;
                    }
                  }
                })
              }
            </Slider>
          ) : (
            imageBoxes.productImages.map((imageBox, index) => {
              const imageBoxUrl = `${imageUrl}/${imageBox.img_url}`;
              const sweetBoxType = Number(imageBoxes.imageBoxType);
              switch(sweetBoxType) {
                case 2:
                case 1: {
                  return (
                    <Grid key={index} className={classes.columnMiniImageBox}>
                      <Link href={imageBox.url}>
                        <img className='img-fluid' src={imageBoxUrl} alt=""/>
                      </Link>
                    </Grid>
                  )
                  break;
                }
                case 3: {
                  return (
                    <Grid key={index} className={classes.columnBrandImageBox}>
                      <Link href={imageBox.url}>
                        <img className='img-fluid' src={imageBoxUrl} alt=""/>
                      </Link>
                    </Grid>
                  )
                  break;
                }
                case 4: {
                  return (
                    <Grid key={index} className={classes.columnStoreImageBox}>
                      <Link href={imageBox.url}>
                        <img className='img-fluid' src={imageBoxUrl} alt=""/>
                      </Link>
                    </Grid>
                  )
                  break;
                }
              }
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