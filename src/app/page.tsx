import Image from 'next/image'
import Link from 'next/link';
import HeroImage from "@/img/hero.jpg";
import { Home as HomeIcon, Search, MapPin, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="-mt-10">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        {/* Hero Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={HeroImage}
            alt="Luxurious home exterior"
            fill
            className="object-cover blur-sm brightness-50 dark:brightness-[0.35] scale-105"
            priority
            placeholder="blur"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Welcome to Elite Estate
          </h1>
          <p className="mt-4 text-lg md:text-xl mb-8">
            Your gateway to luxurious homes and premium rentals.
          </p>
          
          <Link
            href="/browse"
            className="bg-blue-600 text-white dark:bg-blue-700
            px-10 py-4 rounded-full
            hover:bg-blue-700 dark:hover:bg-blue-600
            transition-colors duration-300 inline-flex
            items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Browse Properties
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Why Choose Elite Estate?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We simplify your property journey with comprehensive listings, 
            professional service, and a commitment to finding your perfect home.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <HomeIcon className="w-12 h-12 text-blue-500 dark:text-blue-400" />,
              title: "Extensive Listings",
              description: "Discover a wide range of properties from luxury villas to cozy apartments."
            },
            {
              icon: <MapPin className="w-12 h-12 text-green-500 dark:text-green-400" />,
              title: "Prime Locations",
              description: "Strategically located properties in the most desirable neighborhoods."
            },
            {
              icon: <CheckCircle className="w-12 h-12 text-purple-500 dark:text-purple-400" />,
              title: "Verified Properties",
              description: "Every listing is carefully vetted to ensure quality and reliability."
            }
          ].map((feature, index) => (
            <Card 
              key={index} 
              className="w-full bg-white dark:bg-slate-800
              hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="flex flex-col items-center pb-4">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-center text-slate-800 dark:text-slate-200">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/browse"
            className="bg-blue-600 text-white dark:bg-blue-700
            px-10 py-4 rounded-full
            hover:bg-blue-700 dark:hover:bg-blue-600
            transition-colors duration-300 inline-flex
            items-center justify-center gap-2"
          >
            <Search className="w-6 h-6" />
            Explore All Properties
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-slate-800 py-8 text-center">
        <p className="text-slate-600 dark:text-slate-400">
          © {new Date().getFullYear()} Elite Estate. All rights reserved.
        </p>
      </footer>
    </div>
  );
}