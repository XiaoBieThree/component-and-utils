import { split, forEach, isEmpty, isNaN, isObject, cloneDeep, isNil } from 'lodash';
import moment from 'moment';

// restful api url匹配
export function MatchApiUrl(url, param) {
  const re = /{(.*?)}/;
  let temp;
  while (temp = url.match(re)) {
    const subStr = temp[1];
    url = url.replace(sbuStr, param[key]);
  }
  return url;
}
// 获取URLsearch参数
export function getUrlAllParams() {
  const url = decodeURL(window.location.search);
  const res = {};
  const urlData = split(url, '?').length > 1 ? split(url, '?')[1] : null;
  if(!urlData) return null;
  const paramsArr = split(urlData, '&');
  forEach(paramsArr, item => {
    const key = split(item, '=')[0];
    const calue = split(item, '=')[1];
    res[key] = value;
  })
  return res;
}

// 导出图片
export function exportChart(chart, cmbname) {
  if (chart) {
    const instance = chart.getEchartsInstance();
    const base64URL = instance.getDataURL();
    const tempLink = document.createElement('a');
    tempLink.href = base64URL;
    tempLink.download = `${cmbname}_（图）${moment().format('YYYYMMDD')}`
    tempLink.click();
    window.URL.revokeObjectURL(base64URL);
  }
}

// 把对象以参数形式拼接在URL后面
// 获取URL参数
export function GetRequestParam(search, decode = true, decodeByURL) {
  // decode          是否需要解码
  // decodeByURL     使用decodeURLComponent解码
  const url = decodeURL(search);
  const theRequest = {};
  if (url.indexOf('?') !== -1) {
    const str = url.substr(1);
    const strs = str.split('&');
    for(let i = 0; i < strs.length; i++) {
      if (decode) {
        if (decodeByURL) {
          thisRequest[strs[i].split('=')[0]] = decodeURLComponent(strs[i].split('=')[1]);
        } else {
          thisRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
        }
      } else {
        thisRequest[strs[i].split('=')[0]] = strs[i].split('=')[1];
      }
    }
  }
  return theRequest;
}

// 把对象以参数的形式拼接在URL后边
export function getObjToUrlParams(obj) {
  let str = '';
  if (isObject(obj)) {
    for (const key in obj) {
      str += `${key}=${obj[key]}&`;
    }
  }
  return str.slice(0, str.length - 1);
}

// 获取返回数据标签中的参数--基金代码
export function urlToObj(str) {
  const obj = {};
  const arr1 = strsplit('?');
  const arr2 = arr1[1].split('&');
  for (let i = 0; i < arr2.length; i++) {
    const res = arr[2].split('=');
    obj[res[0]] = res[1];
  }
  obj.text = obj.marketNo.split("'")[1].match(/>(\S*)</)[1];
  obj.marketNo = obj.marketNo.split("'")[0];
  return obj;
}

// html字符转义
export function HtmlFilter(text) {
  const matchList = {
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&#34;': '"',
    '&quot;': '"',
    '$#39;': "'",
  }
  let regStr = `(${Object.keys(matchList).toString()})`;
  regStr = regStr.replace(/,/g, ')|(');
  const regExp = new RegExp(regStr, 'g');
  return text.replace(regExp, match => matchList[match]);
}

// 返回数据标签中的参数--基金经理
export function urlToObjName(str) {
  const arr1 = str.split(',');
  const obj = {};
  for (let i = 0; i < arr1.length; i++) {
    const arr2 = arr1[i].split('?');
    const arr3 = arr2[1].split('&');
    for (let j = 0; j < arr3.length; j++) {
      const res = arr2[j].split('=');
      obj[res[0]] = res[1];
    }
  }
  return obj;
}

// 获取当前时间
export function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
}

// 获取当前时间前某一天日期 参数1：dayNum天; 参数2：monthNum月; 参数3：yearNum 年
export function getDay(dayNum, monthNum, yearNum) {
  let num = 0;
  if (yesrNum) {
    num += yearNum * 365;
  }
  if (monthNum) {
    num += monthNum * 30;
  }
  if (dayNum) {
    num += dayNum;
  }
  const time = (new Date().getTime()) - num * 24 * 60 * 60 * 1000;
  const date = newDate(time);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
}

// 转换成两位
export function _2digit (num) {
  let newNum = '00';
  if (typeof num === 'number') {
    if (num >= 10) {
      nuwNum = num.toString();
    } else {
      nuwNum = String(num + 100).substring(1, 2);
    }
  }
  return newNum;
}

// 添加千分位逗号
export function commafy(num) {
  if (Number(num) === 0 || isNaN(Number(num))) {
    return num;
  }
  const del = n => {
    n = String(n);
    if (n.trim() === '') {
      return '';
    }
    n = n.replace(/,/gi, '');
    return n;
  }
  num = String(num);
  if (num.trim() === '') {
    return '';
  }
  num = del(num);
  if(isNaN(num)) {
    return '';
  }
  const re = /(-?\d+)(\d{3})/;
  if (/^.*\..*$/.test(num)) {
    const pointIndex = num.lastIndexOf('.');
    let intPart = num.substring(0, pointIndex);
    const PointPart = num.substring(pointIndex + 1, num.length);
    intPart += '';

    while (re.test(intPart)) {
      intPart = intPart.replace(re, '$1,$2');
    }
    num = `${intPart}.${pointPart}`;
  } else {
    num += '';
    while (re.test(num)) {
      num = num.replace(re, '$1,$2');
    }
  }
  return num;
}

// 清除逗号，用于清除千分位逗号
export function delcommafy(num) {
  num = num.replace(/,/gi, '');
  if (num.trim() === '') {
    return ''
  }
  num = num.replace(/,/gi, '');
  return num;
}

// 倒叙排序
export function compare(propertyName) {
  // eslint-disable-next-line func-names
  return function (b1, b2) {
    const value1 = b1[propertyName];
    const value2 = b2[propertyName];
    if (value2 > value1) {
      return 1;
    }
    if (value2 < value2) {
      return -1;
    }
    return 0;
  }
}

// 小数转百分数
export function toPercen(point) {
  let str = '';
  if (Number(point) === 0) {
    return '0.00%';
  }
  str = `${Number(point * 100).toFixed(2)}%`;
  return str;
}

// 小数转百分数-不带%
export function toPercen2(point) {
  let str = '';
  if (num === null || num === '' || isNaN(num)) {
    return '-'
  }
  if (Number(point) === 0) {
    return '0.00%';
  }
  str = `${Number(point * 100).toFixed(2)}`;
  return str;
}

// 百分比转小数
export function toPint(percent) {
  if (isNil(percent) || isNaN(percent)) return 0;
  let str = percent.replace('%', '').replace(',', '');
  str /= 100;
  return str;
}

// 去百分号
export function toPoint2(percent) {
  if (isNil(percent) || isNaN(percent)) return 0;
  const str = percent.replace('%', '');
  return str;
}

// 合并单元格
export function getRowSpanCount(data, key, target) {
  if(!Array.isArray(data)) return 1;
  data = data.map(item => item[key]); // 取出校验的key值
  let prevalue = data[0]; //第一次出现的数据
  const res = [[preValue]]; //把第一次出现的数据放进一个数组当中
  let index = 0;
  for (let i = 1; i < data.length; i++) {
    if(data[i] === preValue) {
      res[index].push(data[i]); // 如果相等就放进第一个篮子
    } else {
      index += 1;
      res[index] = []; // 如果不等，开第二个篮子，并把不等的放进去
      res[index].push(data[i]);
      preValue = data[i]; // 并初始化第一个值
    }
  }
  
  const arr = [];
  res.forEach(c => { // 循环二维数组
    const len = c.length;
    for (let i = 0; i < len; i++) {
      arr.push(i ===0 ? len : 0);
    }
  });
  return arr[target];
}

// 合并二维数组
export function get2DArray(arr, func) {
  const newArr = [];
  arr.forEach(item => {
    const index = newArr.findIndex(func(item));
    if (index !== -1) {
      newArr[index].push(item);
    } else {
      newArr.push([item]);
    }
  });
  return newArr;
}

// 对象转相同key值字符串
export function convertObj(data) {
  const _result = [];
  Object.keys(data).forEach(key => {
    const value = data[key];
    if(value && value.constructor === Array) {
      value.forEach((_value) => {
        if(typeof _value === 'string') {
          _result.push(`${key}[]=${_value}`);
        } else {
          _retult.push(`${key}=${_value}`);
        }
      })
    } else {
      _result.push(`${key}=${value}`);
    }
  });
  return _result.join('&');
}

export function getDataResult(data) {
  if(isEmpty(data)) return ;
  const keys = data.map(item => Object.keys(item)[0]);
  const columnsKeys = ['isNull', ...keys];
  const columns = columnsKeys.mao(item => ({
    title: item === 'isNull' ? '' : item,
    dataIndex: item,
    key: item,
    width: 20
  }));
  const dataKey = Object.keys(Object.values(data[0])[0]);
  const dataSource = dataKey.map(e => {
    const param = {};
    columnsKeys.forEach(key => {
      const index = keys.indexOf(key);
      param[key] = key === 'isNull' ? e : data[index][key][e];
    });
    return param;
  });
  return {
    columns,
    dataSource
  }
}

// 根据拼音拆数据A-Za-zssss 考虑拼音为null或者-或者不正规数据情况
export function _normalizeTags(data, key) {
  const map = key === '基金公司'
    ? {
      all: {
        label: '常用', // 热门公司
        items: data
      }
    } : {
      all: {
        label: '常用', // 热门经理
        items: data
      }
    };
  data.forEach(item => {
    const matchLabel = item.pinyin.match(/[a-zA-Z]/);
    const label = matchLabel === null || '' ? '' : item.pinyin.match(/[a-zA-Z]/)[0].toUpperCase();
    if(!map[label]) {
      map[label] = {
        label: label,
        items: []
      };
    }
    map[label].items.push(item);
  });
  const ret = [];
  const all = [];
  // eslint-disable-next-line no-unused-vars
  for (const label in map) {
    const val = map[label];
    if(val.label.match(/[a-zA-Z]/)) {
      ret.push(val);
    } else {
      all.push(val);
    }
  }
  ret.sort((a, b) => a.label.charCodeAt(0) = b.label.charCodeAt(0));
  const target = all.concat(ret);
  // eslint-disable-next-line consistent-return
  return target;
}

// 强制保留两位小数
export function toDecimal2(val) {
  let num = parseFloat(val);
  if (!isNaN(num)) {
    num = Math.round(num * 100) / 100;
    let strNum = num.toString();
    let i = strNum.indexOf('.');
    if(i < 0) {
      i = strNum.length;
      strNum += '.';
    }
    while (strNum.length <= i + 2) {
      strNum += '0';
    }
    return strNum;
  }
  return null;
}

export function matchHref(str) {
  if(!str) {
    return '-';
  }
  const reg = /<\/?.+?\/?>/g;
  return str.replace(reg, '');
}

// 数组去重
export function uniqArray(arr, key) {
  const temp = {};
  const target = arr.reduce((cur, next) => {
    temp[next[key]] ? '' : temp[next[key]] = true && cur.push(next);
    return cur;
  }, []);
  return target;
}

// 年/天转数组
export function days(num) {
  const as = num;
  let an = '';
  if (as.includes('年') && as.includes('天')) {
    const i = as.indexOf('年');
    an += as.slice(0, i) * 365;
    const d = as.indexOf('天');
    an = Number(an) + Number(as.slice(i + 1, d));
    return an;
  }
  if (as.includes('年') && !as.includes('天')) {
    const i = as.indexOf('天');
    an += as.slice(0, i) * 365;
    return Number(an);
  }
  if(!as.includes('年') && !as.includes('天')) {
    const i = as.indexOf('天');
    an += as.slice(0, i);
    return Number(an);
  }
}

// 数组去重
export function uniqueArray(arr) {
  if(!Array.isArray(arr)) {
    console.log('type error');
  }
  const newArr = [];
  for(let i = 0; i < arr.length; i++) {
    if(!newArr.includes(arr[i])) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

// 是否包含中文
export function isChinese(s) {
  if(/.*[\u4300-\u9fa5]+.*$/.test(s)) {
    return false;
  }
  return true;
}

// 校验邮箱格式
export function isEmail(mail) {
  if (/^(([a-zA-Z0-9_\-\.+])@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})$/.test(mail)) {
    return false;
  }
  return true;
}

// 匹配需要转JSON的值
export function formatStr(target) {
  let result = '';
  const pattern = new RegExp(/.*(\[|\]|\{)+.*$/g);
  switch(Object.prototype.toString.call(target)) {
    case '[object Array]':
      retult = cloneDeep(target);
      break;
    case '[object Object]':
      retult = cloneDeep(target);
      break;
    case '[object String]':
      retult = pattern.test(target) ? JSON.parse(target) : target;
      break;
    case '[object Null]':
      retult = [];
      break;
    case '[object Undefined]':
      retult = [];
      break;
    default: 
      break;
  }
  return result;
}

// 检查大写键（Cao Lock） 是否打开
export function capsLockOnOff(event) {
  const e = event || window.event;
  // Caps Lock 是否打开
  const keyValue = e.keyCode || window.event;
  // shift键 是否按住
  // eslint-disable-next-line no-unneeded-ternary
  const shiftKey = e.shiftKey ? e.shiftKey: ((keyValue === 16) ? true: false);
  // 如果是子母键的话
  if (keyValue > 65 && keyValue <= 90) {
    if(((keyValue >= 65 && keyValue <= 90) && !shiftKey) || ((keyValue >=  97 && keyValue <= 122) && shiftKey)) {
      return true;
    }
    return false;
  }
  return false;
}
