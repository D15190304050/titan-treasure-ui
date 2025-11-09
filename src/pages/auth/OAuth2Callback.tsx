import React, { useEffect } from 'react';

const OAuth2Callback: React.FC = () =>
{
    useEffect(() =>
    {
        // 获取当前 URL 中的 token 参数
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token)
        {
            // 将 Token 发送给主页面
            window.opener?.postMessage({ type: 'AUTH_SUCCESS', token }, window.location.origin);
            window.close(); // 关闭弹窗
        }
        else
        {
            window.opener?.postMessage({ type: 'AUTH_ERROR', message: '未接收到 Token' }, window.location.origin);
            window.close();
        }
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>处理登录中...</h2>
            <p>请稍候，不要关闭此窗口。</p>
        </div>
    );
};

export default OAuth2Callback;