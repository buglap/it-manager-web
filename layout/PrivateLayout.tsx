import React from 'react';
import Footer from 'components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn, signOut, useSession } from 'next-auth/react';
import NotAuthorized from '@components/NoAuthorized';

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
      <button type='button' onClick={() => signOut()}>
        Cerrar Sesion
      </button>
      {children}
      <ToastContainer />
      <Footer />
    </div>
  );
};

const Loading = () => {
  return <div>Loading...</div>;
};

export default PrivateLayout;
