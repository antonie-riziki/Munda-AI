import { useEffect, useRef, useState } from "react";
import { TrendingUp, MapPin, ArrowUpDown } from "lucide-react";

const markets = [
  { id: 1, name: "Wakulima Market", lat: -1.2821, lng: 36.8219, price: 4500, distance: 12, roadScore: 85, weather: "Sunny", accessibility: 90, risk: "Low" },
  { id: 2, name: "Gikomba Market", lat: -1.2866, lng: 36.8396, price: 4200, distance: 18, roadScore: 72, weather: "Cloudy", accessibility: 75, risk: "Medium" },
  { id: 3, name: "Kangemi Market", lat: -1.2655, lng: 36.7464, price: 4800, distance: 25, roadScore: 68, weather: "Rainy", accessibility: 65, risk: "High" },
  { id: 4, name: "Kawangware Market", lat: -1.2789, lng: 36.7658, price: 4600, distance: 22, roadScore: 78, weather: "Sunny", accessibility: 80, risk: "Low" },
  { id: 5, name: "City Park Market", lat: -1.2634, lng: 36.8177, price: 5000, distance: 8, roadScore: 92, weather: "Sunny", accessibility: 95, risk: "Low" },
];

type SortKey = "distance" | "price" | "roadScore" | "accessibility";

export function MarketIntelligenceSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [sortBy, setSortBy] = useState<SortKey>("distance");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const loadLeaflet = async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, { center: [-1.2821, 36.8219], zoom: 12 });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // Farm location
      const farmIcon = L.divIcon({
        html: `<div style="background: #2d6a4f; color: white; padding: 6px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">🏠 Your Farm</div>`,
        className: "custom-marker",
        iconSize: [100, 30],
        iconAnchor: [50, 15],
      });
      L.marker([-1.286389, 36.817223], { icon: farmIcon }).addTo(map);

      // Market markers
      markets.forEach((market) => {
        const marketIcon = L.divIcon({
          html: `<div style="background: #e9c46a; color: #333; padding: 4px 8px; border-radius: 15px; font-size: 11px; font-weight: 500; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">📍 ${market.name}</div>`,
          className: "custom-marker",
          iconSize: [120, 24],
          iconAnchor: [60, 12],
        });

        L.marker([market.lat, market.lng], { icon: marketIcon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family: Poppins, sans-serif; min-width: 200px;">
              <strong style="font-size: 14px;">${market.name}</strong><br/>
              <div style="margin-top: 8px; font-size: 12px;">
                <div>💰 Price: KES ${market.price}/bag</div>
                <div>📏 Distance: ${market.distance} km</div>
                <div>🛣️ Road Score: ${market.roadScore}/100</div>
                <div>⛅ Weather: ${market.weather}</div>
                <div>🚗 Accessibility: ${market.accessibility}%</div>
              </div>
            </div>`
          );
      });

      mapInstanceRef.current = map;
    };

    loadLeaflet();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const sortedMarkets = [...markets].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    return sortAsc ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
  });

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(key);
      setSortAsc(true);
    }
  };

  const riskColors = { Low: "bg-leaf/10 text-leaf", Medium: "bg-wheat/20 text-amber-700", High: "bg-destructive/10 text-destructive" };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Market Intelligence</h2>
        <p className="text-muted-foreground">Find the best markets for your maize harvest</p>
      </div>

      {/* Price Projection */}
      <div className="bg-card rounded-xl p-6 shadow-card">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-leaf" />
          Maize Price Projection
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Current Avg</p>
            <p className="text-2xl font-bold text-foreground">KES 4,620</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Next Month</p>
            <p className="text-2xl font-bold text-leaf">KES 4,850 ↑</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Peak Season</p>
            <p className="text-2xl font-bold text-wheat">KES 5,200</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Best Time to Sell</p>
            <p className="text-2xl font-bold text-primary">Aug 2024</p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Nearby Markets
          </h3>
        </div>
        <div ref={mapRef} className="h-[400px] w-full" />
      </div>

      {/* Rankings Table */}
      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Market Rankings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Market</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => handleSort("distance")}>
                  <span className="flex items-center gap-1">Distance <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => handleSort("roadScore")}>
                  <span className="flex items-center gap-1">Road Score <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => handleSort("price")}>
                  <span className="flex items-center gap-1">Price/Bag <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Weather</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => handleSort("accessibility")}>
                  <span className="flex items-center gap-1">Accessibility <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Risk</th>
              </tr>
            </thead>
            <tbody>
              {sortedMarkets.map((market, index) => (
                <tr key={market.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                        {index + 1}
                      </span>
                      <span className="font-medium text-foreground">{market.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-foreground">{market.distance} km</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-leaf rounded-full" style={{ width: `${market.roadScore}%` }} />
                      </div>
                      <span className="text-sm text-foreground">{market.roadScore}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-medium text-foreground">KES {market.price.toLocaleString()}</td>
                  <td className="p-4 text-sm text-foreground">{market.weather}</td>
                  <td className="p-4 text-sm text-foreground">{market.accessibility}%</td>
                  <td className="p-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${riskColors[market.risk as keyof typeof riskColors]}`}>
                      {market.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
