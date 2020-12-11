import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import * as T from 'prop-types';
import { 
  withStyles, 
  Grid,
  Paper,
  Link,
} from '@material-ui/core';

import { getBannnerById } from '../api/banners';

const styles = (theme) => ({
  root: {

  },
  bannerItem: {
    padding: 5,
    display: 'inline-block'
  },
  table: {
    display: 'table'
  },
  row: {
    display: 'table-row'
  },
  column: {
    display: 'table-cell',
    padding: 5,
  }
});

const BannerBox = ({classes, id}) => {
  const imageUrl = `${process.env.IMAGE_URL}/slideImages`;
  const [banners, setBanner] = useState([]);
  const [showData, setShowData] = useState(false);

  const loadBanners = async() => {
    const data = await getBannnerById(id);
    if (data) {
      setBanner(data)
      setShowData(true);
    }
  }

  useEffect(() => {
    loadBanners();
  }, [showData]);

  return showData && (
    <div className={classes.root}>
      {/* <Grid container>
        {
          banners.productImages.map((banner, index) => {
            let bannerUrl = `${imageUrl}/${banner.img_url}`;
            return (
                <Grid className={classes.bannerItem} item lg={6}>
                  <Link href="/">
                    <img className='img-fluid' src={bannerUrl} alt=""/>
                  </Link>
                </Grid>
            )
          })
        }
      </Grid> */}

      <div className={classes.table}>
        <div className={classes.row}>
        {
          banners.productImages.map((banner, index) => {
            let bannerUrl = `${imageUrl}/${banner.img_url}`;
            return (
              <div key={index} className={classes.column}>
                <Link href="/">
                  <img className='img-fluid' src={bannerUrl} alt=""/>
                </Link>
              </div>
            )
          })
        }
        </div>
      </div>
    </div>
  );
}

BannerBox.protoTypes = {
  classes: T.object,
  id: T.number,
}

export default withStyles(styles)(BannerBox);