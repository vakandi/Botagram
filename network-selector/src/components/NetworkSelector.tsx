import React, { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { botsCatalog } from "@/data/bots";

const NetworkSelector = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<string>("instagram");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Sélection de Réseau
          </h1>
          <p className="text-muted-foreground">
            Choisissez un réseau social pour voir les détails
          </p>
        </div>

        {/* Network selection bar */}
        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-4xl overflow-x-auto px-2">
            <ToggleGroup
              type="single"
              value={selectedNetwork}
              onValueChange={(value) => value && setSelectedNetwork(value)}
              className="mx-auto flex min-w-max gap-2 rounded-full bg-muted/40 p-1 backdrop-blur supports-[backdrop-filter]:bg-muted/30 shadow-inner"
              aria-label="Choisir un réseau"
            >
              {botsCatalog.map((bot) => {
                const Icon = bot.Icon;
                return (
                  <ToggleGroupItem
                    key={bot.id}
                    value={bot.id}
                    className="group rounded-full px-4 py-2 text-muted-foreground transition-all duration-300 hover:text-foreground hover:-translate-y-0.5 data-[state=on]:bg-gradient-to-r data-[state=on]:from-primary data-[state=on]:to-highlight data-[state=on]:text-white data-[state=on]:shadow-glow focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={bot.name}
                  >
                    <Icon className="mr-2 h-4 w-4 transition-transform duration-300 group-data-[state=on]:scale-110" />
                    <span className="whitespace-nowrap text-sm font-medium">{bot.name}</span>
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </div>
        </div>

        {/* Selected network info */}
        <div className="mt-8 text-center">
          {(() => {
            const selectedBot = botsCatalog.find(bot => bot.id === selectedNetwork);
            if (selectedBot) {
              return (
                <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-6 border border-border/30 max-w-md mx-auto">
                  <div className="flex items-center justify-center mb-4">
                    <selectedBot.Icon className="w-8 h-8 mr-3" />
                    <h2 className="text-2xl font-bold text-foreground">{selectedBot.name}</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">{selectedBot.description}</p>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">Fonctionnalités :</h3>
                    <ul className="text-sm text-muted-foreground">
                      {selectedBot.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }
            return null;
          })()}
        </div>
      </div>
    </div>
  );
};

export default NetworkSelector;
