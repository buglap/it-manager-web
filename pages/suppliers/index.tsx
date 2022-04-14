import React, { useState } from 'react';
import { GET_SUPPLIERS } from 'graphql/queries/suppliers';
import Link from 'next/link';
import { Dialog } from '@mui/material';
import useFormData from 'hooks/useFormData';
import { CREATE_SUPPLIER, DELETE_SUPPLIER, EDIT_SUPPLIER } from 'graphql/mutations/suppliers';
import { toast } from 'react-toastify';
import { ButtonLoading } from '@components/ButtonLoading';
import PrivateComponent from '@components/PrivateComponent';
import { matchRoles } from 'utils/matchRoles';
import { useMutation, useQuery } from '@apollo/client';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const IndexSuppliers = () => {
  const { data, loading } = useQuery(GET_SUPPLIERS, {
    fetchPolicy: 'cache-and-network',
  });
  const [openCreateDialog, setCreateDialog] = useState(false);
  const closeDialog = () => {
    setCreateDialog(false);
  };

  if (loading) return <div>Loading....</div>;

  return (
    <div className='flex flex-col items-center p-10'>
      <PrivateComponent roleList={['Admin']}>
        <div className='self-end button-primary'>
          <button type='button' onClick={() => setCreateDialog(true)}>
            New Supplier
          </button>
        </div>
      </PrivateComponent>
      <h2 className='my-4 text-3xl font-bold text-gray-800'>Supplier Managment</h2>
      <div className='hidden lg:block'>
        <table>
          <thead>
            <PrivateComponent roleList={['Admin']}>
              <th>id Supplier</th>
            </PrivateComponent>
            <th>nit</th>
            <th>name</th>
            <th>email</th>
            <th>phone</th>
            <th>update date</th>
            <th>Create date</th>
            <PrivateComponent roleList={['Admin']}>
              <th>Actions</th>
            </PrivateComponent>
          </thead>
          <tbody>
            {data.getSuppliers.map((c) => (
              <Supplier key={c.id} supplier={c} />
            ))}
          </tbody>
        </table>
      </div>
      <div className='block lg:hidden'>
        <SupplierResponsive supplier={data.getSuppliers} />
      </div>
      <Dialog open={openCreateDialog} onClose={closeDialog}>
        <CreateSupplier supplier={undefined} closeDialog={closeDialog}></CreateSupplier>
      </Dialog>
    </div>
  );
};

const SupplierResponsive = ({ supplier }) => (
  <div>
    {supplier.map((supplier) => (
      <SupplierResponisve key={supplier.id} supplier={supplier} />
    ))}
  </div>
);

const SupplierResponisve = ({ supplier }) => (
  <div className='bg-gray-200 flex flex-col my-4 p-4 rounded-lg shadow-lg'>
    <div className='flex flex-col'>
      <span className='text-purple-800'>nit:</span>
      <span>{supplier.nit}</span>
    </div>
    <div className='flex flex-col'>
      <span className='text-purple-800' >name:</span>
      <span>{supplier.name}</span>
    </div>
    <div className='flex flex-col'>
      <span className='text-purple-800' >email:</span>
      <span>{supplier.email}</span>
    </div>
    <div className='flex flex-col'>
      <span className='text-purple-800' >phone:</span>
      <span>{supplier.phone}</span>
    </div>
    <div className='flex flex-col'>
      <span className='text-purple-800'>updated at:</span>
      <span>{supplier.updatedAt}</span>
    </div>
    <div className='flex flex-col'>
      <span className='text-purple-800'>create at:</span>
      <span>{supplier.createdAt}</span>
    </div>
    <div>
      <span className='text-purple-800'>Actions: </span>
      <EditDeleteButtons supplier={supplier} />
    </div>
  </div>
);

const Supplier = ({ supplier }) => (
  <tr>
    <PrivateComponent roleList={['Admin']}>
      <td>{supplier.id}</td>
    </PrivateComponent>
    <td>{supplier.nit}</td>
    <td>{supplier.name}</td>
    <td>{supplier.email}</td>
    <td>{supplier.phone}</td>
    <td>{supplier.updatedAt}</td>
    <td>{supplier.createdAt}</td>
    <PrivateComponent roleList={['Admin']}>
      <td>
        <EditDeleteButtons supplier={supplier} />
      </td>
    </PrivateComponent>
  </tr>
);

const EditDeleteButtons = ({ supplier }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const closeDialog = () => {
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
  };
  return (
    <div>
      <div className='flex w-full justify-center'>
        <button className='mx-4 text-yellow-500 hover:text-yellow-700 cursor-pointer'
          type='button'
          onClick={() => {
            setOpenEditDialog(true);
          }}
        >
          Edit
        </button>
        <button className='mx-4  text-red-500 hover:text-red-700 cursor-pointer' type='button' onClick={() => setOpenDeleteDialog(true)}>
          Delete
        </button>
      </div>
      <Dialog open={openEditDialog} onClose={closeDialog}>
        <EditSupplier supplier={supplier} closeDialog={closeDialog} />
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={closeDialog}>
        <DeleteSupplier supplier={supplier} closeDialog={closeDialog} />
      </Dialog>
    </div>
  );
};

const EditSupplier = ({ supplier, closeDialog }) => {
  const { form, formData, updateFormData } = useFormData(null);
  const [updateSupplier, { loading }] = useMutation(EDIT_SUPPLIER, {
    refetchQueries: [GET_SUPPLIERS],
  });
  const submitForm = async (e) => {
    e.preventDefault();
    await updateSupplier({
      variables: {
        updateSupplierId: supplier.id,
        nit: formData.nit,
        name: formData.name,
        phone: formData.phone,
        email: formData.email
      },
    });
    toast.success(`Supplier ${supplier.id} modificado exitosamente`);
    closeDialog();
  };
  return (
    <div className='p-10 flex flex-col items-center'>
      <h2 className='my-3 text-2xl font-extrabold text-gray-900'>
        Edit Supplier
      </h2>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col items-center'
      >
        <label htmlFor='nit' className='flex flex-col'>
          <span>nit:</span>
          <input name='nit' type="number" defaultValue={supplier.nit} />
        </label>
        <label htmlFor='name' className='flex flex-col'>
          <span>name:</span>
          <input name='name' type="text" defaultValue={supplier.name} />
        </label>
        <label htmlFor='email' className='flex flex-col'>
          <span>email:</span>
          <input name='email' type="email" defaultValue={supplier.email} />
        </label>
        <label htmlFor='phone' className='flex flex-col'>
          <span>phone:</span>
          <input name='phone' type="number" defaultValue={supplier.phone} />
        </label>
        <ButtonLoading isSubmit loading={loading} text='Edit Supplier' />
      </form>
    </div>
  );
};

const CreateSupplier = ({ supplier, closeDialog }) => {
  const { form, formData, updateFormData } = useFormData(null);
  const [createSupplier, { loading }] = useMutation(CREATE_SUPPLIER, {
    refetchQueries: [GET_SUPPLIERS],
  });
  const submitForm = async (e) => {
    e.preventDefault();
    await createSupplier({
      variables: {
        nit: formData.nit,
        name: formData.name,
        phone: formData.phone,
        email: formData.email
      },
    });
    toast.success(`Supplier successfully created`);
    closeDialog();
  };
  return (
    <div className='p-10 flex flex-col items-center'>
      <h2 className='my-3 text-2xl font-extrabold text-gray-900'>
        Create Supplier
      </h2>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col items-center'
      >
        <label htmlFor='nit' className='flex flex-col'>
          <span>nit:</span>
          <input name='nit' type="number" />
        </label>
        <label htmlFor='name' className='flex flex-col'>
          <span>name:</span>
          <input name='name' type="text" />
        </label>
        <label htmlFor='email' className='flex flex-col'>
          <span>email:</span>
          <input name='email' type="email" />
        </label>
        <label htmlFor='phone' className='flex flex-col'>
          <span>phone:</span>
          <input name='phone' type="number" />
        </label>
        <ButtonLoading isSubmit loading={loading} text='Create Supplier' />
      </form>
    </div>
  );
};

const DeleteSupplier = ({ supplier, closeDialog }) => {
  const [deleteSupplier, { loading }] = useMutation(DELETE_SUPPLIER, {
    refetchQueries: [GET_SUPPLIERS],
  });
  const cancel = () => {
    closeDialog();
  };
  const deleteFunction = async () => {
    await deleteSupplier({
      variables: {
        id: supplier.id,
      },
    });
    toast.success('Supplier successfully deleted');
    closeDialog();
  };
  return (
    <div className='p-10 flex flex-col items-center'>
      <h2 className='text-2xl text-gray-900 font-extrabold my-3'>
        Delete Supplier
      </h2>
      <span className='text-red-500 font-bold my-2'>
        This action can not be undone.
      </span>
      <span className='my-2'>
        Are you sure you want to remove the supplier?
      </span>
      <div className='flex my-2'>
        <ButtonLoading
          isSubmit={false}
          onClick={deleteFunction}
          loading={loading}
          text='Confirm'
        />
        <button
          type='button'
          className='button-secondary mx-2'
          onClick={cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default IndexSuppliers;