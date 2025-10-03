import { Link } from "react-router-dom";
import { MapView } from "@/components/MapView";
import { Button } from "@/components/ui/button";
import { Home, Users } from "lucide-react";

const MapPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Mapa del Huila</h1>
            <p className="text-muted-foreground">Visualiza todos los usuarios registrados</p>
          </div>
          <div className="flex gap-3">
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <Home className="h-4 w-4" />
                Inicio
              </Button>
            </Link>
            <Link to="/usuarios">
              <Button variant="outline" className="gap-2">
                <Users className="h-4 w-4" />
                Ver Tabla
              </Button>
            </Link>
          </div>
        </div>

        <MapView />
      </div>
    </div>
  );
};

export default MapPage;
