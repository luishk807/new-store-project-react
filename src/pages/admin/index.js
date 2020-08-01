import React from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  FormControl,
  InputLabel, 
  Input, 
  FormHelperText,
  Button,  
} from '@material-ui/core';

import Typography from '../../components/common/Typography';

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
    height: '100%',
  },
  formItems: {
    marginTop: 50,
    width: '50%%',
    '& div': {
      width: '100%',
    }
  },
});

const Index = ({classes}) => {
  return (
    <div className={classes.root}>
      <form noValidate autoComplete="off">
      <Grid container spacing={2} className={classes.formItems}>
        <Grid item lg={12} xs={12}>
          <img src={`/images/logo.png`} className='img-fluid' />
        </Grid>
        <Grid item lg={12} xs={12}>
            <Typography align="center" variant="h3" component="h3">Admin Login</Typography>
        </Grid>
        <Grid item lg={12} xs={12} item>
          <FormControl>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input id="email" aria-describedby="email-label" />
            <FormHelperText id="email-label">Type your email</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item lg={12} xs={12} item>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input type="password" id="password" aria-describedby="password-label" />
            <FormHelperText id="password-label">Type your password.</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item lg={12} xs={12} item>
          <Button className={`mainButton`}>Login</Button>
        </Grid>
      </Grid>
      </form>
    </div>
  );
}

Index.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Index) ;