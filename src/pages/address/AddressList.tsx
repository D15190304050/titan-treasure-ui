import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import
    {
        Card,
        Typography,
        Button,
        Table,
        Tag,
        Space,
        Modal,
        message,
        Spin
    } from 'antd';
import
    {
        PlusOutlined,
        EditOutlined,
        DeleteOutlined,
        CheckCircleOutlined
    } from '@ant-design/icons';
import { Address } from '@/types';

const { Title } = Typography;

const AddressList: React.FC = () =>
{
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    useEffect(() =>
    {
        // TODO: 从API获取地址列表
        // 模拟API调用
        setTimeout(() =>
        {
            const mockAddresses: Address[] = [
                {
                    id: '1',
                    userId: '1',
                    name: '张三',
                    phoneNumber: '13800138000',
                    province: '北京市',
                    city: '北京市',
                    district: '朝阳区',
                    street: '建国路88号',
                    isDefault: true,
                    label: '家',
                    createdAt: '2023-01-01T00:00:00Z',
                    updatedAt: '2023-01-01T00:00:00Z'
                },
                {
                    id: '2',
                    userId: '1',
                    name: '李四',
                    phoneNumber: '13900139000',
                    province: '上海市',
                    city: '上海市',
                    district: '浦东新区',
                    street: '陆家嘴环路1000号',
                    isDefault: false,
                    label: '公司',
                    createdAt: '2023-01-02T00:00:00Z',
                    updatedAt: '2023-01-02T00:00:00Z'
                }
            ];
            setAddresses(mockAddresses);
            setLoading(false);
        }, 1000);
    }, []);

    const handleAddAddress = () =>
    {
        navigate('/address/add');
    };

    const handleEditAddress = (id: string) =>
    {
        navigate(`/address/edit/${id}`);
    };

    const handleDeleteAddress = (id: string) =>
    {
        Modal.confirm({
            title: '确认删除',
            content: '确定要删除这个地址吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: async () =>
            {
                setDeleting(true);
                try
                {
                    // TODO: 调用删除地址API
                    // const response = await deleteAddress(id);
                    // 模拟API调用
                    setTimeout(() =>
                    {
                        setAddresses(addresses.filter(addr => addr.id !== id));
                        message.success('地址删除成功');
                    }, 500);
                } catch (error)
                {
                    message.error('删除失败，请稍后重试');
                } finally
                {
                    setDeleting(false);
                }
            }
        });
    };

    const handleSetDefault = (id: string) =>
    {
        // TODO: 调用设置默认地址API
        // 模拟API调用
        setTimeout(() =>
        {
            setAddresses(addresses.map(addr => ({
                ...addr,
                isDefault: addr.id === id
            })));
            message.success('默认地址设置成功');
        }, 500);
    };

    const columns = [
        {
            title: '收货人',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '手机号',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
            render: (_: any, record: Address) => (
                <>
                    {record.province} {record.city} {record.district} {record.street}
                </>
            ),
        },
        {
            title: '标签',
            dataIndex: 'label',
            key: 'label',
            render: (label: string) => (
                label ? <Tag color="blue">{label}</Tag> : null
            ),
        },
        {
            title: '默认地址',
            dataIndex: 'isDefault',
            key: 'isDefault',
            render: (isDefault: boolean) => (
                isDefault ? <CheckCircleOutlined className="text-green-500" /> : null
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: Address) => (
                <Space size="middle">
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEditAddress(record.id)}
                    >
                        编辑
                    </Button>
                    <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteAddress(record.id)}
                        loading={deleting}
                    >
                        删除
                    </Button>
                    {!record.isDefault && (
                        <Button
                            type="link"
                            onClick={() => handleSetDefault(record.id)}
                        >
                            设为默认
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    if (loading)
    {
        return (
            <div className="flex justify-center items-center h-full">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Card>
                <div className="flex justify-between items-center mb-6">
                    <Title level={3} className="mb-0">地址管理</Title>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddAddress}
                    >
                        新增收货地址
                    </Button>
                </div>

                <Table
                    dataSource={addresses}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                />
            </Card>
        </div>
    );
};

export default AddressList;