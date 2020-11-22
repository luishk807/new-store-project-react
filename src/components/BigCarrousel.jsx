import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import * as T from 'prop-types';
import { 
  withStyles, 
  Grid,
  Paper,
  Button,
} from '@material-ui/core';

const styles = (theme) => ({
  root: {

  },
  carrouselContainer: {
    width: '100%'
  }
});

const BigCarrousel = ({classes, image}) => {
  const imageUrl = `${process.env.IMAGE_URL}/slideImages`;
  const [images, setImages] = useState([]);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    const imgs = [
      {
        url: `${imageUrl}/banner1.jpg`,
        description: "Probably the most random thing you have ever seen!"
      },
    ]
    setImages(imgs)
  }, []);

  return (
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
  image: T.object,
}

export default withStyles(styles)(BigCarrousel);