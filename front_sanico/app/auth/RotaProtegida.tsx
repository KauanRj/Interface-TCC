import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { pegarUsuario } from "./sessao";
import { temPermissao } from "./permissoes";

export function RotaProtegida({ permissao, children }: { permissao: string; children: any }) {
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    setCarregado(true);
  }, []);

  if (carregado === false) {
    return null;
  }

  const usuario = pegarUsuario();

  if (usuario === null) {
    return <Navigate to="/" replace />;
  }

  if (temPermissao(usuario.perfil, permissao) === false) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}
