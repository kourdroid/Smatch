
from playwright.sync_api import sync_playwright, expect
import os

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Navigate to the homepage (which should redirect to /en)
    try:
        page.goto("http://localhost:3000/en", timeout=120000)
    except Exception as e:
        print(f"Navigation failed: {e}")

    # Wait for the NavLanguageSelector button to be visible
    # Target by the aria-label we added
    lang_selector = page.locator('button[aria-label^="Select language"]')

    try:
        expect(lang_selector).to_be_visible(timeout=60000)
    except Exception as e:
        print(f"Element not found: {e}")
        os.makedirs("/home/jules/verification", exist_ok=True)
        page.screenshot(path="/home/jules/verification/debug_nav_language_selector_failed.png")
        raise e

    # Verify aria-label
    aria_label = lang_selector.get_attribute("aria-label")
    print(f"aria-label: {aria_label}")
    if "Select language, current language is English" not in aria_label:
        print("FAIL: aria-label incorrect")
    else:
        print("PASS: aria-label correct")

    # Verify aria-expanded is initially false or not present (default false)
    expanded = lang_selector.get_attribute("aria-expanded")
    print(f"aria-expanded (initial): {expanded}")

    if expanded != "false":
         print("FAIL: aria-expanded should be false initially")
    else:
         print("PASS: aria-expanded is false initially")

    # Click to open dropdown
    lang_selector.click()

    # Verify aria-expanded is true
    expect(lang_selector).to_have_attribute("aria-expanded", "true")
    print("PASS: aria-expanded is true after click")

    # Verify dropdown menu is visible and has role="menu"
    menu = page.locator('div[role="menu"]')
    expect(menu).to_be_visible()
    print("PASS: dropdown menu is visible")

    # Verify menu items have role="menuitem"
    menu_items = menu.locator('a[role="menuitem"]')
    count = menu_items.count()
    print(f"Found {count} menu items")
    if count > 0:
        print("PASS: menu items found with correct role")
    else:
        print("FAIL: no menu items found with role menuitem")

    # Take screenshot
    os.makedirs("/home/jules/verification", exist_ok=True)
    page.screenshot(path="/home/jules/verification/nav_language_selector.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
