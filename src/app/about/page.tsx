import Image from "next/image";
export const metadata = { title: "Світ LUNEO" };
export default function Page() {
  return (
    <section className="section">
      <p className="eyebrow">СВІТ LUNEO</p>
      <h1>
        Краса бути <i>собою.</i>
      </h1>
      <div className="story">
        <div>
          <h2>
            Тиха впевненість.
            <br />
            Виразна форма.
          </h2>
          <p>
            LUNEO — вигаданий преміальний бренд, створений як незалежний
            демонстраційний проєкт вебстудії NULLEXWEB. Це дослідження сучасного
            fashion commerce: від першого враження до останнього кроку
            оформлення.
          </p>
          <p>
            Наша візуальна мова — природне світло, тактильні матеріали, молочні
            відтінки та глибокий бордовий. Усі фотографії створені за допомогою
            генерації зображень. Товари не продаються, виробничі процеси та
            характеристики є частиною концепції.
          </p>
        </div>
        <div className="story-image">
          <Image
            src="/images/editorial-2.webp"
            alt="Матеріали та кольори концепції LUNEO"
            fill
            sizes="50vw"
          />
        </div>
      </div>
      <div className="campaign">
        <Image
          src="/images/banner-3.webp"
          alt="Аксесуари LUNEO на архітектурних сходах"
          fill
          sizes="100vw"
        />
      </div>
    </section>
  );
}
