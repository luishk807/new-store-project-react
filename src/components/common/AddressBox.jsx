import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button
} from '@material-ui/core';
import Typography from './Typography';

const styles = (theme) => ({
  root: {
    border: '1px solid #ccc',
    padding: 25,
    margin: 10,
    [theme.breakpoints.down('sm')]: {
      margin: '10px auto',
    }
  },
  addressContainer: {

  },
  content: {
    padding: 0.5,
    textAlign: 'left'
  },
  title: {
    fontWeight: 'bold'
  },
  btnCont: {
    justifyContent: 'space-between'
  }
});

const AddressBox = ({classes, data, onClickEdit, onClickRemove}) => {
    return (
      <div className={classes.root}>
        <Grid container className={classes.addressContainer} spacing={2}>
          <Grid item lg={12} className={classes.title}>{data.name}</Grid>
          <Grid item lg={12} className={classes.content}>{data.address}</Grid>
          <Grid item lg={12} className={classes.content}>{`${data.province}, ${data.township} ${data.zip}`}</Grid>
          <Grid item lg={12} className={classes.content}>{data.addressCountry.nicename}</Grid>
          <Grid item lg={12} className={classes.content}>Phone: {data.phone}</Grid>
          <Grid item lg={12} className={classes.content}>Mobile: {data.mobile}</Grid>
          <Grid item lg={12} xs={12}>
            <Grid container className={classes.btnCont}>
             <Grid item lg={5} xs={5}>
                <Button className={`mainButton`} onClick={ () => onClickEdit(data.id)}>
                  <Typography>Edit</Typography>
                </Button>
              </Grid>
              <Grid item lg={5} xs={5}>
                <Button className={`mainButton`} onClick={ () => onClickRemove(data.id)}>
                    <Typography>Remove</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
}
AddressBox.protoTypes = {
  classes: T.object,
  data: T.object,
  onClickEdit: T.func,
  onClickRemove: T.func,
} 
export default withStyles(styles)(AddressBox);