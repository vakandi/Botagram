import { test, expect } from "@playwright/test";

test.describe("BotsInstagramSection", () => {
  test("renders and has 3 cards with focusable CTAs", async ({ page }) => {
    await page.goto("/bots/instagram");

    const section = page.locator('#bots-instagram');
    await expect(section).toBeVisible();

    const cards = section.getByTestId(/card-(auto_dm|smart_posts_stories|auto_replies)/);
    await expect(cards).toHaveCount(3);

    const demoButtons = section.getByRole('button', { name: /Voir démo/ });
    await expect(demoButtons).toHaveCount(3);

    // Keyboard focus + Enter activates first CTA
    await demoButtons.nth(0).focus();
    await expect(demoButtons.nth(0)).toBeFocused();
    await page.keyboard.press('Enter');
  });
});


