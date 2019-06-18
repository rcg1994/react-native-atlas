### ATCheckBox

**具体组件效果请下载示例APP进行查看：[atlas-app](https://github.com/rcg1994/atlas-app)**

文档地址：[https://github.com/rcg1994/react-native-atlas/wiki/CheckBox](https://github.com/rcg1994/react-native-atlas/wiki/CheckBox)

引入：

```javascript
import { ATCheckBox } from 'react-native-atlas'
```

使用：

```javascript
<ATCheckBox rightText="选项一" />
```

#### 不同状态

<img src="https://github.com/rcg1994/light/raw/master/images/atals/checkBox-01.png" width="400"/>

```javascript
import { ATRowView, ATCheckBox } from "react-native-atlas";

<ATRowView style={[styles.mV, styles.mH]}>
  <ATCheckBox
    rightText="default"
    style={[styles.mr, styles.mt]}
  />
  <ATCheckBox
    halfChecked
    rightText="halfChecked"
    style={[styles.mr, styles.mt]}
  />
</ATRowView>
<ATRowView style={[styles.mV, styles.mH]}>
  <ATCheckBox
    checked
    rightText="checked"
    style={[styles.mr, styles.mt]}
  />
  <ATCheckBox
    disabled
    rightText="disabled"
    style={[styles.mr, styles.mt]}
  />
</ATRowView>
```

#### 不同颜色

<img src="https://github.com/rcg1994/light/raw/master/images/atals/checkBox-02.png" width="400"/>

```javascript
import { ATRowView, ATCheckBox } from "react-native-atlas";

<ATRowView style={[styles.mV, styles.mH]}>
  <ATCheckBox
    tintColor="#ff605b"
    rightText="tintColor"
    style={[styles.mr, styles.mt]}
  />
  <ATCheckBox
    tintColor="#4f4f4f"
    halfChecked
    rightText="tintColor"
    style={[styles.mr, styles.mt]}
  />
  <ATCheckBox
    checked
    tintColor="#00c94b"
    rightText="tintColor"
    style={[styles.mr, styles.mt]}
  />
</ATRowView>
```

#### 描述位置

<img src="https://github.com/rcg1994/light/raw/master/images/atals/checkBox-03.png" width="400"/>

```javascript
import { ATRowView, ATCheckBox } from "react-native-atlas";

<ATRowView style={[styles.mV, styles.mH]}>
  <ATCheckBox
    leftText="leftText"
    style={[styles.mr, styles.mt]}
  />
  <ATCheckBox
    rightText="rightText"
    style={[styles.mr, styles.mt]}
  />
</ATRowView>
```

#### 响应事件

<img src="https://github.com/rcg1994/light/raw/master/images/atals/checkBox-04.gif" width="400"/>

```javascript
import { ATRowView, ATCheckBox } from "react-native-atlas";

<ATRowView style={[styles.mV, styles.mH]}>
  <ATCheckBox
    rightText="onPress"
    checked={this.state.check1}
    onPress={isChecked => this.setState({ check1: isChecked })}
    style={[styles.mr, styles.mt]}
  />
</ATRowView>
```

#### 多选框组

<img src="https://github.com/rcg1994/light/raw/master/images/atals/checkBox-05.gif" width="400"/>

```javascript
import { ATRowView, ATCheckBoxGroup } from "react-native-atlas";

...
state = {
  checkBoxGroup: []
}

checkBoxGroupChange = v => {
  this.setState({
    checkBoxGroup: v
  })
}
...

...
let options = [
  {
    value: '标签一',
    label: '标签一'
  },
  {
    value: '标签二',
    label: '标签二'
  },
  {
    value: '标签三',
    label: '标签三'
  },
  {
    value: '标签四',
    label: '标签四'
  }
]
...

<ATRowView style={[styles.mV, styles.mH]}>
  <ATCheckBoxGroup
    value={this.state.checkBoxGroup}
    onChange={this.checkBoxGroupChange}
    options={options}
    max={3}
    checkedView={
      <View style={styles.unCheckedImage}>
        <Icon
          name="check-square"
          size={14}
          color={Colors.primary}
        />
      </View>
    }
    unCheckedView={<View style={styles.unCheckedImage} />}
    tintColor={Colors.primary}
    rightTextStyle={styles.checkText}
    optionStyle={{ width: '50%' }}
    onHint={() => {
      ATModalToast({
        content: '最多选择3项',
        position: 'center'
      })
    }}
  />
  <ATText>已选择：{this.state.checkBoxGroup.join(',')}</ATText>
</ATRowView>
```

### API

#### ATCheckBox

| 属性     | 说明                               | 类型 | 默认值 |
| -------- | ---------------------------------- | ---- | ------ |
| checked | 选中状态 | boolean  | `null` |
| halfChecked | 半选中状态 | boolean  | `null` |
| leftText | 左边文案 | string  | `null` |
| rightText | 右边文案 | string  | `null` |
| tintColor | 选中时颜色 | any  | `null` |
| onPress | 点击事件 | function  | `null` |
| checkedView | 选中时样式 | any  | `null` |
| unCheckedView | 未选中时样式 | any  | `null` |

#### ATCheckBoxGroup

| 属性     | 说明                               | 类型 | 默认值 |
| -------- | ---------------------------------- | ---- | ------ |
| option | 选项数据 | array  | `null` |
| max | 做多选中数量 | number  | `null` |
| itemStyle | 子项样式 | any  | `null` |
| checkedView | 选中时样式 | any  | `null` |
| unCheckedView | 未选中时样式 | any  | `null` |
| tintColor | 选中时颜色 | any  | `null` |
| onHint | 超出最大选中数量时执行事件 | function  | `null` |
| value | 绑定的值 | any  | `null` |
| onChange | change事件 | function  | `null` |

