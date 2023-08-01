<script setup>
import { useRoute } from 'vue-router/dist/vue-router'
import {filmStore} from "@/store";
import {storeToRefs} from "pinia";
const store = filmStore()

const { films } = storeToRefs(store)

const route = useRoute()

const film = films.value.find((film) => String(film.id) === String(route.params.id))

</script>

<template>
  <div class="card">
    <el-image fit="cover" contain class="img" lazy :src="film.image_path">
      <template #placeholder>
        <div class="image-slot">Loading<span class="dot">...</span></div>
      </template>
    </el-image>
    <div class="content">
      <div class="info">
        <span class="title">{{ film.title }}</span>
        <div class="detail">
          <span>{{ film.year }}</span>
          <span>рейтинг: {{ film.rating_score }}</span>
        </div>
        <div class="description">
          {{ film.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/styles/variable';
@import '../assets/styles/media';

.card {
  display: flex;
  padding: 10px;
  transition: 0.1s;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: $color-background-block;
  border-radius: 12px;
}

.img {
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 8px;

  @include large {
    min-height: 400px;
  }
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

.title {
  font-size: 20px;
  color: black;
  text-decoration: none;
}

.detail {
  margin: 8px 0;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.btn {
  margin: 14px auto;

  @include small {
    margin: 0 !important;
  }
}
</style>
