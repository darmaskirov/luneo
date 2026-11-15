import { LocalForm } from "@/components/shop";
export const metadata = { title: "Контакти" };
export default function Page() {
  return (
    <section className="section">
      <p className="eyebrow">КОНТАКТИ</p>
      <h1>
        Почнімо з <i>розмови.</i>
      </h1>
      <div className="checkout">
        <div>
          <h2>Подобається цей досвід?</h2>
          <p>
            Це портфоліо-проєкт NULLEXWEB. Щоб обговорити справжній сайт для
            вашого бізнесу, відвідайте вебстудію.
          </p>
          <a
            className="text-link"
            href="https://nullexweb.com"
            target="_blank"
            rel="noreferrer"
          >
            nullexweb.com ↗
          </a>
          <p>
            Форма праворуч демонструє взаємодію та не надсилає повідомлення.
          </p>
        </div>
        <LocalForm />
      </div>
    </section>
  );
}
