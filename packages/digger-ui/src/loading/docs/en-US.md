# Loading

### Intro

Loading component for performing animations when data is loaded.

### Type

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

### Color
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

### Size

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

### Wrap

```html
<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <dig-button @click="loading = !loading" style="margin-bottom: 8px">
    {{ loading ? 'Open' : 'Close' }}
  </dig-button>
  <dig-loading description="LOADING" :loading="loading">
    <dig-card 
      title="Intro"
      description="Digger is a Material design mobile component library developed based on Vue3, developed and maintained by partners in the community." 
    />
  </dig-loading>
</template>
```

## API

### Props

| prop     | Description                                             | Type     | Default  |
| -------- |---------------------------------------------------------| -------- |----------|
| `color`  | Loading color                                           | _string_ | `-`      |
| `type`   | Can be set to `circle` `wave` `cube` `rect` `disappear` | _string_ | `circle` |
| `size`   | Can be set to `large` `normal` `small` `mini`           | _string_ | `normal` |
| `description`   | Description of the loading                       | _string_ | `-`      |
| `loading`| Specify whether loading is active                       | _boolean_ | `false`  |
| `radius` | Set radius size when the `type` is `circle`             | _string \| number_  | `-` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Content wrapped in loading | `-` |
| `description`    | Description of the loading | `-` |

### Style digiables
Here are the CSS digiables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider)

| digiable | Default |
| --- | --- |
| `--loading-color`       | `dig(--loading-color)` |
| `--loading-opacity` | `0.38` |
| `--loading-desc-margin` | `8px 0 0` |
