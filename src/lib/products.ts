export const money = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0") + "\u00a0UAH";
export const colors = ["Burgundy", "Ivory", "Graphite"];
export const products = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  name: ["Lune", "Forma", "Élan", "Plié"][Math.floor(i / 3)],
  category: ["Shoulder bags", "Totes", "Crossbody", "Accessories"][
    Math.floor(i / 3)
  ],
  color: colors[i % 3],
  price: [6800, 8900, 5400, 2400][Math.floor(i / 3)],
  image: `/images/product-${i + 1}.webp`,
  description:
    "Clean lines. A soft touch. Thoughtful space for your essentials. An accessory that follows your rhythm and leaves room for individuality.",
}));
export type Item = { id: string; quantity: number };
