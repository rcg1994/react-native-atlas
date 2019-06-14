### ATFlexLine

**具体组件效果请下载示例APP进行查看：atlas-app**

文档地址：[https://github.com/rcg1994/react-native-atlas/wiki/FlexLine](https://github.com/rcg1994/react-native-atlas/wiki/FlexLine)

引入：

```javascript
import { ATFlexLine } from 'react-native-atlas'
```

使用：

```javascript
<ATFlexLine data={[]} />
```

#### 任意个数

<img src="https://github.com/rcg1994/light/raw/master/images/atals/flexLine-01.png" width="400"/>

```javascript
import { ATFlexLine } from "react-native-atlas";

<ATFlexLine data={['数据1', '数据2', '数据3']} />

<ATFlexLine data={['数据1', '数据2', '数据3', '数据4', '数据5']}/>
```

#### 分割线及高度

<img src="https://github.com/rcg1994/light/raw/master/images/atals/flexLine-02.png" width="400"/>

```javascript
import { ATFlexLine } from "react-native-atlas";

<ATFlexLine
  divide
  height={100}
  data={['数据1', '数据2', '数据3']}
/>
```

#### 自定义渲染

<img src="https://github.com/rcg1994/light/raw/master/images/atals/flexLine-03.png" width="400"/>

```javascript
import { ATFlexLine } from "react-native-atlas";

<ATFlexLine
  height={100}
  divide
  data={[
    {
      name: '主页',
      icon: 'atlas'
    },
    {
      name: '组件库',
      icon: 'components'
    },
    {
      name: '我的',
      icon: 'mine'
    }
  ]}
  renderItem={({ name, icon }) => (
    <ATTouchable style={[AppStyles.flexCenter, AppStyles.fullBox]} onPress={() => {}}>
      <View style={AppStyles.flexCenter}>
        <Iconfont name={icon} color={Colors.primary} size={30} />
        <ATText
          style={AppStyles.mt10}
          size={14}
          color={Colors.primary}
        >
          {name}
        </ATText>
      </View>
    </ATTouchable>
  )}
/>
```

### API

#### ATFlexLine


| 属性  | 说明         | 类型           | 默认值  |
| ----- | ------------ | -------------- | ------- |
| data | (必填) 需要渲染的数据      | array[string、object]         | `null`  |
| height | 设置高度    | number | `Theme.flex_line_height` |
| style | FlexLine样式    | any | `null` |
| divide | 是否显示分割线   | boolean         | `false`  |
| divideHeight | 分割线高度   | string、number         | `50%`  |
| divideTop | 分割线相对位置   | string、number         | `25%`  |
| renderItem | 自定义渲染（也可以在data中定义每条数据自有的渲染方法）   | function         | `null`  |
