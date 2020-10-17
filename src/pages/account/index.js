import React from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import {
  withStyles,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Link,
  Grid,
  makeStyles,
} from '@material-ui/core';

import Typography from '../../components/common/Typography';
import LayoutTemplate from '../../components/common/Layout/LayoutTemplate';
import { 
  SettingSample,
} from '../../constants/samples/SettingSample';
import { USER_ACCOUNT_SECTIONS } from '../../constants/user'
import CardIcon from '../../components/common/CardIcon';
import Icons from '../../components/common/Icons';
import PrivatePage from '../../components/common/Form/Users/PrivatePage';
import { logout } from '../../api/auth';

const styles = (theme) => ({
  root: {
    padding: 5,
  },
  smallLink: {
    fontSize: '.6em',
  },
});

const Settings = ({classes, userInfo}) => {
  const router = useRouter();
  const data = userInfo;
  const onLogOut = () => {
    if (logout()) {
      router.push('/')
    }
  }
  return (
    <PrivatePage>
      <LayoutTemplate>
        <div className={classes.root}>
          <Typography align="left" variant="h4" component="h3">Your Account <Link onClick={onLogOut} href="#" className={classes.smallLink}>[Log out]</Link></Typography>
          <Grid container spacing={2}>
          {
            USER_ACCOUNT_SECTIONS.map((button, index) => {
              return (
                <Grid key={index} item lg={3}>
                  <CardIcon link={`/account/${button.url}`} title={button.label}>
                    <Icons name={button.name} />
                  </CardIcon>
                </Grid>
              )
            })
          }
          </Grid>
        </div>
      </LayoutTemplate>
    </PrivatePage>
  );
}
 
Settings.protoTypes = {
  classes: T.object,
}

const mapStateToProps = state => ({
  userInfo: state.user
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(Settings));