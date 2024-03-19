export function parseValueOrRange(text: string): {} {
  let matches = text?.match(/(?<value1>[\d.]*)?(?<operator>[^\d]*)?(?<value2>[\d.]*)?/)

    if(!matches) {
      return { low: null, high: null, value: null }
    }

    if (!!matches.groups['value1'] && !!matches.groups['value2']) {
      return {
        low: parseFloat(matches.groups['value1']),
        high: parseFloat(matches.groups['value2'])
      }
    }

    if (['<', '<='].includes(matches.groups['operator'])) {
      return {
        low: null,
        high: parseFloat(matches.groups['value2'])
      }
    }

    if (['>', '>='].includes(matches.groups['operator'])) {
      return {
        low: parseFloat(matches.groups['value2']),
        high: null
      }
    }

  return { value: matches.groups['value1']}

}
