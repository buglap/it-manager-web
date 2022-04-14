import React, { useEffect, useState } from 'react';
import { Dialog } from '@mui/material';
import useFormData from 'hooks/useFormData';
import { CREATE_DEVICES, DELETE_DEVICES, EDIT_DEVICES } from 'graphql/mutations/devices';
import { toast } from 'react-toastify';
import { ButtonLoading } from '@components/ButtonLoading';
import PrivateComponent from '@components/PrivateComponent';
import { matchRoles } from 'utils/matchRoles';
import { useMutation, useQuery } from '@apollo/client';
import { GET_DEVICES } from 'graphql/queries/devices';
import { GET_CHART_DATA } from 'graphql/queries/charts';
import dynamic from 'next/dynamic';
import FileUpload from '@components/FileUpload';
import { GET_DEVICESTYPES } from 'graphql/queries/deviceTypes';

export async function getServerSideProps(context) {
    return {
        props: { ...(await matchRoles(context)) },
    };
}

const ReactApexChart = dynamic(
    () => {
        return import('react-apexcharts');
    },
    { ssr: false }
);

const IndexDevices = () => {
    const { data, loading } = useQuery(GET_DEVICES, {
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
                <AvailableReport />
                <div className='self-end button-primary'>
                    <button type='button' onClick={() => setCreateDialog(true)}>
                        New Device
                    </button>
                </div>
            </PrivateComponent>
            <h2 className='my-4 text-3xl font-bold text-gray-800'>Device Managment</h2>
            <div className='hidden lg:block'>
                <table>
                    <thead>
                        <PrivateComponent roleList={['Admin']}>
                            <th>id Device</th>
                        </PrivateComponent>
                        <th>name</th>
                        <th>description</th>
                        <th>brand</th>
                        <th>available quantiry</th>
                        <th>invoice</th>
                        <th>device type</th>
                        <th>update date</th>
                        <th>Create date</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {data.getDevices.map((c) => (
                            <Device key={c.id} device={c} />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='block lg:hidden'>
                <DeviceResponsive device={data.getDevices} />
            </div>
            <Dialog open={openCreateDialog} onClose={closeDialog}>
                <CreateDevice device={undefined} closeDialog={closeDialog}></CreateDevice>
            </Dialog>
        </div>
    );
};

const DeviceResponsive = ({ device }) => (
    <div>
        {device.map((device) => (
            <DeviceResponisve key={device.id} device={device} />
        ))}
    </div>
);

const DeviceResponisve = ({ device }) => (
    <div className='bg-gray-200 flex flex-col my-4 p-4 rounded-lg shadow-lg'>
        <div className='flex flex-col'>
            <span className='text-purple-800' >name: </span>
            <span>{device.name}</span>
        </div>
        <div className='flex flex-col'>
            <span className='text-purple-800' >description: </span>
            <span>{device.description}</span>
        </div>
        <div className='flex flex-col'>
            <span className='text-purple-800' >brand:</span>
            <span>{device.brand}</span>
        </div>
        <div className='flex flex-col'>
            <span className='text-purple-800' >available quantiry:</span>
            <span>{device.availableQuantity}</span>
        </div>
        <div className='flex flex-col'>
            <span className='text-purple-800' >invoice:</span>
            <span>{device.invoice}</span>
        </div>
        <div className='flex flex-col'>
            <span className='text-purple-800' >device type:</span>
            <span>{device.deviceType}</span>
        </div>
        <div className='flex flex-col'>
            <span className='text-purple-800'>updated at:</span>
            <span>{device.updatedAt}</span>
        </div>
        <div className='flex flex-col'>
            <span className='text-purple-800'>create at:</span>
            <span>{device.createdAt}</span>
        </div>
        <div>
            <span className='text-purple-800'>Actions: </span>
            <EditDeleteButtons device={device} />
        </div>
    </div>
);

const Device = ({ device }) => (
    <tr>
        <PrivateComponent roleList={['Admin']}>
            <td>{device.id}</td>
        </PrivateComponent>
        <td>{device.name}</td>
        <td>{device.description}</td>
        <td>{device.brand}</td>
        <td>{device.availableQuantiry}</td>
        <td>{device.invoice}</td>
        <td>{device.deviceType}</td>
        <td>{device.updatedAt}</td>
        <td>{device.createdAt}</td>
        <PrivateComponent roleList={['Admin']}>
            <td>
                <EditDeleteButtons device={device} />
            </td>
        </PrivateComponent>
    </tr>
);

const EditDeleteButtons = ({ device }) => {
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
                <EditDevice device={device} closeDialog={closeDialog} />
            </Dialog>
            <Dialog open={openDeleteDialog} onClose={closeDialog}>
                <DeleteDevice device={device} closeDialog={closeDialog} />
            </Dialog>
        </div>
    );
};

const EditDevice = ({ device, closeDialog }) => {
    const { form, formData, updateFormData } = useFormData(null);
    const [updateDevice, { loading }] = useMutation(EDIT_DEVICES, {
        refetchQueries: [GET_DEVICES],
    });
    const [fileUrl, setFileUrl] = useState<string>(null);
    const successCallback = (e) => {
        console.log(e);
        setFileUrl(e.info.url);
    };
    const errorCallback = () => {
        toast.error('error uploading file');
    };
    const submitForm = async (e) => {
        e.preventDefault();
        await updateDevice({
            variables: {
                id: device.id,
                name: formData.name,
                decription: formData.description,
                brand: formData.brand,
                availableQuantiry: formData.availableQuantiry,
                deviceType: formData.deviceType,
                invoice: fileUrl,

            },
        });
        toast.success(`Device ${device.id} modificado exitosamente`);
        closeDialog();
    };
    return (
        <div className='p-10 flex flex-col items-center'>
            <h2 className='my-3 text-2xl font-extrabold text-gray-900'>
                Edit Device
            </h2>
            <form
                ref={form}
                onChange={updateFormData}
                onSubmit={submitForm}
                className='flex flex-col items-center'
            >
                <label htmlFor='name' className='flex flex-col'>
                    <span>name:</span>
                    <input name='name' type="text" defaultValue={device.name} />
                </label>
                <label htmlFor='description' className='flex flex-col'>
                    <span>description:</span>
                    <input name='description' type="text" defaultValue={device.description} />
                </label>
                <label htmlFor='brand' className='flex flex-col'>
                    <span>brand:</span>
                    <input name='brand' type="text" defaultValue={device.brand} />
                </label>
                <label htmlFor='availableQuantiry' className='flex flex-col'>
                    <span>available quantiry:</span>
                    <input name='availableQuantiry' type="number" defaultValue={device.availableQuantiry} />
                </label>
                <label htmlFor='deviceType' className='my-2'>
                    <span className='font-bold mx-2'>device Type:</span>
                    <select name='deviceType' required>
                        <option>Laptop</option>
                        <option>Mouse</option>
                        <option>Keyboard</option>
                        <option>Display</option>
                        <option>headband</option>
                        <option>Charger</option>
                        <option>Cell_phone</option>
                    </select>
                </label>

                <div className='my-4 w-full flex justify-center'>
                    <FileUpload
                        folder='device-invoice'
                        text='Unpload Invoice'
                        resourceType='raw'
                        successCallback={successCallback}
                        errorCallback={errorCallback}
                    />
                </div>
                <ButtonLoading isSubmit loading={loading} text='Edit Device' />
            </form>
        </div>
    );
};

const CreateDevice = ({ device, closeDialog }) => {
    const { form, formData, updateFormData } = useFormData(null);
    const [createDevice, { loading }] = useMutation(CREATE_DEVICES, {
        refetchQueries: [GET_DEVICES],
    });
    const [fileUrl, setFileUrl] = useState<string>(null);
    const successCallback = (e) => {
        console.log(e);
        setFileUrl(e.info.url);
    };
    const errorCallback = () => {
        toast.error('error uploading file');
    };
    const { data } = useQuery(GET_DEVICESTYPES, {
        fetchPolicy: 'cache-and-network',
    });
    const submitForm = async (e) => {
        e.preventDefault();
        await createDevice({
            variables: {
                name: formData.name,
                decription: formData.description,
                brand: formData.brand,
                availableQuantiry: formData.availableQuantiry,
                deviceType: formData.deviceType,
                invoice: fileUrl,
            },
        });
        toast.success(`Device successfully created`);
        closeDialog();
    };
    return (
        <div className='p-10 flex flex-col items-center'>
            <h2 className='my-3 text-2xl font-extrabold text-gray-900'>
                Edit Device
            </h2>
            <form
                ref={form}
                onChange={updateFormData}
                onSubmit={submitForm}
                className='flex flex-col items-center'
            >
                <label htmlFor='name' className='flex flex-col'>
                    <span>name:</span>
                    <input name='name' type="text" />
                </label>
                <label htmlFor='description' className='flex flex-col'>
                    <span>description:</span>
                    <input name='description' type="text" />
                </label>
                <label htmlFor='brand' className='flex flex-col'>
                    <span>brand:</span>
                    <input name='brand' type="text" />
                </label>
                <label htmlFor='availableQuantiry' className='flex flex-col'>
                    <span>available quantiry:</span>
                    <input name='availableQuantiry' type="number" />
                </label>
                <label htmlFor='deviceType' className='my-2'>
                    <span className='font-bold mx-2'>device Type:</span>
                    <select name='deviceType' required>
                        <option>Laptop</option>
                        <option>Mouse</option>
                        <option>Keyboard</option>
                        <option>Display</option>
                        <option>headband</option>
                        <option>Charger</option>
                        <option>Cell_phone</option>
                    </select>
                </label>

                <div className='my-4 w-full flex justify-center'>
                    <FileUpload
                        folder='device-invoice'
                        text='Unpload Invoice'
                        resourceType='raw'
                        successCallback={successCallback}
                        errorCallback={errorCallback}
                    />
                </div>
                <ButtonLoading isSubmit loading={loading} text='Create Device' />
            </form>
        </div>
    );
};

const DeleteDevice = ({ device, closeDialog }) => {
    const [deleteDevice, { loading }] = useMutation(DELETE_DEVICES, {
        refetchQueries: [GET_DEVICES],
    });
    const cancel = () => {
        closeDialog();
    };
    const deleteFunction = async () => {
        await deleteDevice({
            variables: {
                id: device.id,
            },
        });
        toast.success('Device successfully deleted');
        closeDialog();
    };
    return (
        <div className='p-10 flex flex-col items-center'>
            <h2 className='text-2xl text-gray-900 font-extrabold my-3'>
                Delete Device
            </h2>
            <span className='text-red-500 font-bold my-2'>
                This action can not be undone.
            </span>
            <span className='my-2'>
                Are you sure you want to remove the device?
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

const AvailableReport = () => {
    const { data, loading } = useQuery(GET_CHART_DATA);

    const options = {
        xaxis: {
            categories: ["available", "assigned"],
        },
    };

    const [series, setSeries] = useState([]);

    useEffect(() => {
        if (data) {
            setSeries(data.getChartData.series);

        }
    }, [data]);

    if (loading) return <div>Loading...</div>;
    return (
        <div className='w-full flex flex-col items-center'>
            <h1>available vs assigned</h1>
            <div className='w-full'>
                <ReactApexChart
                    options={options}
                    series={series}
                    type='bar'
                    height={350}
                />
            </div>
        </div>
    );
};

export default IndexDevices;