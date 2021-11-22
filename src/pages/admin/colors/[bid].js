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
    color: null,
    status: null,
  }

  return (
    <AdminLayoutTemplate>
      <EditForm 
        adminSection={ADMIN_SECTIONS.color} 
        customUrl={`/admin/${ADMIN_SECTIONS.color.url}`} 
        cancelUrl={`/admin/${ADMIN_SECTIONS.color.url}`} 
        successUrl={`/admin/${ADMIN_SECTIONS.color.url}`} 
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