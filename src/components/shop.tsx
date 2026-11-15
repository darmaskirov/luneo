"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { products, money } from "@/lib/products";
import { useCart } from "./store";
import { orderService } from "@/lib/orders";
export function Card({ p }: { p: (typeof products)[number] }) {
  return (
    <Link className="product" href={`/product/${p.id}`} data-reveal>
      <div className="product-photo">
        <Image
          src={p.image}
          alt={`${p.name} — ${p.color}`}
          fill
          sizes="(max-width: 600px) 50vw, 33vw"
        />
        <span className="product-action">
          <ArrowUpRight size={20} />
        </span>
      </div>
      <div className="product-info">
        <h3>{p.name}</h3>
        <span>{money(p.price)}</span>
      </div>
      <small>
        {p.category} · {p.color}
      </small>
    </Link>
  );
}
export function Catalog() {
  const [category, setCategory] = useState("Усі");
  const [price, setPrice] = useState(10000);
  const [sort, setSort] = useState("default");
  const visible = products
    .filter(
      (p) =>
        (category === "Усі" || p.category === category) && p.price <= price,
    )
    .sort((a, b) =>
      sort === "asc"
        ? a.price - b.price
        : sort === "desc"
          ? b.price - a.price
          : 0,
    );
  return (
    <section className="section">
      <p className="eyebrow">КОЛЕКЦІЯ / 01</p>
      <h1>
        Форма вашого <i>ритму.</i>
      </h1>
      <div className="filters">
        <div className="tabs">
          {["Усі", ...new Set(products.map((p) => p.category))].map((c) => (
            <button
              className={category === c ? "active" : ""}
              key={c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <label>
          До {money(price)}
          <input
            type="range"
            min="2400"
            max="10000"
            step="100"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
          />
        </label>
        <select
          aria-label="Сортування"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">За замовчуванням</option>
          <option value="asc">Ціна: за зростанням</option>
          <option value="desc">Ціна: за спаданням</option>
        </select>
      </div>
      <p className="eyebrow">{visible.length} ПРЕДМЕТІВ</p>
      <div className="grid">
        {visible.map((p) => (
          <Card key={p.id} p={p} />
        ))}
      </div>
      {!visible.length && (
        <p>Нічого не знайдено. Збільште бюджет або змініть категорію.</p>
      )}
    </section>
  );
}
export function Product({ id }: { id: string }) {
  const initial = products.find((p) => p.id === id)!;
  const [chosen, setChosen] = useState(initial);
  const [quantity, setQuantity] = useState(1);
  const [photo, setPhoto] = useState(initial.image);
  const cart = useCart();
  return (
    <>
      <section className="product-detail section">
        <div>
          <div className="detail-photo">
            <Image
              src={photo}
              alt={`${chosen.name} ${chosen.color}`}
              fill
              sizes="(max-width: 700px) 100vw, 55vw"
              priority
            />
          </div>
          <div className="thumbnails">
            {[
              chosen.image,
              `/images/lifestyle-${Math.floor((+id - 1) / 3) + 1}.webp`,
            ].map((src) => (
              <button key={src} onClick={() => setPhoto(src)}>
                <Image
                  src={src}
                  alt="Переглянути фото"
                  width={90}
                  height={100}
                />
              </button>
            ))}
          </div>
          <small>
            Lifestyle — образ колекції; точний колір представлено на предметному
            фото.
          </small>
        </div>
        <div className="product-copy">
          <Link className="eyebrow" href="/catalog">
            КОЛЕКЦІЯ / {chosen.category}
          </Link>
          <h1>{chosen.name}</h1>
          <p className="price">{money(chosen.price)}</p>
          <p>{chosen.description}</p>
          <p>Колір: {chosen.color}</p>
          <div className="swatches">
            {products
              .filter((p) => p.name === chosen.name)
              .map((p) => (
                <button
                  title={p.color}
                  aria-label={p.color}
                  aria-pressed={chosen.id === p.id}
                  key={p.id}
                  style={{
                    background: ["#632731", "#e5ddce", "#30302e"][
                      (+p.id - 1) % 3
                    ],
                  }}
                  onClick={() => {
                    setChosen(p);
                    setPhoto(p.image);
                  }}
                />
              ))}
          </div>
          <label>
            Кількість{" "}
            <input
              className="qty-input"
              type="number"
              min="1"
              max="99"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, Math.min(99, +e.target.value || 1)))
              }
            />
          </label>
          <button
            className="button"
            onClick={() => cart.add(chosen.id, quantity)}
          >
            Додати до кошика <Plus size={18} />
          </button>
          <small>DEMO MODE · Покупка не списує кошти</small>
          {[
            [
              "Деталі та матеріали",
              "Концепт: фактурна шкіра, текстильна підкладка, металева фурнітура. Усі характеристики демонстраційні.",
            ],
            [
              "Догляд",
              "Зберігайте у тканинному чохлі, очищуйте м’якою сухою серветкою.",
            ],
            [
              "Доставка та повернення",
              "У цьому демомагазині доставка та повернення не виконуються.",
            ],
          ].map(([title, text]) => (
            <details key={title}>
              <summary>{title}</summary>
              <p>{text}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="section">
        <h2>
          У тому ж <i>настрої.</i>
        </h2>
        <div className="grid">
          {products
            .filter((p) => p.name !== chosen.name)
            .slice(0, 3)
            .map((p) => (
              <Card key={p.id} p={p} />
            ))}
        </div>
      </section>
    </>
  );
}
export function LocalForm({ newsletter = false }: { newsletter?: boolean }) {
  const [done, setDone] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
        e.currentTarget.reset();
      }}
    >
      {newsletter ? (
        <div className="newsletter-field">
          <input
            aria-label="Електронна пошта"
            type="email"
            placeholder="Ваша електронна пошта"
            required
          />
          <button aria-label="Підписатися">
            <ArrowUpRight />
          </button>
        </div>
      ) : (
        <>
          <label>
            Ваше ім’я
            <input required name="name" />
          </label>
          <label>
            Email
            <input required type="email" />
          </label>
          <label>
            Повідомлення
            <textarea required rows={4} />
          </label>
          <button className="button">
            Перевірити форму <ArrowUpRight size={18} />
          </button>
        </>
      )}
      <small role="status">
        {done
          ? "Дякуємо! Демонстрацію завершено. Дані нікуди не надіслані."
          : "Демо-форма: дані не зберігаються та не надсилаються."}
      </small>
    </form>
  );
}
export function Checkout() {
  const cart = useCart();
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  if (result)
    return (
      <section className="section confirmation">
        <p className="eyebrow">DEMO MODE</p>
        <h1>
          Дякуємо за <i>натхнення.</i>
        </h1>
        <p>Демозамовлення {result} успішно сформовано.</p>
        <p>
          Оплата не проводилася. Дані не збережені та не надіслані. Доставки не
          буде.
        </p>
        <Link className="button" href="/catalog">
          Повернутися до колекції ↗
        </Link>
      </section>
    );
  return (
    <section className="section">
      <p className="eyebrow">DEMO MODE — БЕЗ РЕАЛЬНИХ ПЛАТЕЖІВ І ЗАМОВЛЕНЬ</p>
      <h1>
        Останній <i>штрих.</i>
      </h1>
      {!cart.items.length ? (
        <Link href="/catalog">Кошик порожній. До колекції ↗</Link>
      ) : (
        <div className="checkout">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const d = new FormData(e.currentTarget);
              setBusy(true);
              try {
                const result = await orderService.place({
                  name: String(d.get("name")),
                  email: String(d.get("email")),
                  phone: String(d.get("phone")),
                  city: String(d.get("city")),
                  address: String(d.get("address")),
                  items: cart.items,
                });
                setResult(result.id);
                cart.clear();
              } catch (e) {
                setError((e as Error).message);
              } finally {
                setBusy(false);
              }
            }}
          >
            <h2>Контактні дані</h2>
            {[
              ["name", "Ім’я та прізвище", "text"],
              ["email", "Електронна пошта", "email"],
              ["phone", "Телефон", "tel"],
              ["city", "Місто", "text"],
              ["address", "Адреса доставки", "text"],
            ].map(([name, label, type]) => (
              <label key={name}>
                {label}
                <input
                  name={name}
                  type={type}
                  required
                  minLength={name === "phone" ? 7 : 2}
                  maxLength={150}
                />
              </label>
            ))}
            <p>
              Використовуйте вигадані дані. Усе обробляється лише у вашому
              браузері.
            </p>
            <p role="alert">{error}</p>
            <button disabled={busy} className="button">
              {busy ? "Обробка…" : "Підтвердити демозамовлення"}{" "}
              <ArrowUpRight size={18} />
            </button>
          </form>
          <aside>
            <h2>Ваш вибір</h2>
            {cart.items.map((x) => {
              const p = products.find((p) => p.id === x.id)!;
              return (
                <div className="order-row" key={x.id}>
                  <Image src={p.image} alt={p.name} width={70} height={90} />
                  <span>
                    {p.name} · {p.color}
                    <br />
                    {x.quantity} шт.
                  </span>
                  <span>{money(p.price * x.quantity)}</span>
                </div>
              );
            })}
            <h3 className="total">
              Разом{" "}
              <span>
                {money(
                  cart.items.reduce(
                    (s, x) =>
                      s +
                      products.find((p) => p.id === x.id)!.price * x.quantity,
                    0,
                  ),
                )}
              </span>
            </h3>
            <p>Доставка: не виконується · Оплата: відсутня</p>
            <button onClick={cart.open}>Редагувати кошик ↗</button>
          </aside>
        </div>
      )}
    </section>
  );
}
