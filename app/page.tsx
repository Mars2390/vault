import BuyOrRent from '@/components/BuyOrRent';
import CategoryGrid from '@/components/CategoryGrid';
import EditorialBanner from '@/components/EditorialBanner';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Newsletter from '@/components/Newsletter';
import Reviews from '@/components/Reviews';
import TrustStrip from '@/components/TrustStrip';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <CategoryGrid />
        <FeaturedProducts />
        <BuyOrRent />
        <TrustStrip />
        <HowItWorks />
        <EditorialBanner />
        <Reviews />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
