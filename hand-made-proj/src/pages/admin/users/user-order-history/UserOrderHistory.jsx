import { Descriptions, Image, Table, Tag, message } from 'antd';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useDispatch } from 'react-redux';
import LtDynamicTable from '../../../../core/components/lt-dynamic-table';
import { DeliveryStatus } from '../../../../shared/enums/delivery-status.enum';
import { OrderStatus } from '../../../../shared/enums/order-status.enum';
import { PaymentStatus } from '../../../../shared/enums/payment-status.enum';
import { OrdersService } from '../../../../shared/services/orders.service';
import { actions } from '../../../../stores';

const colorMap = {
  [PaymentStatus.NOT_YET_PAY]: 'orange',
  [PaymentStatus.PAID]: 'green',
  [DeliveryStatus.IN_PROGRESS]: 'blue',
  [DeliveryStatus.DELIVERED_SUCCESS]: 'green',
  [DeliveryStatus.DELIVERED_FAILED]: 'red',
  [OrderStatus.IN_PROGRESS]: 'blue',
  [OrderStatus.SUCCESS]: 'green',
  [OrderStatus.FAILED]: 'red',
};

const UserOrderHistory = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const mainTableColumns = useMemo(() => {
    return [
      {
        title: 'ID',
        key: '_id',
        dataIndex: '_id',
        render: (value) => value.slice(0, 8),
        align: 'center',
      },
      {
        title: 'Tình trạng',
        key: 'orderStatus',
        dataIndex: 'orderStatus',
        render: (value) => (
          <Tag color={colorMap[value]}>
            <span className='text-capitalize'>{value}</span>
          </Tag>
        ),
        align: 'center',
      },
      {
        title: 'Tổng tiền',
        key: 'totalBill',
        dataIndex: 'totalBill',
        render: (value) => <NumericFormat value={value} displayType='text' thousandSeparator=',' />,
        align: 'center',
      },
      {
        title: 'Ngày đặt',
        key: 'createdAt',
        dataIndex: 'createdAt',
        render: (value) => moment(value).format('HH:mm - DD/MM/YYYY'),
        align: 'center',
      },
      {
        title: 'Ghi chú',
        key: 'notes',
        dataIndex: 'notes',
        render: (value) => (
          <div
            style={{
              width: '200px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
            {value}
          </div>
        ),
      },
    ];
  }, [orders.length]);

  const subTableColumns = useMemo(() => {
    return [
      {
        title: 'Tên sản phẩm',
        dataIndex: 'productName',
        key: 'productName',
      },
      {
        title: 'Hình ảnh',
        dataIndex: 'image',
        key: 'image',
        render: (value) => (
          <Image src={value} style={{ width: 120, height: 120, objectFit: 'contain' }} />
        ),
        align: 'center',
      },
      {
        title: 'Số lượng',
        dataIndex: 'amount',
        key: 'amount',
        align: 'center',
      },
      {
        title: 'Đơn giá',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
      },
      {
        title: 'Tổng tiền',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        align: 'center',
      },
    ];
  }, []);

  useEffect(() => {
    const getOrders = async () => {
      try {
        dispatch(actions.showLoading());
        const orders = await OrdersService.getOrdersByUserId(userId);
        setOrders(orders);
      } catch (error) {
        messageApi.error(error?.response?.data?.message || error.message);
      } finally {
        dispatch(actions.hideLoading());
      }
    };

    getOrders();
  }, [userId]);

  return (
    <>
      <div className='pb-5'>
        {contextHolder}
        <Table
          rowKey='_id'
          columns={mainTableColumns}
          dataSource={orders}
          pagination={{ pageSize: 12, hideOnSinglePage: true }}
          expandable={{
            expandedRowRender: (order) => (
              <>
                {order.orderStatus === OrderStatus.FAILED && (
                  <Descriptions title='Lý do huỷ' column={1}>
                    <Descriptions.Item label=''>
                      <em>{order.notes}</em>
                    </Descriptions.Item>
                  </Descriptions>
                )}
                <Descriptions title='Thông tin thanh toán' column={1}>
                  <Descriptions.Item label='Hình thức thanh toán'>
                    <span className='text-capitalize'>{order.paymentMethod}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label='Trạng thái'>
                    <Tag color={colorMap[order.paymentStatus]}>
                      <span className='text-capitalize'>{order.paymentStatus}</span>
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions title='Thông tin vận chuyển' column={1}>
                  <Descriptions.Item label='Hình thức vận chuyên'>
                    <span className='text-capitalize'>{order.deliveryType}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label='Tình trạng'>
                    <Tag color={colorMap[order.deliveryStatus]}>
                      <span className='text-capitalize'>{order.deliveryStatus}</span>
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions title='Thông tin người nhận' column={1}>
                  <Descriptions.Item label='Người nhận'>{order.fullName}</Descriptions.Item>
                  <Descriptions.Item label='Số điện thoại'>{order.phone}</Descriptions.Item>
                  <Descriptions.Item label='Địa chỉ giao hàng'>
                    {order.deliveryAddress}
                  </Descriptions.Item>
                </Descriptions>
                <hr />
                <h5 className='text-center page-title'>Chi Tiết Sản Phẩm</h5>
                <LtDynamicTable cols={subTableColumns} dataSrc={order.products} rowKey='_id' />
              </>
            ),
          }}
        />
      </div>
    </>
  );
};

export default UserOrderHistory;
