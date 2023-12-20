<script setup>
import { ref } from 'vue'
import { Locate } from '@zhdgps/vue3-tools'

const cityCode = ref([])
const address = ref('')
</script>

<template>
  <div>
    <Locate v-model:city-code="cityCode" v-model:address="address" type="default">
      <template #address>
        <div v-show="address" style="padding-top: 6px">
          <span>详细地址：{{ address }}</span>
        </div>
      </template>
    </Locate>
  </div>
</template>
