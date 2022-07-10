import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '@/constants/admin';
import AddForm from '@/common/Form/AddForm';
import AdminLayoutTemplate from '@/common/Layout/AdminLayoutTemplate';
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
    deliveryService: null,
    amount: null,
    province: null,
    district: null,
    corregimiento: null,
    zone: null,
    country: defaultCountry,
  }

  const ignoreEntry=['zone', 'corregimiento']

  return (
    <AdminLayoutTemplate>
      <AddForm 
        adminSection={ADMIN_SECTIONS.deliveryServiceCost} 
        entryForm={form}
        ignoreForm={ignoreEntry} 
        customUrl={`/admin/${ADMIN_SECTIONS.deliveryServiceCost.url}`}  
        cancelUrl={`/admin/${ADMIN_SECTIONS.deliveryServiceCost.url}`} 
        successUrl={`/admin/${ADMIN_SECTIONS.deliveryServiceCost.url}`} 
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