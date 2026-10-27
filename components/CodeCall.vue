<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { useSlideContext } from '@slidev/client'
import { parse, render } from '../utils/codeMarkup'

// `main` is the body of main(), one statement per line, and `fn` is the
// function defined above it (needed unless `only-main` leaves it out). Both
// use the markup in utils/codeMarkup.ts.
const props = defineProps<{
  main?: string
  fn?: string
  dim?: boolean
  onlyMain?: boolean
}>()

const { $clicks } = useSlideContext()

const tree = computed(() => parse(
  (props.main ?? '').trim().split('\n').map(line => `    ${line}`).join('\n'),
))
const fnTree = computed(() => parse((props.fn ?? '').trim()))

const MainBody = defineComponent(() => () => render(tree.value, $clicks.value))
const FnBody = defineComponent(() => () => render(fnTree.value, $clicks.value))
</script>

<template>
  <div class="code-call">
    <pre class="code code-markup"><code><template v-if="!onlyMain"><span class="fn-def" :class="{ dim }"><FnBody /></span>

</template><span class="kw">int</span> main(<span class="kw">void</span>) {
<MainBody />
    <span class="kw">return</span> 0;
}</code></pre>

    <div class="panel">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.code-call {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  column-gap: 3rem;
  width: 100%;
}

.code {
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

.fn-def {
  transition: opacity 0.4s;
}

.fn-def.dim {
  opacity: 0.3;
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
