import { useLanguage } from '@/contexts/LanguageContext';
import { useMenu } from '@/contexts/MenuContext';
import { Navbar } from '@/components/Navbar';
import { FlavorCard } from '@/components/FlavorCard';

const Specials = () => {
  const { language } = useLanguage();
  const { menuItems } = useMenu();

  const specialItems = menuItems.filter(item => item.available && item.categoryId === 'cat-2');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
            {language === 'pt' ? 'Especiais da Casa' : 'House Specials'}
          </h1>
          <div className="mx-auto h-1 w-24 bg-gradient-to-r from-mint to-pink rounded-full"></div>
          <p className="mt-4 text-lg text-muted-foreground">
            {language === 'pt'
              ? 'Criações únicas e sazonais do Gelato Dreams'
              : 'Unique and seasonal creations from Gelato Dreams'}
          </p>
        </div>

        {specialItems.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              {language === 'pt' ? 'Nenhum especial disponível no momento.' : 'No specials available at the moment.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {specialItems.map(item => (
              <FlavorCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Specials;
