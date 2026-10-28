import { useState } from "react";
import { temPermissao } from "~/auth/permissoes";
import { pegarUsuario, salvarUsuario, sairDaConta } from "~/auth/sessao";

export function useUsuario() {
  const [usuario, setUsuario] = useState(pegarUsuario);

  let perfil: string | null = null;
  if (usuario !== null) {
    perfil = usuario.perfil;
  }

  function pode(permissao: string) {
    return temPermissao(perfil, permissao);
  }

  function atualizarUsuario(dados: any) {
    if (usuario === null) {
      return;
    }
    const novo = { ...usuario, ...dados };
    salvarUsuario(novo);
    setUsuario(novo);
  }

  function sair() {
    sairDaConta();
    setUsuario(null);
  }

  return { usuario, perfil, pode, atualizarUsuario, sair };
}
