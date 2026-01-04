from playwright.sync_api import sync_playwright
import os

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        # Assuming repro_v2.html is in CWD (/app or root)
        page.goto(f"file://{os.getcwd()}/repro_v2.html")
        page.screenshot(path="/home/jules/verification/verification_desktop_v2.png")
        print("Desktop screenshot saved.")
        browser.close()

verify()
