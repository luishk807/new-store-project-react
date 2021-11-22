import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
} from '@material-ui/core';

import LayoutTemplate from '@/common/Layout/LayoutTemplate';
import SendForm from '@/common/Form/SendForm';

const styles = (theme) => ({
  root: {
    width: '100%',
    padding: 8,
    display: 'flex',
    alignItems: 'center',
    margin: '0px auto',
  },
})

const ContactUs = ({classes}) => {
  const section = {
    name: 'Contact Us',
    url: 'contacts'
  }
  const form = {
    first_name: null,
    last_name: null,
    subject: null,
    email: null,
    message: null,
  }

  return (
    <LayoutTemplate>
      <div className={classes.root}>
        <SendForm 
          formSection={section} 
          entryForm={form} 
          type="email"
          showCancel={false}
        />
      </div>
    </LayoutTemplate>
  );
}

ContactUs.protoTypes = {
  classes: T.object,
}

export default withStyles(styles)(ContactUs);