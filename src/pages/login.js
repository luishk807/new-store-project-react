import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Login from '../components/common/Form/Users/Login';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    console.log(router)
    console.log('lol')
  }, []);

  const handleCancel = () => {
    router.back();
  }

  return (
    <Login showRegister={true} onCancel={handleCancel}/>
  );
}

/** This section is mandatory for next-18next translation to work */
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['forms', 'common', 'footer']),
  },
})
 
export default LoginPage;