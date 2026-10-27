<script setup lang="ts">
type Accent = 'blue' | 'red' | 'yellow' | 'green'

const props = withDefaults(defineProps<{
  kicker?: string
  stepColors?: Accent[]
  stepNumbers?: string[]
}>(), {
  stepColors: () => ['blue', 'red', 'green'],
  stepNumbers: () => ['01', '02', '03'],
})

const steps = ['step1', 'step2', 'step3'] as const
</script>

<template>
  <div class="slidev-layout flow" :class="{ 'has-figure': Boolean($slots.figure) }">
    <div class="google-layout-header">
      <div v-if="props.kicker" class="google-kicker">
        {{ props.kicker }}
      </div>
      <slot />
    </div>
    <div class="google-flow">
      <template v-for="(name, i) in steps" :key="name">
        <div v-if="i > 0" class="google-flow-arrow" aria-hidden="true" />
        <div class="google-flow-step">
          <div class="google-card-icon" :class="props.stepColors[i] || 'blue'">
            {{ props.stepNumbers[i] }}
          </div>
          <div class="google-flow-body">
            <slot :name="name" />
          </div>
        </div>
      </template>
    </div>
    <div v-if="$slots.figure" class="google-figure">
      <slot name="figure" />
    </div>
    <div v-if="$slots.after" class="google-flow-after">
      <slot name="after" />
    </div>
    <div v-if="$slots.source" class="google-source">
      <slot name="source" />
    </div>
  </div>
</template>
