import { test, expect } from "@playwright/test";

// Noise that's expected in this dev/sandboxed environment and unrelated to
// app correctness: Next's dev-mode HMR websocket, and the Vercel Analytics
// beacon failing to load from an external CDN with no network access here.
const IGNORED_CONSOLE_PATTERNS = [/webpack-hmr/, /vercel-scripts\.com/, /vercel\.com\/v1\/(rum|.*analytics)/i];

test.describe("Homepage", () => {
  test("loads with no console errors and renders the hero + convert UI", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error" && !IGNORED_CONSOLE_PATTERNS.some((p) => p.test(msg.text()))) {
        consoleErrors.push(msg.text());
      }
    });
    page.on("pageerror", (err) => consoleErrors.push(err.message));

    await page.goto("/");

    // Hero heading
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Convert files.");

    // Navbar brand
    await expect(page.getByText("FileSpark", { exact: true })).toBeVisible();

    // Convert / Compress mode tabs
    await expect(page.getByRole("button", { name: "Convert", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Compress", exact: true })).toBeVisible();

    // File dropzone hero copy + Browse button
    await expect(page.getByText("Drop any file to convert it")).toBeVisible();
    await expect(page.getByRole("button", { name: "Browse files" })).toBeVisible();

    // Tools section teaser
    await expect(page.getByRole("heading", { name: /85\+ tools\./ })).toBeVisible();

    expect(
      consoleErrors,
      `Expected no console errors, but got:\n${consoleErrors.join("\n")}`
    ).toEqual([]);
  });

  test("navigates to /tools via the navbar Tools link", async ({ page }) => {
    await page.goto("/");
    await page.locator("nav").getByRole("link", { name: "Tools" }).click();
    await expect(page).toHaveURL(/\/tools$/);
    await expect(page.getByRole("heading", { name: "Tools", exact: true })).toBeVisible();
  });
});
