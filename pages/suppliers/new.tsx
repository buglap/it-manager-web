import React from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_SUPPLIER } from 'graphql/mutations/suppliers';
import { GET_SUPPLIERS } from 'graphql/queries/suppliers';
import useFormData from 'hooks/useFormData';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { ButtonLoading } from '@components/ButtonLoading';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const NewSupplier = () => {
  const router = useRouter();
  const { form, formData, updateFormData } = useFormData(null);
  const [createSupplier, { data, loading }] = useMutation(CREATE_SUPPLIER, {
    refetchQueries: [GET_SUPPLIERS],
  });

  const submitForm = async (e) => {
    e.preventDefault();

    await createSupplier({
      variables: {
        name: formData.name,
      },
    });
    toast.success('supplier successfully created');
    router.push('/suppliers');
  };

  return (
    <div className='flex flex-col items-center p-10'>
      {data && <div>data loaded</div>}
      <Link href='/clients' passHref>
        <i className='fas fa-arrow-left self-start' />
      </Link>
      <h2>Nuevo Cliente</h2>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col my-4'
      >
        <label className='flex flex-col' htmlFor='name'>
          <span>Nombre del Cliente</span>
          <input name='name' type='text' />
        </label>
        <ButtonLoading isSubmit loading={loading} text='Create Supplier' />
      </form>
    </div>
  );
};

export default NewSupplier;
