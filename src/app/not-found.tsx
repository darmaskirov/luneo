import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section">
      <p>404</p>
      <h1>This page could not be found.</h1>
      <Link className="button" href="/catalog">
        Explore the collection ↗
      </Link>
    </section>
  );
}
