import puppeteer from 'puppeteer'

describe('e2e test with puppeteer', () => {
  let browser: puppeteer.Browser

  beforeAll(async () => {
    browser = await puppeteer.launch()
  })

  afterAll(async () => {
    await browser.close()
  })

  it('a search keyword will be on the page title in google.com', async () => {
    // google.comにアクセス
    const page = await browser.newPage()
    await page.goto('https://www.google.com/ncr')

    // 検索ボックスの要素を探し、puppeteerを入力しエンターキーをクリック
    await page.type('input[name="q"]', 'puppeteer')
    await page.keyboard.press('Enter')

    // ページのタイトルが`puppeteer - Google Search`に切り替わるまで待つ
    await page.waitForNavigation({
      timeout: 2000,
      waitUntil: 'domcontentloaded',
    })
    expect(await page.title()).toBe('puppeteer - Google Search')
  })
})
