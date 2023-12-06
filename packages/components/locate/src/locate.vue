<script lang="ts" setup>
// import { ElButton } from 'element-plus';
import { onMounted } from 'vue';
import { locateProps } from './locate';

defineOptions({
  name: 'Locate',
})
const props = defineProps(locateProps)

onMounted(() => {

})
</script>

<template>
  <div>
    <ElButton>test11</ElButton>
  </div>
</template>
