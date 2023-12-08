<script setup>
import { ref } from 'vue';

const cityCode = ref([])
const cityName = ref('test')
</script>

<template>
  <div>
    <Locate v-model:city-code="cityCode" v-model:city-name="cityName" />
    {{ cityName }}
  </div>
</template>
