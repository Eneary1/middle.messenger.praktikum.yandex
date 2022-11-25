enum ROUTES {
  NAV = '/nav',
  ENTER = '/',
  MAIN = '/messenger',
  REG = '/sign-up',
  PROFILE = '/profile',
  PASS = '/settings-pass',
  DATA = '/settings-data',
  ROUTE404 = '/404',
  ROUTE500 = '/500',
}

const baseURL = "https://ya-praktikum.tech/api/v2"

enum PATHS {
  USER = '/auth/user',
  CHATSUSERS = '/chats/users',
  TOKEN = '/chats/token',
  CHATS = '/chats',
  LOGOUT = '/auth/logout',
  RESOURCES = '/resources',
  SIGNIN = '/auth/signin',
  SIGNUP = '/auth/signup',
  PROFILE = '/user/profile',
  PASSWORD = '/user/password',
  AVATAR = '/avatar'
}

const xhrContentType = {
  'Content-type': 'application/x-www-form-urlencoded'
}

export { ROUTES, baseURL, xhrContentType, PATHS };
