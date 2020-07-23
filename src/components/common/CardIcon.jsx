import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Link,
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

const CardIcon = ({classes, title, children, link="/"}) => {
    return (
      <Card className={`${classes.root} ${classes.cardHolder}`} variant="outlined">
        <CardActionArea>
          <Link href={link}>
            <CardMedia className={classes.img}>
              {children}
            </CardMedia>
            <CardContent>
              <Typography align="center" variant="h5" component="h5">{title}</Typography>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    )
}
CardIcon.protoTypes = {
  classes: T.object,
  title: T.string,
  children: T.node,
  link: T.string,
} 
export default withStyles(styles)(CardIcon);