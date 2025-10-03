import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { IceCreamCone, Languages, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
          <IceCreamCone className="h-8 w-8" />
          Gelato Dreams
        </Link>

        <div className="flex items-center gap-1 md:gap-2">
          <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex">
            <Link to="/">{t('nav.home')}</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/flavors">{t('nav.flavors')}</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
            <Link to="/build-sundae">{t('nav.build')}</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex">
            <Link to="/specials">{t('nav.specials')}</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="hidden lg:inline-flex">
            <Link to="/admin">{t('nav.admin')}</Link>
          </Button>

          <div className="ml-2 flex items-center gap-1 border-l pl-2">
            <Button variant="ghost" size="icon" onClick={toggleLanguage} title="Toggle Language">
              <Languages className="h-5 w-5" />
              <span className="sr-only">Toggle Language</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} title="Toggle Theme">
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <span className="sr-only">Toggle Theme</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
