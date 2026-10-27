<script setup lang="ts">
import type { VNodeChild } from 'vue'
import { computed, defineComponent, h, Transition } from 'vue'
import { useSlideContext } from '@slidev/client'

// `main` is the body of main(), one statement per line:
//   [[linear(5)|13]]     a call that is replaced by its value on click 1
//   [[2:a * 2|26]]       the same, on click 2 (swaps can nest)
//   {{13}}               a plain value, highlighted as one
const props = defineProps<{
  main?: string
  dim?: boolean
}>()

type Node =
  | { type: 'text', text: string }
  | { type: 'value', text: string }
  | { type: 'swap', step: number, call: Node[], value: string }

function parse(src: string): Node[] {
  let i = 0

  function readUntil(end: string) {
    const j = src.indexOf(end, i)
    const text = src.slice(i, j)
    i = j + end.length
    return text
  }

  function nodes(stop?: string): Node[] {
    const out: Node[] = []
    let text = ''
    const flush = () => {
      if (text)
        out.push({ type: 'text', text })
      text = ''
    }
    while (i < src.length) {
      if (stop && src.startsWith(stop, i)) {
        i += stop.length
        break
      }
      if (src.startsWith('[[', i)) {
        flush()
        i += 2
        const step = /^(\d+):/.exec(src.slice(i))
        if (step)
          i += step[0].length
        const call = nodes('|')
        out.push({ type: 'swap', step: step ? Number(step[1]) : 1, call, value: readUntil(']]') })
      }
      else if (src.startsWith('{{', i)) {
        flush()
        i += 2
        out.push({ type: 'value', text: readUntil('}}') })
      }
      else {
        text += src[i++]
      }
    }
    flush()
    return out
  }

  return nodes()
}

const TOKEN = /("(?:[^"\\]|\\.)*")|\b(int|void|return|if|else|for|while)\b/g

function highlight(text: string): VNodeChild[] {
  const out: VNodeChild[] = []
  let last = 0
  for (const m of text.matchAll(TOKEN)) {
    out.push(text.slice(last, m.index))
    out.push(h('span', { class: m[1] ? 'str' : 'kw' }, m[0]))
    last = m.index! + m[0].length
  }
  out.push(text.slice(last))
  return out
}

const { $clicks } = useSlideContext()

const tree = computed(() => parse(
  (props.main ?? '').trim().split('\n').map(line => `    ${line}`).join('\n'),
))

function render(nodes: Node[]): VNodeChild[] {
  return nodes.flatMap((node): VNodeChild[] => {
    if (node.type === 'text')
      return highlight(node.text)
    if (node.type === 'value')
      return [h('span', { class: 'slot value' }, node.text)]
    const done = $clicks.value >= node.step
    const next = $clicks.value + 1 === node.step
    return [h(Transition, { name: 'swap', mode: 'out-in' }, () => done
      ? h('span', { key: 'value', class: 'slot value' }, node.value)
      : h('span', { key: 'call', class: ['slot', { call: next }] }, render(node.call)))]
  })
}

const MainBody = defineComponent(() => () => render(tree.value))
</script>

<template>
  <div class="code-call">
    <pre class="code"><code><span class="fn-def" :class="{ dim }"><span class="kw">int</span> <span class="pad">linear(<span class="kw">int</span> x)</span> {
    <span class="kw">return</span> <span class="pad">2 * x + 3</span>;
}</span>

<span class="kw">int</span> main(<span class="kw">void</span>) {
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

.code :deep(.kw) {
  color: #a0414c;
}

.code :deep(.str) {
  color: #b45309;
}

.fn-def {
  transition: opacity 0.4s;
}

.fn-def.dim {
  opacity: 0.3;
}

.pad {
  padding: 0.05em 0.2em;
}

.code :deep(.slot) {
  display: inline-block;
  padding: 0 0.2em;
  border-radius: 0.35rem;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.code :deep(.slot.call) {
  background: var(--google-blue-soft);
  box-shadow: inset 0 -3px 0 var(--google-blue);
}

.code :deep(.slot.value) {
  background: #e6f4ea;
  box-shadow: inset 0 -3px 0 var(--google-green);
}

.code :deep(.swap-enter-active),
.code :deep(.swap-leave-active) {
  transition: opacity 0.3s, transform 0.3s;
}

.code :deep(.swap-enter-from) {
  opacity: 0;
  transform: translateY(0.4em) scale(0.8);
}

.code :deep(.swap-leave-to) {
  opacity: 0;
  transform: translateY(-0.4em) scale(0.8);
}

.panel {
  min-width: 0;
}
</style>
