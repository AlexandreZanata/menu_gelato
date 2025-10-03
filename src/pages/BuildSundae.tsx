import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMenu } from '@/contexts/MenuContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { toppingsData } from '@/data/menuData';
import { toast } from 'sonner';

const BuildSundae = () => {
  const { language, t } = useLanguage();
  const { menuItems } = useMenu();

  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  const availableFlavors = menuItems.filter(item => item.available && item.categoryId === 'cat-1').slice(0, 10);

  const toggleFlavor = (id: string) => {
    setSelectedFlavors(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const toggleTopping = (id: string) => {
    setSelectedToppings(prev => (prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]));
  };

  const calculateTotal = () => {
    const flavorTotal = selectedFlavors.length * 8.5;
    const toppingTotal = selectedToppings.reduce((sum, toppingId) => {
      const topping = toppingsData.find(t => t.id === toppingId);
      return sum + (topping?.price || 0);
    }, 0);
    return flavorTotal + toppingTotal;
  };

  const handleBuildSundae = () => {
    if (selectedFlavors.length === 0) {
      toast.error(language === 'pt' ? 'Selecione pelo menos um sabor' : 'Select at least one flavor');
      return;
    }
    toast.success(language === 'pt' ? 'Sundae adicionado ao pedido!' : 'Sundae added to order!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">{t('build.title')}</h1>
          <div className="mx-auto h-1 w-24 bg-gradient-to-r from-mint to-pink rounded-full"></div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Flavors Selection */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>{t('build.selectBase')}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {language === 'pt' ? 'Escolha até 3 sabores' : 'Choose up to 3 flavors'}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {availableFlavors.map(flavor => (
                    <div
                      key={flavor.id}
                      onClick={() => toggleFlavor(flavor.id)}
                      className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                        selectedFlavors.includes(flavor.id) ? 'border-primary bg-mint/10' : 'border-border'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox checked={selectedFlavors.includes(flavor.id)} />
                        <div className="flex-1">
                          <h3 className="font-semibold">{flavor.name[language]}</h3>
                          <p className="text-xs text-muted-foreground">{flavor.shortDescription[language]}</p>
                          <p className="mt-1 text-sm font-semibold text-primary">R$ 8.50</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Toppings */}
            <Card className="mt-6 shadow-card">
              <CardHeader>
                <CardTitle>{t('build.selectToppings')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {toppingsData.map(topping => (
                    <div
                      key={topping.id}
                      onClick={() => toggleTopping(topping.id)}
                      className={`cursor-pointer rounded-lg border-2 p-3 transition-all hover:shadow-md ${
                        selectedToppings.includes(topping.id) ? 'border-primary bg-pink/10' : 'border-border'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox checked={selectedToppings.includes(topping.id)} />
                        <div className="flex-1">
                          <span className="font-medium">{topping.name[language]}</span>
                          <span className="ml-2 text-sm text-primary">+R$ {topping.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div>
            <Card className="sticky top-20 shadow-card">
              <CardHeader>
                <CardTitle>{language === 'pt' ? 'Resumo' : 'Summary'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedFlavors.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold">
                      {language === 'pt' ? 'Sabores:' : 'Flavors:'}
                    </h4>
                    <div className="space-y-1">
                      {selectedFlavors.map(flavorId => {
                        const flavor = availableFlavors.find(f => f.id === flavorId);
                        return flavor ? (
                          <Badge key={flavorId} variant="secondary" className="mr-1">
                            {flavor.name[language]}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {selectedToppings.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold">
                      {language === 'pt' ? 'Coberturas:' : 'Toppings:'}
                    </h4>
                    <div className="space-y-1">
                      {selectedToppings.map(toppingId => {
                        const topping = toppingsData.find(t => t.id === toppingId);
                        return topping ? (
                          <Badge key={toppingId} variant="outline" className="mr-1">
                            {topping.name[language]}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-lg font-semibold">{t('build.total')}:</span>
                    <span className="font-display text-3xl font-bold text-primary">
                      R$ {calculateTotal().toFixed(2)}
                    </span>
                  </div>
                  <Button size="lg" className="w-full" onClick={handleBuildSundae}>
                    {language === 'pt' ? 'Adicionar ao Pedido' : 'Add to Order'}
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

export default BuildSundae;
