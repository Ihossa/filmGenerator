<script setup>
import NothingFound from '../shared/NothingFound.vue'
import CardItemFilm from './CardItemFilm.vue'
import LoadingIcon from "../shared/icons/LoadingIcon.vue";
import {filmStore} from "@/store";
import {storeToRefs} from "pinia";

const store = filmStore()

const { films, isLoading } = storeToRefs(store)

</script>

<template>
  <NothingFound v-show="!films.length && !isLoading" />
  <div v-show="!!films?.length && !isLoading" class="container">
    <card-item-film v-for="film in films" :key="film" :film="film" />
  </div>
  <loading-icon v-show="isLoading" />
</template>

<style scoped lang="scss">
@import '../assets/styles/variable';

.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 25px;
  position: relative;
  margin-left: 70px;
}

.icon{
  margin: auto;
  width: 40px;
  height: 40px;
}

</style>
