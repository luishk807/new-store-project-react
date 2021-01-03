import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '../../../constants/admin';
import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';
import EditForm from '../../../components/common/Form/EditForm';


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
    status: null,
    bannerType: null,
    banner: [
      {
        url: '',
        open: false,
        values: [],
      }
    ]
  }

  const ignoreEntry=['banner']

  return (
    <AdminLayoutTemplate>
      <EditForm 
        ignoreForm={ignoreEntry} 
        fileLimit={true}
        adminSection={ADMIN_SECTIONS.banner} 
        customUrl={`/admin/${ADMIN_SECTIONS.banner.url}`} 
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