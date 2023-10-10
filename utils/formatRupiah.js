export function formatRupiah(value) {
  if (!value) return '';
  
  const strValue = String(value);

  return `Rp ${strValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}