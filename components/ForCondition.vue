<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'

// Steps through `for (int i = 0; i < limit; i++)` two clicks per round:
// the first evaluates `i < limit` in the table, the second moves the result
// into the code in place of the condition (the table keeps its own copy).
// Needs `clicks: 2 * (limit + 1)`.
const props = withDefaults(defineProps<{
  limit?: number
}>(), {
  limit: 3,
})

const { $clicks } = useSlideContext()

// The DOM follows `step` rather than $clicks directly, so each change can
// run inside a view transition and the result can fly into the code.
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

const rounds = computed(() => Array.from({ length: props.limit + 1 }, (_, i) => ({
  i,
  result: i < props.limit ? '1' : '0',
})))

// The round whose result currently sits in the code, if any.
const inserted = computed(() =>
  step.value > 0 && step.value % 2 === 0 ? rounds.value[step.value / 2 - 1] : undefined)

const main = computed(() => {
  const condition = `i < ${props.limit}`
  // Padded to the condition's width so the code does not shift around.
  const round = inserted.value
  const cond = round ? `^^cond-${round.i}:${round.result.padEnd(condition.length)}^^` : condition
  return `for (int i = 0; <<${cond}>>; i++) {\n    printf("%d\\n", i);\n}`
})
</script>

<template>
  <CodeCall :main="main" only-main>
    <slot />

    <table class="rounds">
      <tbody>
        <tr v-for="round in rounds" :key="round.i" :class="{ pending: step < 2 * round.i + 1 }">
          <td><code class="type">{{ round.i }} &lt; {{ limit }}</code></td>
          <td>
            <code
              class="type result"
              :style="{ viewTransitionName: step === 2 * round.i + 1 ? `cond-${round.i}` : undefined }"
            >{{ round.result }}</code>
            <span v-if="round.i === limit" :class="{ waiting: step < 2 * limit + 2 }"> → 停下來</span>
          </td>
        </tr>
      </tbody>
    </table>
  </CodeCall>
</template>

<style scoped>
.rounds {
  margin-top: 0.4rem;
  border: none;
  box-shadow: none;
  font-size: 20px;
}

.rounds td {
  padding: 0.3rem 0.9rem 0.3rem 0;
  border: none;
  white-space: nowrap;
}

.rounds tr.pending,
.waiting {
  visibility: hidden;
}

.result {
  display: inline-block;
}
</style>
