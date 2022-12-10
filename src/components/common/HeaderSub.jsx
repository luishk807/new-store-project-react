import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';
import pluralize from 'pluralize';
import Icons from '@/common/Icons';

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

const HeaderSub = ({ classes, name, previousUrl, addUrl, parent = null, disableAddButton }) => {
  const [urlName, setUrlName] = useState(name);
  const [title, setTitle] = useState(name);

  useEffect(() => {
    if (name.includes('-')) {
      let new_name = name.replace(/-/g, " ");
      if (parent && parent.first_name) {
        setTitle(`${new_name} for ${parent.first_name}`)
      } else {
        setTitle(new_name);
      }
    } else {
      if (parent && parent.first_name) {
        setTitle(`${name} for ${parent.first_name}`)
      } else {
        setTitle(name);
      }
    }
    const pName = pluralize.plural(name);
    setUrlName(pName)
  }, []);

  return (
    <Grid container className={classes.headerContainer}>
      <Grid item className={classes.headerTitle} lg={10} xs={7}>
        <h3><Button href={previousUrl ? previousUrl : `/admin/home`}><Icons classes={{icon: classes.icon}} name="backArrow" /></Button>&nbsp; {title}</h3>
      </Grid>
      {!disableAddButton &&
      <Grid item className={classes.headerTitle} lg={2} xs={5}>
        {
          parent ? (
            <Button className={`mainButton`} href={addUrl ? addUrl : `/admin/${urlName}/add/${parent?.id}`}>Add {title}</Button>
          ) : (
            <Button className={`mainButton`} href={addUrl ? addUrl : `/admin/${urlName}/add`}>Add {title}</Button>
          )
        }
      </Grid>
      }
    </Grid>
  );
}

HeaderSub.propTypes = {
  classes: T.object,
  name: T.string,
  previousUrl: T.string,
  addUrl: T.string,
  parent: T.object,
  disableAddButton: T.bool
}

HeaderSub.defaultProps = {
  disableAddButton: false
}

export default withStyles(styles)(HeaderSub);