import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '../../constants/admin';
import EditForm from '../../components/common/Form/EditForm';
import AdminLayoutTemplate from '../../components/common/Layout/AdminLayoutTemplate';
import { decodeCookie } from '../../utils/cookie';
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
    width: '60%',
    margin: '0px auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
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
    date_of_birth: null,
    mobile: null,
    status: null,
    userRole: null,
    image: {
      values: [],
      open: false,
    }
  }
  
  const ignoreEntry=['image', 'mobile', 'password']

  useEffect(()=>{
    const decode = decodeCookie();
    if (decode) {
      setUser(decode.id);
    }
  }, [])
  return (
    <AdminLayoutTemplate>
      <EditForm classes={{root: classes.formRoot}} showTitle={false} adminSection={ADMIN_SECTIONS.user} ignoreForm={ignoreEntry} id={user} entryForm={form} />
    </AdminLayoutTemplate>
  );
}

Settings.protoTypes = {
  classes: T.object
}

const mapStateToProps = state => ({
  userInfo: state.user
}) // add reducer access to props

/** This section is mandatory for next-18next translation to work */
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['forms', 'footer']),
  },
})

export default connect(mapStateToProps)(withStyles(styles)(Settings));