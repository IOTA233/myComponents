<script setup lang="ts">
import satellite from '@zhdgps/assets/json/satellite.json'
</script>

<template>
  <el-tree-select
    :data="satellite"
    :render-after-expand="false"
    show-checkbox
  />
</template>
