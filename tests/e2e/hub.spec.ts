import { test, expect } from '@playwright/test'

test.describe('Knowledge Hub', () => {
  test('AT-006: technical mode toggle persists across navigation', async ({ page }) => {
    await page.goto('/hub/tools/getting-started-with-ai-workflows')

    // Accessible mode is default
    const toggle = page.getByRole('group', { name: /reading mode/i })
    await expect(toggle.getByRole('button', { name: 'Accessible' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )

    // Switch to Technical
    await toggle.getByRole('button', { name: 'Technical' }).click()
    await expect(toggle.getByRole('button', { name: 'Technical' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )

    // Navigate to another hub article
    await page.goto('/hub/models/understanding-llms-without-the-jargon')

    // Technical mode should persist
    const toggle2 = page.getByRole('group', { name: /reading mode/i })
    await expect(toggle2.getByRole('button', { name: 'Technical' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )

    // Refresh and check persistence
    await page.reload()
    const toggle3 = page.getByRole('group', { name: /reading mode/i })
    await expect(toggle3.getByRole('button', { name: 'Technical' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
  })

  test('AT-007: sitemap includes all routes', async ({ page }) => {
    const response = await page.goto('/sitemap.xml')
    expect(response?.status()).toBe(200)
    const body = await page.content()
    expect(body).toContain('/weekly')
    expect(body).toContain('/hub')
    expect(body).toContain('/careers')
    expect(body).toContain('marketing-manager')
  })
})
