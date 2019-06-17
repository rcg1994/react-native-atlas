### ATModalMessage

**具体组件效果请下载示例APP进行查看：atlas-app**

文档地址：[https://github.com/rcg1994/react-native-atlas/wiki/ModalMessage](https://github.com/rcg1994/react-native-atlas/wiki/ModalMessage)

引入：

```javascript
import { ATModalMessage } from 'react-native-atlas'
Or
import { ATModal } from 'react-native-atlas'

ATModal.toast({})
```

使用：

```javascript
ATModalMessage({
  content: '系统异常提示（模拟）'
})

Or

ATModal.toast({
  content: '系统异常提示（模拟）'
})
```

#### 信息弹窗

<img src="https://github.com/rcg1994/light/raw/master/images/atals/modal-message.gif" width="400"/>

```javascript
import { ATButton, ATModalMessage } from "react-native-atlas";

<ATButton
  ghost
  style={AppStyles.mt10}
  onPress={() =>
    ATModalMessage({
      title: '我是标题',
      content: '我是内容',
      okText: '朕知道了'
    })
  }
>
  信息提示
</ATButton>

<ATButton
  ghost
  style={AppStyles.mt10}
  onPress={() =>
    ATModalMessage({
      title: '提示',
      content: '这是一个会自动关闭的信息',
      okText: '点击主动关闭',
      duration: 5000
    })
  }
>
  自动关闭
</ATButton>

<ATButton
  ghost
  style={AppStyles.mt10}
  onPress={() =>
    ATModalMessage({
      title: null,
      content: '这是一个没有标题的信息'
    })
  }
>
  隐藏标题
</ATButton>

<ATButton
  ghost
  style={AppStyles.mt10}
  onPress={() =>
    ATModalMessage({
      icon: <Icon name="thumbs-up" size={30} color={Colors.primary} />,
      content: '这是一个带icon的信息'
    })
  }
>带图标的提示</ATButton>

```

#### 确认弹窗

<img src="https://github.com/rcg1994/light/raw/master/images/atals/modal-confirm.gif" width="400"/>

```javascript
import { ATButton, ATModalMessage } from "react-native-atlas";

<ATButton
  ghost
  type="warning"
  style={AppStyles.mt10}
  onPress={() =>
    ATModalConfirm({
      title: '确认操作',
      content: '确定要执行操作吗？',
      onOk: () => {
        ATModalMessage({
          content: '选择了确认'
        })
      },
      onCancel: () => {
        ATModalMessage({
          content: '选择了取消'
        })
      }
    })
  }
>
  可交互提示
</ATButton>

<ATButton
  type="danger"
  ghost
  style={AppStyles.mt10}
  onPress={() =>
    ATModalConfirm({
      title: '重要提示',
      content: '确定要执行操作吗？',
      buttonVertical: true,
      divide: true,
      buttons: [
        {
          title: '取消',
          type: 'cancel',
          onPress: () => {}
        },
        {
          title: '稍后执行',
          type: 'light',
          color: 'red',
          onPress: () => {}
        },
        {
          title: '立即执行',
          type: 'primary',
          onPress: () => {}
        }
      ]
    })
  }
>
  自定义交互按钮
</ATButton>

```

#### 对话弹窗

<img src="https://github.com/rcg1994/light/raw/master/images/atals/modal-prompt.gif" width="400"/>

```javascript
import { ATButton, ATModalPrompt } from "react-native-atlas";

<ATButton
  ghost
  type="success"
  style={AppStyles.mt10}
  onPress={() =>
    ATModalPrompt({
      autoFocus: true,
      title: '请输入您的手机号',
      label: '手机号',
      width: 300,
      onOk: (v) => {
        ATModalMessage({
          title: '提示',
          content: `输入的内容为：${v}`,
          okText: '关闭',
          duration: 3000
        })
      }
    })
  }
>
    对话框
</ATButton>
```

### API

#### ATModalMessage (ATModal.message)


| 属性  | 说明         | 类型           | 默认值  |
| ----- | ------------ | -------------- | ------- |
| title | 标题      |  string         | `''`  |
| content | (必填) 提示内容      |  string         | `''`  |
| contentAlign | 内容区对齐方式      |  string         | `center'`  |
| okText | 确认按钮的文字     |  string         | `我知道了`  |
| onOk | 确认事件     |  function         | `null`  |
| icon | 图标     |  element         | `null`  |
| contentMaxHeight | 内容区最大高度     |  number         | `null`  |
| backButtonClose | 虚拟返回按键是否能关闭弹窗      |  boolean         | `false'`  |
| backdropPressToClose | 点击蒙层是否能关闭弹窗      |  boolean         | `false'`  |
| backdropOpacity | 蒙层透明度      |  number         | `0.5'`  |
| duration | 持续显示的时间      |  number         | `Theme.modal_toast_duration`  |
| animation | 动画     |  boolean         | `true`  |

#### ATModalConfirm (ATModal.confirm)

##### 继承自 ATModalMessage


| 属性  | 说明         | 类型           | 默认值  |
| ----- | ------------ | -------------- | ------- |
| cancelText | 取消按钮的文字     |  string         | `取消`  |
| onCancel | 取消事件     |  function         | `null`  |
| buttons | 自定义按钮     |  array         | `[]`  |
| buttons.type | 自定义按钮类型     |  string         | `primary`  |
| buttons.title | 自定义按钮文案     |  string         | `null`  |
| buttons.color | 自定义按钮颜色     |  string         | `null`  |
| buttons.onPress | 自定义按钮点击事件     |  function         | `null`  |

#### ATModalPrompt (ATModal.prompt)

##### 继承自 ATModalConfirm

| 属性  | 说明         | 类型           | 默认值  |
| ----- | ------------ | -------------- | ------- |
| autoFocus | 自动聚焦     |  boolean         | `false`  |
| label | 输入框标签     |  string         | `null`  |