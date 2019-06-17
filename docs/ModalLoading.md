### ATModalLoading

**具体组件效果请下载示例APP进行查看：atlas-app**

文档地址：[https://github.com/rcg1994/react-native-atlas/wiki/ModalLoading](https://github.com/rcg1994/react-native-atlas/wiki/ModalLoading)

引入：

```javascript
import { ATModalLoading } from 'react-native-atlas'
Or 
import { ATModal } from 'react-native-atlas'

ATModal.loading({})
```

使用：

```javascript
ATModalLoading({
  content: '系统异常提示（模拟）'
})

Or 

ATModal.loading({
  content: '系统异常提示（模拟）'
})
```

#### 信息提示

<img src="https://github.com/rcg1994/light/raw/master/images/atals/modal-loading.gif" width="400"/>

```javascript
import { ATButton, ATModalLoading } from "react-native-atlas";

<ATButton
  ghost
  style={AppStyles.mt10}
  onPress={() => {
    let modal = ATModalLoading({
      content: '努力加载中...'
    })
    setTimeout(() => {
      modal.close()
    }, 3000)
  }}
>
  自主关闭
</ATButton>

<ATButton
  ghost
  style={AppStyles.mt10}
  onPress={() =>
    ATModalLoading({
      content: '努力加载中...',
      duration: 2000
    })
  }
>
  显示两秒后自动关闭
</ATButton>

```

### API

#### ATModalLoading (ATModal.loading)


| 属性  | 说明         | 类型           | 默认值  |
| ----- | ------------ | -------------- | ------- |
| content | (必填) 提示内容      |  string         | `''`  |
| duration | 持续显示的时间      |  number         | `Theme.modal_toast_duration`  |


