import { test, expect } from '@playwright/test';
import { PLACES } from '../src/data/data';

test('shows information', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  for (const place of PLACES) {
    await expect(page.getByRole('button', { name: place.name })).toBeVisible();
  }
  await expect(
    page.getByRole('heading', { name: /Forecasts for 6 days/i })
  ).toBeVisible();
  await expect(page.locator('text=Select a city')).toBeVisible();
  await expect(page.locator('[data-testid="weather"]')).toBeVisible();
  await expect(page.locator('[data-testid="forecast"]')).toBeVisible();
  const errorElementsCount = await page.locator('[data-testid="error"]').count();
  expect(errorElementsCount).toBe(0);
  await expect(page.locator('h1', { hasText: new RegExp(PLACES[0].name, 'i') })).toBeVisible();
});

test('changes information', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  for (let i = 1; i < PLACES.length * 2; i++) {
    const place = PLACES[i % PLACES.length];
    await page.locator('role=button', { hasText: new RegExp(place.name, 'i') }).click();
    for (const place of PLACES) {
      await expect(page.getByRole('button', { name: place.name })).toBeVisible();
    }
    await expect(
      page.getByRole('heading', { name: /Forecasts for 6 days/i })
    ).toBeVisible();
    await expect(page.locator('text=Select a city')).toBeVisible();
    await expect(page.locator('[data-testid="weather"]')).toBeVisible();
    await expect(page.locator('[data-testid="forecast"]')).toBeVisible();
    const errorElementsCount = await page.locator('[data-testid="error"]').count();
    expect(errorElementsCount).toBe(0);
    await expect(page.locator('h1', { hasText: new RegExp(place.name, 'i') })).toBeVisible();
  }
});