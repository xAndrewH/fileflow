import { test, expect } from "@playwright/test";

test.describe("JSON Formatter tool", () => {
  test("formats, minifies, and validates JSON input/output", async ({ page }) => {
    await page.goto("/tools/json");

    const input = page.getByPlaceholder('{\n  "hello": "world"\n}');
    const output = page.getByPlaceholder("Formatted JSON will appear here…");

    await input.fill('{"a":1,"b":[1,2,3]}');

    // Formatted (pretty-printed, indent 2) output appears
    await expect(output).toHaveValue('{\n  "a": 1,\n  "b": [\n    1,\n    2,\n    3\n  ]\n}');

    // Stats bar reflects the parsed structure (top-level "a" and "b" = 2 keys)
    await expect(page.getByText("2 total keys")).toBeVisible();

    // Minify collapses the output to a single line
    await page.getByRole("button", { name: "Minify" }).click();
    await expect(output).toHaveValue('{"a":1,"b":[1,2,3]}');

    // Invalid JSON surfaces a parse error instead of output
    await input.fill('{"a":}');
    await expect(page.locator("div.text-red-600")).toBeVisible();
    await expect(output).toHaveValue("");
  });
});

test.describe("Word Counter tool", () => {
  test("updates live stats as text is typed", async ({ page }) => {
    await page.goto("/tools/word-counter");

    const textarea = page.getByPlaceholder("Start typing or paste your text here…");
    await textarea.fill("Hello world. This is FileSpark!");

    // Whitespace-split word count: "Hello" "world." "This" "is" "FileSpark!" = 5
    const wordsCard = page.getByText("Words", { exact: true }).locator("xpath=..");
    await expect(wordsCard).toContainText("5");

    // Sentence-split on [.!?]+: "Hello world" | "This is FileSpark" = 2
    const sentencesCard = page.getByText("Sentences", { exact: true }).locator("xpath=..");
    await expect(sentencesCard).toContainText("2");

    // Clear resets everything
    await page.getByRole("button", { name: "Clear" }).click();
    await expect(textarea).toHaveValue("");
    await expect(wordsCard).toContainText("0");
  });
});
