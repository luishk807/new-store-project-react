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

import { getBannnerByType } from '../api/banners';

const styles = (theme) => ({
  root: {
    margin: '20px 0px',
  },
  bannerItem: {
    padding: 5,
    display: 'inline-block'
  },
  table: {
    display: 'table'
  },
  row: {
    display: 'table-row',
    textAlign: 'center',
  },
  rowTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2em',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  columnMiniBanner: {
    display: 'table-cell',
    padding: 5,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      display: 'inline-block',
    }
  },
  columnStoreBanner: {
    display: 'inline-block',
    width: '10%',
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      width: '30%',
      padding: 10,
    }
  },
  columnBrandBanner: {
    display: 'inline-block',
    width: '10%',
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      width: '30%',
      padding: 10,
    }
  }
});

const BannerBox = ({classes, type, showTitle = false}) => {
  const imageUrl = `${process.env.IMAGE_URL}/slideImages`;
  const [banners, setBanner] = useState([]);
  const [showData, setShowData] = useState(false);
  const [bannerHtml, setBannerHtml] = useState([]);

  const loadBanners = async() => {
    const data = await getBannnerByType(type);
    if (data) {
      setBanner(data)
      setShowData(true);
    }
  }

  const loadBannerHtml = async() => {
    setBannerHtml();
  }

  useEffect(() => {
    loadBanners();
  }, [showData]);

  return showData && (
    <div className={classes.root}>
      <div className={classes.table}>
        {
          showTitle && (
            <div className={`${classes.row} ${classes.rowTitle}`}>
              {
                banners.name
              }
            </div>
          )
        }
        <div className={classes.row}>
        {
          banners.productImages.map((banner, index) => {
            let bannerUrl = `${imageUrl}/${banner.img_url}`;
            switch(type) {
              case 2: {
                return (
                  <div key={index} className={classes.columnMiniBanner}>
                    <Link href={banner.url}>
                      <img className='img-fluid' src={bannerUrl} alt=""/>
                    </Link>
                  </div>
                )
                break;
              }
              case 3: {
                return (
                  <div key={index} className={classes.columnBrandBanner}>
                    <Link href={banner.url}>
                      <img className='img-fluid' src={bannerUrl} alt=""/>
                    </Link>
                  </div>
                )
                break;
              }
              case 4: {
                return (
                  <div key={index} className={classes.columnStoreBanner}>
                    <Link href={banner.url}>
                      <img className='img-fluid' src={bannerUrl} alt=""/>
                    </Link>
                  </div>
                )
                break;
              }
            }
          })
        }
        </div>
      </div>
    </div>
  );
}

BannerBox.protoTypes = {
  classes: T.object,
  type: T.number,
  showTitle: T.bool,
}

export default withStyles(styles)(BannerBox);