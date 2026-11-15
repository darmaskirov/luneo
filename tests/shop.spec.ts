import { test, expect } from "@playwright/test";
test("catalog, persistent cart and local checkout", async ({ page }) => {
  await page.goto("http://localhost:3016/catalog");
  await page.getByRole("button", { name: "Аксесуари", exact: true }).click();
  await expect(page.locator(".product")).toHaveCount(3);
  await page.getByRole("button", { name: "Усі", exact: true }).click();
  await page.locator(".product").first().click();
  await page.getByRole("button", { name: "Додати до кошика" }).click();
  await expect(page.locator("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Закрити кошик" }).click();
  await page.reload();
  await page.getByRole("button", { name: "Відкрити кошик" }).click();
  await expect(page.locator(".cart-item")).toHaveCount(1);
  await page.getByRole("link", { name: "Оформити демозамовлення" }).click();
  await page.getByLabel("Ім’я та прізвище").fill("Демо Клієнт");
  await page.getByLabel("Електронна пошта").fill("demo@example.com");
  await page.getByLabel("Телефон").fill("0000000000");
  await page.getByLabel("Місто").fill("Київ");
  await page.getByLabel("Адреса доставки").fill("Демонстраційна 1");
  await page
    .getByRole("button", { name: "Підтвердити демозамовлення" })
    .click();
  await expect(page.getByText(/Демозамовлення DEMO-/)).toBeVisible();
});
test("responsive home", async ({ page }) => {
  await page.goto("http://localhost:3016");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page
    .locator("img")
    .evaluateAll((imgs) =>
      imgs.forEach((img) => img.setAttribute("loading", "eager")),
    );
  await page.waitForFunction(() =>
    Array.from(document.images).every((i) => i.complete && i.naturalWidth > 0),
  );
  await page.screenshot({ path: "tests/desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page
    .locator("img")
    .evaluateAll((imgs) =>
      imgs.forEach((img) => img.setAttribute("loading", "eager")),
    );
  await page.waitForFunction(() =>
    Array.from(document.images).every((i) => i.complete && i.naturalWidth > 0),
  );
  await page.screenshot({ path: "tests/mobile.png", fullPage: true });
  await page.getByRole("button", { name: "Меню", exact: true }).click();
  await expect(page.locator("header nav")).toBeVisible();
});
