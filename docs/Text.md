### ATText

**具体组件效果请下载示例APP进行查看：atlas-app**

文档地址：[https://github.com/rcg1994/react-native-atlas/wiki/Text](https://github.com/rcg1994/react-native-atlas/wiki/Text)

引入：

```javascript
import { ATText } from 'react-native-atlas'
```

使用：

```javascript
<ATText color={Colors.primary} size={20}>ATText</ATText>
```

#### 标题

<img src="https://github.com/rcg1994/light/raw/master/images/atals/text-01.png" width="400"/>

```javascript
import { ATText } from "react-native-atlas";

<ATText h1>H1</ATText>

<ATText h2>H2</ATText>

<ATText h3>H3</ATText>

<ATText h4>H4</ATText>

<ATText h5>H5</ATText>

<ATText h6>H6</ATText>
```

#### 基本属性

<img src="https://github.com/rcg1994/light/raw/master/images/atals/text-02.png" width="400"/>

```javascript
import { ATText } from "react-native-atlas";

<ATText weight="bold">weight bold</ATText>

<ATText color={Colors.primary}>color primary</ATText>

<ATText size={24}>size 24</ATText>

<ATText lineHeight={2}>设置line-height，实际得到的行高为line-height*font-size。当前示例的lineHeight=2</ATText>
```

### API

#### ATText

| 属性     | 说明                               | 类型 | 默认值 |
| -------- | ---------------------------------- | ---- | ------ |
| size | 字体大小 | number  | `Theme.font_content` |
| color | 字体颜色 | string  | `Theme.font_content_color` |
| lineHeight | 字体颜色 | number  | `Theme.font_line_height` |
| weight | 字重 | string  | `null` |
| style | 字体样式 | any  | `null` |
