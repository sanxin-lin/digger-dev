# 单元格

### 介绍

单元格为列表中的单个展示项。

### 基本使用

```html
<template>
  <dig-cell>这是单元格</dig-cell>
</template>
```

### 显示图标

```html
<template>
  <dig-cell icon="fire" title="这是单元格">
    <template #extra>
      <dig-icon name="information" />
    </template>
  </dig-cell>
</template>
```

### 显示描述

```html
<template>
  <dig-cell title="这是单元格" description="描述" />
</template>
```

### 显示边框

```html
<template>
  <dig-cell border>这是单元格</dig-cell>
</template>
```

### 用作列表项

```html
<script setup>
import { ref } from 'vue'

const items = ref([
  {
    name: 'Vue2',
    icon: 'star',
    enabled: false,
  },
  {
    name: 'Vue3',
    icon: 'heart',
    enabled: false,
  },
  {
    name: 'React',
    icon: 'close-circle',
    enabled: false,
  },
])

const handleClick = (item) => {
  item.enabled = !item.enabled
}
</script>

<template>
  <dig-paper :elevation="2">
    <dig-cell
      v-for="(item, index) in items"
      :key="item.name"
      ripple
      :icon="item.icon"
      :border="index !== items.length - 1"
      :border-offset="0"
      @click="handleClick(item)"
    >
      {{ item.name }}

      <template #extra>
        <dig-switch v-model="item.enabled" @click.stop />
      </template>
    </dig-cell>
  </dig-paper>
</template>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| ----- | -------------- | -------- | ---------- |
| `title` | 单元格标题  | _string \| number_ | `-` |
| `icon` | 左侧图标名称 | _string_ | `-` |
| `namespace` | 左侧图标命名空间 | _string_ | `dig-icon` |
| `description` | 单元格描述 | _string_ | `-` |
| `border` | 是否显示边框 | _boolean_ | `false` |
| `border-offset` | 边框偏移量 | _string \| number_ | `-` |
| `icon-class` | 图标额外类名 | _string_ | `-` |
| `title-class` | 标题额外类名 | _string_ | `-` |
| `description-class` | 描述额外类名 | _string_ | `-` |
| `extra-class` | 右侧内容额外类名 | _string_ | `-` |
| `ripple` | 是否启用水波效果 | _boolean_ | `false` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击时触发 | `event: Event` |

### 插槽

| 名称 | 说明 | 参数 |
| ----- | -------------- | -------- |
| `default` | cell 的内容 | `-` |
| `icon` | 自定义左侧 icon 区域 | `-` |
| `description` | 描述的内容 | `-` |
| `extra` | 自定义右侧区域内容 | `-` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制.

| 变量名             | 默认值 |
|-----------------| --- |
| `--cell-color`  | `dig(--color-text)` |
| `--cell-font-size` | `dig(--font-size-md)` |
| `--cell-description-font-size` | `dig(--font-size-sm)` |
| `--cell-description-color` | `rgba(0, 0, 0, 0.6)` |
| `--cell-padding` | `10px 12px` |
| `--cell-min-height` | `40px` |
| `--cell-border-color` | `#bcc2cb` |
| `--cell-border-left` | `12px` |
| `--cell-border-right` | `12px` |
| `--cell-icon-right` | `8px` |
| `--cell-extra-left` | `8px` |
