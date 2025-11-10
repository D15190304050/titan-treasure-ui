import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import
{
    Form,
    Input,
    Button,
    Typography,
    Card,
    message,
    Select,
    DatePicker,
    Upload,
    Row,
    Col,
    Image,
    Space
} from 'antd';
import
{
    UserOutlined,
    LockOutlined,
    MailOutlined,
    PhoneOutlined,
    UploadOutlined,
    ManOutlined,
    WomanOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
import type { UploadProps, UploadFile } from 'antd';
import { register } from '@/apis/auth';
import { RegisterRequest } from '@/types';
import { getAvatarUploadUrl } from '@/apis/auth';
import axios from 'axios';

const { Title, Text } = Typography;
const { Option } = Select;

const getBase64OfImage = (img: File, callback: (base64: string) => void) =>
{
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const Register: React.FC = () =>
{
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');

    // 从URL参数中获取初始值
    const urlParams = new URLSearchParams(location.search);
    const initialEmail = urlParams.get('email') || '';
    const initialUsername = urlParams.get('username') || '';

    const onFinish = async (values: RegisterRequest) =>
    {
        setLoading(true);
        try
        {
            // 构建注册请求数据
            const registerData: RegisterRequest = {
                ...values,
                avatarUrl: avatarUrl || undefined,
                // birthday: new Date(values.birthday || '').getTime() || undefined,
            };

            // 调用注册API
            const response = await register(registerData);

            if (response.success)
            {
                message.success('注册成功');
                navigate('/login');
            }
            else
            {
                message.error(response.message || '注册失败');
            }
        }
        catch (error)
        {
            message.error('注册失败，请稍后重试');
        }
        finally
        {
            setLoading(false);
        }
    };

    const beforeUpload = (file: File) =>
    {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng)
        {
            message.error('只能上传JPG或PNG格式的图片!');
            return false;
        }

        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M)
        {
            message.error('图片大小不能超过2MB!');
            return false;
        }

        return true;
    };

    const handleChange: UploadProps['onChange'] = async (info) =>
    {
        setFileList(info.fileList);

        if (info.file.status === 'done')
        {
            // Get this url from response in real world.
            getBase64OfImage(info.file.originFileObj as File, (url: string) =>
            {
                setLoading(false);
                setImageUrl(url);
            });
        }
        else if (info.file.status === 'error')
        {
            message.error(`${info.file.name} 上传失败`);
        }
    };

    // 自定义上传函数 - 使用OSS预签名URL
    const customUpload = async (options: any) =>
    {
        const { file, onSuccess, onError } = options;

        try
        {
            // 1. 获取OSS预签名URL
            const fileName = `avatar_${Date.now()}_${file.name}`;
            // console.log("fileName = ", fileName);
            const presignedResponse = await getAvatarUploadUrl(fileName);

            if (!presignedResponse.success)
            {
                throw new Error(presignedResponse.message || '获取上传地址失败');
            }

            const { uploadUrl, objectUrl } = presignedResponse.data;

            // 2. 使用预签名URL上传到OSS
            // 在浏览器环境中，直接使用文件对象进行上传
            const uploadResponse = await axios.put(uploadUrl, file, {
                headers: {
                    'Content-Type': file.type,
                },
                onUploadProgress: (progressEvent) =>
                {
                    const percent = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0;
                    console.log(`上传进度: ${percent}%`);
                }
            });

            console.log("uploadResponse = ", uploadResponse);

            if (uploadResponse.status === 200)
            {
                // 3. 保存上传后的URL
                setAvatarUrl(objectUrl);
                message.success('头像上传成功');
                onSuccess(uploadResponse, file);
            } else
            {
                throw new Error('上传失败');
            }

        } catch (error)
        {
            console.error('头像上传失败:', error);
            message.error('头像上传失败，请重试');
            onError(error);
        }
    };

    const uploadProps: UploadProps = {
        name: 'avatar',
        accept: '.jpg,.jpeg,.png',
        beforeUpload,
        onChange: handleChange,
        listType: 'picture-card',
        fileList,
        maxCount: 1,
        showUploadList: false,
        customRequest: customUpload // 使用自定义上传函数
    };

    const uploadButton = (
        <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>上传头像</div>
        </div>
    );

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-2xl shadow-lg">
                <div className="text-center mb-6">
                    <Title level={2}>用户注册</Title>
                    <Text type="secondary">请填写以下信息完成注册</Text>
                </div>

                <Form
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    layout="vertical"
                    scrollToFirstError
                    initialValues={{
                        email: initialEmail,
                        username: initialUsername
                    }}
                >
                    {/* 头像单独一行，居中显示 */}
                    <Row justify="center" style={{ marginBottom: '16px' }}>
                        <Col xs={24} sm={24} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Form.Item style={{ marginBottom: 0, textAlign: 'center' }}>
                                <Space direction="vertical" align="center" style={{ maxWidth: '400px' }}>
                                    <Upload {...uploadProps}>
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt="avatar"
                                                style={{
                                                    width: '100%',
                                                }}
                                            />
                                        ) : (
                                            uploadButton
                                        )}
                                    </Upload>
                                    <Text type="secondary" style={{ fontSize: '12px' }}>
                                        支持 JPG、PNG 格式，大小不超过2MB
                                    </Text>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    {/* 邮箱单独一行，与其他表单项对齐 */}
                    <Row>
                        
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="username"
                                label="用户名"
                                rules={[
                                    { required: true, message: '请输入用户名!' },
                                    { min: 4, message: '用户名至少4个字符!' },
                                    { max: 20, message: '用户名最多20个字符!' }
                                ]}
                                hasFeedback
                            >
                                <Input
                                    prefix={<UserOutlined className="text-gray-400" />}
                                    placeholder="4-20个字符"
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="email"
                                label="邮箱"
                                rules={[
                                    { required: true, message: '请输入邮箱!' },
                                    { type: 'email', message: '请输入有效的邮箱地址!' }
                                ]}
                            >
                                <Input
                                    prefix={<MailOutlined className="text-gray-400" />}
                                    placeholder="邮箱"
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                        
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="nickname"
                                label="昵称"
                                rules={[
                                    { required: true, message: '请输入昵称!' },
                                    { min: 2, message: '昵称至少2个字符!' },
                                    { max: 20, message: '昵称最多20个字符!' }
                                ]}
                            >
                                <Input
                                    placeholder="2-20个字符"
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="password"
                                label="密码"
                                rules={[
                                    { required: true, message: '请输入密码!' },
                                    { min: 8, message: '密码至少8个字符!' },
                                    { max: 20, message: '密码最多20个字符!' },
                                    { pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/~`-]).{8,20}$/, message: '密码必须包含字母、数字和特殊字符!' }
                                ]}
                                hasFeedback
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="text-gray-400" />}
                                    placeholder="8-20个字符,包含字母、数字和特殊字符"
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                        
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="phoneNumber"
                                label="手机号"
                                rules={[
                                    { required: true, message: '请输入手机号!' },
                                    { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '请输入正确的手机号格式!' }
                                ]}
                            >
                                <Input
                                    prefix={<PhoneOutlined className="text-gray-400" />}
                                    placeholder="手机号"
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="gender"
                                label="性别"
                            >
                                <Select
                                    placeholder="请选择性别"
                                    size="large"
                                    allowClear
                                >
                                    <Option value={1}><ManOutlined /> 男</Option>
                                    <Option value={2}><WomanOutlined /> 女</Option>
                                    <Option value={0}><QuestionCircleOutlined /> 保密</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="birthday"
                                label="生日"
                            >
                                <DatePicker
                                    placeholder="请选择生日"
                                    size="large"
                                    className="w-full"
                                    disabledDate={(current) =>
                                    {
                                        // 不能选择今天及以后的日期，且必须年满13岁
                                        if (!current) return false;
                                        const today = new Date();
                                        const minDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
                                        return current.valueOf() > minDate.getTime() || current.valueOf() > today.getTime();
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="bio"
                        label="个人简介"
                        rules={[{ max: 200, message: '个人简介最多200个字符!' }]}
                    >
                        <Input.TextArea
                            placeholder="个人简介（最多200个字符）"
                            rows={4}
                        />
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('请先阅读并同意用户协议!')),
                            },
                        ]}
                    >
                        <div className="flex items-center">
                            <input type="checkbox" id="agreement" />
                            <label htmlFor="agreement" className="ml-2">
                                我已阅读并同意 <a href="">用户协议</a> 和 <a href="">隐私政策</a>
                            </label>
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                            size="large"
                            loading={loading}
                        >
                            注册
                        </Button>
                    </Form.Item>
                </Form>

                <div className="text-center">
                    <Text type="secondary">已有账号? </Text>
                    <Link to="/login">立即登录</Link>
                </div>
            </Card>
        </div>
    );
};

export default Register;