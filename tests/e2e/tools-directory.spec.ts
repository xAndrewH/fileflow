import { test, expect } from "@playwright/test";

test.describe("Tools directory", () => {
  test("lists tools and the category filters work", async ({ page }) => {
    await page.goto("/tools");

    await expect(page.getByRole("heading", { name: "Tools", exact: true })).toBeVisible();

    // Search box present with a placeholder mentioning the tool count
    await expect(page.getByPlaceholder(/Search .*tools/)).toBeVisible();

    // A known tool card renders
    await expect(page.getByRole("link", { name: /Word Counter/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /JSON Formatter/ })).toBeVisible();

    // Typing in the on-page search narrows the grouped sections down to a flat result list
    await page.getByPlaceholder(/Search .*tools/).fill("word counter");
    await expect(page.getByText(/^\d+ results?$/)).toBeVisible();
    await expect(page.getByRole("link", { name: /Word Counter/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /JSON Formatter/ })).toHaveCount(0);
  });

  test("command palette opens with Ctrl/Cmd+K and narrows results while typing", async ({ page }) => {
    await page.goto("/tools");

    const searchInput = page.getByPlaceholder("Search tools…");
    await expect(searchInput).toBeHidden();

    await page.keyboard.press("ControlOrMeta+k");
    await expect(searchInput).toBeVisible();

    // Default (empty query) list shows a broad set of tools. Each result row is a
    // <button> that also nests a "favorites" star with its own role="button", so
    // scope to .first() (the row) to avoid an ambiguous match against both.
    await expect(page.getByRole("button", { name: /Word Counter/ }).first()).toBeVisible();

    // Narrow down by typing
    await searchInput.fill("json");
    await expect(page.getByRole("button", { name: /JSON Formatter/ }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: /Word Counter/ })).toHaveCount(0);

    // Escape closes the palette
    await page.keyboard.press("Escape");
    await expect(searchInput).toBeHidden();
  });

  test("clicking the navbar Search button on the homepage opens the command palette", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.getByPlaceholder("Search tools…");
    await expect(searchInput).toBeHidden();

    await page.getByRole("button", { name: "Search tools" }).click();
    await expect(searchInput).toBeVisible();

    await searchInput.fill("word counter");
    await expect(page.getByRole("button", { name: /Word Counter/ }).first()).toBeVisible();
  });
});
