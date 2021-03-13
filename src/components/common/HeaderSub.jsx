import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';
import pluralize from 'pluralize';
import Icons from './Icons';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  headerTitle: {
    padding: 20,
    textTransform: 'capitalize'
  },
  icon: {
    width: 30,
    height: 30,
    fill: 'black'
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});

const HeaderSub = ({ classes, name }) => {
  const [urlName, setUrlName] = useState(name);

  useEffect(() => {
    const pName = pluralize.plural(name);
    setUrlName(pName)
  }, []);

  return (
    <Grid container className={classes.headerContainer}>
      <Grid item className={classes.headerTitle} lg={10} xs={7}>
        <h3><Button href='home'><Icons classes={{icon: classes.icon}} name="backArrow" /></Button>&nbsp; Admin</h3>
      </Grid>
      <Grid item className={classes.headerTitle} lg={2} xs={5}>
        <Button className={`mainButton`} href={`/admin/${urlName}/add`}>Add {name}</Button>
      </Grid>
    </Grid>
  );
}

HeaderSub.propTypes = {
  classes: T.object,
  name: T.string,
}

export default withStyles(styles)(HeaderSub);