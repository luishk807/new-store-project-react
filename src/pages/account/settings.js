import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { 
  withStyles,
} from '@material-ui/core';

import { USER_SECTIONS } from 'src/constants/user';
import EditForm from 'src/components/common/Form/EditForm';
import { decodeCookie } from 'src/utils/cookie';
import UserLayoutTemplate from 'src/components/common/Layout/UserLayoutTemplate';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
  },
  formRoot: {
    width: '50%',
    margin: '0px auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
});

const Settings = ({classes, userInfo}) => {
  const [user, setUser] = useState(null)
   const router = useRouter()
   const id = router.query.id;

  const form = {
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    phone: null,
    gender: null,
    mobile: null
  }
  
  const ignoreEntry=['image', 'mobile', 'password']

  useEffect(()=>{
    const decode = decodeCookie();
    if (decode) {
      setUser(decode.id);
    }
  }, [])
  return (
    <UserLayoutTemplate>
        <EditForm 
          allowDelete={false} 
          classes={{root: classes.formRoot}} 
          showTitle={false} 
          userSection={USER_SECTIONS.user} 
          ignoreForm={ignoreEntry} 
          id={user} 
          successUrl="/account"
          entryForm={form} />
    </UserLayoutTemplate>
  );
}

Settings.protoTypes = {
  classes: T.object
}

const mapStateToProps = state => ({
  userInfo: state.user
}) // add reducer access to props

/** This section is mandatory for next-18next translation to work, only inside /pages */
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'footer']),
  },
})

export default connect(mapStateToProps)(withStyles(styles)(Settings));