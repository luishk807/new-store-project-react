
import { useCallback } from 'react';
import { getCatSearch } from 'src/utils';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';
import Icons from '@/common/Icons';
import { useRouter } from 'next/router';

const styles = () => ({
  root: {
    width: '100%'
  },
  cardBlockHolders: {
    '& span': {
      flexDirection: 'column'
    }
  },
  cubeItems: {},
  cubeIconHolder: {
    width: '100%',
  },
  cubeName: {
    width: '100%',
    color: 'white',
    fontSize: '.8em',
  },
  cubeIcon: {
    width: 50,
    height: 50,
    fill: 'white',
  },
});

const CategoryIcons = ({ classes, category, size }) => {
  const router = useRouter();
  const goToSearch = useCallback(async (data) => {
    const url = await getCatSearch(data);
    router.push(url)
  }, []);

  return (
    <Grid item lg={size ? Number(size) : 12} className={classes.cubeItems}>
      <Button onClick={() => goToSearch(category)} className={`cardRoot2 ${classes.cardBlockHolders}`}>
        <div className={classes.cubeIconHolder}>
          <Icons name={category.icon} classes={{ icon: classes.cubeIcon }} />
        </div>
        <div className={classes.cubeName}>
          {category.name}
        </div>
      </Button>
    </Grid>
  )
}

CategoryIcons.propTypes = {
  classes: T.object,
  category: T.object,
  size: T.string
}
export default withStyles(styles)(CategoryIcons);