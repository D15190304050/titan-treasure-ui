// 获取头像上传的OSS预签名URL
export interface OssPresignedUrlResponse {
  uploadUrl: string;  // 上传到OSS的URL
  objectUrl: string;  // 上传后的访问URL
}