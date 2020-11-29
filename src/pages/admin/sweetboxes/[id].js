import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
  Button
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '../../../constants/admin';
import EditForm from '../../../components/common/Form/EditForm';
import Icons from '../../../components/common/Icons';
import Typography from '../../../components/common/Typography';
import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';

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
   const id = router.query.id;

  const form = {
    name: null,
    status: null,
    products: null,
  }
  const ignoreEntry=['products'];

  return (
    <AdminLayoutTemplate>
      <EditForm 
        ignoreForm={ignoreEntry} 
        adminSection={ADMIN_SECTIONS.sweetbox} 
        id={id} 
        entryForm={form} 
        customUrl={`/admin/${ADMIN_SECTIONS.sweetbox.url}`} 
      >
        {/* <Button href={`products/${id}`} className={`${classes.addButon} mainButton`}>
          Add Product
        </Button> */}
      </EditForm>
    </AdminLayoutTemplate>
  );
}

Edit.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Edit);