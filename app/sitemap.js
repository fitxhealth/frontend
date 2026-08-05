import { getProducts, getCombos } from '@/lib/api';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fitxhealth.in';

  let products = [];
  let combos = [];

  try {
    const [fetchedProducts, fetchedCombos] = await Promise.all([
      getProducts(),
      getCombos(),
    ]);
    products = fetchedProducts || [];
    combos = fetchedCombos || [];
  } catch (error) {
    console.error('Error fetching data for sitemap:', error);
  }

  // Map products to sitemap URLs
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Map combos to sitemap URLs
  const comboUrls = combos.map((combo) => ({
    url: `${baseUrl}/product/${combo.comboSlug || combo.slug}`,
    lastModified: combo.updatedAt ? new Date(combo.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Combine the root URL with the dynamic product and combo URLs
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/stack-lab`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...productUrls,
    ...comboUrls,
  ];
}