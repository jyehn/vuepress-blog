# HTML梳理



## 表单

## 关于`<form>`



关于提交表单的属性
下列属性控制提交表单时的行为。

1. `action`
   处理表单提交的 URL。这个值可被 `<button>`、`<input type="submit">` 或 `<input type="image">` 元素上的 formaction 属性覆盖。
   `enctype`
   当 method 属性值为 post 时，enctype 就是将表单的内容提交给服务器的 MIME 类型 。可能的取值有：
   application/x-www-form-urlencoded：未指定属性时的默认值。
   multipart/form-data：当表单包含 type=file 的 `<input>` 元素时使用此值。
   text/plain：出现于 HTML5，用于调试。
   这个值可被` <button>`、`<input type="submit">` 或 `<input type="image">` 元素上的 formenctype 属性覆盖。

2. `method`
   浏览器使用这种 HTTP 方式来提交 表单。可能的值有：
   post：指的是 HTTP POST 方法；表单数据会包含在表单体内然后发送给服务器。
   get：指的是 HTTP GET 方法；表单数据会附加在 action 属性的 URL 中，并以 '?' 作为分隔符，没有副作用 时使用这个方法。
   dialog：如果表单在 `<dialog>` 元素中，提交时关闭对话框。
   此值可以被 `<button>`、`<input type="submit">` 或 `<input type="image">` 元素中的 formmethod 属性覆盖。

3. `novalidate`
   此布尔值属性表示提交表单时不需要验证表单。 如果没有声明该属性（因此表单需要通过验证）。该属性可以被表单中的 `<button>`、`<input type="submit">` 或 `<input type="image">` 元素中的 formnovalidate 属性覆盖。
4. `target`
   表示在提交表单之后，在哪里显示响应信息。在 HTML 4 中，这是一个 frame 的名字/关键字对。在 HTML5 里，这是一个浏览上下文 的名字/关键字（如标签页、窗口或 iframe）。下述关键字有特别含义：
   _self：默认值。在相同浏览上下文中加载。
   _blank：在新的未命名的浏览上下文中加载。
   _parent：在当前上下文的父级浏览上下文中加载，如果没有父级，则与 _self 表现一致。
   _top：在最顶级的浏览上下文中（即当前上下文的一个没有父级的祖先浏览上下文），如果没有父级，则与 _self 表现一致。
   此值可以被 `<button>`、 `<input type="submit">` 或 `<input type="image">` 元素中的 formtarget 属性覆盖。

## 关于`<form>`中使用的标签

| 元素                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`button`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button) | **HTML `<button>` 元素**表示一个可点击的按钮，可以用在[表单](https://developer.mozilla.org/en-US/docs/Learn/Forms)或文档其它需要使用简单标准按钮的地方。 |
| [`datalist`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/datalist) | **HTML`<datalist>`元素**包含了一组`option`元素，这些元素表示其它表单控件可选值。 |
| [`fieldset`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/fieldset) | 这个元素包含[所有全局属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes)。 |
| [`form`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form) | **HTML `<form>` 元素**表示文档中的一个区域，此区域包含交互控件，用于向 Web 服务器提交信息。 |
| [`input`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input) | **HTML `<input>` 元素**用于为基于 Web 的表单创建交互式控件，以便接受来自用户的数据; 可以使用各种类型的输入数据和控件小部件，具体取决于设备和user agent。 |
| [`label`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/label) | **HTML `<label>` 元素（标签）**表示用户界面中某个元素的说明。 |
| [`legend`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/legend) | **HTML `<legend>`** 元素用于表示其父元素 `fieldset` 的内容标题。 |
| [`meter`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meter) | **HTML `<meter>元素用来显示已知范围的标量值或者分数值。`**   |
| [`optgroup`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/optgroup) | **HTML 元素 `<optgroup>`** 为`select` 元素中的选项创建分组。 |
| [`option`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/option) | **HTML 元素 `<option>`** 用于定义在 `select`, `optgroup` 或 `datalist` 元素中包含的项。`<option>` 可以在弹出窗口和 HTML 文档中的其他项目列表中表示菜单项。 |
| [`output`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/output) | **HTML `<output>` 标签**表示计算或用户操作的结果。           |
| [`progress`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/progress) | **HTML**中的**`<progress>`**元素用来显示一项任务的完成进度。虽然规范中没有规定该元素具体如何显示，浏览器开发商可以自己决定，但通常情况下，该元素都显示为一个进度条形式。 |
| [`select`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/select) | **HTML `<select>` 元素**表示一个提供选项菜单的控件：         |
| [`textarea`](https://developer.mozilla.org/zh-CN/doc s/Web/HTML/Element/textarea) | **HTML `<textarea>` 元素**表示一个多行纯文本编辑控件，当你希望用户输入一段相当长的、不限格式的文本，例如评论或反馈表单中的一段意见时，这很有用。 |

## `<input>`的type

`<input>`的工作方式相当程度上取决于[`type`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-type)属性的值，不同的 type 值会在各自的参考页中进行介绍。如果未指定此属性，则采用的默认类型为 `text`。

可用的值包括：



| Type                                                         | 描述                                                         | 基础例子 | Spec                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :------- | :----------------------------------------------------------- |
| [button](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/button) | 没有默认行为的按钮，上面显示 [value](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#value) 属性的值，默认为空。 |          |                                                              |
| [checkbox](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/checkbox) | 复选框，可设为选中或未选中。                                 |          |                                                              |
| [color](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/color) | 用于指定颜色的控件；在支持的浏览器中，激活时会打开取色器。   |          | [HTML5](https://developer.mozilla.org/zh-CN/docs/HTML/HTML5) |
| [date](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/date) | 输入日期的控件（年、月、日，不包括时间）。在支持的浏览器激活时打开日期选择器或年月日的数字滚轮。 |          | [HTML5](https://developer.mozilla.org/zh-CN/docs/HTML/HTML5) |
| [datetime-local](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/datetime-local) | 输入日期和时间的控件，不包括时区。在支持的浏览器激活时打开日期选择器或年月日的数字滚轮。 |          | [HTML5](https://developer.mozilla.org/zh-CN/docs/HTML/HTML5) |
| [email](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/email) | 编辑邮箱地址的区域。类似 `text` 输入，但在支持的浏览器和带有动态键盘的设备上会有确认参数和相应的键盘。 |          |                                                              |
| [file](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file) | 让用户选择文件的控件。使用[accept](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#accept)属性规定控件能选择的文件类型。 |          |                                                              |
| [hidden](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/hidden) | 不显示的控件，其值仍会提交到服务器。举个例子，右边就是一个隐形的控件。 |          |                                                              |
| [image](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/image) | 带图像的 `submit` 按钮。显示的图像由 `src` 属性规定。如果 [src](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#src) 缺失，[alt](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#alt) 属性就会显示。 |          |                                                              |
| [month](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/month) | 输入年和月的控件，没有时区。                                 |          | [HTML5](https://developer.mozilla.org/zh-CN/docs/HTML/HTML5) |
| [number](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/number) | 用于输入数字的控件。如果支持的话，会显示滚动按钮并提供缺省验证（即只能输入数字）。拥有动态键盘的设备上会显示数字键盘。 |          |                                                              |
| [password](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/password) | 单行的文本区域，其值会被遮盖。如果站点不安全，会警告用户。   |          |                                                              |
| [radio](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/radio) | 单选按钮，允许在多个拥有相同 [name](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#name) 值的选项中选中其中一个。 |          |                                                              |
| [range](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/range) | 此控件用于输入不需要精确的数字。控件是一个范围组件，默认值为正中间的值。同时使用[htmlattrdefmin](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefmin)  和 [htmlattrdefmax](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefmax)来规定值的范围。 |          | [HTML5](https://developer.mozilla.org/zh-CN/docs/HTML/HTML5) |
| [reset](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/reset) | 此按钮将表单的所有内容重置为默认值。不推荐。                 |          |                                                              |
| [search](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/search) | 用于搜索字符串的单行文字区域。输入文本中的换行会被自动去除。在支持的浏览器中可能有一个删除按钮，用于清除整个区域。拥有动态键盘的设备上的回车图标会变成搜索图标。 |          | [HTML5](https://developer.mozilla.org/zh-CN/docs/HTML/HTML5) |
| [submit](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/submit) | 用于提交表单的按钮。                                         |          |                                                              |
| [tel](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/tel) | 用于输入电话号码的控件。拥有动态键盘的设备上会显示电话数字键盘。 |          | [HTML5](https://developer.mozilla.org/zh-CN/docs/HTML/HTML5) |
| [text](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/text) | 默认值。单行的文本区域，输入中的换行会被自动去除。           |          |                                                              |
| [time](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/time) | 用于输入时间的控件，不包括时区。                             |          | [HTML5](https://developer.mozilla.org/zh-CN/docs/HTML/HTML5) |
| [url](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/url) | 用于输入 URL 的控件。类似 `text` 输入，但有验证参数，在支持动态键盘的设备上有相应的键盘。 |          | [HTML5](https://developer.mozilla.org/zh-CN/docs/HTML/HTML5) |
| [week](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/week) | 用于输入以年和周数组成的日期，不带时区。                     |          |                                                              |
| 废弃的值                                                     |                                                              |          |                                                              |
| [datetime](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/datetime) | 用于输入基于 UTC 时区的日期和时间（时、分、秒及秒的小数部分）。 |          |                                                              |

## `<input>`的属性

| 属性                                                         | 相关的 type                      | 描述                                                         |
| :----------------------------------------------------------- | :------------------------------- | :----------------------------------------------------------- |
| [accept](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefaccept) | file                             | 用于规定文件上传控件中期望的文件类型                         |
| [alt](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefalt) | image                            | image type 的 alt 属性，是可访问性的要求。                   |
| [autocomplete](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefautocomplete) | 所有                             | 用于表单的自动填充功能                                       |
| [autofocus](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefautofocus) | 所有                             | 页面加载时自动聚焦到此表单控件                               |
| [capture](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefcapture) | file                             | 文件上传控件中媒体拍摄的方式                                 |
| [checked](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefchecked) | radio, checkbox                  | 用于控制控件是否被选中                                       |
| [dirname](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefdirname) | text, search                     | 表单区域的一个名字，用于在提交表单时发送元素的方向性         |
| [disabled](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefdisabled) | 所有                             | 表单控件是否被禁用                                           |
| [form](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefform) | 所有                             | 将控件和一个 form 元素联系在一起                             |
| [formaction](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefformaction) | image, submit                    | 用于提交表单的 URL                                           |
| [formenctype](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefformenctype) | image, submit                    | 表单数据集的编码方式，用于表单提交                           |
| [formmethod](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefformmethod) | image, submit                    | 用于表单提交的 HTTP 方法                                     |
| [formnovalidate](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefformnovalidate) | image, submit                    | 提交表单时绕过对表单控件的验证                               |
| [formtarget](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefformtarget) | image, submit                    | 表单提交的浏览上下文                                         |
| [height](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefheight) | image                            | 和  `height` 属性相同；垂直方向                              |
| [list](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdeflist) | 绝大部分                         | 自动填充选项的[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/datalist) 的 id 值 |
| [max](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefmax) | 数字 type                        | 最大值                                                       |
| [maxlength](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefmaxlength) | password, search, tel, text, url | `value` 的最大长度（最多字符数目）                           |
| [min](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefmin) | 数字 type                        | 最小值                                                       |
| [minlength](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefminlength) | password, search, tel, text, url | `value` 的最小长度（最少字符数目）                           |
| [multiple](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefmultiple) | email, file                      | 布尔值。 是否允许多个值                                      |
| [name](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefname) | 所有                             | input 表单控件的名字。以名字/值对的形式随表单一起提交        |
| [pattern](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefpattern) | password, text, tel              | 匹配有效 `value` 的模式（pattern）                           |
| [placeholder](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefplaceholder) | password, search, tel, text, url | 当表单控件为空时，控件中显示的内容                           |
| [readonly (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly) | 绝大部分                         | 布尔值。存在时表示控件的值不可编辑                           |
| [required (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required) | 绝大部分                         | 布尔值。表示此值为必填项或者提交表单前必须先检查该值         |
| [size](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefsize) | email, password, tel, text       | 控件的大小                                                   |
| [src](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefsrc) | image                            | 和 `src` 属性一样；图像资源的地址                            |
| [step](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefstep) | 数字 type                        | 有效的递增值                                                 |
| [type](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdeftype) | 所有                             | input 表单控件的 type                                        |
| [value](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefvalue) | 所有                             | 表单控件的值。以名字/值对的形式随表单一起提交                |
| [width](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefwidth) | image                            | 与 `width` 属性一样                                          |