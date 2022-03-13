import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '@/constants/admin';
import AddForm from '@/common/Form/AddForm';
import AdminLayoutTemplate from '@/common/Layout/AdminLayoutTemplate';
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
    total: null,
    description: null
  }

  const ignoreEntry=['description', 'total'];

  return (
    <AdminLayoutTemplate>
      <AddForm 
        ignoreForm={ignoreEntry}
        adminSection={ADMIN_SECTIONS.deliveryOption} 
        entryForm={form}
        customUrl={`/admin/${ADMIN_SECTIONS.deliveryOption.url}`} 
        cancelUrl={`/admin/${ADMIN_SECTIONS.deliveryOption.url}`} 
        successUrl={`/admin/${ADMIN_SECTIONS.deliveryOption.url}`} 
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