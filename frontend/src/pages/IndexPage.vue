<template>
  <q-page class="q-pa-md">
    <h4>API Demo</h4>

    <q-btn label="Load Data" color="primary" @click="loadData" />

    <div v-if="data" class="q-mt-md">
      <p><strong>Git:</strong> {{ data.git }}</p>
      <p><strong>Docker:</strong> {{ data.docker }}</p>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const data = ref(null)

const loadData = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/demo`
  )
  data.value = res.data
}
</script>
