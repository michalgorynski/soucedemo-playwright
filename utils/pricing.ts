export function calculateOrderTotals(prices: number[], taxRate: number) {
  const itemTotal = prices.reduce((sum, price) => sum + price, 0);
  const tax = Math.round(itemTotal * taxRate * 100) / 100;
  const total = itemTotal + tax;

  return {
    itemTotal,
    tax,
    total,
  };
}
