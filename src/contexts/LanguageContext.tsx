import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { pt: 'Início', en: 'Home' },
  'nav.flavors': { pt: 'Sabores', en: 'Flavors' },
  'nav.build': { pt: 'Monte seu Sundae', en: 'Build Your Sundae' },
  'nav.specials': { pt: 'Especiais', en: 'Specials' },
  'nav.admin': { pt: 'Admin', en: 'Admin' },
  
  // Home
  'home.hero.title': { pt: 'Gelato Dreams', en: 'Gelato Dreams' },
  'home.hero.subtitle': { pt: 'Sorvetes artesanais feitos com amor e ingredientes naturais', en: 'Artisan ice cream made with love and natural ingredients' },
  'home.hero.cta': { pt: 'Ver Cardápio', en: 'View Menu' },
  'home.featured': { pt: 'Sabores em Destaque', en: 'Featured Flavors' },
  'home.categories': { pt: 'Categorias', en: 'Categories' },
  
  // Flavors
  'flavors.title': { pt: 'Nossos Sabores', en: 'Our Flavors' },
  'flavors.search': { pt: 'Buscar sabores...', en: 'Search flavors...' },
  'flavors.all': { pt: 'Todos', en: 'All' },
  'flavors.vegan': { pt: 'Vegano', en: 'Vegan' },
  'flavors.sorbet': { pt: 'Sorbet', en: 'Sorbet' },
  'flavors.dairyfree': { pt: 'Sem Lactose', en: 'Dairy-Free' },
  'flavors.perScoop': { pt: 'por bola', en: 'per scoop' },
  
  // Product Detail
  'product.scoops': { pt: 'Bolas', en: 'Scoops' },
  'product.container': { pt: 'Recipiente', en: 'Container' },
  'product.cone': { pt: 'Casquinha', en: 'Cone' },
  'product.cup': { pt: 'Copinho', en: 'Cup' },
  'product.waffle': { pt: 'Waffle', en: 'Waffle' },
  'product.toppings': { pt: 'Coberturas', en: 'Toppings' },
  'product.allergens': { pt: 'Alérgenos', en: 'Allergens' },
  'product.addToOrder': { pt: 'Adicionar ao Pedido', en: 'Add to Order' },
  
  // Build Sundae
  'build.title': { pt: 'Monte seu Sundae', en: 'Build Your Sundae' },
  'build.selectBase': { pt: 'Escolha os sabores', en: 'Select flavors' },
  'build.selectToppings': { pt: 'Escolha as coberturas', en: 'Select toppings' },
  'build.total': { pt: 'Total', en: 'Total' },
  
  // Admin
  'admin.title': { pt: 'Painel Administrativo', en: 'Admin Panel' },
  'admin.add': { pt: 'Adicionar', en: 'Add' },
  'admin.edit': { pt: 'Editar', en: 'Edit' },
  'admin.delete': { pt: 'Excluir', en: 'Delete' },
  'admin.save': { pt: 'Salvar', en: 'Save' },
  'admin.cancel': { pt: 'Cancelar', en: 'Cancel' },
  
  // Common
  'common.loading': { pt: 'Carregando...', en: 'Loading...' },
  'common.error': { pt: 'Erro', en: 'Error' },
  'common.close': { pt: 'Fechar', en: 'Close' },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Auto-detect browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('en')) return 'en';
    return 'pt';
  });

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
