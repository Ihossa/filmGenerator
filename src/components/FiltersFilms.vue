<script setup>
import ButtonMain from '../shared/ButtonMain.vue'
import BtnMenu from '../shared/BtnMenu.vue'
import { ref } from 'vue'
import {filmStore, FILTER_RATING, FILTER_GENRE, FILTER_YEAR} from "@/store";
import {storeToRefs} from "pinia";
const store = filmStore()

let isOpenMenu = ref(false)

const {setFilter, applyFilter} = store
const { filters, optionsForGenre, optionsForYear, appliedFilter } = storeToRefs(store)

const changeVisible = () => {
  isOpenMenu.value = !isOpenMenu.value
}

const onApplyFilter = () => {
  isOpenMenu.value = false
  applyFilter()
}

</script>

<template>
  <div class="sideBar">
    <btn-menu class="burger" :open-menu="isOpenMenu" @onClick="changeVisible" />
    <el-form label-width="120px" label-position="left" :class="isOpenMenu ? 'form' : 'form-hidden'">
      <el-form-item class="label" label="Жанр">
        <el-select
          class="select"
          @update:modelValue="(value) => {setFilter({ type: FILTER_GENRE, value: value }) }"
          :model-value="filters[FILTER_GENRE]"
          placeholder="Виберіть жанр"
          clearable
        >
          <el-option
            text-color="green"
            class="item-select"
            v-for="genre in optionsForGenre.value"
            :key="genre"
            :label="genre.charAt(0).toUpperCase() + genre.slice(1)"
            :value="genre"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="label" label="Рік випуску">
        <el-select
          class="select"
          @update:modelValue="(value) => {setFilter({ type: FILTER_YEAR, value: value })}"
          :model-value="filters[FILTER_YEAR]"
          placeholder="Виберіть рік випуску"
          clearable
        >
          <el-option
            v-for="year in optionsForYear.value"
            :key="year"
            :label="year"
            :value="year"
            class="option"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="label" label="Рейтинг">
        <el-input :model-value="filters[FILTER_RATING]" @input="(value) => {setFilter({ type: FILTER_RATING, value: value })}" />
      </el-form-item>
      <button-main
        :disable="JSON.stringify(filters) === JSON.stringify(appliedFilter)"
        label="Застосувати фільтр"
        @onClick="onApplyFilter"
      />
    </el-form>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/styles/variable.scss';
@import '../assets/styles/media.scss';

.sideBar {
  background: $color-background-menu;
  padding: 20px 25px;
  min-height: 100dvh;
  position: fixed;
  z-index: 100;

  @include large {
    width: 320px;
    min-width: 320px;
    position: relative;
    background: $color-background-block;
  }
}

.burger {
  display: block;

  @include large {
    display: none;
  }
}

.form {
  margin-top: 50px;

  @include large {
    margin: 0;
  }
}

.option{
  text-transform: capitalize;
}

.form-hidden {
  display: none;

  @include large {
    display: block;
  }
}

.label {
  font-size: 20px;
  font-weight: 500;
}

.select {
  width: 100%;
}
</style>
