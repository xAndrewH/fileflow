import { defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";

const PORT = 3100;
// IMPORTANT: use "localhost", not "127.0.0.1". Next's dev-time origin
// checking (allowedDevOrigins) treats them as different origins and, when
// accessed via 127.0.0.1, silently breaks client hydration entirely (no
// React fiber ever attaches, so every click/typing interaction is a no-op
// with zero console errors) instead of just blocking the HMR websocket.
const BASE_URL = `http://localhost:${PORT}`;

// The environment ships a pre-installed Chromium at a browser revision that
// doesn't match what this @playwright/test version expects, so the default
// `chromium.launch()` (which resolves an executable path from the installed
// browsers.json revision) fails with "Executable doesn't exist". Point at the
// real installed binary directly when that's the case.
const FALLBACK_CHROMIUM = "/opt/pw-browsers/chromium";
const launchOptions = existsSync(FALLBACK_CHROMIUM)
  ? { executablePath: FALLBACK_CHROMIUM }
  : {};

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["list"]],
  timeout: 30_000,
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], launchOptions },
    },
  ],
  webServer: {
    command: `npm run dev -- -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
