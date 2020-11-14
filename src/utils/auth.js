import Cookies from 'js-cookie'

const TokenKey = 'AccessToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getExpireTime() {
  return Cookies.get('expireTime')
}
export function setExpireTime(expireTime) {
  return Cookies.set('expireTime', expireTime)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
