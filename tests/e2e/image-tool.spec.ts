import path from "node:path";
import { test, expect } from "@playwright/test";

const FIXTURE_PNG = path.join(__dirname, "fixtures", "tiny.png");

test.describe("Image Converter tool", () => {
  test("converts an uploaded PNG to WEBP and produces a working download", async ({ page }) => {
    await page.goto("/tools/image-converter");

    // Upload via the hidden file input inside the drop zone.
    await page.locator('input[type="file"]').setInputFiles(FIXTURE_PNG);

    await expect(page.getByText("tiny.png")).toBeVisible();

    // Switch output format to WEBP.
    await page.getByRole("button", { name: "WEBP", exact: true }).click();

    await page.getByRole("button", { name: /Convert 1 image to WEBP/ }).click();

    // Wait for conversion to finish: a per-file Download button appears
    // (there are two "Download" buttons once done — the per-file one and the
    // bulk "Download all" bar action — so scope to the file row).
    const downloadButton = page.getByRole("button", { name: "Download", exact: true }).first();
    await expect(downloadButton).toBeVisible({ timeout: 15_000 });

    // Result size is reported next to the original size.
    await expect(page.getByText("→")).toBeVisible();

    // Clicking Download triggers a real file download with webp content.
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      downloadButton.click(),
    ]);
    expect(download.suggestedFilename()).toBe("tiny.webp");

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
  });
});
