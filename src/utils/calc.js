export function calcularTotales(items) {
  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const subtotal = total / 1.16;
  const iva = total - subtotal;

  return {
    subtotal,
    iva,
    total
  };
}