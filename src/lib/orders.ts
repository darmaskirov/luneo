import { Item, products } from "./products";
export interface OrderInput {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  items: Item[];
}
export interface OrderService {
  place(input: OrderInput): Promise<{ id: string; total: number; demo: true }>;
}
export const orderService: OrderService = {
  async place(input) {
    if (
      !input.name.trim() ||
      !/^\S+@\S+\.\S+$/.test(input.email) ||
      !input.address.trim() ||
      !input.city.trim() ||
      !input.items.length
    )
      throw new Error("Перевірте дані замовлення");
    const total = input.items.reduce((sum, item) => {
      const p = products.find((p) => p.id === item.id);
      if (
        !p ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 99
      )
        throw new Error("Некоректний кошик");
      return sum + p.price * item.quantity;
    }, 0);
    return {
      id: `DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      total,
      demo: true,
    };
  },
};
