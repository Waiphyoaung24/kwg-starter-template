import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@repo/ui";
import { Link } from "lucide-react";

export const Route = createFileRoute("/(app)/menu-mapping")({
  component: MenuMapping,
});

const wongnaiItems = [
  { id: "w1", name: "Chicken Rice" },
  { id: "w2", name: "Coke Zero" },
  { id: "w3", name: "Iced Tea" },
  { id: "w4", name: "Pad Thai" },
];

const grabItems = [
  { id: "g1", name: "Chicken Rice Set" },
  { id: "g2", name: "Coke" },
  { id: "g3", name: "Thai Iced Tea" },
  { id: "g4", name: "Pad Thai with Shrimp" },
];

function MenuMapping() {
  const { t } = useTranslation();
  const [selectedWongnai, setSelectedWongnai] = useState<string | null>(null);
  const [mappings, setMappings] = useState<Record<string, string>>({});

  const handleMap = (grabId: string) => {
    if (selectedWongnai) {
      setMappings((prev) => ({ ...prev, [selectedWongnai]: grabId }));
      setSelectedWongnai(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t("menuMapping.title")}</h1>
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("menuMapping.wongnaiItems")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {wongnaiItems.map((item) => (
                <Button
                  key={item.id}
                  variant={
                    selectedWongnai === item.id ? "secondary" : "outline"
                  }
                  className="w-full justify-start"
                  onClick={() => setSelectedWongnai(item.id)}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("menuMapping.grabItems")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {grabItems.map((item) => (
                <Button
                  key={item.id}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleMap(item.id)}
                  disabled={!selectedWongnai}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">{t("menuMapping.mappings")}</h2>
        <Card>
          <CardContent className="p-4 space-y-2">
            {Object.entries(mappings).map(([wongnaiId, grabId]) => {
              const wongnaiItem = wongnaiItems.find((i) => i.id === wongnaiId);
              const grabItem = grabItems.find((i) => i.id === grabId);
              return (
                <div
                  key={wongnaiId}
                  className="flex items-center justify-between p-2 rounded-md bg-muted"
                >
                  <span>{wongnaiItem?.name}</span>
                  <Link className="h-4 w-4" />
                  <span>{grabItem?.name}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
