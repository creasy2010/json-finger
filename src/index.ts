/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/4
 **/

/**
 * 判断两个json是否一致;
 */
export function isSame(json1: Object, json2: Object): boolean {
  let finger1 = toFinger(json1);
  let finger2 = toFinger(json2);
  return finger1 === finger2;
}

type FingerItems=string[];
interface IOption {
  beforeFinger?:(FingerItems)=>FingerItems;

  //判断某些key节点是否忽略;;
  isIgnore?: (
    parentPath: string,
    key: string,
    context: {
      record: string[];
      current: object;
      root: object;
    },
  ) => boolean;
}
/**
 * 获取 json结构的 finger
 */
export function toFinger(json: Object, option?: IOption): string {
  let fingerItems = getObjFinger(json, {
    option,
  });

  if(option?.beforeFinger){
    fingerItems = option.beforeFinger(fingerItems);
  }

  let fingerStr =fingerItems
    .sort()
    .join('');
  return fingerStr;
}

function getObjFinger(
  obj,
  context?: {
    root?: object;
    record?: string[];
    parent?: string;
    option?: IOption;
  },
): string[] {
  let _context = {record: [], parent: '', ...context};

  if (_context.record.length === 0) {
    _context.root = obj;
  }

  let {record, parent, option} = _context;

  if (typeof obj === 'object') {
    for (let key in obj) {
      if (option?.isIgnore && !option?.isIgnore(parent, key, {
          record,
          current: obj,
          root: _context.root,
        })
      ) {
        continue;
      }
      //如果 是数组呢.
      let currentPath = joinStr(parent, key);
      record.push(currentPath);
      if (typeof obj[key] === 'object') {
        if (obj[key] instanceof Array && obj[key].length > 0) {
          getObjFinger(obj[key][1], {
            record,
            parent: currentPath + '[0]',
          });
        } else {
          getObjFinger(obj[key], {
            record,
            parent: currentPath,
          });
        }
      }
    }
  }

  return record;
}

function joinStr(parent: string, current: string): string {
  let currentRep = `${current}[${typeof current}]`;
  return parent ? parent + '-' : currentRep;
}
