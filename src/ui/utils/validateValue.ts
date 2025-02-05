export const validateColorString: (str: string) => boolean = (str) => {
  if (str[0] === '#') {
    const reg = new RegExp('/^#([A-Fa-f0-9]{3}){1,2}$/i');
    if (reg.test(str.slice(1, str.length))) {
      return true;
    }
    return false;
  }
  if (str.startsWith('(') && str.endsWith(')')) {
    const numStrArr = str.slice(1, str.length - 1).split(',');
    // eslint-disable-next-line no-useless-escape
    const reg = new RegExp('^\d{3}$');
    let flag = true;
    numStrArr.forEach((item) => {
      if (!reg.test(item)) flag = false;
    });
    return flag;
  }
  return false;
};

export const handleSizeString: (input: string | number) => string = (input) => {
  if (typeof input === 'number') {
    return input.toString() + 'px';
  }

  if (typeof input === 'string') {
    // eslint-disable-next-line no-useless-escape
    const reg = new RegExp('^\d+px&');
    if (reg.test(input)) {
      return input;
    }
  }

  // 返回一个默认值， 这里我设定的是 16px
  return '16px';
};
