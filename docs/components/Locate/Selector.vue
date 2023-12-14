<script setup>
import { ref } from 'vue'
import { Locate } from '@zhdgps/vue3-components'

const cityCode = ref([])
const address = ref('')
</script>

<template>
  <div>
    <Locate v-model:city-code="cityCode" v-model:address="address" type="selector" />
  </div>
</template>
