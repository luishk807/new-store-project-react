import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Login from '../components/common/Form/Users/Login';

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    console.log(router)
  }, []);

  const handleCancel = () => {
    router.back();
  }

  return (
    <Login showRegister={true} onCancel={handleCancel}/>
  );
}
 
export default LoginPage;