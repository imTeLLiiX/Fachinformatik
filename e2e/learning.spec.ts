import { test, expect } from "@playwright/test"

test.describe("Learning Platform", () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto("/auth/login")
    await page.fill('input[name="email"]', "test@example.com")
    await page.fill('input[name="password"]', "password123")
    await page.click('button[type="submit"]')
    await page.waitForURL("/dashboard")
  })

  test("can view and navigate modules", async ({ page }) => {
    await page.goto("/lernmodule")
    
    // Check if modules are displayed
    const moduleCards = await page.locator(".module-card").all()
    expect(moduleCards.length).toBeGreaterThan(0)
    
    // Click on first module
    await moduleCards[0].click()
    await page.waitForURL(/\/lernmodule\/.*/)
    
    // Check module content
    await expect(page.locator("h1")).toBeVisible()
    await expect(page.locator(".module-content")).toBeVisible()
  })

  test("can complete a quiz", async ({ page }) => {
    await page.goto("/lernmodule/test-module")
    
    // Navigate to quiz
    await page.click("text=Quiz")
    
    // Answer questions
    const questions = await page.locator(".question").all()
    for (const question of questions) {
      await question.locator(".option").first().click()
      await page.click("text=Nächste Frage")
    }
    
    // Check results
    await expect(page.locator(".quiz-results")).toBeVisible()
    await expect(page.locator(".score")).toBeVisible()
  })

  test("can use flashcards", async ({ page }) => {
    await page.goto("/lernmodule/test-module")
    
    // Navigate to flashcards
    await page.click("text=Karteikarten")
    
    // Flip first card
    const card = page.locator(".flashcard").first()
    await card.click()
    
    // Check if card is flipped
    await expect(card).toHaveClass(/flipped/)
    
    // Answer card
    await page.click("text=Gewusst")
    
    // Check if next card is shown
    await expect(card).not.toHaveClass(/flipped/)
  })

  test("tracks progress", async ({ page }) => {
    await page.goto("/dashboard")
    
    // Check progress indicators
    await expect(page.locator(".progress-radial")).toBeVisible()
    await expect(page.locator(".progress-text")).toContainText("%")
    
    // Complete a module
    await page.goto("/lernmodule/test-module")
    await page.click("text=Abschließen")
    
    // Check if progress is updated
    await page.goto("/dashboard")
    await expect(page.locator(".progress-text")).toContainText("100%")
  })
}) 