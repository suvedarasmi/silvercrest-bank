export function toPaise(input) {
  if (!/^\d+(\.\d{1,2})?$/.test(input.trim())) return null;
  const [whole, fraction = ''] = input.trim().split('.');
  const total = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  return Number.isSafeInteger(total) && total > 0 ? total : null;
}
