import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { IceCreamCone, Menu, Home, Sparkles, Wine, Star, Settings, Languages, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MobileMenuProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const MobileMenu = ({ theme, toggleTheme }: MobileMenuProps) => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  const menuItems = [
    { to: '/', label: t('nav.home'), icon: Home },
    { to: '/flavors', label: t('nav.flavors'), icon: IceCreamCone },
    { to: '/build-sundae', label: t('nav.build'), icon: Sparkles },
    { to: '/specials', label: t('nav.specials'), icon: Star },
    { to: '/admin', label: t('nav.admin'), icon: Settings },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[320px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-left font-display text-xl">
            <IceCreamCone className="h-6 w-6 text-primary" />
            Gelato Dreams
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-8 flex flex-col gap-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            
            return (
              <Link key={item.to} to={item.to}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className="w-full justify-start gap-3 text-base"
                  size="lg"
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 border-t pt-6">
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={toggleLanguage}
            >
              <Languages className="h-5 w-5" />
              {language === 'pt' ? 'Português' : 'English'}
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={toggleTheme}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              {theme === 'light' ? (language === 'pt' ? 'Modo Escuro' : 'Dark Mode') : (language === 'pt' ? 'Modo Claro' : 'Light Mode')}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
