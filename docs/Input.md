### ATInput

**具体组件效果请下载示例APP进行查看：[atlas-app](https://github.com/rcg1994/atlas-app)**

文档地址：[https://github.com/rcg1994/react-native-atlas/wiki/Input](https://github.com/rcg1994/react-native-atlas/wiki/Input)

引入：

```javascript
import { ATInput } from 'react-native-atlas'
```

使用：

```javascript
<ATInput label="标签" placeholder="请输入" />
```

#### 对齐方式

<img src="https://github.com/rcg1994/light/raw/master/images/atals/input-01.png" width="400"/>

```javascript
import { ATRowView, ATInput } from "react-native-atlas";

<ATRowView style={[styles.mV, styles.mH]}>
  <ATInput label={null} placeholder="placeholder" />
</ATRowView>
<ATRowView style={[styles.mV, styles.mH]}>
  <ATInput label={null} placeholder="placeholder" textInputStyle={{ textAlign: 'center' }} />
</ATRowView>
```

#### 标签及样式

<img src="https://github.com/rcg1994/light/raw/master/images/atals/input-02.png" width="400"/>

```javascript
import { ATRowView, ATInput } from "react-native-atlas";

<ATRowView style={[styles.mV, styles.mH]}>
  <ATInput label="label" placeholder="placeholder" />
</ATRowView>
<ATRowView style={[styles.mV, styles.mH]}>
  <ATInput label="label" placeholder="placeholder" shape="underline" />
</ATRowView>
<ATRowView style={[styles.mV, styles.mH]}>
  <ATInput label="label" placeholder="placeholder" shape="rounded" />
</ATRowView>
<ATRowView style={[styles.mV, styles.mH]}>
  <ATInput
    shape="rounded"
    label={<Icon name='magnify' color='#666' style={{ marginRight: 10, fontSize: 16 }} />}
    placeholder="placeholder"
  />
</ATRowView>
```

#### 特定用法

<img src="https://github.com/rcg1994/light/raw/master/images/atals/input-03.gif" width="400"/>

```javascript
import { ATRowView, ATInput, ATAddrSelector } from "react-native-atlas";

...
state = {
  time: 0,
  smsCodeTitle: '获取验证码',
  buttonDisabled: false,
  selectedAddress: '浙江省'
}

countdown = () => {
  let seconds = 60
  let countdownTimer = setInterval(() => {
    if (seconds === 0) {
      this.setState({
        smsCodeTitle: '获取验证码',
        buttonDisabled: false
      })
      clearInterval(countdownTimer)
    } else {
      this.setState({
        smsCodeTitle: (seconds--) + '秒',
        buttonDisabled: true
      })
    }
  }, 1000)
}

showAddrSelector = () => {
  this.addrSelector.show()
}

handleSelectAddress = (selectedAddress) => {
  console.log('selectedAddress', selectedAddress)
}

handleFinish = (selectedAddress) => {
  this.setState({ selectedAddress })
}
...

<ATRowView style={[styles.mV, styles.mH]}>
  <ATInput
    shape="rounded"
    label="手机号"
    placeholder="请输入手机号"
    right={(
      <ATButton
        text
        type='secondary'
        disabled={buttonDisabled}
        onPress={this.countdown}
        textStyle={{ fontSize: 12 }}
      >{ smsCodeTitle }</ATButton>
    )}
  />
</ATRowView>
<ATRowView style={[styles.mV, styles.mH]}>
  <ATInput
    ref={v => { this.input = v }}
    alwaysChange
    value={selectedAddress}
    editable={false}
    shape="rounded"
    label="地址"
    placeholder="请选择地址"
    right={(
      <Icon name='dots-horizontal' color="#999" size={20} />
    )}
    onPress={this.showAddrSelector}
  />
  <ATAddrSelector
    ref={v => { this.addrSelector = v }}
    selectedAddress={selectedAddress}
    onSelectAddress={this.handleSelectAddress}
    onFinish={this.handleFinish}
  />
</ATRowView>
```

### API

#### ATInput

| 属性     | 说明                               | 类型 | 默认值 |
| -------- | ---------------------------------- | ---- | ------ |
| label | 标签 | string  | `null` |
| shape | 输入框样式类型(`underline`、`rounded`) | string | `default` |
| right | 右边区域元素 | any  | `null` |
