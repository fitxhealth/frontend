export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fitxhealth.in';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Prevent search engines from indexing the admin panel or raw API routes
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}