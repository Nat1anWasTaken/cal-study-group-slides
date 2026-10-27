<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  src: string
  alt?: string
}>()

const imageUrl = computed(() => props.src.startsWith('/')
  ? import.meta.env.BASE_URL + props.src.slice(1)
  : props.src)
</script>

<template>
  <div class="single-image">
    <img :src="imageUrl" :alt="props.alt || ''">
  </div>
</template>

<style scoped>
.single-image {
  position: absolute;
  z-index: 1;
  inset: 0;
  display: flex;
  width: 100%;
  height: 100%;
  background: white;
}

.single-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
