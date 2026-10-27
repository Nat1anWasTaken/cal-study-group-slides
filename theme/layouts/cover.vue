<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'

type Accent = 'blue' | 'red' | 'yellow' | 'green'

interface Topic {
  label: string
  color?: Accent
}

const props = defineProps<{
  background?: string
  kicker?: string
  meta?: string
  team?: string
  members?: string[]
  topics?: Topic[]
}>()

const style = computed(() => handleBackground(props.background, true))
</script>

<template>
  <div class="slidev-layout cover" :class="{ 'has-background': Boolean(props.background) }" :style="style">
    <div class="google-layout-inner">
      <div v-if="props.kicker" class="google-kicker" :class="{ light: Boolean(props.background) }">
        {{ props.kicker }}
      </div>
      <slot />
      <div v-if="props.topics?.length" class="google-topics" aria-label="Slide topics">
        <span v-for="topic in props.topics" :key="topic.label" class="google-topic">
          <i :class="topic.color || 'blue'" />{{ topic.label }}
        </span>
      </div>
      <div v-if="props.team || props.members?.length" class="google-byline" :class="{ light: Boolean(props.background) }">
        <span v-if="props.team" class="google-byline-team">{{ props.team }}</span>
        <span v-for="name in props.members" :key="name" class="google-byline-member">{{ name }}</span>
      </div>
      <div v-if="props.meta" class="google-meta" :class="{ light: Boolean(props.background) }">
        {{ props.meta }}
      </div>
    </div>
  </div>
</template>
