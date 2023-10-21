# 加载

### 介绍

加载组件，用于数据加载时执行动画。

### Loading 类型

```html
<template>
  <dig-space align="center" justify="space-between">
    <dig-loading type="circle" />
    <dig-loading type="cube" />
    <dig-loading type="wave" />
    <dig-loading type="rect" />
    <dig-loading type="disappear" />
  </dig-space>
</template>
```

### Loading 颜色
```html
<template>
  <dig-space align="center" justify="space-between">
    <dig-loading type="circle" color="#00afef" />
    <dig-loading type="cube" color="#00c48f" />
    <dig-loading type="wave" color="#ff9f00" />
    <dig-loading type="rect" color="#f44336" />
    <dig-loading type="disappear" color="#aaa" />
  </dig-space>
</template>
```

### Loading 大小

```html
<template>
  <dig-space align="center" justify="space-between">
    <dig-loading type="circle" size="small" />
    <dig-loading type="cube" size="small" />
    <dig-loading type="wave" size="small" />
    <dig-loading type="rect" size="small" />
    <dig-loading type="disappear" size="small" />
  </dig-space>
</template>
```

### 包裹内容

```html
<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <dig-button @click="loading = !loading" style="margin-bottom: 8px">
    {{ loading ? '关闭' : '打开' }}
  </dig-button>
  <dig-loading description="LOADING" :loading="loading">
    <dig-card 
      title="介绍" 
      description="Digger 是一个基于Vue3开发的 Material 风格移动端组件库，全面拥抱Vue3生态，由社区的小伙伴开发和维护。" 
    />
  </dig-loading>
</template>
```

## API

### 属性

| 参数     | 说明                                                         | 类型     | 默认值      |
| -------- |------------------------------------------------------------| -------- |----------|
| `color`  | loading 的颜色                                                | _string_ | `-`      |
| `type`   | loading 的类型，可选值为 `circle` `wave` `cube` `rect` `disappear` | _string_ | `circle` |
| `size`   | loading 的大小，可选值为 `large` `normal` `small` `mini`           | _string_ | `normal` |
| `description`   | loading 的描述文字                                              | _string_ | `-`      |
| `loading`| 存在内容时 loading 是否显示                                         | _boolean_ | `false`  |
| `radius` | loading 的类型为 `circle` 时，可设置其半径大小                           | _string \| number_  | `-` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | `loading` 包裹着的内容 | `-` |
| `description`    | `loading` 的描述文字 | `-` |

### 样式变量
以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                     | 默认值 |
|-------------------------| -- |
| `--loading-color`       | `dig(--loading-color)` |
| `--loading-opacity`     | `0.38` |
| `--loading-desc-margin` | `8px 0 0` |
