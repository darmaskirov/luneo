export const money = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0") + "\u00a0грн";
export const colors = ["Бордо", "Молочний", "Графіт"];
export const products = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  name: ["Lune", "Forma", "Élan", "Plié"][Math.floor(i / 3)],
  category: ["Сумки на плече", "Тоут", "Кросбоді", "Аксесуари"][
    Math.floor(i / 3)
  ],
  color: colors[i % 3],
  price: [6800, 8900, 5400, 2400][Math.floor(i / 3)],
  image: `/images/product-${i + 1}.webp`,
  description:
    "Чітка форма. М’яка фактура. Продуманий простір для найважливішого. Аксесуар, який доповнює ваш ритм, залишаючи місце для індивідуальності.",
}));
export type Item = { id: string; quantity: number };
