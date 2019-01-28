### ATButton

**具体组件效果请下载示例APP进行查看：atlas-app**

文档地址：[https://github.com/rcg1994/react-native-atlas/wiki/Button](https://github.com/rcg1994/react-native-atlas/wiki/Button)

引入：

```javascript
import { ATButton } from 'react-native-atlas'
```

使用：

```javascript
<ATButton onPress={()=>{}}>按钮</ATButton>
```

#### 不同类型的按钮

<img src="https://github.com/rcg1994/light/raw/master/images/atals/button-01.png" width="400"/>

```javascript
import { ATButton, ATRowView } from "react-native-atlas";

<ATRowView>

  <ATButton>primary</ATButton>

  <ATButton type="secondary">secondary</ATButton>

  <ATButton type="success">success</ATButton>

  <ATButton type="danger">danger</ATButton>

  <ATButton type="warning">warning</ATButton>

  <ATButton type="info">info</ATButton>

</ATRowView>
```

#### 不同形式的按钮

<img src="https://github.com/rcg1994/light/raw/master/images/atals/button-02.png" width="400"/>

```javascript
import { ATButton, ATRowView } from "react-native-atlas";

<ATRowView>

  <ATButton>普通按钮</ATButton>

  <ATButton ghost>幽灵按钮</ATButton>

  <ATButton text>文字按钮</ATButton>

</ATRowView>
```

#### 图标按钮

<img src="https://github.com/rcg1994/light/raw/master/images/atals/button-03.png" width="400"/>

```javascript

import { ATButton, ATIconButton, ATRowView } from "react-native-atlas";

import Icon from "react-native-vector-icons/FontAwesome";

<ATRowView>
    
  <ATIconButton style={Styles.btn} text>
    <Icon name="github" size={22} />
  </ATIconButton>

  <ATIconButton style={Styles.btn}>
    <Icon name="github" size={22} />
  </ATIconButton>

  <ATIconButton style={Styles.btn} ghost>
    <Icon name="github" size={22} />
  </ATIconButton>

  <ATButton style={Styles.btn} icon={<Icon name="github" size={22} />}>
    Github
  </ATButton>

</ATRowView>

```

#### 禁用按钮

<img src="https://github.com/rcg1994/light/raw/master/images/atals/button-04.png" width="400"/>

```javascript
import { ATButton, ATRowView } from "react-native-atlas";

<ATRowView>
    
  <ATButton disabled>
    禁用
  </ATButton>

  <ATButton disabled ghost>
    禁用
  </ATButton>

  <ATButton disabled text>
    禁用
  </ATButton>

</ATRowView>
```

#### 长按钮的不同形态

<img src="https://github.com/rcg1994/light/raw/master/images/atals/button-05.png" width="400"/>

```javascript
import { ATButton } from 'react-native-atlas'

<ATButton>normal</ATButton>

<ATButton full>full</ATButton>

<ATButton interspace>interspace</ATButton>
```

#### 自定义按钮颜色

<img src="https://github.com/rcg1994/light/raw/master/images/atals/button-06.png" width="400"/>

```javascript
import { ATButton, ATRowView } from "react-native-atlas";

<ATRowView>
    
  <ATButton buttonColor="#ce4047">
    #ce4047
  </ATButton>

  <ATButton ghost buttonColor="#ce4047">
    #ce4047
  </ATButton>

  <ATButton buttonColor="#ce4047" underlayColor="#777">
    underlayColor
  </ATButton>

</ATRowView>
```

#### 点击事件

<img src="https://github.com/rcg1994/light/raw/master/images/atals/button-07.png" width="400"/>

```javascript
import { ATButton, ATRowView } from "react-native-atlas";

<ATRowView>
    
  <ATButton
    throttle={false}
    onPress={() => {
      this.setState({
        time: this.state.time + 1
      });
    }}
  >
    连击
  </ATButton>
  
  <ATButton
    onPress={() => {
      this.setState({
        time: this.state.time + 1
      });
    }}
  >
    节流
  </ATButton>

  <ATButton
    throttleWaiting={2000}
    onPress={() => {
      this.setState({
        time: this.state.time + 1
      });
    }}
  >
    节流 2s
  </ATButton>

  <ATButton
    ghost
    onLongPress={() => {
      this.setState({
        time: this.state.time + 1
      });
    }}
  >
    长按
  </ATButton>

</ATRowView>
```


### API

#### ATButton

##### 继承自 ATTouchable


| 属性              | 说明                                                         | 类型    | 默认值    |
| ----------------- | ------------------------------------------------------------ | ------- | --------- |
| type              | 设置按钮的类型，可选值有 `primary`、`secondary`、`success`、`danger`、`warning`、`info` | string  | `primary` |
| icon              | 是否带图标                                                   | any     | `null`    |
| disabled          | 是否禁用状态                                                 | boolean | `false`   |
| ghost             | 是否为幽灵按钮                                               | boolean | `false`   |
| text              | 是否为文字按钮                                               | boolean | `false`   |
| full              | 是否拉伸，设置为 `true` 则按钮为直角边框                     | boolean | `false`   |
| interspace        | 是否有两边的间隙                                             | boolean | `false`   |
| border            | 是否有边框                                                   | boolean | `true`    |
| throttle          | 点击事件是否节流，防止重复点击                               | boolean | `true`    |
| onPress           | 点击事件                                                     | func    | `()=>{}`  |
| onLongPress       | 长按事件                                                     | func    | `()=>{}`  |
| buttonColor       | 按钮主题色                                                   | string  | `/`       |
| style             | 按钮样式                                                     | any     | `/`       |
| textStyle         | 文字样式                                                     | any     | `/`       |
| disabledStyle     | 禁用状态下的按钮样式                                         | any     | `/`       |
| disabledTextStyle | 禁用状态下的文字样式                                         | any     | `/`       |

#### ATIconButton

##### 继承自 ATButton ，当按钮只有图标时使用

| 属性     | 说明                               | 类型 | 默认值 |
| -------- | ---------------------------------- | ---- | ------ |
| children | 图标按钮子节点，传入字体图标或图片 | any  | `null` |
| imageIcon | 传入的图标是否为图片，如果是字体图标，可自动设置颜色 | any  | `false` |
