import React, { useState } from 'react';
import
    {
        Card,
        Typography,
        Button,
        Form,
        Input,
        message,
        Modal
    } from 'antd';
import
    {
        LockOutlined,
        MobileOutlined,
        MailOutlined,
        CheckCircleOutlined
    } from '@ant-design/icons';

const { Title, Text } = Typography;

const AccountSecurity: React.FC = () =>
{
    const [changePasswordForm] = Form.useForm();
    const [changePhoneForm] = Form.useForm();
    const [changeEmailForm] = Form.useForm();
    const [changingPassword, setChangingPassword] = useState(false);
    const [changingPhone, setChangingPhone] = useState(false);
    const [changingEmail, setChangingEmail] = useState(false);

    const handleChangePassword = async (values: any) =>
    {
        if (values.newPassword !== values.confirmPassword)
        {
            message.error('两次输入的密码不一致');
            return;
        }

        setChangingPassword(true);
        try
        {
            // TODO: 调用修改密码API
            // const response = await changePassword(values);
            // 模拟API调用
            setTimeout(() =>
            {
                message.success('密码修改成功');
                changePasswordForm.resetFields();
            }, 1000);
        } catch (error)
        {
            message.error('密码修改失败，请稍后重试');
        } finally
        {
            setChangingPassword(false);
        }
    };

    const handleChangePhone = async (values: any) =>
    {
        setChangingPhone(true);
        try
        {
            // TODO: 调用修改手机号API
            // const response = await changePhoneNumber(values);
            // 模拟API调用
            setTimeout(() =>
            {
                message.success('手机号修改成功');
                changePhoneForm.resetFields();
            }, 1000);
        } catch (error)
        {
            message.error('手机号修改失败，请稍后重试');
        } finally
        {
            setChangingPhone(false);
        }
    };

    const handleChangeEmail = async (values: any) =>
    {
        setChangingEmail(true);
        try
        {
            // TODO: 调用修改邮箱API
            // const response = await changeEmail(values);
            // 模拟API调用
            setTimeout(() =>
            {
                message.success('邮箱修改成功');
                changeEmailForm.resetFields();
            }, 1000);
        } catch (error)
        {
            message.error('邮箱修改失败，请稍后重试');
        } finally
        {
            setChangingEmail(false);
        }
    };

    const showChangePasswordModal = () =>
    {
        Modal.confirm({
            title: '修改密码',
            content: (
                <Form
                    form={changePasswordForm}
                    name="change_password_modal"
                    onFinish={handleChangePassword}
                    layout="vertical"
                >
                    <Form.Item
                        name="oldPassword"
                        rules={[{ required: true, message: '请输入当前密码!' }]}
                    >
                        <Input.Password placeholder="当前密码" />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        rules={[
                            { required: true, message: '请输入新密码!' },
                            { min: 8, message: '密码至少8个字符!' },
                            { max: 20, message: '密码最多20个字符!' }
                        ]}
                    >
                        <Input.Password placeholder="新密码" />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            { required: true, message: '请确认新密码!' },
                            { min: 8, message: '密码至少8个字符!' },
                            { max: 20, message: '密码最多20个字符!' }
                        ]}
                        dependencies={['newPassword']}
                    >
                        <Input.Password placeholder="确认新密码" />
                    </Form.Item>
                </Form>
            ),
            onOk: () =>
            {
                return changePasswordForm.validateFields().then(values =>
                {
                    return handleChangePassword(values);
                });
            },
            onCancel: () =>
            {
                changePasswordForm.resetFields();
            }
        });
    };

    return (
        <div className="space-y-6">
            <Card>
                <Title level={3} className="mb-6">账号安全</Title>

                <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                            <LockOutlined className="text-xl mr-4 text-blue-500" />
                            <div>
                                <Text strong>登录密码</Text>
                                <br />
                                <Text type="secondary">定期更换密码有助于提升账户安全性</Text>
                            </div>
                        </div>
                        <Button onClick={showChangePasswordModal}>修改</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                            <MobileOutlined className="text-xl mr-4 text-green-500" />
                            <div>
                                <Text strong>绑定手机</Text>
                                <br />
                                <Text type="secondary">已绑定手机：138****8000</Text>
                            </div>
                        </div>
                        <Button>修改</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                            <MailOutlined className="text-xl mr-4 text-red-500" />
                            <div>
                                <Text strong>绑定邮箱</Text>
                                <br />
                                <Text type="secondary">已绑定邮箱：use***@example.com</Text>
                            </div>
                        </div>
                        <Button>修改</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                            <CheckCircleOutlined className="text-xl mr-4 text-purple-500" />
                            <div>
                                <Text strong>实名认证</Text>
                                <br />
                                <Text type="secondary">未实名认证</Text>
                            </div>
                        </div>
                        <Button type="primary">去认证</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AccountSecurity;