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
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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
    width: 30,
    height: 30,
    fill: '#000',
  }
});

const Settings = ({classes, userInfo}) => {
  const router = useRouter();
  const { t } = useTranslation('account')
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
          { t('your_account') }&nbsp;
          <Link onClick={onLogOut} href="#" className={classes.smallLink}>
            <Icons name="logout"  classes={{icon: classes.icon}} />
          </Link>
        </Typography>
        <Grid container spacing={2}>
        {
          USER_ACCOUNT_SECTIONS.map((button, index) => {
            return (
              <Grid key={index} item lg={3} xs={12}>
                <CardIcon link={`/account/${button.url}`} title={ t(button.tKey) }>
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

/** This section is mandatory for next-18next translation to work, only inside /pages */
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['account', 'footer']),
  },
})

export default connect(mapStateToProps)(withStyles(styles)(Settings));