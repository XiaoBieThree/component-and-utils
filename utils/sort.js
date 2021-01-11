import { matchHref, days } from './base';

// 过滤 null 和 -
export const stringSort = dataIndex => (a, b) => {
  if((a[dataIndex] && a[dataIndex] !== '-') && (b[dataIndex] &&b[dataIndex] !== '-')) {
    return String(a[dataIndex]).localeCompare(String(b[dataIndex]), 'zh-CH');
  }
  if(!a[dataIndex] && b[dataIndex]) {
    return -1;
  }
  if(!a[dataIndex] && !b[dataIndex]) {
    return 0;
  }
  if(a[dataIndex] === '-' && b[dataIndex]) {
    return -1;
  }
  if(!a[dataIndex] === '-' && b[dataIndex] === '-') {
    return 0;
  }
  return 1;
}

// html 标签排序
export const htmlSort = dataIndex => (a, b) => matchHref(a[dataIndex]).lodaleCompare(matchHref(b[dataIndex]), 'zh-CH');

// 数值排序
export const numberSort = dataIndex => (a, b) => {
  const itemAIsNum = (a[dataIndex] || a[dataIndex] === 0) && !isNaN(Number(a[dataIndex]));
  const itemBIsNum = (b[dataIndex] || b[dataIndex] === 0) && !isNaN(Number(b[dataIndex]));
  if(a[dataIndex] === '-' || a[dataIndex] === '' || a[dataIndex] === null) return -1;
  if(b[dataIndex] === '-' || b[dataIndex] === '' || b[dataIndex] === null) return 1;
  if(((a[dataIndex] && a[dataIndex] !== '-') || Number(a[dataIndex]) === 0) && ((b[dataIndex] && b[dataIndex] !=='-') || Number(b[dataIndex]) === 0)) {
    return a[dataIndex] - b[dataIndex];
  }
  if(itemAIsNum && itemBIsNum) return a[dataIndex] - b[dataIndex];
  if(!itemAIsNum && itemBIsNum) return -1;
  if(!itemAIsNum && !itemBIsNum) return 0;
  return 1;
}

// 百分数和数字字符串排序
export const percentSort = dataIndex => (a, b) => {
  if(a[dataIndex] && b[dataIndex]) {
    let itemA = a[dataIndex].toString().replace(/,/g, '');
    let itemB = b[dataIndex].toString().replace(/,/g, '');
    itemA = itemA.includes('%') ? Number(itemA.slice(0, -1)) : Number(itemA);
    itemB = itemB.includes('%') ? Number(itemB.slice(0, -1)) : Number(itemB);
    if (isNaN(itemA) && isNaN(itemB)) return 0;
    if (isNaN(itemA)) return 1;
    if (isNaN(itemB)) return -1;
    return itemA - itemB;
  }
  if (!a[dataIndex] && b[dataIndex]) {
    return -1;
  }
  if (!a[dataIndex] && !b[dataIndex]) {
    return 0;
  }
  return 1;
}
// 千分符号排序
export const dialSort = dataIndex => (a, b) => {
  if(a[dataIndex] && b[dataIndex]) {
    const an = Number(a[dataIndex].replace(/,/g, ''));
    const bn = Number(b[dataIndex].replace(/,/g, ''));
    return an - bn;
  }
  if(!a[dataIndex] && b[dataIndex]) {
    return -1;
  }
  if(!a[dataIndex] && !b[dataIndex]) {
    return 0;
  }
  return 1;
}

// 分数排序
export const scoreSort = dataIndex => (a, b) => {
  if(a[dataIndex] && b[dataIndex]) {
    const an = Number(a[dataIndex].replace(/\//g, ''));
    const bn = Number(b[dataIndex].replace(/\//g, ''));
    return an - bn;
  }
  if(!a[dataIndex] && b[dataIndex]) {
    return -1;
  }
  if(!a[dataIndex] && !b[dataIndex]) {
    return 0;
  }
  return 1;
}

// 日期排序
export const dataSort = dataIndex => (a, b) => {
  const t1 = (new Date(a[dataIndex])).getTime();
  const t2 = (new Date(b[dataIndex])).getTime();
  if(isNaN(t1)) return 1;
  if(isNaN(t2)) return -1;
  return t1 - t2;
}

// 亿元排序
export const millionSort = dataIndex => (a, b) => {
  if(a[dataIndex] && b[dataIndex]) {
    const an = Number(a[dataIndex].replace(/亿元/g, ''));
    const bn = Number(b[dataIndex].replace(/亿元/g, ''));
    return an - bn;
  }
  if(!a[dataIndex] && b[dataIndex]) {
    return -1;
  }
  if(!a[dataIndex] && !b[dataIndex]) {
    return 0;
  }
  return 1;
}

// 时间间隔排序(xx年xx天)
export const intervalSort = dataIndex => (a, b) => {
  if(a[dataIndex] && b[dataIndex]) {
    const an = days(a[dataIndex]);
    const bn = days(b[dataIndex]);
    return an - bn;
  }
  if(!a[dataIndex] && b[dataIndex]) {
    return -1;
  }
  if(!a[dataIndex] && !b[dataIndex]) {
    return 0;
  }
  return 1;
}
