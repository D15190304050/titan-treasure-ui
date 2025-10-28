/**
 * Full user profile information interface
 * Corresponds to the Java class stark.coderaider.titan.treasure.core.domain.dtos.responses.FullUserProfileInfo
 */
export interface FullUserProfileInfo {
  /** 
   * IAM 用户ID（外键）
   */
  id: number;

  /** 
   * 昵称，展示用，不要求唯一
   */
  nickname: string;

  /** 
   * 头像地址（OSS/CDN存储的链接）
   */
  avatarUrl: string;

  /** 
   * 简介/签名
   */
  bio: string;

  /** 
   * 生日
   */
  birthday: Date;

  /** 
   * 性别：0=未知，1=男，2=女
   */
  gender: 0 | 1 | 2;

  /** 
   * Creation time of the account.
   */
  creationTime: Date;

  // From IAM.
  username: string;
  email: string;
  phoneNumberCountryCode: string;
  phoneNumber: string;
}