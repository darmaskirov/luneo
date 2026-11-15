export const metadata = { title: "Frequently asked questions" };
export default function Page() {
  return (
    <section className="section faq">
      <p className="eyebrow">HERE TO HELP</p>
      <h1>
        Everything that <i>matters.</i>
      </h1>
      {[
        [
          "Can I buy these products?",
          "No. LUNEO is a demo storefront. No real payments, orders or deliveries are processed.",
        ],
        [
          "What happens to my details?",
          "Contact details are processed only in browser memory. They are not sent to a server or third-party services. The shopping bag saves only product IDs and quantities in localStorage.",
        ],
        [
          "Is my shopping bag saved?",
          "Yes, in this browser, including after a reload. Remove the items from your bag to clear it.",
        ],
        [
          "Where does the imagery come from?",
          "All 21 images were AI-generated for the fictional LUNEO brand. They are concept images rather than photographs of real products.",
        ],
        [
          "Who created this project?",
          "This project was created for the portfolio of NULLEXWEB (nullexweb.com).",
        ],
        [
          "How can real checkout be connected?",
          "The code includes an OrderService interface. A live store requires a server-side CRM adapter, data protection and a payment integration.",
        ],
      ].map(([q, a]) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </section>
  );
}
