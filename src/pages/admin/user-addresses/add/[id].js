import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
  Grid,
  Button
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '@/constants/admin';
import AddForm from '@/common/Form/AddForm';
import { defaultCountry } from 'config';
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
   const router = useRouter()
   console.log("router", router.query)
   const id = router.query.id;

  const form = {
    name: null,
    phone: null,
    mobile: null,
    address: null,
    addressB: null,
    province: null,
    district: null,
    corregimiento: null,
    zone: null,
    country: defaultCountry
  }

  const ignoreEntry = ['mobile','phone', 'province', 'district', 'corregimiento', 'addressB', 'zone', 'country']

  return (
    <AdminLayoutTemplate>
      <Grid container>
        <Grid item lg={12}>
          <AddForm 
            customUrl={`/admin/user-addresses/${id}`} 
            cancelUrl={`/admin/user-addresses/${id}`} 
            successUrl={`/admin/user-addresses/${id}`} 
            ignoreForm={ignoreEntry}
            adminSection={ADMIN_SECTIONS.userAddress} 
            id={id} 
            entryForm={form} />
        </Grid>
      </Grid>
    </AdminLayoutTemplate>
  );
}

Add.protoTypes = {
  classes: T.object
}

/** this section is important for dynamic path, you must set all posible params */
export async function getStaticPaths(params) {
  const paths_t = [
    { 
      params: { 
        id: `${params.id}` 
      } 
    },
  ];

  return {
      paths: paths_t,
      fallback: true
  }
}

/** This section is mandatory for next-18next translation to work */
export async function getStaticProps({locale, params}) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const post = params.id

  return {
    props: {
      posts: [{id: post}],
      ...await serverSideTranslations(locale, ['forms']),
    }
  }
}

export default withStyles(styles)(Add);




