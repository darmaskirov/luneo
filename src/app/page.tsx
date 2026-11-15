import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Package, ShieldCheck, Heart } from "lucide-react";
import { Card, LocalForm } from "@/components/shop";
import { products } from "@/lib/products";
export default function Home() {
  return (
    <>
      <section className="hero">
        <Image
          src="/images/hero.webp"
          alt="Бордова сумка Lune на травертиновому п’єдесталі"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-copy">
          <p className="eyebrow">LUNEO / COLLECTION 01</p>
          <h1>
            Тиха
            <br />
            <i>виразність.</i>
          </h1>
          <p>
            Речі, які не потребують зайвих слів.
            <br />
            Лише вашого дотику.
          </p>
          <Link className="button" href="/catalog">
            Відкрити колекцію <ArrowUpRight size={19} />
          </Link>
        </div>
        <span className="hero-note">СТВОРЕНО ДЛЯ ВАШОГО РИТМУ</span>
        <span className="hero-index">01 — 03</span>
      </section>
      <section className="intro section" data-reveal>
        <p className="eyebrow">НЕПОМІТНО НЕЗАБУТНЯ</p>
        <h2>
          Не просто аксесуар.
          <br />
          Ваша особиста <i>інтонація.</i>
        </h2>
        <p>
          Ми віримо в красу простих ліній, приємних на дотик фактур і речей, до
          яких хочеться повертатися. Знайомтеся з LUNEO.
        </p>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ОБРАНЕ / ПОЗА ЧАСОМ</p>
            <h2>
              Ваші нові <i>супутники.</i>
            </h2>
          </div>
          <Link href="/catalog">
            Уся колекція <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="grid">
          {[products[0], products[4], products[8]].map((p) => (
            <Card key={p.id} p={p} />
          ))}
        </div>
      </section>
      <section className="campaign">
        <Image
          src="/images/banner-2.webp"
          alt="Молочна сумка Forma на кам’яній лаві"
          fill
          sizes="100vw"
        />
        <div data-reveal>
          <p className="eyebrow">НОВА КОЛЕКЦІЯ</p>
          <h2>
            Простір
            <br />
            для <i>свого.</i>
          </h2>
          <Link className="button light" href="/catalog">
            Знайти свою форму ↗
          </Link>
        </div>
      </section>
      <section className="story section">
        <div className="story-image">
          <Image
            src="/images/editorial-1.webp"
            alt="Робота з бордовою шкірою — візуальна історія бренду"
            fill
            sizes="(max-width:700px) 100vw, 50vw"
          />
        </div>
        <div data-reveal>
          <p className="eyebrow">ФІЛОСОФІЯ LUNEO</p>
          <h2>
            Характер
            <br />у кожній <i>деталі.</i>
          </h2>
          <p>
            Витонченість народжується там, де форма зустрічається з відчуттям. У
            вигині ручки. У глибині кольору. У свободі бути собою.
          </p>
          <Link className="text-link" href="/about">
            Познайомитися ближче ↗
          </Link>
        </div>
      </section>
      <section className="section editorial">
        <div className="section-heading">
          <h2>
            Життя між <i>планами.</i>
          </h2>
          <p className="eyebrow">LUNEO IN THE EVERYDAY</p>
        </div>
        <div className="lifestyle-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <Image
                src={`/images/lifestyle-${i}.webp`}
                alt={`Образ LUNEO ${i}`}
                fill
                sizes="(max-width:600px) 50vw,25vw"
              />
            </div>
          ))}
        </div>
      </section>
      <section className="campaign accessories-campaign">
        <Image
          src="/images/banner-3.webp"
          alt="Графітова кросбоді та бордовий гаманець на кам’яних сходах"
          fill
          sizes="100vw"
        />
        <div>
          <p className="eyebrow">МАЛЕНЬКІ РЕЧІ / ВЕЛИКИЙ СЕНС</p>
          <h2>
            Важливе.
            <br />
            <i>Поруч.</i>
          </h2>
          <Link className="button light" href="/catalog">
            Знайти свій акцент ↗
          </Link>
        </div>
      </section>
      <section className="benefits section">
        {[
          [Package, "Продумана форма", "Усе важливе — поруч."],
          [
            ShieldCheck,
            "Увага до матеріалів",
            "Фактури, які хочеться відчувати.",
          ],
          [Heart, "Поза швидкими трендами", "Естетика, що залишається з вами."],
        ].map(([Icon, title, text]) => {
          const I = Icon as typeof Heart;
          return (
            <div key={String(title)}>
              <I strokeWidth={1} />
              <h3>{String(title)}</h3>
              <p>{String(text)}</p>
            </div>
          );
        })}
      </section>
      <section className="newsletter">
        <p className="eyebrow">ЛИСТИ ВІД LUNEO</p>
        <h2>
          Залишаймося <i>ближче.</i>
        </h2>
        <p>Нові історії, колекції та трохи натхнення.</p>
        <LocalForm newsletter />
      </section>
    </>
  );
}
