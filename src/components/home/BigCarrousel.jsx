import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import * as T from 'prop-types';
import { 
  withStyles, 
  Grid,
} from '@material-ui/core';

import { getMainSliders } from '@/api/imageBoxes';

const styles = () => ({
  root: {
    width: '100%',
  },
  carrouselContainer: {
    width: '100%'
  }
});

const BigCarrousel = ({classes}) => {
  const imageUrl = `${process.env.IMAGE_URL}/slideImages`;
  const [images, setImages] = useState([]);
  const [showData, setShowData] = useState(false);

  const loadMainSlider = async() => {
    const data = await getMainSliders({
      type: 1
    });
    if (data) {
      const dataImage = data.productImages.map((dat, index) => {
        return  {
          url: `${imageUrl}/${dat.img_url}`,
          description: `slideshow ${index}`
        }
      })
      setImages(dataImage)
      setShowData(true);
    }
  }

  useEffect(() => {
    loadMainSlider();
  }, [showData]);

  return showData && (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={12}>
            <Carousel
              className={classes.carrouselContainer}
              indicators={false}
              animation="slide"
              autoPlay={true}
            >
              {
                images.map( (item, i) => <img key={i} className='img-fluid' src={item.url} alt=""/> )
              }
            </Carousel>
        </Grid>
      </Grid>
    </div>
  );
}

BigCarrousel.protoTypes = {
  classes: T.object,
}

export default withStyles(styles)(BigCarrousel);