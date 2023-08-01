<script setup>
import { onMounted } from 'vue'
import {defaultFilter, filmStore} from "../store";
import {storeToRefs} from 'pinia'
const store = filmStore()

const { filters } = storeToRefs(store)
const {applyFilter, fetchFilms} = store

onMounted(async () => {
  if(JSON.stringify(filters.value) !== JSON.stringify(defaultFilter)){
    await applyFilter()
  } else {
    await fetchFilms()
  }
})

</script>


<template>
  <div class="container">
    <filters-films />
    <movie-list />
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
</style>
