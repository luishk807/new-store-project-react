import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '@/constants/admin';
import AdminLayoutTemplate from '@/common/Layout/AdminLayoutTemplate';
import AddForm from '@/common/Form/AddForm';
import { defaultCountry } from 'config';
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
});

const Add = ({classes}) => {
  const form = {
    name: null,
    user: null,
    email: null,
    position: null,
    address: null,
    email: null,
    mobile: null,
    phone: null,
    province: null,
    township: null,
    country: defaultCountry,
    image: {
      values: [],
      open: false,
    }
  }

  const ignoreEntry=['image', 'mobile']

  return (
    <AdminLayoutTemplate>
      <AddForm 
        adminSection={ADMIN_SECTIONS.vendor} 
        entryForm={form} 
        ignoreForm={ignoreEntry} 
        customUrl={`/admin/${ADMIN_SECTIONS.vendor.url}`} 
        cancelUrl={`/admin/${ADMIN_SECTIONS.vendor.url}`} 
        successUrl={`/admin/${ADMIN_SECTIONS.vendor.url}`} 
      />
    </AdminLayoutTemplate>
  );
}

Add.protoTypes = {
  classes: T.object
}

/** This section is mandatory for next-18next translation to work */
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['forms']),
  },
})

export default withStyles(styles)(Add);