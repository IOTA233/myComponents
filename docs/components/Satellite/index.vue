<script setup>
import { Satellite } from '@zhdgps/components'
import { ref } from 'vue'

const data = ref([])
function handleChange() {
  console.log('data :>> ', data.value)
}
</script>

<template>
  <div>
    <Satellite
      v-model="data" node-key="label"
      :collapse-tags="true" filterable :multiple="true" @change="handleChange"
    />
  </div>
</template>
