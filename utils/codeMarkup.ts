import type { VNodeChild } from 'vue'
import { h, resolveDirective, Transition, withDirectives } from 'vue'

// A small markup for code that changes on click:
//   [[linear(5)|13]]     a call that is replaced by its value on click 1
//   [[2:a * 2|26]]       the same, on click 2 (swaps can nest)
//   [[2!:f(4)|true]]     a function call that returns a bool: blue, then red
//                        (a swap to true/false is shown in the bool red)
//   {{13}}               a plain value, highlighted as one
//   <<int>>              a type or a bool expression, in the return-type red
//   ~~int y = f();~~     code that does not compile
//   ^^expr:x % 2^^       gives the code a view-transition-name
//   @@i < 3@@            highlights the code without replacing it
//   %%1:box.red:bool%%   a hand-drawn v-mark on click 1 (type.color modifiers),
//                        or already drawn when the click is 0
// Comments (`// ...` and `/* ... */`) are greyed out, even across markup.

export type Node =
  | { type: 'text', text: string, comment?: boolean }
  | { type: 'value', text: string }
  | { type: 'type' | 'error' | 'focus', children: Node[] }
  | { type: 'named', name: string, children: Node[] }
  | { type: 'mark', at: number, modifiers: string[], children: Node[] }
  | { type: 'swap', step: number, isCall: boolean, call: Node[], value: string }

export function parse(src: string): Node[] {
  let i = 0
  // Comments can span several text nodes (a v-mark inside a doc comment),
  // so whether we are in one is tracked across the whole parse.
  let comment: '' | 'line' | 'block' = ''

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
        out.push(comment ? { type: 'text', text, comment: true } : { type: 'text', text })
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
        const step = /^(\d+)(!?):/.exec(src.slice(i))
        if (step)
          i += step[0].length
        const call = nodes('|')
        out.push({ type: 'swap', step: step ? Number(step[1]) : 1, isCall: step?.[2] === '!', call, value: readUntil(']]') })
      }
      else if (src.startsWith('<<', i)) {
        flush()
        i += 2
        out.push({ type: 'type', children: nodes('>>') })
      }
      else if (src.startsWith('~~', i) && stop !== '~~') {
        flush()
        i += 2
        out.push({ type: 'error', children: nodes('~~') })
      }
      else if (src.startsWith('^^', i) && stop !== '^^') {
        flush()
        i += 2
        const name = readUntil(':')
        out.push({ type: 'named', name, children: nodes('^^') })
      }
      else if (src.startsWith('%%', i) && stop !== '%%') {
        flush()
        i += 2
        const at = Number(readUntil(':'))
        const modifiers = readUntil(':').split('.')
        out.push({ type: 'mark', at, modifiers, children: nodes('%%') })
      }
      else if (src.startsWith('@@', i) && stop !== '@@') {
        flush()
        i += 2
        out.push({ type: 'focus', children: nodes('@@') })
      }
      else if (src.startsWith('{{', i)) {
        flush()
        i += 2
        out.push({ type: 'value', text: readUntil('}}') })
      }
      else if (!comment && (src.startsWith('//', i) || src.startsWith('/*', i))) {
        flush()
        comment = src[i + 1] === '/' ? 'line' : 'block'
        text += src.slice(i, i + 2)
        i += 2
      }
      else if ((comment === 'block' && src.startsWith('*/', i)) || (comment === 'line' && src[i] === '\n')) {
        if (comment === 'block') {
          text += '*/'
          i += 2
        }
        flush()
        comment = ''
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

const TOKEN = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)')|\b(int|float|char|bool|true|false|void|return|if|else|for|while)\b/g

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

// Inside a bool expression the blue and green highlights are left out, so
// they do not clash with the red around it.
export function render(nodes: Node[], clicks: number, inBool = false): VNodeChild[] {
  return nodes.flatMap((node): VNodeChild[] => {
    if (node.type === 'text')
      return node.comment ? [h('span', { class: 'cm' }, node.text)] : highlight(node.text)
    if (node.type === 'value')
      return [h('span', { class: 'slot value' }, node.text)]
    if (node.type === 'mark') {
      const mark = resolveDirective('mark')!
      const modifiers = Object.fromEntries(node.modifiers.map(m => [m, true]))
      return [withDirectives(h('span', { class: 'mark' }, render(node.children, clicks, inBool)), [[mark, { at: node.at || false, padding: 2 }, '', modifiers]])]
    }
    if (node.type === 'named')
      return [h('span', { style: { display: 'inline-block', viewTransitionName: node.name } }, render(node.children, clicks, inBool))]
    if (node.type === 'type' || node.type === 'error' || node.type === 'focus') {
      const cls = { type: 'slot type', error: 'error', focus: 'slot call' }[node.type]
      return [h('span', { class: cls }, render(node.children, clicks, inBool))]
    }
    const done = clicks >= node.step
    const next = clicks + 1 === node.step
    // Anything that evaluates to a bool is red from start to finish.
    // A function call (`!`) keeps the blue highlight even when it returns a bool.
    const bool = node.value === 'true' || node.value === 'false'
    const boolExpr = bool && !node.isCall
    return [h(Transition, { name: 'swap', mode: 'out-in' }, () => done
      ? h('span', { key: 'value', class: ['slot', bool ? 'type' : { value: !inBool }] }, node.value)
      : h('span', { key: 'call', class: ['slot', boolExpr ? 'type' : { call: next && !inBool }] }, render(node.call, clicks, inBool || boolExpr)))]
  })
}
