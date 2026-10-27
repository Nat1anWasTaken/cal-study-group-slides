<script setup lang="ts">
import QRCode from 'qrcode'
import { computed, ref, watchEffect } from 'vue'

const props = defineProps<{
  url: string
}>()

const svg = ref('')

watchEffect(async () => {
  svg.value = await QRCode.toString(props.url, {
    type: 'svg',
    margin: 0,
    color: { dark: '#202124', light: '#ffffff' },
  })
})

const label = computed(() => props.url.replace(/^https?:\/\//, ''))
</script>

<template>
  <div class="link-qr">
    <div class="qr" v-html="svg" />
    <a :href="props.url" target="_blank" rel="noopener">{{ label }}</a>
  </div>
</template>

<style scoped>
.link-qr {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
}

.qr {
  width: 15rem;
  height: 15rem;
}

.qr :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
}

a {
  color: var(--google-blue);
  font-size: 2rem;
  font-weight: 500;
  text-decoration: none;
  border-bottom: none;
}
</style>
