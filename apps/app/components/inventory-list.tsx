import { Avatar, AvatarFallback } from "@repo/ui";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

const mockInventory = [
  {
    id: "1",
    name: "T-Shirt",
    sku: "TS-001",
    stock: 120,
    image: "/images/t-shirt.png",
  },
  {
    id: "2",
    name: "Jeans",
    sku: "JN-002",
    stock: 80,
    image: "/images/jeans.png",
  },
  {
    id: "3",
    name: "Hoodie",
    sku: "HD-003",
    stock: 5,
    image: "/images/hoodie.png",
  },
  {
    id: "4",
    name: "Socks",
    sku: "SK-004",
    stock: 0,
    image: "/images/socks.png",
  },
];

function getStockColor(stock: number) {
  if (stock > 100) return "bg-green-500";
  if (stock > 10) return "bg-yellow-500";
  return "bg-red-500";
}

export function InventoryList() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="p-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder={t("common.search")}
            className="w-full rounded-md bg-transparent pl-8 p-2 border"
          />
        </div>
      </div>
      <div className="space-y-2 p-2">
        {mockInventory.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-muted"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback>{item.name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {item.sku}
              </p>
            </div>
            <div
              className={`h-4 w-4 rounded-full ${getStockColor(item.stock)}`}
            />
            <span className="text-sm font-medium">{item.stock}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
