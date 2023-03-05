import React from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';

import LayoutTemplate from '@/common/Layout/LayoutTemplate';
import SendForm from '@/common/Form/SendForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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
          captchaEnabled={true}
        />
      </div>
    </LayoutTemplate>
  );
}

ContactUs.protoTypes = {
  classes: T.object,
}

/** This section is mandatory for next-18next translation to work, only inside /pages */
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['footer', 'common']),
  },
})

export default withStyles(styles)(ContactUs);