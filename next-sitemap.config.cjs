/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'https://smatch.digital',
  generateRobotsTxt: true, // (optional)
  sitemapSize: 7000,
  exclude: ['/admin', '/admin/*', '/api', '/api/*'],
}
