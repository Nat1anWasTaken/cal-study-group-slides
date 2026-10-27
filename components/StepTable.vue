<script setup lang="ts">
import katex from 'katex'
import { useSlideContext } from '@slidev/client'

// A trace that fills in one row per click, starting on click `at`, in the
// same code-chip style as ForCondition. `steps` instead gives the click for
// each row, for traces with clicks in between. Row `good` ends in green and
// row `bad` in red, for the row where the answer comes out right or wrong.
// A header written as $...$ is typeset as math.
const props = withDefaults(defineProps<{
  head: string[]
  rows: (string | number)[][]
  at?: number
  steps?: number[]
  good?: number
  bad?: number
}>(), {
  at: 1,
})

const { $clicks } = useSlideContext()

// The result of a row is its last filled-in cell.
const resultCol = (row: (string | number)[]) => row.findLastIndex(cell => cell !== '')
const shownAt = (r: number) => props.steps?.[r] ?? props.at + r
const isMath = (cell: string) => /^\$.+\$$/.test(cell)
const math = (cell: string) => katex.renderToString(cell.slice(1, -1))
</script>

<template>
  <table class="steps">
    <thead>
      <tr>
        <th v-for="cell in head" :key="cell">
          <span v-if="isMath(cell)" class="math" v-html="math(cell)" />
          <template v-else>
            {{ cell }}
          </template>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, r) in rows"
        :key="r"
        :class="{ pending: $clicks < shownAt(r), good: r === good, bad: r === bad }"
      >
        <td v-for="(cell, c) in row" :key="c" :class="{ result: c === resultCol(row) }">
          <code v-if="cell !== ''">{{ cell }}</code>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.steps {
  width: auto;
  margin: 0;
  border: none;
  box-shadow: none;
  font-size: 24px;
}

.steps th,
.steps td {
  padding: 0.25rem 1.2rem 0.25rem 0;
  border: none;
  background: none;
  white-space: nowrap;
}

.steps th {
  color: var(--google-muted);
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.steps th .math {
  color: var(--google-ink);
  font-size: 22px;
  letter-spacing: normal;
}

.steps tr.pending {
  visibility: hidden;
}

.steps tr.good td.result code {
  background: #e6f4ea;
  color: var(--google-green-dark);
}

.steps tr.bad td.result code {
  background: #fce8e6;
  color: #c5221f;
}
</style>
