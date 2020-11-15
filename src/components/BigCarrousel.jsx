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
    width: '80%'
  }
});

const BigCarrousel = ({classes, image}) => {
  const imageUrl = `${process.env.IMAGE_URL}/slideImages`;
  const [images, setImages] = useState([]);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    const imgs = [
      {
        url: `${imageUrl}/sample.jpg`,
        description: "Probably the most random thing you have ever seen!"
      },
      // {
      //   url: `${imageUrl}/sample.jpg`,
      //   description: "Probably the most random thing you have ever seen!"
      // }
    ]
    setImages(imgs)
  }, []);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={12}>
            <Carousel
              className={classes.carrouselContainer}
              indicators={true}
              animation="slide"
              autoPlay={true}
              navButtonsAlwaysVisible={true}
              next={ (next, active) => console.log(`we left ${active}, and are now at ${next}`) }
              prev={ (prev, active) => console.log(`we left ${active}, and are now at ${prev}`) }
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