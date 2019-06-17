### ATModalSelect

**具体组件效果请下载示例APP进行查看：atlas-app**

文档地址：[https://github.com/rcg1994/react-native-atlas/wiki/ModalSelect](https://github.com/rcg1994/react-native-atlas/wiki/ModalSelect)

引入：

```javascript
import { ATModalSelect } from 'react-native-atlas'
Or
import { ATModal } from 'react-native-atlas'

ATModal.select({})
```

使用：

```javascript
ATModalSelect({
  buttons: []
})

Or

ATModal.select({
  buttons: []
})
```

#### 信息提示

<img src="https://github.com/rcg1994/light/raw/master/images/atals/modal-select.gif" width="400"/>

```javascript
import { ATButton, ATModalSelect } from "react-native-atlas";

<ATButton
  ghost
  style={AppStyles.mt10}
  onPress={() =>
    ATModalSelect({
      buttons: [
        {
          content: '特别关心',
          onPress: () => {}
        },
        {
          content: '屏蔽消息',
          onPress: () => {}
        },
        {
          content: '添加到黑名单',
          contentTextStyle: {
            color: '#999'
          },
          onPress: () => {}
        }
      ]
    })
  }
>选择弹窗</ATButton>

<ATButton
  ghost
  style={AppStyles.mt10}
  onPress={() =>
    ATModalSelect({
      buttons: [
        {
          content: '我是男性',
          left: <Icon name={'mars'} color="blue" size={16} />,
          onPress: () => {}
        },
        {
          content: '我是女性',
          left: <Icon name={'venus'} color="pink" size={16} />,
          onPress: () => {}
        },
        {
          content: '我是中性',
          left: <Icon name={'neuter'} size={16} />,
          onPress: () => {}
        }
      ]
    })
  }
>带图标的选择弹窗</ATButton>

<ATButton
  ghost
  style={AppStyles.mt10}
  onPress={() =>
    ATModalSelect({
      bottom: true,
      buttons: [
        {
          content: '我是男性',
          onPress: () => {}
        },
        {
          content: '我是女性',
          onPress: () => {}
        }
      ]
    })
  }
>自定义位置</ATButton>

<ATButton
  ghost
  style={AppStyles.mt10}
  onPress={e => {
    ATModalSelect(
      {
        float: true,
        width: 150,
        buttons: [
          {
            content: '我是男性',
            onPress: () => {}
          },
          {
            content: '我是女性',
            onPress: () => {}
          }
        ]
      },
      e
    )
  }}
>是否悬浮</ATButton>

<ATButton
  ghost
  style={AppStyles.mt10}
  onPress={() => {}}
  onLongPress={e => {
    ATModalSelect(
      {
        float: true,
        width: 150,
        buttons: [
          {
            content: '我是男性',
            onPress: () => {
              console.log()
            }
          },
          {
            content: '我是女性',
            onPress: () => {}
          }
        ]
      },
      e
    )
  }
  }
>长按触发</ATButton>

```

### API

#### ATModalSelect (ATModal.select)


| 属性  | 说明         | 类型           | 默认值  |
| ----- | ------------ | -------------- | ------- |
| buttons | (必填) 按钮选项      |  array         | `''`  |
| bottom | 是否在下方      |  boolean         | `false`  |
| float | 是否悬浮      |  boolean         | `false`  |
| width | 宽度（悬浮时设置）     |  number         | `''`  |


