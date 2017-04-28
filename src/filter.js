// 院校label匹配
exports.raplaceLabel = (v) => {
  var str = '';
  switch (v) {
    case '985高校':
      str = '985';
      break;
    case '211工程':
      str = '211';
      break;
    case '有研究生院':
      str = '研';
      break;
    case '含国防生':
      str = '国';
      break;
    case '卓越计划':
      str = '卓';
      break;
    default:
      str = '自';
      break;
  }
  return str;
};

// 院校img url处理
exports.schoolAvatarUrl = (v) => {
  if (v) {
    var reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
    if (!!v.match(reg)) {
      return v;
    } else {
      return 'http://123.59.12.77:8080/' + v;
    }
  }
};
