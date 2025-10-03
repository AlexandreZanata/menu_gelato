import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMenu } from '@/contexts/MenuContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

const FlavorDetail = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const { menuItems } = useMenu();

  const item = menuItems.find(i => i.id === id);

  const [scoopCount, setScoopCount] = useState(1);
  const [containerType, setContainerType] = useState<'cone' | 'cup' | 'waffle'>('cone');

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-12 text-center">
          <h1 className="mb-4 font-display text-2xl">
            {language === 'pt' ? 'Sabor não encontrado' : 'Flavor not found'}
          </h1>
          <Button asChild>
            <Link to="/flavors">{language === 'pt' ? 'Voltar' : 'Go Back'}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const selectedSize = item.sizes.find(s => s.scoops === scoopCount) || item.sizes[0];
  const containerOption = item.containerOptions.find(c => c.type === containerType);
  const totalPrice = selectedSize.price + (containerOption?.price || 0);

  const handleAddToOrder = () => {
    toast.success(
      language === 'pt'
        ? `${scoopCount} bola(s) de ${item.name[language]} adicionado ao pedido!`
        : `${scoopCount} scoop(s) of ${item.name[language]} added to order!`
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/flavors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'pt' ? 'Voltar' : 'Back'}
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="aspect-square overflow-hidden rounded-2xl shadow-card">
            <img src={item.images[0]} alt={item.name[language]} className="h-full w-full object-cover" />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="mb-3 font-display text-4xl font-bold">{item.name[language]}</h1>
              <p className="mb-4 text-lg text-muted-foreground">{item.fullDescription[language]}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Card className="shadow-card">
              <CardContent className="space-y-6 p-6">
                {/* Scoop Count */}
                <div>
                  <label className="mb-2 block font-semibold">{t('product.scoops')}</label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setScoopCount(Math.max(1, scoopCount - 1))}
                      disabled={scoopCount <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-display text-2xl font-bold">{scoopCount}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setScoopCount(Math.min(3, scoopCount + 1))}
                      disabled={scoopCount >= 3}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Container Type */}
                <div>
                  <label className="mb-2 block font-semibold">{t('product.container')}</label>
                  <div className="grid grid-cols-3 gap-2">
                    {item.containerOptions.map(option => (
                      <Button
                        key={option.type}
                        variant={containerType === option.type ? 'default' : 'outline'}
                        onClick={() => setContainerType(option.type)}
                        className="capitalize"
                      >
                        {t(`product.${option.type}`)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Allergens */}
                {item.allergens.length > 0 && (
                  <div>
                    <label className="mb-2 block font-semibold">{t('product.allergens')}</label>
                    <p className="text-sm text-muted-foreground">{item.allergens.join(', ')}</p>
                  </div>
                )}

                {/* Price & Add to Order */}
                <div className="border-t pt-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total:</span>
                    <span className="font-display text-3xl font-bold text-primary">
                      R$ {totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <Button size="lg" className="w-full" onClick={handleAddToOrder}>
                    {t('product.addToOrder')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlavorDetail;
