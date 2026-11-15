import { Checkout } from "@/components/shop";
export const metadata = {
  title: "Demo checkout",
  robots: { index: false, follow: false },
};
export default function Page() {
  return <Checkout />;
}
