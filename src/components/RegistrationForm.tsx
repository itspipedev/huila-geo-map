import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Loader2 } from "lucide-react";

export const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const getLocation = () => {
    setIsGettingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          toast({
            title: "Ubicación obtenida",
            description: "Tu ubicación ha sido capturada exitosamente.",
          });
          setIsGettingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Error",
            description: "No se pudo obtener tu ubicación. Por favor, activa el GPS.",
            variant: "destructive",
          });
          setIsGettingLocation(false);
        }
      );
    } else {
      toast({
        title: "Error",
        description: "Tu navegador no soporta geolocalización.",
        variant: "destructive",
      });
      setIsGettingLocation(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location) {
      toast({
        title: "Ubicación requerida",
        description: "Por favor, captura tu ubicación antes de continuar.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from("registered_users").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        city: formData.city,
        latitude: location.latitude,
        longitude: location.longitude,
      });

      if (error) throw error;

      toast({
        title: "¡Registro exitoso!",
        description: "Te has registrado correctamente. Redirigiendo al mapa...",
      });

      setTimeout(() => {
        navigate("/mapa");
      }, 1500);
    } catch (error) {
      console.error("Error registering:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al registrarte. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-[var(--shadow-soft)]">
      <CardHeader>
        <CardTitle className="text-2xl">Registro Huila</CardTitle>
        <CardDescription>
          Completa el formulario y únete a la comunidad
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ingresa tu nombre"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono (opcional)</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="3001234567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Ciudad</Label>
            <Input
              id="city"
              type="text"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="Ej: Neiva, Pitalito, La Plata..."
            />
          </div>

          <div className="space-y-2">
            <Label>Ubicación GPS</Label>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={getLocation}
              disabled={isGettingLocation || !!location}
            >
              {isGettingLocation ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Obteniendo ubicación...
                </>
              ) : location ? (
                <>
                  <MapPin className="mr-2 h-4 w-4" />
                  Ubicación capturada ✓
                </>
              ) : (
                <>
                  <MapPin className="mr-2 h-4 w-4" />
                  Capturar mi ubicación
                </>
              )}
            </Button>
            {location && (
              <p className="text-xs text-muted-foreground">
                Lat: {location.latitude.toFixed(6)}, Lng: {location.longitude.toFixed(6)}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registrando...
              </>
            ) : (
              "Registrarme"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
