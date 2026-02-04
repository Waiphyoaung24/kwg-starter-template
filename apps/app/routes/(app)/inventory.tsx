import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui";

export const Route = createFileRoute("/(app)/inventory")({
  component: Inventory,
});

const initialItems = [
  { id: 1, name: "Coffee Beans", stock: 1000, unit: "g" },
  { id: 2, name: "Milk", stock: 5000, unit: "ml" },
  { id: 3, name: "Plastic Cup", stock: 500, unit: "unit" },
];

function Inventory() {
  const { t } = useTranslation();
  const [items] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    name: string;
    stock: number;
    unit: string;
  } | null>(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t("inventory.title")}</h1>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>{t("inventory.inventoryItems")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("inventory.itemName")}</TableHead>
                    <TableHead>{t("inventory.stock")}</TableHead>
                    <TableHead>{t("inventory.unit")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className="cursor-pointer"
                    >
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.stock}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-4">
          {selectedItem && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedItem.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <h3 className="text-lg font-semibold">
                    {t("inventory.recipe")}
                  </h3>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="ingredient">
                        {t("inventory.ingredient")}
                      </Label>
                      <Input id="ingredient" placeholder="e.g. Coffee Beans" />
                      <Input type="number" placeholder="e.g. 18" />
                      <span>g</span>
                    </div>
                    <Button>{t("inventory.addIngredient")}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
