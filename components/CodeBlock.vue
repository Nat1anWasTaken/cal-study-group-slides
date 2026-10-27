<script setup lang="ts">
import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
import { parse, render } from '../utils/codeMarkup'

// A whole program (or any block of code) in the CodeCall card, using the
// markup in utils/codeMarkup.ts, with the default slot as a side panel.
// `scan` plays the compiler reading top to bottom: on click k the scan line
// sits on line scan[k - 1] (0-based) and the lines below it are dimmed.
// `trace` moves the same line along without dimming, to follow a run.
// `steps` rewrites the code on each click (click k shows steps[k]), with
// ^^name:...^^ pieces moving to their new place as in ExprSteps.
const props = defineProps<{
  code?: string
  steps?: string[]
  scan?: number[]
  trace?: number[]
  size?: string
}>()

const { $clicks } = useSlideContext()
const slots = useSlots()

const step = ref($clicks.value)
watch($clicks, (clicks) => {
  if (!props.steps || !document.startViewTransition) {
    step.value = clicks
    return
  }
  document.startViewTransition(async () => {
    step.value = clicks
    await nextTick()
  })
})

const source = computed(() => props.steps
  ? props.steps[Math.min(step.value, props.steps.length - 1)]
  : props.code ?? '')
const tree = computed(() => parse(source.value.trim()))
const Body = defineComponent(() => () => render(tree.value, $clicks.value))

const lines = computed(() => props.scan ?? props.trace)

// Fallback glyphs can make a rendered line a little taller than its
// line-height, so the bar follows the measured line pitch instead of 1.5em.
// Slidev mounts upcoming slides while they are hidden (zero size), so the
// pitch is taken again whenever the code is resized, e.g. when it shows up.
const codeEl = ref<HTMLElement>()
const pitch = ref<{ top: number, height: number }>()
function measure() {
  const code = codeEl.value
  if (!code || !lines.value || code.offsetHeight === 0)
    return
  const count = source.value.trim().split('\n').length
  pitch.value = { top: code.offsetTop, height: code.offsetHeight / count }
}
let observer: ResizeObserver | undefined
onMounted(() => {
  if (!lines.value || !codeEl.value)
    return
  observer = new ResizeObserver(measure)
  observer.observe(codeEl.value)
})
onBeforeUnmount(() => observer?.disconnect())
watch(source, () => nextTick(measure))

const scanLine = computed(() => {
  if (!lines.value?.length || $clicks.value < 1)
    return undefined
  return lines.value[Math.min($clicks.value, lines.value.length) - 1]
})

const barStyle = computed(() => {
  const line = scanLine.value ?? 0
  if (!pitch.value)
    return { '--line': line }
  const { top, height } = pitch.value
  return { top: `${top + line * height}px`, height: `${height}px` }
})
const shadeStyle = computed(() => {
  const line = scanLine.value ?? 0
  if (!pitch.value)
    return { '--line': line }
  const { top, height } = pitch.value
  return { top: `${top + (line + 1) * height}px` }
})
</script>

<template>
  <div class="code-block" :class="{ alone: !slots.default }">
    <pre class="code code-markup" :style="{ fontSize: size }"><span
      v-if="lines"
      class="scan-bar"
      :class="{ off: scanLine === undefined }"
      :style="barStyle"
    /><code ref="codeEl"><Body /></code><span
      v-if="scan"
      class="scan-shade"
      :class="{ off: scanLine === undefined }"
      :style="shadeStyle"
    /></pre>

    <div v-if="slots.default" class="panel">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.code-block {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  column-gap: 3rem;
  width: 100%;
}

.code-block.alone {
  grid-template-columns: auto;
  justify-content: center;
}

.code {
  position: relative;
  margin: 0;
  padding: 1.2rem 1.8rem;
  border: 1px solid var(--google-border);
  border-radius: 0.9rem;
  background: var(--google-surface);
  box-shadow: 0 3px 12px rgba(60, 64, 67, 0.08);
  color: var(--google-ink);
  font-family: var(--slidev-code-font-family, monospace);
  font-size: 1.4rem;
  line-height: 1.5;
  view-transition-name: code-block;
}

.code code {
  position: relative;
  display: block;
}

.scan-bar,
.scan-shade {
  position: absolute;
  right: 0;
  left: 0;
  transition: top 0.5s ease-in-out, opacity 0.3s;
}

.scan-bar {
  top: calc(1.2rem + var(--line) * 1.5em);
  height: 1.5em;
  border-left: 5px solid var(--google-blue);
  background: var(--google-blue-soft);
}

.scan-shade {
  top: calc(1.2rem + (var(--line) + 1) * 1.5em);
  bottom: 0;
  border-radius: 0 0 0.9rem 0.9rem;
  background: rgba(248, 249, 250, 0.78);
}

.scan-bar.off,
.scan-shade.off {
  opacity: 0;
}

.panel {
  min-width: 0;
}

.panel :deep(code.type) {
  background: #fce8e6;
  color: #c5221f;
}

.panel :deep(p) {
  margin: 0 0 0.8rem;
  color: var(--google-ink);
  font-size: 22px;
  line-height: 1.5;
}
</style>
