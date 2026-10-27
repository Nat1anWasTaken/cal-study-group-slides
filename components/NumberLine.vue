<script setup lang="ts">
import { computed } from 'vue'
import katex from 'katex'
import { useSlideContext } from '@slidev/client'

// A schematic number line for floatEqual(): num2 with a ±delta band around
// it (click 1) and whether num1 lands inside the band (click 2). Positions
// are on a made-up scale from `min` to `max`, not real float values.
const props = withDefaults(defineProps<{
  num1: number
  num2: number
  delta: number
  min?: number
  max?: number
}>(), {
  min: -3,
  max: 3,
})

const { $clicks } = useSlideContext()

const at = (x: number) => `${(x - props.min) / (props.max - props.min) * 100}%`
const equal = computed(() => Math.abs(props.num1 - props.num2) <= props.delta)
const verdict = computed(() => katex.renderToString(
  `|\\,\\text{num1} - \\text{num2}\\,| ${equal.value ? '\\le' : '>'} \\text{delta}`,
))
</script>

<template>
  <div class="number-line">
    <div class="track">
      <div class="band" :class="{ off: $clicks < 1 }" :style="{ left: at(num2 - delta), right: `calc(100% - ${at(num2 + delta)})` }">
        <span class="edge left">−delta</span>
        <span class="edge right">+delta</span>
      </div>
      <div class="axis" />
      <div class="point num2" :style="{ left: at(num2) }">
        <span class="label">num2</span>
      </div>
      <div class="point num1" :style="{ left: at(num1) }">
        <span class="label">num1</span>
      </div>
    </div>

    <div class="verdict" :class="{ off: $clicks < 2, equal }">
      <span class="math" v-html="verdict" />
      <span>→ {{ equal ? '當成相等' : '不相等' }}</span>
      <code class="result">{{ equal ? '==' : '!=' }}</code>
    </div>
  </div>
</template>

<style scoped>
.number-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
  width: 100%;
}

.track {
  position: relative;
  width: 85%;
  height: 7rem;
}

.axis {
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  height: 4px;
  border-radius: 99px;
  background: var(--google-border);
  transform: translateY(-50%);
}

.band {
  position: absolute;
  top: 18%;
  bottom: 18%;
  border: 2px dashed var(--google-green);
  border-radius: 0.6rem;
  background: rgba(52, 168, 83, 0.12);
  transition: opacity 0.4s;
}

.edge {
  position: absolute;
  top: 100%;
  margin-top: 0.4rem;
  color: var(--google-green-dark);
  font-family: var(--slidev-code-font-family, monospace);
  font-size: 16px;
  transform: translateX(-50%);
}

.edge.left {
  left: 0;
}

.edge.right {
  left: 100%;
}

.point {
  position: absolute;
  top: 50%;
  width: 1.4rem;
  height: 1.4rem;
  border: 3px solid white;
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(60, 64, 67, 0.3);
  transform: translate(-50%, -50%);
}

.point.num2 {
  background: var(--google-blue);
}

.point.num1 {
  background: var(--google-yellow);
}

.point.num1 .label {
  top: 160%;
  bottom: auto;
}

.label {
  position: absolute;
  bottom: 160%;
  left: 50%;
  color: var(--google-ink);
  font-family: var(--slidev-code-font-family, monospace);
  font-size: 18px;
  font-weight: 600;
  transform: translateX(-50%);
}

.verdict {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--google-ink);
  font-size: 22px;
  transition: opacity 0.4s;
}

.verdict .math {
  font-size: 1.3rem;
}

.verdict .result {
  background: #fce8e6;
  color: #c5221f;
  font-size: 1.4rem;
}

.verdict.equal .result {
  background: #e6f4ea;
  color: var(--google-green-dark);
}

.off {
  opacity: 0;
}
</style>
