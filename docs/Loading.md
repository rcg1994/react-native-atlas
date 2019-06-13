### ATLoading

**具体组件效果请下载示例APP进行查看：atlas-app**

文档地址：[https://github.com/rcg1994/react-native-atlas/wiki/Button](https://github.com/rcg1994/react-native-atlas/wiki/Button)

引入：

```javascript
import { ATLoading } from 'react-native-atlas'
```

使用：

```javascript
<ATLoading />
```

#### 不同大小

<img src="https://github.com/rcg1994/light/raw/master/images/atals/loading-001.gif" width="400"/>

```javascript
import { ATLoading, ATRowView } from "react-native-atlas";

<ATRowView>
  
  <ATLoading size="small" />
    
  <ATLoading size="large" />
    
  <ATLoading size={50} />
    
</ATRowView>
```

#### 不同颜色

<img src="https://github.com/rcg1994/light/raw/master/images/atals/loading-002.gif" width="400"/>

```javascript
import { ATLoading, ATRowView } from "react-native-atlas";

<ATRowView>
  
  <ATLoading color="#727d84" />
    
  <ATLoading color="#2db450" />
    
  <ATLoading color="#e48a03" />
    
</ATRowView>
```

#### 加载文案

<img src="https://github.com/rcg1994/light/raw/master/images/atals/loading-003.gif" width="400"/>

```javascript
import { ATLoading, ATRowView } from "react-native-atlas";

<ATRowView>
  
  <ATLoading title="拼命加载中" />
  
  <ATLoading title="拼命加载中" color="#e48a03" />
    
</ATRowView>
```

#### 自定义图案

<img src="https://github.com/rcg1994/light/raw/master/images/atals/loading-004.gif" width="200"/>

```javascript
import { ATLoading, ATSpin, ATRowView } from "react-native-atlas";

<ATRowView>

  <ATLoading title="拼命加载中" indicator={<ATSpin size={8} />} />

</ATRowView>
```

### API

#### ATLoading


| 属性  | 说明         | 类型           | 默认值  |
| ----- | ------------ | -------------- | ------- |
| size  | 设置大小，`large`、`small` 或者数字(仅安卓) | string、number(android only) | `large` |
| color | 设置颜色      | string         | `null`  |
| title | 设置加载文案   | string         | `null`  |
| indicator | 自定义的图案，暂不支持自动旋转 | any | null |

