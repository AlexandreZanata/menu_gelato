import { Link } from 'react-router-dom';
import { MenuItem } from '@/data/menuData';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FlavorCardProps {
  item: MenuItem;
}

export const FlavorCard = ({ item }: FlavorCardProps) => {
  const { language, t } = useLanguage();

  const getTagLabel = (tag: string) => {
    const tagLabels: Record<string, { pt: string; en: string }> = {
      vegan: { pt: 'Vegano', en: 'Vegan' },
      'dairy-free': { pt: 'Sem Lactose', en: 'Dairy-Free' },
      sorbet: { pt: 'Sorbet', en: 'Sorbet' },
      premium: { pt: 'Premium', en: 'Premium' },
      'contains-nuts': { pt: 'Contém Nozes', en: 'Contains Nuts' },
    };
    return tagLabels[tag]?.[language] || tag;
  };

  return (
    <Card className="group overflow-hidden hover-lift shadow-card bg-gradient-card">
      <Link to={`/flavor/${item.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={item.images[0]}
            alt={item.name[language]}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      </Link>

      <CardContent className="p-4">
        <Link to={`/flavor/${item.id}`}>
          <h3 className="mb-2 font-display text-xl font-semibold transition-colors group-hover:text-primary">
            {item.name[language]}
          </h3>
        </Link>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {item.shortDescription[language]}
        </p>
        <div className="flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {getTagLabel(tag)}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">{t('flavors.perScoop')}</span>
          <span className="font-display text-lg font-bold text-primary">
            {item.pricePerScoop.currency === 'BRL' ? 'R$' : '$'} {item.pricePerScoop.value.toFixed(2)}
          </span>
        </div>
        <Button size="sm" variant="default" asChild>
          <Link to={`/flavor/${item.id}`}>Ver mais</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
