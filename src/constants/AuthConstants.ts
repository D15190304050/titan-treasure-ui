const AuthKeys = {
    AccessToken: 'titan_sso_token',
    RefreshToken: 'titan_refresh_token',
    ExpirationInSeconds: 'expiration_in_seconds',
    LoginUrl: import.meta.env.VITE_LOGIN_PAGE_URL || 'http://localhost:3730',
    RedirectUrl: 'redirectUrl',
    HeaderUserId: "X-User-Id",
    HeaderUserName: "X-User-Name",
    HeaderUserNickname: "X-User-Nickname",
}

export default AuthKeys;