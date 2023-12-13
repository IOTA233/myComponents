# HTML转Word文档

## 1、预览

:::preview title || component description content

demo-preview=../components/Html2Doc/index.vue

:::


## API
## 方法: ExportHtmlToDocx

| 参数             | 描述                                             | 类型                            | 默认值  |
| :--------------- | :----------------------------------------------- | :------------------------------ | :------ |
| size             | 尺寸                                             | 'large' / 'default' / 'small'   | - |
| type             | 类型                                             |  'default / 'primary / 'success / 'warning / 'danger' | - |
| plain            | 是否朴素按钮                                     | boolean | false     |
| round            | 是否圆角按钮                                     | boolean | false     |
| circle           | 是否圆形按钮                                     | boolean | false     | 无        |
| time             | 防抖的时间                                       | number | 1000        |
| tip             | 提示文字，常用于type="text" 或拥有text，link 属性的button       | string | -        |
| placement         | Tooltip 组件出现的位置                           | 'top' / 'top-start' / 'top-end' / 'bottom' / 'bottom-start' / 'bottom-end' / 'left' / 'left-start' / 'left-end' / 'right' / 'right-start' / 'right-end' | top        |
| tipProps         | Tooltip 组件的配置参数，详情可看 element-plus官网                | object | -        |
