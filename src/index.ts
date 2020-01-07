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
export function isSameStructJson(json1:Object,json2:Object) :boolean{
  let finger1  = getJsonSturctFinger(json1);
  let finger2  = getJsonSturctFinger(json2);
  return finger1 ===finger2;
}

/**
 * 获取 json结构的 finger
 */
export function getJsonSturctFinger(json:Object) {
  let fingerStr  = getObjFinger(json).sort().join("");
  return  fingerStr;
}

function getObjFinger(obj,record:string[]=[],parent="") :string[]{
  if(typeof obj==='object') {
    for (let key in obj) {
      //如果 是数组呢.
      let currentPath = joinStr(parent,key);
      record.push(currentPath);
      if( typeof obj[key] ==='object') {
        if(obj[key] instanceof Array && obj[key].length>0) {
          getObjFinger(obj[key][1],record,currentPath="[0]");
        }else{
          getObjFinger(obj[key],record,currentPath);
        }
      }
    }
  }

  return record;
}


function joinStr(parent:string,current:string):string{

  let  currentRep = `${current}[${typeof current}]`;
  return parent?parent+"-":currentRep;
}
