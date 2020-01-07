# json-finger
根据json结构提取finger对比两个json结构是否一致


##
详见单元测试
```typescript
describe('simple usecase', () => {

  it('顺序问题验证 ', function() {
    let a  = toFinger({a:1,b:2});
    let b  = toFinger({b:2,a:1});
    expect(a).toEqual(b);
  });


  it('数字与字符问题 ', function() {
    let a  = toFinger({a:1,1:1231});
    let b  = toFinger({a:2,"1":1123});
    expect(a).toEqual(b);
  });

  it('数组问题验证 ', function() {
    let a  = toFinger({a:1,b:2,arr:[
        {a:1},
        {a:2},
        {a:3},
      ]});
    let b  = toFinger({b:2,a:1,arr:[
        {a:1},
        {a:3},
      ]});
    expect(a).toEqual(b);
  });
});


describe('option 测试', () => {
  it('ignore', async () => {
    let a  = toFinger({a:1,b:2},{
      isIgnore:()=>false
    });
    expect(a).toMatchSnapshot();
  });

  it('beforeFinger', async () => {
    let a  = toFinger({a:1,b:2},{
      beforeFinger:(fingerItems)=>{
        expect(fingerItems).toMatchSnapshot();
        return fingerItems;
      }
    });
    expect(a).toMatchSnapshot();
  });
});
```