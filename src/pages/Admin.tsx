import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMenu } from '@/contexts/MenuContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { MenuItem } from '@/data/menuData';
import { toast } from 'sonner';

const Admin = () => {
  const { language, t } = useLanguage();
  const { menuItems, categories, updateMenuItem, deleteMenuItem } = useMenu();
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = () => {
    if (editingItem) {
      updateMenuItem(editingItem.id, editingItem);
      toast.success(language === 'pt' ? 'Item atualizado!' : 'Item updated!');
      setIsDialogOpen(false);
      setEditingItem(null);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm(language === 'pt' ? 'Tem certeza que deseja excluir?' : 'Are you sure you want to delete?')) {
      deleteMenuItem(id);
      toast.success(language === 'pt' ? 'Item excluído!' : 'Item deleted!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-display text-4xl font-bold">{t('admin.title')}</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t('admin.add')}
          </Button>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>{language === 'pt' ? 'Gerenciar Items' : 'Manage Items'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {menuItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name[language]}</h3>
                    <p className="text-sm text-muted-foreground">{item.shortDescription[language]}</p>
                    <p className="mt-1 text-sm font-semibold text-primary">
                      R$ {item.pricePerScoop.value.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dialog open={isDialogOpen && editingItem?.id === item.id} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingItem(item);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{t('admin.edit')}</DialogTitle>
                        </DialogHeader>
                        {editingItem && (
                          <div className="space-y-4">
                            <div>
                              <Label>{language === 'pt' ? 'Nome (PT)' : 'Name (PT)'}</Label>
                              <Input
                                value={editingItem.name.pt}
                                onChange={e =>
                                  setEditingItem({ ...editingItem, name: { ...editingItem.name, pt: e.target.value } })
                                }
                              />
                            </div>
                            <div>
                              <Label>{language === 'pt' ? 'Nome (EN)' : 'Name (EN)'}</Label>
                              <Input
                                value={editingItem.name.en}
                                onChange={e =>
                                  setEditingItem({ ...editingItem, name: { ...editingItem.name, en: e.target.value } })
                                }
                              />
                            </div>
                            <div>
                              <Label>{language === 'pt' ? 'Descrição Curta (PT)' : 'Short Description (PT)'}</Label>
                              <Textarea
                                value={editingItem.shortDescription.pt}
                                onChange={e =>
                                  setEditingItem({
                                    ...editingItem,
                                    shortDescription: { ...editingItem.shortDescription, pt: e.target.value },
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label>{language === 'pt' ? 'Descrição Curta (EN)' : 'Short Description (EN)'}</Label>
                              <Textarea
                                value={editingItem.shortDescription.en}
                                onChange={e =>
                                  setEditingItem({
                                    ...editingItem,
                                    shortDescription: { ...editingItem.shortDescription, en: e.target.value },
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label>{language === 'pt' ? 'Preço' : 'Price'}</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={editingItem.pricePerScoop.value}
                                onChange={e =>
                                  setEditingItem({
                                    ...editingItem,
                                    pricePerScoop: { ...editingItem.pricePerScoop, value: parseFloat(e.target.value) },
                                  })
                                }
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={editingItem.available}
                                onCheckedChange={checked => setEditingItem({ ...editingItem, available: checked })}
                              />
                              <Label>{language === 'pt' ? 'Disponível' : 'Available'}</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={editingItem.featured}
                                onCheckedChange={checked => setEditingItem({ ...editingItem, featured: checked })}
                              />
                              <Label>{language === 'pt' ? 'Destaque' : 'Featured'}</Label>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                {t('admin.cancel')}
                              </Button>
                              <Button onClick={handleSave}>{t('admin.save')}</Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
