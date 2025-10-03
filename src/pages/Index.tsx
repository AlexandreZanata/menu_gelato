import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMenu } from '@/contexts/MenuContext';
import { Navbar } from '@/components/Navbar';
import { FlavorCard } from '@/components/FlavorCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { IceCreamCone, Sparkles, Wine, Star } from 'lucide-react';

const Index = () => {
  const { language, t } = useLanguage();
  const { menuItems, categories } = useMenu();

  const featuredFlavors = menuItems.filter(item => item.featured && item.available).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-20 md:py-32">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 font-display text-5xl font-bold md:text-7xl animate-fade-in">
              {t('home.hero.title')}
            </h1>
            <p className="mb-8 text-lg md:text-xl text-foreground/90 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {t('home.hero.subtitle')}
            </p>
            <Button size="lg" asChild className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Link to="/flavors">{t('home.hero.cta')}</Link>
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGg1djVoLTV6bTAtNWg1djVoLTV6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      </section>

      {/* Featured Flavors */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-4xl font-bold md:text-5xl">{t('home.featured')}</h2>
            <div className="mx-auto h-1 w-24 bg-gradient-to-r from-mint to-pink rounded-full"></div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredFlavors.map(item => (
              <FlavorCard key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link to="/flavors">Ver Todos os Sabores →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-4xl font-bold md:text-5xl">{t('home.categories')}</h2>
            <div className="mx-auto h-1 w-24 bg-gradient-to-r from-pink to-pistachio rounded-full"></div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 4).map((category, index) => {
              const icons = [IceCreamCone, Sparkles, Wine, Star];
              const Icon = icons[index] || IceCreamCone;

              return (
                <Link key={category.id} to={`/flavors?category=${category.slug}`}>
                  <Card className="group h-full hover-lift shadow-card transition-smooth">
                    <CardContent className="flex flex-col items-center p-8 text-center">
                      <div className="mb-4 rounded-full bg-mint/20 p-6 transition-colors group-hover:bg-mint/30">
                        <Icon className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="mb-2 font-display text-xl font-bold">{category.name[language]}</h3>
                      <p className="text-sm text-muted-foreground">{category.description[language]}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-12">
        <div className="container text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <IceCreamCone className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold">Gelato Dreams</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {language === 'pt' ? '© 2025 Gelato Dreams. Todos os direitos reservados.' : '© 2025 Gelato Dreams. All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
