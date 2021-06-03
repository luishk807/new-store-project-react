import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Link,
} from '@material-ui/core';
import Typography from './Typography';

const styles = (theme) => ({
  root: {
    padding: 5,
    margin:5,
  },
  img: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
  },
  TypoRoot: {},
  link: {
    color: 'inherit',
  }
});

const CardIcon = ({classes, title, children, link="/"}) => {
    return (
      <Card className={`${classes.root} cardRoot`} variant="outlined">
        <CardActionArea>
          <Link href={link} className={`${classes.link} cardLink`}>
            <CardMedia className={`${classes.img} cardMediaCont`}>
              {children}
            </CardMedia>
            <CardContent>
              <Typography className={classes.TypoRoot} align="center" variant="h5" component="h5">{title}</Typography>
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