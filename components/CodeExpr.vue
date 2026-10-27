<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { useSlideContext } from '@slidev/client'
import { parse, render } from '../utils/codeMarkup'

// A single line of code, centered and large, using the markup in
// utils/codeMarkup.ts. `name` lets it pick up a view transition from the
// same code on the previous slide.
const props = defineProps<{
  expr: string
  name?: string
}>()

const { $clicks } = useSlideContext()

const tree = computed(() => parse(props.expr.trim()))
const ExprBody = defineComponent(() => () => render(tree.value, $clicks.value))
</script>

<template>
  <div class="code-expr">
    <pre class="expr code-markup" :style="{ viewTransitionName: name }"><ExprBody /></pre>
    <div class="notes">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.code-expr {
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
  font-size: 3rem;
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
