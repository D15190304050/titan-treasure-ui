import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

interface AvatarUploadProps {
  value?: string;
  onChange?: (url: string) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ value, onChange }) => {
  const uploadProps: UploadProps = {
    name: 'avatar',
    action: '/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
        // 这里应该从响应中获取图片URL
        // onChange?.(info.file.response.url);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };

  return (
    <div className="flex items-center">
      {value && (
        <img 
          src={value} 
          alt="avatar" 
          className="w-16 h-16 rounded-full object-cover mr-4" 
        />
      )}
      <Upload {...uploadProps} showUploadList={false}>
        <Button icon={<UploadOutlined />}>上传头像</Button>
      </Upload>
    </div>
  );
};

export default AvatarUpload;