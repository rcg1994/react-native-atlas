### ATModalCreate

**具体组件效果请下载示例APP进行查看：atlas-app**

文档地址：[https://github.com/rcg1994/react-native-atlas/wiki/ModalCreate](https://github.com/rcg1994/react-native-atlas/wiki/ModalCreate)

引入：

```javascript
import { ATModalCreate } from 'react-native-atlas'
Or 
import { ATModal } from 'react-native-atlas'

ATModal.create({})
```

使用：

```javascript
ATModalCreate({
  render: ()=>{}
})

Or 

ATModal.create({
  render: ()=>{}
})
```

#### 信息提示

<img src="https://github.com/rcg1994/light/raw/master/images/atals/modal-create.gif" width="400"/>

```javascript
import { ATText, ATButton, ATModalCreate } from "react-native-atlas";

<ATButton
  ghost
  type="success"
  style={AppStyles.mt10}
  onPress={() => {
    let modal = ATModalCreate({
      render: () => (
        <View
          style={{
            width: 300,
            padding: 20,
            borderRadius: 6,
            backgroundColor: '#fff'
          }}
        >
          <ATText size={22} color="#666">
            这是一个自定义的弹窗
          </ATText>
          <ATText
            size={18}
            color="#999"
            style={{ marginVertical: 20 }}
          >
            你可以在这实现任意的样式和逻辑，几乎可以满足日常的所有弹出层需求了
          </ATText>
          <ATButton
            style={AppStyles.mt10}
            onPress={() => {
              modal.close()
            }}
          >
            点击关闭
          </ATButton>
        </View>
      )
    })
  }}
>
  自定义弹出层
</ATButton>

```

### API

#### ATModalCreate (ATModal.create)


| 属性  | 说明         | 类型           | 默认值  |
| ----- | ------------ | -------------- | ------- |
| render | (必填) 渲染方法      |  function         | `null`  |
| modal.close() | 实例有关闭弹窗的方法      |  -         | `null`  |
