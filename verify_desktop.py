from playwright.sync_api import sync_playwright
import os

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        # Assuming repro.html is in CWD (/app or root)
        page.goto(f"file://{os.path.abspath('repro.html')}")
        page.screenshot(path="/home/jules/verification/verification_desktop.png")
        print("Desktop screenshot saved.")
        browser.close()

verify()
