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
          alt="Burgundy Lune bag on a travertine plinth"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-copy">
          <p className="eyebrow">LUNEO / COLLECTION 01</p>
          <h1>
            Quiet
            <br />
            <i>expression.</i>
          </h1>
          <p>
            Some things need no words.
            <br />
            Only your touch.
          </p>
          <Link className="button" href="/catalog">
            Discover the collection <ArrowUpRight size={19} />
          </Link>
        </div>
        <span className="hero-note">MADE FOR YOUR EVERYDAY</span>
        <span className="hero-index">01 — 03</span>
      </section>
      <section className="intro section" data-reveal>
        <p className="eyebrow">QUIETLY UNFORGETTABLE</p>
        <h2>
          More than an accessory.
          <br />
          Your own <i>signature.</i>
        </h2>
        <p>
          We believe in simple lines, tactile textures and pieces you return to,
          again and again. Meet LUNEO.
        </p>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE EDIT / TIMELESS PIECES</p>
            <h2>
              Your everyday <i>companions.</i>
            </h2>
          </div>
          <Link href="/catalog">
            View all pieces <ArrowUpRight size={17} />
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
          alt="Ivory Forma tote on a stone bench"
          fill
          sizes="100vw"
        />
        <div data-reveal>
          <p className="eyebrow">THE NEW COLLECTION</p>
          <h2>
            Room
            <br />
            for <i>you.</i>
          </h2>
          <Link className="button light" href="/catalog">
            Find your form ↗
          </Link>
        </div>
      </section>
      <section className="story section">
        <div className="story-image">
          <Image
            src="/images/editorial-1.webp"
            alt="Working with burgundy leather — a concept brand story"
            fill
            sizes="(max-width:700px) 100vw, 50vw"
          />
        </div>
        <div data-reveal>
          <p className="eyebrow">THE LUNEO PHILOSOPHY</p>
          <h2>
            Character
            <br />
            in every <i>detail.</i>
          </h2>
          <p>
            Refinement begins where form meets feeling. In the curve of a
            handle. The depth of a colour. The freedom to be yourself.
          </p>
          <Link className="text-link" href="/about">
            Our story ↗
          </Link>
        </div>
      </section>
      <section className="section editorial">
        <div className="section-heading">
          <h2>
            Life between <i>plans.</i>
          </h2>
          <p className="eyebrow">LUNEO IN THE EVERYDAY</p>
        </div>
        <div className="lifestyle-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <Image
                src={`/images/lifestyle-${i}.webp`}
                alt={`LUNEO look ${i}`}
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
          alt="Graphite crossbody and burgundy wallet on stone steps"
          fill
          sizes="100vw"
        />
        <div>
          <p className="eyebrow">SMALL PIECES / EVERYDAY MEANING</p>
          <h2>
            Essentials.
            <br />
            <i>Always close.</i>
          </h2>
          <Link className="button light" href="/catalog">
            Find your finishing touch ↗
          </Link>
        </div>
      </section>
      <section className="benefits section">
        {[
          [Package, "Thoughtful design", "Your essentials, always close."],
          [ShieldCheck, "A feel for materials", "Textures made to be touched."],
          [Heart, "Beyond passing trends", "An aesthetic that stays with you."],
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
        <p className="eyebrow">LETTERS FROM LUNEO</p>
        <h2>
          Let’s stay <i>close.</i>
        </h2>
        <p>New stories, collections and a little inspiration.</p>
        <LocalForm newsletter />
      </section>
    </>
  );
}
