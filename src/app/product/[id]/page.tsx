import { Product } from "@/components/shop";
import { products } from "@/lib/products";
import { notFound } from "next/navigation";
export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = products.find((p) => p.id === id);
  return { title: p ? `${p.name} — ${p.color}` : "Товар не знайдено" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!products.some((p) => p.id === id)) notFound();
  return <Product key={id} id={id} />;
}
