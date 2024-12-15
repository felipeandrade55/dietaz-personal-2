import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ChartTooltipContent } from "@/components/ui/chart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChartLine, Image, ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HistoricoData {
  data: string;
  peso: number;
  altura: number;
  pescoco: number;
  ombros: number;
  torax: number;
  bracoDireito: number;
  bracoEsquerdo: number;
  antebracoDireito: number;
  antebracoEsquerdo: number;
  cintura: number;
  quadril: number;
  coxaDireita: number;
  coxaEsquerda: number;
  panturrilhaDireita: number;
  panturrilhaEsquerda: number;
  fotos: {
    frente: string;
    costas: string;
    ladoDireito: string;
    ladoEsquerdo: string;
  };
}

// Dados mockados para exemplo
const historicoMock: HistoricoData[] = [
  {
    data: "2024-01-01",
    peso: 75,
    altura: 175,
    pescoco: 38,
    ombros: 110,
    torax: 95,
    bracoDireito: 35,
    bracoEsquerdo: 34.5,
    antebracoDireito: 28,
    antebracoEsquerdo: 27.5,
    cintura: 80,
    quadril: 95,
    coxaDireita: 55,
    coxaEsquerda: 54.5,
    panturrilhaDireita: 38,
    panturrilhaEsquerda: 37.5,
    fotos: {
      frente: "/placeholder.svg",
      costas: "/placeholder.svg",
      ladoDireito: "/placeholder.svg",
      ladoEsquerdo: "/placeholder.svg",
    },
  },
  // ... mais dados mockados aqui
];

const HistoricoEvolucao = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0);
  const [selectedDate, setSelectedDate] = React.useState(historicoMock[0].data);

  const chartConfig = {
    peso: { label: "Peso", color: "#F97316" },
    bracoDireito: { label: "Braço Direito", color: "#22C55E" },
    cintura: { label: "Cintura", color: "#3B82F6" },
    coxaDireita: { label: "Coxa Direita", color: "#A855F7" },
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChartLine className="h-5 w-5" />
            Histórico de Evolução
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="graficos" className="space-y-4">
            <TabsList>
              <TabsTrigger value="graficos">Gráficos</TabsTrigger>
              <TabsTrigger value="fotos">Fotos</TabsTrigger>
              <TabsTrigger value="medidas">Medidas</TabsTrigger>
            </TabsList>

            <TabsContent value="graficos" className="space-y-4">
              <div className="h-[400px]">
                <ChartContainer config={chartConfig}>
                  <LineChart data={historicoMock}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="data" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="peso" stroke="#F97316" />
                    <Line type="monotone" dataKey="bracoDireito" stroke="#22C55E" />
                    <Line type="monotone" dataKey="cintura" stroke="#3B82F6" />
                    <Line type="monotone" dataKey="coxaDireita" stroke="#A855F7" />
                  </LineChart>
                </ChartContainer>
              </div>
            </TabsContent>

            <TabsContent value="fotos" className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : 3))}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div className="relative w-[300px] h-[400px]">
                    <img
                      src={historicoMock[0].fotos.frente}
                      alt="Foto evolução"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPhotoIndex((prev) => (prev < 3 ? prev + 1 : 0))}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm text-muted-foreground">
                    {new Date(selectedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="medidas">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                <div className="space-y-4">
                  {historicoMock.map((registro, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-sm">
                          {new Date(registro.data).toLocaleDateString()}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <span className="text-sm font-medium">Peso:</span>
                            <span className="text-sm ml-2">{registro.peso} kg</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Altura:</span>
                            <span className="text-sm ml-2">{registro.altura} cm</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Braço D:</span>
                            <span className="text-sm ml-2">{registro.bracoDireito} cm</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Braço E:</span>
                            <span className="text-sm ml-2">{registro.bracoEsquerdo} cm</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Cintura:</span>
                            <span className="text-sm ml-2">{registro.cintura} cm</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Quadril:</span>
                            <span className="text-sm ml-2">{registro.quadril} cm</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoricoEvolucao;