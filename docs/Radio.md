### ATRadio

**具体组件效果请下载示例APP进行查看：[atlas-app](https://github.com/rcg1994/atlas-app)**

文档地址：[https://github.com/rcg1994/react-native-atlas/wiki/Radio](https://github.com/rcg1994/react-native-atlas/wiki/Radio)

引入：

```javascript
import { ATRadio } from 'react-native-atlas'
```

使用：

```javascript
<ATRadio label="是" />
```

#### 不同状态

<img src="https://github.com/rcg1994/light/raw/master/images/atals/radio-01.png" width="400"/>

```javascript
import { ATRowView, ATRadio } from "react-native-atlas";

<ATRowView style={[styles.mV, styles.mH]}>
  <ATRadio label="default" style={[styles.mr, styles.mt]} />
  <ATRadio disabled label="disabled" style={[styles.mr, styles.mt]} />
</ATRowView>
```

#### 自定义样式

<img src="https://github.com/rcg1994/light/raw/master/images/atals/radio-02.png" width="400"/>

```javascript
import { ATRowView, ATRadio } from "react-native-atlas";

<ATRowView style={[styles.mV, styles.mH]}>
  <ATRadio
    label="custom style"
    labelStyle={{ color: '#6d8ca7' }}
    unCheckedViewStyle={{ backgroundColor: 'transparent', borderColor: '#6d8ca7', borderWidth: 1 }}
    checkedViewStyle={{ backgroundColor: '#6d8ca7' }}
    style={[styles.mr, styles.mt]}
  />
</ATRowView>
<ATRowView style={[styles.mV, styles.mH]}>
  <ATRadio
    checkedView={<View style={styles.customeView}>
      <Icon
        name="check"
        size={12}
        color={Colors.primary}
      />
    </View>}
    unCheckedView={<View style={[styles.customeView]} />}
    labelView={<ATText lineHeight={1}>custom check & lable View</ATText>}
    style={[styles.mr, styles.mt]}
  />
</ATRowView>
```

#### 响应事件

<img src="https://github.com/rcg1994/light/raw/master/images/atals/radio-03.png" width="400"/>

```javascript
import { ATRowView, ATRadio } from "react-native-atlas";

<ATRowView style={[styles.mV, styles.mH]}>
  <ATRadio
    checked={this.state.isChecked}
    label="指定 checked 值"
    onChange={(isChecked) => {
      this.setState({ isChecked })
    }}
    style={[styles.mr, styles.mt]} />
</ATRowView>
<ATRowView style={[styles.mV, styles.mH]}>
  <ATText>选中状态：{String(this.state.isChecked)}</ATText>
</ATRowView>
```

#### 单选框组 

<img src="https://github.com/rcg1994/light/raw/master/images/atals/radio-04.png" width="400"/>

```javascript
import { ATText, ATRowView, ATRadio } from "react-native-atlas";

...
const PayCom = ({ type, unCheck }) => (
  <View style={{ flexDirection: 'row', marginRight: 30 }}>
    <Icon
      name={type}
      size={20}
      color={unCheck ? '#999' : type === 'weixin' ? 'green' : '#0088ff'}
    />
    <ATText style={{ marginLeft: 10 }}>
      {type === 'weixin' ? '微信支付' : '支付宝支付'}
    </ATText>
  </View>
)
...

<ATRowView style={[styles.mV, styles.mH]}>
  <ATText style={{ marginRight: 10 }}>性别：</ATText>
  <ATRadioGroup
    defaultValue={1}
    options={[
      { label: '男', value: 1 },
      { label: '女', value: 2, style: { marginLeft: 20 } }
    ]}
    value={this.state.sex}
    onChange={value => {
      this.setState({
        sex: value
      })
    }}
  />
</ATRowView>

<ATRowView style={[styles.mV, styles.mH]}>
  <ATRadioGroup
    defaultValue={1}
    value={this.state.pay}
    options={[
      {
        checkedView: <PayCom type="weixin" />,
        unCheckedView: <PayCom type="weixin" unCheck />,
        value: 'weixin'
      },
      {
        checkedView: <PayCom type="alipay" />,
        unCheckedView: <PayCom type="alipay" unCheck />,
        value: 'alipay'
      }
    ]}
    optionStyle={{ flexDirection: 'row-reverse' }}
    onChange={value => {
      this.setState({
        pay: value
      })
    }}
  />
</ATRowView>

<ATRowView style={[styles.mV, styles.mH]}>
  <ATText>支付方式：{this.state.pay}</ATText>
</ATRowView>
```

### API

#### ATRadio

| 属性     | 说明                               | 类型 | 默认值 |
| -------- | ---------------------------------- | ---- | ------ |
| label | 标签文案 | string  | `null` |
| labelStyle | 标签样式 | any  | `null` |
| labelView | 自定义标签 | any  | `null` |
| checked | 选中状态 | boolean  | `null` |
| onChange | change事件（设置checked后要手动更新值） | function  | `null` |
| checkedView | 自定义选中时样式 | element  | `null` |
| unCheckedView | 自定义未选中时样式 | element  | `null` |

#### ATRadioGroup

| 属性     | 说明                               | 类型 | 默认值 |
| -------- | ---------------------------------- | ---- | ------ |
| options | 选项数据 | array  | `null` |
| itemStyle | 子项样式 | any  | `null` |
| defaultValue | 默认值 | any  | `null` |
| value | 绑定的值 | any  | `null` |
| onChange | change事件 | function  | `null` |

