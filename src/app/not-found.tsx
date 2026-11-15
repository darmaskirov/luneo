import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section">
      <p>404</p>
      <h1>Цю сторінку не знайдено.</h1>
      <Link className="button" href="/catalog">
        До колекції ↗
      </Link>
    </section>
  );
}
