import React from 'react';
import T from 'prop-types';
import {
  withStyles,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    padding: 5,
    margin:5,
  },
  cardHolder: {
    height: 300,
    width: '15%',
  },
  img: {
    height: 180,
    width: 180,
  },
});

const CardIcon = ({classes, data}) => {
    return (
      <Card className={`${classes.root} ${classes.cardHolder}`} variant="outlined">
        <CardActionArea>
          <CardMedia 
            className={classes.img}
            image={`/images/products/${data.image}`}
            title={data.name}
          />
          <CardContent>
            <Typography
              align="center"
            >
              {data.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
}
CardIcon.protoTypes = {
  classes: T.object,
  data: T.object,
} 
export default withStyles(styles)(CardIcon);