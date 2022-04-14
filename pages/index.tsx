import { useMutation, useQuery } from '@apollo/client';
import FileUpload from '@components/FileUpload';
import { UPDATE_PROFILE_IMAGE } from 'graphql/mutations/profile';
import { GET_USER_PROFILE } from 'graphql/queries/users';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import { toast } from 'react-toastify';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Profile = () => {
  const { data: session }: any = useSession();

  const { data: userData, loading } = useQuery(GET_USER_PROFILE, {
    variables: {
      email: session.user.email,
    },
  });

  const [updateImage] = useMutation(UPDATE_PROFILE_IMAGE, {
    refetchQueries: [GET_USER_PROFILE],
  });

  const successCallback = async (e) => {
    await updateImage({
      variables: {
        user: userData.getUser.id,
        image: e.info.url,
      },
    });
    toast.success('Image updated successfully');
  };

  const errorCallback = () => {
    toast.error('error uploading file');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className='w-full flex flex-col items-center p-10'>
      <h1 className='text-2xl font-bold text-gray-900 my-4'>User Profile</h1>
      <Image
        src={userData.getUser.profile?.image ?? userData.getUser.image}
        alt='User Profile'
        height={120}
        width={120}
        className='rounded-full'
      />
      <div className='my-2'>
        <FileUpload
          errorCallback={errorCallback}
          successCallback={successCallback}
          folder='profile-images'
          resourceType='image'
          text='Change Image'
        />
      </div>

      <button className='button-primary' type='button' onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
};

export default Profile;
