### ATModalToast

**具体组件效果请下载示例APP进行查看：atlas-app**

文档地址：[https://github.com/rcg1994/react-native-atlas/wiki/ModalToast](https://github.com/rcg1994/react-native-atlas/wiki/ModalToast)

引入：

```javascript
import { ATModalToast } from 'react-native-atlas'
Or
import { ATModal } from 'react-native-atlas'

ATModal.toast({})
```

使用：

```javascript
ATModalToast({
  content: '系统异常提示（模拟）'
})

Or

ATModal.toast({
  content: '系统异常提示（模拟）'
})
```

#### 信息提示

<img src="https://github.com/rcg1994/light/raw/master/images/atals/modal-toast.gif" width="400"/>

```javascript
import { ATButton, ATModalLoading } from "react-native-atlas";

<ATButton
  ghost
  style={AppStyles.mt10}
  onPress={() =>
    ATModalToast({
      content: '系统异常提示（模拟）',
      duration: 5000
    })
  }
>
  显示5秒后关闭
</ATButton>

<ATButton
  ghost
  style={AppStyles.mt10}
  onPress={() =>
    ATModalToast({
      content:
        '这是一段较长内容的提示，这是一段较长内容的提示，这是一段较长内容的提示，这是一段较长内容的提示。'
    })
  }
>
  长内容
</ATButton>

<ATButton
  ghost
  style={AppStyles.mt10}
  onPress={() =>
    ATModalToast({
      content: '显示在中间的提示信息',
      position: 'center'
    })
  }
>
  自定义位置
</ATButton>

```

### API

#### ATModalToast (ATModal.toast)


| 属性  | 说明         | 类型           | 默认值  |
| ----- | ------------ | -------------- | ------- |
| content | (必填) 提示内容      |  string         | `''`  |
| duration | 持续显示的时间      |  number         | `Theme.modal_toast_duration`  |
| position | 显示位置（默认下方）     |  string         | `bottom`  |

