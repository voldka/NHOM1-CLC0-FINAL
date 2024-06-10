import { DeleteOutlined, EditOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Image, Space, Tooltip, Upload, message } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import LtDynamicTable from '../../../core/components/lt-dynamic-table';
import LtFormInput from '../../../core/components/lt-form-input';
import LtFormModal from '../../../core/components/lt-form-modal';
import MaterialService from '../../../shared/services/material.service';
import { actions } from '../../../stores';
const Materials = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [materials, setMaterials] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [materialId, setMateiralId] = useState(null);

    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: { name: '' } });

    const getMaterials = async () => {
        try {
            dispatch(actions.showLoading());
            const materials = await MaterialService.getAll();
            setMaterials(materials);
        } catch (error) {
            messageApi.error(error?.response?.data?.message || error.message);
        } finally {
            dispatch(actions.hideLoading());
        }
    };

    const handleCloseModal = () => {
        revokeImageUrl();
        reset({ name: '' });
        setIsOpen(false);
        setIsUpdating(false);
        setImageFile(null);
        setMateiralId(null);
    };

    const revokeImageUrl = () => {
        if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
        }
        setImageFile(null);
        setImageUrl(null);
    };

    const handleUploadImageFile = ({ file }) => {
        const isImage = file.type.startsWith('image/');
        const isSizeValid = file.size / 1024 / 1024 < 10;
        if (!isImage) {
            return messageApi.warning('Chi cho phép upload hình ảnh');
        }
        if (!isSizeValid) {
            return messageApi.warning('Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 10MB.');
        }

        revokeImageUrl();
        const imageUrl = URL.createObjectURL(file);
        setImageFile(file);
        setImageUrl(imageUrl);
    };

    const openUpdateMaterialDialog = async (material) => {
        reset({
            name: material.name,
        });
        setImageUrl(material.imageUrl);
        setMateiralId(material._id);
        setIsUpdating(true);
        setIsOpen(true);
    };

    const createMaterial = async (formValue) => {
        try {
            dispatch(actions.showLoading());
            if (!imageUrl) {
                return messageApi.warning('Vui lòng cung cấp hình ảnh thành phần, vật liệu');
            }
            const formData = new FormData();
            formData.append('name', formValue.name);
            formData.append('image', imageFile);
            formData.append('imageUrl', imageUrl);
            const newMaterial = await MaterialService.create(formData);
            setMaterials([newMaterial, ...materials]);
            handleCloseModal();
        } catch (error) {
            messageApi.error(error?.response?.data?.message || error.message);
        } finally {
            dispatch(actions.hideLoading());
        }
    };

    const updateMaterial = async (formValue) => {
        try {
            dispatch(actions.showLoading());
            const formData = new FormData();
            formData.append('name', formValue.name);
            if (imageFile) {
                formData.append('image', imageFile);
                formData.append('imageUrl', imageUrl);
            }
            await MaterialService.update(materialId, formData);
            handleCloseModal();
            getMaterials();
        } catch (error) {
            messageApi.error(error?.response?.data?.message || error.message);
        } finally {
            dispatch(actions.hideLoading());
        }
    };

    const handleSubmitMaterialForm = (formValue) => {
        if (isUpdating) {
            updateMaterial(formValue);
        } else {
            createMaterial(formValue);
        }
    };

    const handleDeleteMaterial = async (materialId) => {
        Swal.fire({
            icon: 'question',
            title: 'Xoá Loại Sản Phẩm',
            text: 'Bạn có chắc là muốn xoá thành phần, vật liệu này không?',
            showCancelButton: true,
            cancelButtonText: 'Huỷ',
            confirmButtonText: 'Xác nhận',
            confirmButtonColor: 'red',
        }).then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                try {
                    dispatch(actions.showLoading());
                    await MaterialService.delete(materialId);
                    messageApi.success('Xoá thành phần, vật liệu thành công');
                    getMaterials();
                } catch (error) {
                    messageApi.error(error?.response?.data?.message || error.message);
                } finally {
                    dispatch(actions.hideLoading());
                }
            }
        });
    };

    const columns = useMemo(() => {
        return [
            {
                key: '1',
                title: '#',
                dataIndex: '_id',
                render: (value) => value.slice(-7, -1),
                align: 'center',
            },
            {
                key: '2',
                title: 'Hình ảnh',
                dataIndex: 'imageUrl',
                render: (value) => (
                    <Image src={value} style={{ width: 120, height: 120, objectFit: 'contain' }} />
                ),
                align: 'center',
            },
            {
                key: '3',
                title: 'Tên',
                dataIndex: 'name',
                render: (value) => <span className='text-capitalize'>{value}</span>,
            },
            {
                key: '4',
                title: null,
                dataIndex: null,
                render: (_, material) => (
                    <Space>
                        <Tooltip title='Cập nhật'>
                            <Button
                                size='large'
                                type='primary'
                                shape='circle'
                                icon={<EditOutlined />}
                                onClick={() => openUpdateMaterialDialog(material)}
                            />
                        </Tooltip>
                        <Tooltip title='Xoá'>
                            <Button
                                danger
                                size='large'
                                type='primary'
                                shape='circle'
                                icon={<DeleteOutlined />}
                                onClick={() => handleDeleteMaterial(material._id)}
                            />
                        </Tooltip>
                    </Space>
                ),
                align: 'center',
            },
        ];
    }, []);

    useEffect(() => {
        getMaterials();
    }, []);

    return (
        <>
            <div className='py-2'>
                {contextHolder}
                <Button size='large' type='primary' icon={<PlusOutlined />} onClick={() => setIsOpen(true)}>
                    Thêm mới
                </Button>
            </div>
            <LtDynamicTable cols={columns} dataSrc={materials} rowKey='_id' />
            <LtFormModal
                isOpen={isOpen}
                title={isUpdating ? 'CẬP NHẬT THÀNH PHẦN, VẬT LIỆU' : 'THÊM THÀNH PHẦN, VẬT LIỆU'}
                onCancel={handleCloseModal}
                okBtnText={isUpdating ? 'Cập nhật' : 'Thêm'}
                cancelBtnText='Huỷ'
                onSubmit={handleSubmit(handleSubmitMaterialForm)}>
                <Form name='my-add-product-type-form' layout='vertical'>
                    <LtFormInput
                        label='Tên thành phần, vật liệu'
                        name='name'
                        control={control}
                        error={errors.name}
                        placeholder='Nhập thành phần, vật liệu'
                        rules={{ required: 'Tên không được để trống' }}
                    />
                    {imageUrl && (
                        <div className='text-center py-2'>
                            <Image src={imageUrl} style={{ width: 120, height: 120, objectFit: 'contain' }} />
                        </div>
                    )}
                    <div className='pt-3 text-center'>
                        <Upload
                            name='avatar'
                            onRemove={revokeImageUrl}
                            beforeUpload={() => false}
                            onChange={handleUploadImageFile}
                            showUploadList={false}>
                            <Button size='large' icon={<UploadOutlined />}>
                                Tải ảnh lên
                            </Button>
                        </Upload>
                    </div>
                </Form>
            </LtFormModal>
        </>
    );
};
export default Materials;