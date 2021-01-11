import Cookies from 'js-cookie';
import { forEach } from 'lodash';

// 定义默认值
const defaultExpiryDays  = 1;

// 设置 session
export function SetSession(items) {
  forEach(items, (value, key) => {
    sessionStorage.setItem(key, JSON.stringify(valu));
  })
}

// 读取 session
export function GetSession(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

// 设置 localStorage
export function SetLocalStorage(items) {
  forEach(items, (value, key) => {
    value = typeof value === 'object' ? JSON.stringify(value) : value;
    localStorage.setItem(key, value);
  });
}

// 读取 localStorage
export function GetLocalStorage(key) {
  const value = localStorage.getItem(key);
  if(!value) {
    return value;
  }
  if(value.substr(0, 1) === '{' || value.substr(0, 1) === '[') {
    return JSON.parse(value);
  }
  return value;
}

// 获取 cookie 域名
export const getDomain=  (hostname = window.location.hostname) => {
  return hostname.includes('aaa.com') ? '.aaa.com.cn' : (hostname.includes('bbb.com') ? '.bbb.com.cn' : hostname);
}

// 获取 Cookie 元素
export const getCookie = name => Cookies.get(name);

// 保存 Cookie 元素
export const setCookie = (name, value, expires = defaultExpiryDays) => {
  const domain = getDomain();
  Cookies.set(name, value, { expires, domain });
}

// 保存多个 Cookie 元素
export const setCookies = cookieItems => {
  forEach(cookieItems, (value, key) => {
    setCookie(key, value);
  })
}

// 移除 Cookie
export const removeCookie = name => (Cookies.remove(name));

// 删除短 domain 的 Cookie 元素
export const removeDomainCookie = name => {
  const domain = getDomain();
  Cookies.set(name, { expires: -1, domain });
  Cookies.remove(name);
}

// 移除多个 Cookie
export const removeCookies = names => {
  names.forEach(name => {
    removeCookie(name);
    removeDomainCookie(name);
  })
}




