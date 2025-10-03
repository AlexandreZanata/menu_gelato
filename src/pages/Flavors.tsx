import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMenu } from '@/contexts/MenuContext';
import { Navbar } from '@/components/Navbar';
import { FlavorCard } from '@/components/FlavorCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Flavors = () => {
  const { t, language } = useLanguage();
  const { menuItems } = useMenu();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categorySlug = searchParams.get('category');

  const filters = [
    { id: 'all', label: t('flavors.all') },
    { id: 'vegan', label: t('flavors.vegan') },
    { id: 'sorbet', label: t('flavors.sorbet') },
    { id: 'dairy-free', label: t('flavors.dairyfree') },
  ];

  // Map category slugs to category IDs
  const categorySlugToId: Record<string, string> = {
    'flavors': 'cat-1',
    'sundaes': 'cat-2',
    'milkshakes': 'cat-3',
    'toppings': 'cat-4',
    'kids': 'cat-5',
  };

  const filteredItems = useMemo(() => {
    let items = menuItems.filter(item => item.available);

    // Filter by category if provided
    if (categorySlug) {
      const categoryId = categorySlugToId[categorySlug];
      if (categoryId) {
        items = items.filter(item => item.categoryId === categoryId);
      }
    } else {
      // If no category, show only classic flavors by default
      items = items.filter(item => item.categoryId === 'cat-1');
    }

    if (activeFilter !== 'all') {
      items = items.filter(item => item.tags.includes(activeFilter));
    }

    if (searchQuery) {
      items = items.filter(item => {
        const name = item.name[language].toLowerCase();
        const desc = item.shortDescription[language].toLowerCase();
        const query = searchQuery.toLowerCase();
        return name.includes(query) || desc.includes(query);
      });
    }

    return items;
  }, [menuItems, categorySlug, activeFilter, searchQuery, language]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">{t('flavors.title')}</h1>
          <div className="mx-auto h-1 w-24 bg-gradient-to-r from-mint to-pink rounded-full"></div>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative mx-auto max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('flavors.search')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {filters.map(filter => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? 'default' : 'outline'}
                onClick={() => setActiveFilter(filter.id)}
                size="sm"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              {language === 'pt' ? 'Nenhum sabor encontrado.' : 'No flavors found.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map(item => (
              <FlavorCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Flavors;
