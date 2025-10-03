import { Link } from "react-router-dom";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Button } from "@/components/ui/button";
import { Map, Users } from "lucide-react";

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Registro Huila</h1>
            <p className="text-muted-foreground">Únete a nuestra comunidad</p>
          </div>
          <div className="flex gap-3">
            <Link to="/mapa">
              <Button variant="outline" className="gap-2">
                <Map className="h-4 w-4" />
                Ver Mapa
              </Button>
            </Link>
            <Link to="/usuarios">
              <Button variant="outline" className="gap-2">
                <Users className="h-4 w-4" />
                Ver Usuarios
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
