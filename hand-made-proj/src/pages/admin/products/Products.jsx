import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Image, Space, message, Tooltip } from 'antd';
import moment from 'moment/moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { useDispatch } from 'react-redux';
import LtDynamicTable from '../../../core/components/lt-dynamic-table/LtDynamicTable';
import LtFormModal from '../../../core/components/lt-form-modal';
import ProductTypesService from '../../../shared/services/product-types.service';
import { productService } from '../../../shared/services/products.service';
import { actions } from '../../../stores';
import AddProduct from './AddProduct';
import Swal from 'sweetalert2';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Products = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [idProduct, setIsProduct] = useState();
  const [fileList, setFileList] = useState();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const openEditModal = (values) => {
    setIsProduct(values?._id);
    let dataImg = [];
    values?.image.forEach((item) => {
      dataImg.push({ url: item });
    });
    reset({
      name: values.name,
      type: values.type,
      price: values.price,
      images: values.image,
      countInStock: values.countInStock,
      description: values.description,
    });
    setFileList(dataImg);
    setIsEdit(true);
  };

  const createNewProduct = async (formValue) => {
    if (!fileList.length) {
      return messageApi.error('Vui lòng cung cấp hình ảnh sản phẩm');
    }

    const formData = new FormData();
    for (const field in formValue) {
      formData.append(field, formValue[field]);
    }
    fileList.forEach((file) => {
      formData.append('images', file.originFileObj);
    });

    try {
      dispatch(actions.showLoading());
      await productService.createProducts(formData);
      messageApi.success('Thêm thành công');
      reset();
      setFileList([]);
      getProducts();
      setIsCreate(false);
    } catch (error) {
      messageApi.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(actions.hideLoading());
    }
  };

  const editProduct = async (formValue) => {
    if (!fileList.length) {
      return messageApi.error('Vui lòng cung cấp hình ảnh sản phẩm');
    }
    const formData = new FormData();
    for (const field in formValue) {
      formData.append(field, formValue[field]);
    }
    fileList.forEach((file) => {
      formData.append('images', file.originFileObj);
    });

    try {
      dispatch(actions.showLoading());
      await productService.updateProducts(formData, idProduct);
      reset();
      setFileList([]);
      getProducts();
      messageApi.success('Cập nhật thành công');
      setIsEdit(false);
    } catch (error) {
      messageApi.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(actions.hideLoading());
    }
  };

  const getProducts = async () => {
    try {
      dispatch(actions.showLoading());
      const products = await productService.getAllProducts();
      setProducts(products.productData);
    } catch (error) {
      messageApi.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(actions.hideLoading());
    }
  };

  const getProductTypes = async () => {
    try {
      dispatch(actions.showLoading());
      const productTypes = await ProductTypesService.getAll();
      setProductTypes(productTypes);
    } catch (error) {
      messageApi.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(actions.hideLoading());
    }
  };

  const deleteProduct = async (idProduct) => {
    Swal.fire({
      title: 'Cảnh Báo',
      text: 'Bạn có chắc chắn muốn xoá sản phẩm này?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Huỷ',
      confirmButtonText: 'Xoá',
      confirmButtonColor: 'red',
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        try {
          await productService.deleteProducts(idProduct);
          setIsEdit(false);
          messageApi.open({
            type: 'success',
            content: 'Xóa thành công',
          });
          setFileList([]);
          reset();
          getProducts();
        } catch (error) {
          messageApi.error(error.message);
        }
      }
    });
  };

  const handleClearEditForm = () => {
    setIsEdit(false);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      type: null,
      price: '',
      countInStock: '',
      description: '',
    },
  });

  const tableColumns = useMemo(() => {
    return [
      {
        title: 'ID',
        key: '_id',
        dataIndex: '_id',
        render: (value) => value.toString().slice(-7),
      },
      {
        title: 'Tên Sản Phẩm',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Hinh ảnh',
        dataIndex: 'image',
        key: 'image',
        render: (value) => (
          <Image
            src={value && value[0] ? value[0] : null}
            style={{ width: 120, height: 120, objectFit: 'contain' }}
          />
        ),
        align: 'center',
      },
      {
        title: 'Loại sản phẩm',
        dataIndex: 'type',
        key: 'type',
        render: (value) => <span className='text-capitalize'>{value ? value.name : ''}</span>,
      },
      {
        title: 'Số Lượng',
        dataIndex: 'countInStock',
        key: 'countInStock',
        align: 'center',
        render: (value) => <NumericFormat value={value} displayType='text' thousandSeparator=',' />,
      },
      {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        render: (value) => <NumericFormat value={value} displayType='text' thousandSeparator=',' />,
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'center',
        render: (value) => (value ? moment(value).format('DD-MM-YYYY') : null),
      },
      {
        title: '',
        key: 'action',
        align: 'right',
        render: (_, product) => (
          <>
            {product && (
              <Space>
                <Tooltip title='Cập nhật'>
                  <Button 
                  size='large' 
                  type='primary' 
                  shape='circle' 
                  icon={<EditOutlined />}
                  onClick={() => {
                    openEditModal(product)
                  }}
                   />
                </Tooltip>
                <Tooltip title='Xoá'>
                  <Button
                    danger
                    size='large'
                    type='primary'
                    shape='circle'
                    icon={<DeleteOutlined />}
                    onClick={() => deleteProduct(product._id)}
                  />
                </Tooltip>
              </Space>
            )}
          </>
        ),
      },
    ];
  }, []);

  useEffect(() => {
    getProducts();
    getProductTypes();
  }, []);

  return (
    <>
      {contextHolder}
      <div className='d-flex justify-content-start align-items-center'>
        <Button
          type='primary'
          size='large'
          icon={<PlusOutlined />}
          onClick={() => {
            setIsCreate(true);
            reset({
              name: '',
              type: null,
              price: '',
              countInStock: '',
              description: '',
            });
            setFileList([]);
          }}>
          Thêm sản phẩm
        </Button>
      </div>
      <div className='pt-3'>
        <LtDynamicTable
          cols={tableColumns}
          dataSrc={products}
          hasFilters
          searchByFields={['name', 'id', 'price']}
          pageSize={6}
        />
      </div>
      <LtFormModal
        width={'50vw'}
        isOpen={isCreate}
        title='Thêm Sản Phẩm'
        okBtnText='Tạo'
        cancelBtnText='Huỷ'
        onCancel={() => setIsCreate(false)}
        onSubmit={handleSubmit(createNewProduct)}>
        <AddProduct
          control={control}
          errors={errors}
          handleCancel={handleCancel}
          previewTitle={previewTitle}
          previewImage={previewImage}
          previewOpen={previewOpen}
          fileList={fileList}
          handleChange={handleChange}
          handlePreview={handlePreview}
          productTypes={productTypes.map((type) => ({ label: type.name, value: type._id }))}
        />
      </LtFormModal>
      <LtFormModal
        width={'50vw'}
        isOpen={isEdit}
        title='Cập Nhật Sản Phẩm'
        okBtnText='Cập Nhật'
        cancelBtnText='Huỷ'
        onCancel={handleClearEditForm}
        onSubmit={handleSubmit(editProduct)}>
        <AddProduct
          control={control}
          errors={errors}
          handleCancel={handleCancel}
          previewTitle={previewTitle}
          previewImage={previewImage}
          previewOpen={previewOpen}
          fileList={fileList}
          handleChange={handleChange}
          handlePreview={handlePreview}
          productTypes={productTypes.map((type) => ({ label: type.name, value: type._id }))}
        />
      </LtFormModal>
    </>
  );
};

export default Products;
