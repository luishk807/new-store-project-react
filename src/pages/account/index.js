import React from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import {
  withStyles,
  Link,
  Grid,
} from '@material-ui/core';

import Typography from '../../components/common/Typography';
import { USER_ACCOUNT_SECTIONS } from '../../constants/user'
import CardIcon from '../../components/common/CardIcon';
import Icons from '../../components/common/Icons';
import UserLayoutTemplate from '../../components/common/Layout/UserLayoutTemplate';
import { logout } from '../../api/auth';

const styles = (theme) => ({
  root: {
    padding: 5,
  },
  smallLink: {
    fontSize: '.6em',
  },
  accountTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    width: 37,
    height: 37,
    fill: '#000',
  }
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
    <UserLayoutTemplate>
      <div className={classes.root}>
        <Typography align="left" variant="h4" component="h3" className={classes.accountTitle}>
          Your Account&nbsp;
          <Link onClick={onLogOut} href="#" className={classes.smallLink}>
            <Icons name="logout"  classes={{icon: classes.icon}} />
          </Link>
        </Typography>
        <Grid container spacing={2}>
        {
          USER_ACCOUNT_SECTIONS.map((button, index) => {
            return (
              <Grid key={index} item lg={3} xs={12}>
                <CardIcon link={`/account/${button.url}`} title={button.label}>
                  <Icons name={button.name} />
                </CardIcon>
              </Grid>
            )
          })
        }
        </Grid>
      </div>
    </UserLayoutTemplate>
  );
}
 
Settings.protoTypes = {
  classes: T.object,
}

const mapStateToProps = state => ({
  userInfo: state.user
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(Settings));