<script setup lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
import { parse, render } from '../utils/codeMarkup'

// Rewrites one line of code a step per click: click k shows steps[k].
// Pieces named with ^^name:...^^ that appear in consecutive steps fly to
// their new place, the way ForCondition moves its results.
// Needs `clicks: steps.length - 1`.
const props = withDefaults(defineProps<{
  steps: string[]
  size?: string
}>(), {
  size: '2.6rem',
})

const { $clicks } = useSlideContext()

const step = ref($clicks.value)
watch($clicks, (clicks) => {
  if (!document.startViewTransition) {
    step.value = clicks
    return
  }
  document.startViewTransition(async () => {
    step.value = clicks
    await nextTick()
  })
})

const tree = computed(() => parse(props.steps[Math.min(step.value, props.steps.length - 1)].trim()))
const Body = defineComponent(() => () => render(tree.value, 0))
</script>

<template>
  <div class="expr-steps">
    <pre class="expr code-markup" :style="{ fontSize: size }"><Body /></pre>
    <div class="notes">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.expr-steps {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.expr {
  display: inline-block;
  margin: 0;
  padding: 0;
  border: none;
  box-shadow: none;
  color: var(--google-ink);
  font-family: var(--slidev-code-font-family, monospace);
  line-height: 1.4;
  white-space: pre;
}

.notes {
  min-height: 5.5rem;
  text-align: center;
}

.notes :deep(p) {
  margin: 0 0 0.6rem;
  color: var(--google-ink);
  font-size: 22px;
  line-height: 1.5;
}

.notes :deep(code.type) {
  background: #fce8e6;
  color: #c5221f;
}
</style>
