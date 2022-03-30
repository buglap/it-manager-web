import React, { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { matchRoles } from 'utils/matchRoles';
import { Dialog } from '@mui/material';
import useFormData from 'hooks/useFormData';
import { ButtonLoading } from '@components/ButtonLoading';
import { nanoid } from 'nanoid';
import { CREATE_USER_ACCOUNT } from 'graphql/mutations/user';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

export async function getServerSideProps(context) {
  var axios = require("axios").default;
  var options = {
    method: 'POST',
    url:'https://it-manager-web.us.auth0.com/oauth/token',
    data: {
      grant_type: 'client_credentials',
      client_id: process.env.MACHINE_CLIENT_ID,
      client_secret: process.env.MACHINE_CLIENT_SECRET,
      audience: 'https://it-manager-web.us.auth0.com/api/v2/',
    },
  };
  const TokenResponse = await axios.request(options);
  const token = TokenResponse.data.access_token;
  return {
    props: { token, ...(await matchRoles(context)) },
  };
}

const Index = ({ token }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const closeDialog = () => {
    setOpenDialog(false);
  };
  return (
    <div>
      <h1>Users</h1>
      <button
        onClick={() => setOpenDialog(true)}
        type='button'
        className='button-primary'
      >
        Crear nuevo usuario
      </button>
      <Dialog open={openDialog} onClose={closeDialog}>
        <CreateUserDialog closeDialog={closeDialog} token={token} />
      </Dialog>
    </div>
  );
};

const CreateUserDialog = ({ closeDialog, token }) => {
  const { form, formData, updateFormData } = useFormData(null);
  const [createUser, { loading }] = useMutation(CREATE_USER_ACCOUNT);

  const submitForm = async (e) => {
    e.preventDefault();
    const password = nanoid();
    const options: AxiosRequestConfig = {
      method: 'POST',
      url: 'https://it-manager-web.us.auth0.com/api/v2/users',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        email: formData.email,
        password: `${password}*`,
        connection: 'Username-Password-Authentication',
      },
    };
    try {
      const userCreateResponse = await axios.request(options);
      await createUser({
        variables: {
          data: {
            email: userCreateResponse.data.email,
            name: userCreateResponse.data.name,
            image: userCreateResponse.data.picture,
            auth0Id: userCreateResponse.data.user_id,
            role: formData.role,
          },
        },
      });
      toast.success(`User created with the password ${password}`, {
        autoClose: false,
      });
      closeDialog();
    } catch (error) {
      toast.error('Error creating an user');
      closeDialog();
    }
  };

  return (
    <div className='p-5 flex flex-col items-center'>
      <h1>Crear nuevo usuario</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col items-start'
      >
        <label htmlFor='email'>
          <span className='font-bold mx-2'>Email:</span>
          <input
            name='email'
            placeholder='test@evilcorp.com'
            required
            type='email'
          />
        </label>
        <label htmlFor='role' className='my-2'>
          <span className='font-bold mx-2'>Rol:</span>
          <select name='role' required>
            <option disabled selected>
              Set a role
            </option>
            <option>Admin</option>
            <option>Employee</option>
          </select>
        </label>
        <div className='w-full flex justify-center'>
          <ButtonLoading isSubmit text='Create User' loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default Index;