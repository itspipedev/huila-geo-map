import { Link } from "react-router-dom";
import { UsersTable } from "@/components/UsersTable";
import { Button } from "@/components/ui/button";
import { Home, Map } from "lucide-react";

const UsersPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Usuarios Registrados</h1>
            <p className="text-muted-foreground">
              Lista completa con datos y coordenadas de ubicación
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <Home className="h-4 w-4" />
                Inicio
              </Button>
            </Link>
            <Link to="/mapa">
              <Button variant="outline" className="gap-2">
                <Map className="h-4 w-4" />
                Ver Mapa
              </Button>
            </Link>
          </div>
        </div>

        <UsersTable />
      </div>
    </div>
  );
};

export default UsersPage;
