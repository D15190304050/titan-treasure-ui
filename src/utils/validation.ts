// 验证工具函数

// 验证邮箱格式
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 验证手机号格式
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phoneNumber);
};

// 验证用户名格式
export const validateUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
  return usernameRegex.test(username);
};

// 验证密码强度
export const validatePassword = (password: string): boolean => {
  // 至少8个字符，包含字母和数字
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,20}$/;
  return passwordRegex.test(password);
};

// 验证昵称长度
export const validateNickname = (nickname: string): boolean => {
  return nickname.length >= 2 && nickname.length <= 20;
};

// 验证生日（必须年满13岁）
export const validateBirthday = (birthday: string): boolean => {
  const birthDate = new Date(birthday);
  const today = new Date();
  const minDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
  return birthDate <= minDate && birthDate <= today;
};