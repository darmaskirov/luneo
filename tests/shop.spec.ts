import { test, expect } from "@playwright/test";
test("catalog, persistent cart and local checkout", async ({ page }) => {
  await page.goto("http://localhost:3016/catalog");
  await page.getByRole("button", { name: "Accessories", exact: true }).click();
  await expect(page.locator(".product")).toHaveCount(3);
  await page.getByRole("button", { name: "All", exact: true }).click();
  await page.locator(".product").first().click();
  await page.getByRole("button", { name: "Add to bag" }).click();
  await expect(page.locator("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close shopping bag" }).click();
  await page.reload();
  await page.getByRole("button", { name: "Open shopping bag" }).click();
  await expect(page.locator(".cart-item")).toHaveCount(1);
  await page.getByRole("link", { name: "Demo checkout" }).click();
  await page.getByLabel("Full name").fill("Demo Customer");
  await page.getByLabel("Email address").fill("demo@example.com");
  await page.getByLabel("Phone number").fill("0000000000");
  await page.getByLabel("City").fill("Kyiv");
  await page.getByLabel("Delivery address").fill("1 Demo Street");
  await page.getByRole("button", { name: "Confirm demo order" }).click();
  await expect(page.getByText(/Demo order DEMO-/)).toBeVisible();
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
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await expect(page.locator("header nav")).toBeVisible();
});

test('English interface across all pages', async ({page}) => {
  for (const route of ['/', '/catalog', '/product/1', '/about', '/contact', '/faq', '/checkout']) {
    await page.goto(`http://localhost:3016${route}`);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('main')).not.toContainText(/[А-Яа-яІіЇїЄєҐґ]/);
  }
});
