import { test, expect } from "@playwright/test";

test.describe("Theme toggle", () => {
  test("cycles light -> dark, updates <html> class, and persists across reload", async ({ page }) => {
    // Force a deterministic starting point regardless of the host's OS theme.
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");

    const toggle = page.getByRole("button", { name: "Toggle color theme" });
    await expect(toggle).toBeVisible();

    const isDark = () => page.evaluate(() => document.documentElement.classList.contains("dark"));

    // Default theme is "system" (resolves to light here). Cycle: system -> light -> dark.
    await expect.poll(isDark).toBe(false);

    await toggle.click(); // system -> light
    await expect.poll(isDark).toBe(false);

    await toggle.click(); // light -> dark
    await expect.poll(isDark).toBe(true);

    const stored = await page.evaluate(() => localStorage.getItem("filespark-theme"));
    expect(stored).toBe("dark");

    // Persists across a reload.
    await page.reload();
    await expect.poll(isDark).toBe(true);

    // One more click cycles dark -> system, which resolves back to light here.
    await page.getByRole("button", { name: "Toggle color theme" }).click();
    await expect.poll(isDark).toBe(false);
    const clearedStorage = await page.evaluate(() => localStorage.getItem("filespark-theme"));
    expect(clearedStorage).toBeNull();
  });
});
