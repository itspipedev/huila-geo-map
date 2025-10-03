import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="text-center max-w-2xl px-4">
        <h1 className="mb-4 text-5xl md:text-6xl font-bold text-primary">
          Bienvenido al Huila
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          Plataforma de registro con geolocalización
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/registro")}
            className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)]"
          >
            Registrarme
          </button>
          <button
            onClick={() => navigate("/mapa")}
            className="px-8 py-4 rounded-xl bg-secondary text-secondary-foreground font-semibold text-lg hover:opacity-90 transition-all shadow-[var(--shadow-soft)]"
          >
            Ver Mapa
          </button>
          <button
            onClick={() => navigate("/usuarios")}
            className="px-8 py-4 rounded-xl bg-accent text-accent-foreground font-semibold text-lg hover:opacity-90 transition-all shadow-[var(--shadow-soft)]"
          >
            Ver Usuarios
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
