import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '@/constants/admin';
import AdminLayoutTemplate from '@/common/Layout/AdminLayoutTemplate';
import EditForm from '@/common/Form/EditForm';


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

const Edit = ({classes}) => {
  const router = useRouter()
  const id = router.query.bid;

  const form = {
    name: null,
    promoCode: null,
    percentage: null,
    useDate: false,
    startDate: null,
    endDate: null,
  }

  const ignoreEntry=['image']

  return (
    <AdminLayoutTemplate>
      <EditForm 
        ignoreForm={ignoreEntry} 
        adminSection={ADMIN_SECTIONS.promotionCode} 
        customUrl={`/admin/${ADMIN_SECTIONS.promotionCode.url}`} 
        cancelUrl={`/admin/${ADMIN_SECTIONS.promotionCode.url}`} 
        successUrl={`/admin/${ADMIN_SECTIONS.promotionCode.url}`} 
        id={id} 
        entryForm={form} 
      />
    </AdminLayoutTemplate>
  );
}

Edit.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Edit);