import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import
    {
        Form,
        Input,
        Button,
        Card,
        Typography,
        Select,
        message,
        Row,
        Col
    } from 'antd';
import { Address } from '@/types';

const { Title } = Typography;
const { Option } = Select;

// 模拟省市区数据
const provinces = ['北京市', '上海市', '广东省', '江苏省', '浙江省'];
const cities: Record<string, string[]> = {
    '北京市': ['北京市'],
    '上海市': ['上海市'],
    '广东省': ['广州市', '深圳市', '珠海市'],
    '江苏省': ['南京市', '苏州市', '无锡市'],
    '浙江省': ['杭州市', '宁波市', '温州市']
};
const districts: Record<string, string[]> = {
    '北京市': ['东城区', '西城区', '朝阳区', '海淀区'],
    '上海市': ['黄浦区', '静安区', '徐汇区', '浦东新区'],
    '广州市': ['越秀区', '荔湾区', '天河区', '白云区'],
    '深圳市': ['福田区', '罗湖区', '南山区', '宝安区'],
    '南京市': ['玄武区', '秦淮区', '建邺区', '鼓楼区']
};

const AddAddress: React.FC = () =>
{
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);
    const [selectedProvince, setSelectedProvince] = useState<string | undefined>(undefined);
    const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

    const onFinish = async (values: any) =>
    {
        setSubmitting(true);
        try
        {
            // TODO: 调用添加地址API
            // const response = await addAddress(values);
            // 模拟API调用
            setTimeout(() =>
            {
                message.success('地址添加成功');
                navigate('/address');
            }, 1000);
        } catch (error)
        {
            message.error('地址添加失败，请稍后重试');
        } finally
        {
            setSubmitting(false);
        }
    };

    const handleProvinceChange = (value: string) =>
    {
        setSelectedProvince(value);
        setSelectedCity(undefined);
        form.setFieldsValue({ city: undefined, district: undefined });
    };

    const handleCityChange = (value: string) =>
    {
        setSelectedCity(value);
        form.setFieldsValue({ district: undefined });
    };

    const handleCancel = () =>
    {
        navigate('/address');
    };

    return (
        <div className="space-y-6">
            <Card>
                <Title level={3} className="mb-6">新增收货地址</Title>
                <Form
                    form={form}
                    name="add_address"
                    onFinish={onFinish}
                    layout="vertical"
                    scrollToFirstError
                >
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="name"
                                label="收货人"
                                rules={[{ required: true, message: '请输入收货人姓名!' }]}
                            >
                                <Input placeholder="收货人姓名" size="large" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="phoneNumber"
                                label="手机号"
                                rules={[{ required: true, message: '请输入手机号!' }]}
                            >
                                <Input placeholder="手机号" size="large" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="province"
                                label="省份"
                                rules={[{ required: true, message: '请选择省份!' }]}
                            >
                                <Select
                                    placeholder="请选择省份"
                                    size="large"
                                    onChange={handleProvinceChange}
                                    allowClear
                                >
                                    {provinces.map(province => (
                                        <Option key={province} value={province}>{province}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="city"
                                label="城市"
                                rules={[{ required: true, message: '请选择城市!' }]}
                            >
                                <Select
                                    placeholder="请选择城市"
                                    size="large"
                                    onChange={handleCityChange}
                                    disabled={!selectedProvince}
                                    allowClear
                                >
                                    {selectedProvince && cities[selectedProvince]?.map(city => (
                                        <Option key={city} value={city}>{city}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="district"
                                label="区/县"
                                rules={[{ required: true, message: '请选择区/县!' }]}
                            >
                                <Select
                                    placeholder="请选择区/县"
                                    size="large"
                                    disabled={!selectedCity}
                                    allowClear
                                >
                                    {selectedCity && districts[selectedCity]?.map(district => (
                                        <Option key={district} value={district}>{district}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="street"
                        label="详细地址"
                        rules={[{ required: true, message: '请输入详细地址!' }]}
                    >
                        <Input.TextArea
                            placeholder="街道门牌信息"
                            rows={3}
                        />
                    </Form.Item>

                    <Form.Item
                        name="label"
                        label="地址标签"
                    >
                        <Select
                            placeholder="可选择地址标签"
                            size="large"
                            allowClear
                        >
                            <Option value="家">家</Option>
                            <Option value="公司">公司</Option>
                            <Option value="学校">学校</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="isDefault" valuePropName="checked">
                        <div className="flex items-center">
                            <input type="checkbox" id="isDefault" />
                            <label htmlFor="isDefault" className="ml-2">
                                设为默认地址
                            </label>
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <div className="flex justify-end space-x-4">
                            <Button
                                onClick={handleCancel}
                                size="large"
                            >
                                取消
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                loading={submitting}
                            >
                                保存
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default AddAddress;