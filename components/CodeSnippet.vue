<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { useSlideContext } from '@slidev/client'
import { parse, render } from '../utils/codeMarkup'

// A standalone block of code in the same card style as CodeCall, using the
// markup in utils/codeMarkup.ts. `size` overrides the small default font.
const props = defineProps<{
  code: string
  size?: string
}>()

const { $clicks } = useSlideContext()

const tree = computed(() => parse(props.code.trim()))
const Body = defineComponent(() => () => render(tree.value, $clicks.value))
</script>

<template>
  <pre class="snippet code-markup" :style="{ fontSize: size }"><code><Body /></code></pre>
</template>

<style scoped>
.snippet {
  margin: 0;
  padding: 0.9rem 1.1rem;
  border: 1px solid var(--google-border);
  border-radius: 0.9rem;
  background: var(--google-surface);
  box-shadow: 0 3px 12px rgba(60, 64, 67, 0.08);
  color: var(--google-ink);
  font-family: var(--slidev-code-font-family, monospace);
  font-size: 0.95rem;
  line-height: 1.5;
}
</style>
