export let formateMoney = (val = 0) => {
  typeof val === 'number'
    ? val
    : val = 0
  return Number(val).toFixed(2)
}