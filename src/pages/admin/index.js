import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import Login from '@/common/Form/Admin/Login';
import { verifyAuth } from '@/api/auth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const styles = (theme) => ({});

const Index = ({classes}) => {
  const router = useRouter();
  useEffect(() => {
    if (verifyAuth()) {
      window.location.href ="/admin/home";
    }
  }, [])

  return (
    <Login/>
  );
}

Index.protoTypes = {
  classes: T.object
}

/** This section is mandatory for next-18next translation to work */
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['forms', 'common', 'footer']),
  },
})

export default withStyles(styles)(Index);