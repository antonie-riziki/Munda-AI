import { useEffect, useRef } from "react";
import { Map, Layers, Maximize2, Ruler } from "lucide-react";

export function LandMappingSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const loadLeaflet = async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      // Custom marker icon fix for Leaflet
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      // Initialize map centered on Kenya
      const map = L.map(mapRef.current!, {
        center: [-1.286389, 36.817223],
        zoom: 14,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // Farm boundary polygon
      const farmBoundary = L.polygon(
        [
          [-1.283, 36.812],
          [-1.283, 36.822],
          [-1.290, 36.822],
          [-1.290, 36.812],
        ],
        {
          color: "#2d6a4f",
          fillColor: "#74c69d",
          fillOpacity: 0.4,
          weight: 3,
        }
      ).addTo(map);

      farmBoundary.bindPopup(
        `<div style="font-family: Poppins, sans-serif;">
          <strong>My Farm</strong><br/>
          Area: 5.2 hectares<br/>
          Soil Type: Loamy Clay<br/>
          Current Crop: Maize
        </div>`
      );

      // Field sections
      const section1 = L.polygon(
        [
          [-1.283, 36.812],
          [-1.283, 36.817],
          [-1.286, 36.817],
          [-1.286, 36.812],
        ],
        { color: "#40916c", fillColor: "#95d5b2", fillOpacity: 0.5, weight: 2 }
      ).addTo(map);
      section1.bindPopup("<strong>Section A</strong><br/>Maize - 2.1 ha<br/>Planted: March 2024");

      const section2 = L.polygon(
        [
          [-1.286, 36.812],
          [-1.286, 36.817],
          [-1.290, 36.817],
          [-1.290, 36.812],
        ],
        { color: "#e9c46a", fillColor: "#f4d58d", fillOpacity: 0.5, weight: 2 }
      ).addTo(map);
      section2.bindPopup("<strong>Section B</strong><br/>Beans - 1.5 ha<br/>Planted: April 2024");

      const section3 = L.polygon(
        [
          [-1.283, 36.817],
          [-1.283, 36.822],
          [-1.290, 36.822],
          [-1.290, 36.817],
        ],
        { color: "#8b5e3c", fillColor: "#c9a77c", fillOpacity: 0.5, weight: 2 }
      ).addTo(map);
      section3.bindPopup("<strong>Section C</strong><br/>Fallow - 1.6 ha<br/>Next: Sorghum");

      // Center marker
      L.marker([-1.286389, 36.817223]).addTo(map).bindPopup("Farm Center");

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

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Land Mapping</h2>
        <p className="text-muted-foreground">Interactive map of your farm boundaries and sections</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-card rounded-xl p-4 shadow-card flex items-center gap-3">
          <div className="p-2 rounded-lg bg-leaf/10">
            <Map className="w-5 h-5 text-leaf" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Area</p>
            <p className="font-bold text-foreground">5.2 ha</p>
          </div>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Layers className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Sections</p>
            <p className="font-bold text-foreground">3</p>
          </div>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card flex items-center gap-3">
          <div className="p-2 rounded-lg bg-wheat/20">
            <Ruler className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Perimeter</p>
            <p className="font-bold text-foreground">1.2 km</p>
          </div>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sky/10">
            <Maximize2 className="w-5 h-5 text-sky" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Elevation</p>
            <p className="font-bold text-foreground">1,680m</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div ref={mapRef} className="h-[500px] w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl p-4 shadow-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded bg-leaf/60" />
            <span className="font-medium text-foreground">Section A - Maize</span>
          </div>
          <p className="text-sm text-muted-foreground">2.1 hectares • Stage: Vegetative</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded bg-wheat/60" />
            <span className="font-medium text-foreground">Section B - Beans</span>
          </div>
          <p className="text-sm text-muted-foreground">1.5 hectares • Stage: Flowering</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded bg-soil/60" />
            <span className="font-medium text-foreground">Section C - Fallow</span>
          </div>
          <p className="text-sm text-muted-foreground">1.6 hectares • Next: Sorghum</p>
        </div>
      </div>
    </div>
  );
}
