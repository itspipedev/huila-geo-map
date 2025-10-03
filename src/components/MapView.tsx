import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  city: string;
  latitude: number;
  longitude: number;
}

export const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [users, setUsers] = useState<RegisteredUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("registered_users")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setUsers(data);
      }
    };

    fetchUsers();

    // Realtime subscription
    const channel = supabase
      .channel("registered_users_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "registered_users",
        },
        () => {
          fetchUsers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || map.current) return;

    mapboxgl.accessToken = mapboxToken;

    // Centro del Huila (aproximado en Neiva)
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-75.2819, 2.9273], // Coordenadas de Neiva, Huila
      zoom: 8,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  useEffect(() => {
    if (!map.current || !mapboxToken) return;

    // Limpiar marcadores anteriores
    const markers = document.querySelectorAll(".mapboxgl-marker");
    markers.forEach((marker) => marker.remove());

    // Agregar marcadores para cada usuario
    users.forEach((user) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div class="p-2">
          <h3 class="font-bold text-sm">${user.name}</h3>
          <p class="text-xs text-gray-600">${user.city}</p>
          <p class="text-xs text-gray-500">${user.email}</p>
        </div>`
      );

      const marker = new mapboxgl.Marker({ color: "#22c55e" })
        .setLngLat([user.longitude, user.latitude])
        .setPopup(popup)
        .addTo(map.current!);
    });
  }, [users, mapboxToken]);

  if (!mapboxToken) {
    return (
      <div className="flex items-center justify-center min-h-[500px] p-4">
        <Card className="w-full max-w-md p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Configuración de Mapbox</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Para ver el mapa, necesitas un token público de Mapbox. Obténlo en{" "}
                <a
                  href="https://mapbox.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  mapbox.com
                </a>
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="token">Token público de Mapbox</Label>
              <Input
                id="token"
                type="text"
                placeholder="pk.eyJ1Ijo..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
              />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-[var(--shadow-soft)]">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute top-4 left-4 bg-card p-3 rounded-lg shadow-lg">
        <p className="text-sm font-semibold">
          Usuarios registrados: <span className="text-primary">{users.length}</span>
        </p>
      </div>
    </div>
  );
};
