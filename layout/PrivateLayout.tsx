import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn, useSession } from 'next-auth/react';
import NotAuthorized from '@components/NoAuthorized';
import Navbar from '@components/Navbar';

const PrivateLayout = ({ pageAuth, children }: any) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Loading />;
  }

  if (!session) {
    signIn('auth0');
    return <Loading />;
  }

  if (!pageAuth) {
    return <NotAuthorized />;
  }

  return (
    <div>
      <Navbar/>
      {children}
      <ToastContainer />
    </div>
  );
};

const Loading = () => {
  return <div>Loading...</div>;
};

export default PrivateLayout;
