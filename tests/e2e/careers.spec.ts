import { test, expect } from '@playwright/test'

test.describe('Career pages', () => {
  test('AT-004: career page renders all required sections', async ({ page }) => {
    await page.goto('/careers/marketing-manager')

    await expect(page.locator('h1')).toContainText('Marketing Manager')

    // Threat level indicator
    await expect(page.locator('[aria-label*="Threat level"]')).toBeVisible()

    // What Is Changing section
    await expect(page.locator('#changing-heading')).toBeVisible()

    // Company adoption
    await expect(page.locator('#adoption-heading')).toBeVisible()

    // Skills matrix
    await expect(page.locator('#skills-heading')).toBeVisible()

    // JSON-LD
    const jsonLd = page.locator('script[type="application/ld+json"]')
    await expect(jsonLd.first()).toBeAttached()
  })

  test('AT-005: career search filters results', async ({ page }) => {
    await page.goto('/careers')

    const input = page.getByRole('searchbox', { name: /search careers/i })
    await input.fill('marketing')

    // Allow debounce
    await page.waitForTimeout(500)

    const cards = page.locator('.grid a')
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)

    await input.clear()
    await page.waitForTimeout(500)

    const allCount = await page.locator('.grid a').count()
    expect(allCount).toBeGreaterThan(0)
  })
})
