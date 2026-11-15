"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { ShoppingBag, X, Menu, ArrowUpRight, Minus, Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products, Item, money } from "@/lib/products";
const Context = createContext<{
  items: Item[];
  add: (id: string, n: number) => void;
  setQuantity: (id: string, n: number) => void;
  clear: () => void;
  open: () => void;
}>({
  items: [],
  add: () => {},
  setQuantity: () => {},
  clear: () => {},
  open: () => {},
});
export const useCart = () => useContext(Context);
export function Store({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [ready, setReady] = useState(false);
  const [menu, setMenu] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const path = usePathname();
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const data = JSON.parse(localStorage.getItem("luneo-cart") || "[]");
        if (Array.isArray(data))
          setItems(
            data.filter(
              (x) =>
                products.some((p) => p.id === x.id) &&
                Number.isInteger(x.quantity) &&
                x.quantity > 0 &&
                x.quantity <= 99,
            ),
          );
      } catch {}
      setReady(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem("luneo-cart", JSON.stringify(items));
      } catch {}
  }, [items, ready]);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".hero-copy > *", {
        y: 35,
        opacity: 0,
        stagger: 0.13,
        duration: 1,
      });
      gsap.utils
        .toArray<HTMLElement>("[data-reveal]")
        .forEach((el) =>
          gsap.from(el, {
            y: 25,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          }),
        );
    });
    return () => mm.revert();
  }, [path]);
  const open = () => {
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
      gsap.fromTo(
        dialog.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35 },
      );
  };
  const close = () => {
    dialog.current?.close();
    document.body.style.overflow = "";
  };
  const setQuantity = (id: string, n: number) =>
    setItems((v) =>
      v
        .map((x) => (x.id === id ? { ...x, quantity: Math.min(99, n) } : x))
        .filter((x) => x.quantity > 0),
    );
  return (
    <Context.Provider
      value={{
        items,
        add: (id, n) => {
          setItems((v) => {
            const old = v.find((x) => x.id === id);
            return old
              ? v.map((x) =>
                  x.id === id
                    ? { ...x, quantity: Math.min(99, x.quantity + n) }
                    : x,
                )
              : [...v, { id, quantity: n }];
          });
          open();
        },
        setQuantity,
        clear: () => setItems([]),
        open,
      }}
    >
      <div className="announcement">НЕЗАЛЕЖНИЙ DEMO-ПРОЄКТ · NULLEXWEB</div>
      <header>
        <button
          className="mobile"
          aria-label="Меню"
          onClick={() => setMenu(!menu)}
        >
          <Menu />
        </button>
        <nav className={menu ? "shown" : ""}>
          <Link href="/catalog" onClick={() => setMenu(false)}>
            Колекція
          </Link>
          <Link href="/about" onClick={() => setMenu(false)}>
            Світ LUNEO
          </Link>
        </nav>
        <Link className="logo" href="/">
          LUNEO
        </Link>
        <div className="header-right">
          <Link href="/contact">Контакти</Link>
          <button onClick={open} aria-label="Відкрити кошик">
            <ShoppingBag size={19} />{" "}
            <span>({items.reduce((s, x) => s + x.quantity, 0)})</span>
          </button>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <div className="footer-top">
          <p className="footer-statement">
            Менше зайвого.
            <br />
            <i>Більше вас.</i>
          </p>
          <div>
            <Link href="/catalog">Колекція</Link>
            <Link href="/about">Про LUNEO</Link>
            <Link href="/contact">Контакти</Link>
            <Link href="/faq">Питання та відповіді</Link>
          </div>
          <p>
            Вигаданий бренд. Справжня увага до деталей.
            <br />
            Демонстраційний магазин — без реальних платежів.
          </p>
        </div>
        <div className="footer-logo">LUNEO</div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} LUNEO · DEMO</span>
          <a href="https://nullexweb.com" target="_blank" rel="noreferrer">
            Design & development — NULLEXWEB ↗
          </a>
        </div>
      </footer>
      <dialog
        ref={dialog}
        className="cart"
        onCancel={close}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="cart-heading">
          <h2>Ваш кошик</h2>
          <button onClick={close} aria-label="Закрити кошик">
            <X />
          </button>
        </div>
        {!items.length ? (
          <p>
            Тут починається ваша колекція.
            <br />
            <Link href="/catalog" onClick={close}>
              Обрати свою сумку ↗
            </Link>
          </p>
        ) : (
          <>
            {items.map((item) => {
              const p = products.find((p) => p.id === item.id)!;
              return (
                <div className="cart-item" key={item.id}>
                  <Image src={p.image} alt={p.name} width={90} height={120} />
                  <div>
                    <h3>
                      {p.name} / {p.color}
                    </h3>
                    <p>{money(p.price)}</p>
                    <div className="quantity">
                      <button
                        aria-label="Зменшити кількість"
                        onClick={() => setQuantity(p.id, item.quantity - 1)}
                      >
                        <Minus size={14} />
                      </button>
                      {item.quantity}
                      <button
                        aria-label="Збільшити кількість"
                        onClick={() => setQuantity(p.id, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                      <button onClick={() => setQuantity(p.id, 0)}>
                        Видалити
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <h3 className="total">
              Разом{" "}
              <span>
                {money(
                  items.reduce(
                    (s, x) =>
                      s +
                      products.find((p) => p.id === x.id)!.price * x.quantity,
                    0,
                  ),
                )}
              </span>
            </h3>
            <Link className="button" href="/checkout" onClick={close}>
              Оформити демозамовлення <ArrowUpRight size={18} />
            </Link>
            <small>DEMO MODE · Жодних реальних платежів</small>
          </>
        )}
      </dialog>
    </Context.Provider>
  );
}
