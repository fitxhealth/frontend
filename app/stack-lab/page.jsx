import { getProducts } from '@/lib/api';
import Footer from '@/components/Footer';
import StackLabPage from './StackLabPage';

export const metadata = {
  title: 'Stack Lab | Build Your Custom Supplement Stack | FitX Health',
  description:
    'Build your own custom supplement stack at FitX Health. Pick your fuel, pick your boost, mix flavors and get a bundle discount.',
  keywords: ['supplement stack builder', 'custom stack', 'whey protein creatine combo', 'FitX Health stack lab'],
  openGraph: {
    title: 'Stack Lab — Build Your Custom Stack | FitX Health',
    description: 'Custom supplement stack builder at FitX Health.',
    url: 'https://www.getfitxhealth.in/stack-lab',
    siteName: 'FitX Health',
    images: [{ url: '/images/logo-removebg.png', width: 1200, height: 630, alt: 'Stack Lab - FitX Health' }],
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.getfitxhealth.in/stack-lab',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stack Lab — Build Your Custom Stack | FitX Health',
    description: 'Custom supplement stack builder at FitX Health.',
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
