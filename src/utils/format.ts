// 格式化工具函数

// 格式化手机号显示（隐藏中间4位）
export const formatPhoneNumber = (phoneNumber: string): string =>
{
    if (!phoneNumber) return '';
    return phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
};

// 格式化邮箱显示（隐藏中间部分）
export const formatEmail = (email: string): string =>
{
    if (!email) return '';
    const [name, domain] = email.split('@');
    if (name.length <= 2)
    {
        return `${name[0]}***@${domain}`;
    }
    return `${name[0]}***${name[name.length - 1]}@${domain}`;
};

// 格式化日期显示
export const formatDate = (dateString: string): string =>
{
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
};

// 格式化时间显示
export const formatDateTime = (dateString: string): string =>
{
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN');
};