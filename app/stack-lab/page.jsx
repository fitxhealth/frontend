import { getProducts } from '@/lib/api';
import Footer from '@/components/Footer';
import StackLabPage from './StackLabPage';

export const metadata = {
  title: 'Stack Lab™ | Build Your Custom Supplement Stack | FitX Health',
  description:
    'Exclusively at FitX Health — build your own custom supplement stack. Pick your fuel, pick your boost, mix flavors and get an exclusive bundle discount. Nobody else offers this.',
  keywords: ['supplement stack builder', 'custom stack', 'whey protein creatine combo', 'FitX Health stack lab'],
  openGraph: {
    title: 'Stack Lab™ — Build Your Custom Stack | FitX Health',
    description: 'India\'s only custom supplement stack builder. Exclusively at FitX Health.',
    url: 'https://www.getfitxhealth.in/stack-lab',
    siteName: 'FitX Health',
    images: [{ url: '/images/logo.webp', width: 1200, height: 630, alt: 'Stack Lab - FitX Health' }],
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.getfitxhealth.in/stack-lab',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stack Lab™ — Build Your Custom Stack | FitX Health',
    description: 'India\'s only custom supplement stack builder. Exclusively at FitX Health.',
  },
  alternates: {
    canonical: 'https://www.getfitxhealth.in/stack-lab',
  },
};

export default async function StackLabRoute() {
  const allProducts = await getProducts();
  return (
    <>
      <StackLabPage products={allProducts} />
      <Footer />
    </>
  );
}
