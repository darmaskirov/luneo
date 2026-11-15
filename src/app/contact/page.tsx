import { LocalForm } from "@/components/shop";
export const metadata = { title: "Contact" };
export default function Page() {
  return (
    <section className="section">
      <p className="eyebrow">CONTACT</p>
      <h1>
        Let’s start a <i>conversation.</i>
      </h1>
      <div className="checkout">
        <div>
          <h2>Like what you see?</h2>
          <p>
            This is a NULLEXWEB portfolio project. Visit the studio to discuss a
            website for your business.
          </p>
          <a
            className="text-link"
            href="https://nullexweb.com"
            target="_blank"
            rel="noreferrer"
          >
            nullexweb.com ↗
          </a>
          <p>This form demonstrates the experience. No message will be sent.</p>
        </div>
        <LocalForm />
      </div>
    </section>
  );
}
