-- Crear tabla de usuarios registrados con geolocalización
CREATE TABLE public.registered_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar Row Level Security
ALTER TABLE public.registered_users ENABLE ROW LEVEL SECURITY;

-- Política para permitir que todos puedan ver los usuarios (público)
CREATE POLICY "Anyone can view registered users"
ON public.registered_users
FOR SELECT
USING (true);

-- Política para permitir que cualquiera pueda insertar (formulario público)
CREATE POLICY "Anyone can insert registered users"
ON public.registered_users
FOR INSERT
WITH CHECK (true);

-- Crear índice para búsquedas por coordenadas
CREATE INDEX idx_registered_users_coordinates ON public.registered_users(latitude, longitude);