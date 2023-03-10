import {
  withStyles,
  Grid,
  Hidden,
} from '@material-ui/core';
import * as T from 'prop-types';
import AdminOrderSearch from '@/common/SearchBar/AdminOrderSearch';
import { ORDER_STATUS } from '@/constants/orders';
import Dropdown from '@/common/dropdown/Simple';

const styles = (theme) => ({
  root: {
    width: '100%'
  },
  headerTitle: {
    padding: 20,
    display: 'flex',
    justifyContent: 'start'
  },
  headerAction: {
    padding: 20,
    display: 'flex',
    justifyContent: 'end',
    [theme.breakpoints.down('sm')]: {
      padding: '20px 5px 20px 20px'
    }
  },
});

const AdminOrderSearchBar = ({
  classes,
  onDropDownChange,
  onButtonClick,
}) => {

  return (
    <div className={classes.root}>
      <Grid container>
        <Hidden smUp>
          <Grid lg={2} xs={6} md={2} item className={classes.headerAction}>
            <Dropdown 
                options={ORDER_STATUS} 
                align="right"
                onSelect={onDropDownChange} 
                iconType="filter" 
              />
          </Grid>
        </Hidden>
        <Grid lg={10} xs={12} md={10} item className={classes.headerTitle}>
          <AdminOrderSearch onClick={onButtonClick} placeholder="Type search" />
        </Grid>
      </Grid>
    </div>
  )
}

AdminOrderSearchBar.propTypes = {
  classes: T.object,
  onDropDownChange: T.func,
  onButtonClick: T.func,
}

export default withStyles(styles)(AdminOrderSearchBar);