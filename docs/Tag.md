### ATTag

**具体组件效果请下载示例APP进行查看：atlas-app**

文档地址：[https://github.com/rcg1994/react-native-atlas/wiki/Tag](https://github.com/rcg1994/react-native-atlas/wiki/Tag)

引入：

```javascript
import { ATTag } from 'react-native-atlas'
```

使用：

```javascript
<ATTag content="标签" />
```

#### 不同类型

<img src="https://github.com/rcg1994/light/raw/master/images/atals/tag-01.png" width="400"/>

```javascript
import { ATRowView, ATTag } from "react-native-atlas";

<ATRowView>
  <ATTag style={AppStyles.mr10} content="primary" />
  <ATTag style={AppStyles.mr10} content="info" type="info" />
  <ATTag
    style={AppStyles.mr10}
    content="success"
    type="success"
  />
  <ATTag
    style={AppStyles.mr10}
    content="warning"
    type="warning"
  />
  <ATTag content="danger" type="danger" />
</ATRowView>
```

#### 指定属性

##### 指定颜色只支持16进制的色值，背景色自动计算得到的。特殊需求请修改style。

<img src="https://github.com/rcg1994/light/raw/master/images/atals/tag-02.png" width="400"/>

```javascript
import { ATRowView, ATTag } from "react-native-atlas";

<ATRowView>
  <ATTag
    style={AppStyles.mr10}
    color="#0066ff"
    content="指定颜色"
  />
  <ATTag
    style={AppStyles.mr10}
    icon={
      <Iconfont name="atlas" color={Colors.primary} size={16} />
    }
    content="带图标"
  />
  <ATTag
    style={AppStyles.mr10}
    left={
      <ATText color={Colors.danger} size={16}>
        *
      </ATText>
    }
    content="自定义左边元素"
  />
</ATRowView>
<ATRowView style={AppStyles.mt10}>
  <ATTag
    style={{
      paddingVertical: 2,
      paddingHorizontal: 10,
      backgroundColor: '#fafafa'
    }}
    textStyle={{ fontSize: 12 }}
    content="自定义样式"
  />
</ATRowView>
```

### API

#### ATTag

| 属性     | 说明                               | 类型 | 默认值 |
| -------- | ---------------------------------- | ---- | ------ |
| type | 标签类型 | string  | `primary` |
| content | （必填）标签内容 | string  | `null` |
| color | 标签颜色（只支持16进制，背景色计算而得） | string  | `null` |
| icon | 图标 | any  | `null` |
| left | 左边元素 | any  | `null` |
| style | 标签样式 | any  | `null` |
| textStyle | 标签字体样式 | any  | `null` |
