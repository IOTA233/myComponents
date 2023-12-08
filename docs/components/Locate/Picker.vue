<script setup>
import { ref } from 'vue';

const cityCode = ref([])
const cityName = ref('')
</script>

<template>
  <div>
    <Locate v-model:city-code="cityCode" v-model:city-name="cityName" type="picker" />
  </div>
</template>
