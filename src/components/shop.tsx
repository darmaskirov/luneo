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
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState(10000);
  const [sort, setSort] = useState("default");
  const visible = products
    .filter(
      (p) =>
        (category === "All" || p.category === category) && p.price <= price,
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
      <p className="eyebrow">COLLECTION / 01</p>
      <h1>
        Made for your <i>rhythm.</i>
      </h1>
      <div className="filters">
        <div className="tabs">
          {["All", ...new Set(products.map((p) => p.category))].map((c) => (
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
          Up to {money(price)}
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
          aria-label="Sort by"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Featured</option>
          <option value="asc">Price: low to high</option>
          <option value="desc">Price: high to low</option>
        </select>
      </div>
      <p className="eyebrow">{visible.length} PIECES</p>
      <div className="grid">
        {visible.map((p) => (
          <Card key={p.id} p={p} />
        ))}
      </div>
      {!visible.length && (
        <p>No pieces found. Increase your budget or choose another category.</p>
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
                <Image src={src} alt="View photo" width={90} height={100} />
              </button>
            ))}
          </div>
          <small>
            Lifestyle photography shows the collection mood; see the product
            photo for the selected colour.
          </small>
        </div>
        <div className="product-copy">
          <Link className="eyebrow" href="/catalog">
            COLLECTION / {chosen.category}
          </Link>
          <h1>{chosen.name}</h1>
          <p className="price">{money(chosen.price)}</p>
          <p>{chosen.description}</p>
          <p>Colour: {chosen.color}</p>
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
            Quantity{" "}
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
            Add to bag <Plus size={18} />
          </button>
          <small>DEMO MODE · No payment will be taken</small>
          {[
            [
              "Details & materials",
              "Concept: textured leather, textile lining and metal hardware. All specifications are illustrative.",
            ],
            ["Care", "Store in a dust bag and clean with a soft, dry cloth."],
            [
              "Delivery & returns",
              "Delivery and returns are not available in this demo store.",
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
          In the same <i>mood.</i>
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
            aria-label="Email address"
            type="email"
            placeholder="Your email address"
            required
          />
          <button aria-label="Subscribe">
            <ArrowUpRight />
          </button>
        </div>
      ) : (
        <>
          <label>
            Your name
            <input required name="name" />
          </label>
          <label>
            Email
            <input required type="email" />
          </label>
          <label>
            Message
            <textarea required rows={4} />
          </label>
          <button className="button">
            Try the form <ArrowUpRight size={18} />
          </button>
        </>
      )}
      <small role="status">
        {done
          ? "Thank you! Demo complete. No data has been sent."
          : "Demo form: your details are neither stored nor sent."}
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
          Thank you for the <i>inspiration.</i>
        </h1>
        <p>Demo order {result} has been created successfully.</p>
        <p>
          No payment was taken. Your details were not stored or sent. Nothing
          will be shipped.
        </p>
        <Link className="button" href="/catalog">
          Back to the collection ↗
        </Link>
      </section>
    );
  return (
    <section className="section">
      <p className="eyebrow">DEMO MODE — NO REAL PAYMENTS OR ORDERS</p>
      <h1>
        The finishing <i>touch.</i>
      </h1>
      {!cart.items.length ? (
        <Link href="/catalog">Your bag is empty. Explore the collection ↗</Link>
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
            <h2>Contact details</h2>
            {[
              ["name", "Full name", "text"],
              ["email", "Email address", "email"],
              ["phone", "Phone number", "tel"],
              ["city", "City", "text"],
              ["address", "Delivery address", "text"],
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
              Please use fictional details. Everything is processed locally in
              your browser.
            </p>
            <p role="alert">{error}</p>
            <button disabled={busy} className="button">
              {busy ? "Processing…" : "Confirm demo order"}{" "}
              <ArrowUpRight size={18} />
            </button>
          </form>
          <aside>
            <h2>Your selection</h2>
            {cart.items.map((x) => {
              const p = products.find((p) => p.id === x.id)!;
              return (
                <div className="order-row" key={x.id}>
                  <Image src={p.image} alt={p.name} width={70} height={90} />
                  <span>
                    {p.name} · {p.color}
                    <br />
                    {x.quantity} pcs
                  </span>
                  <span>{money(p.price * x.quantity)}</span>
                </div>
              );
            })}
            <h3 className="total">
              Total{" "}
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
            <p>Shipping: not applicable · Payment: none</p>
            <button onClick={cart.open}>Edit bag ↗</button>
          </aside>
        </div>
      )}
    </section>
  );
}
