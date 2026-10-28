export type Usuario = {
  nome: string;
  email: string;
  senha: string;
  perfil: string;
  cargo: string;
  telefone: string;
  membroDesde: string;
  senhaAlteradaEm: string;
  ultimoAcessoEm: string;
};

const CONTAS = [
  {
    nome: "Lohran",
    email: "admin@educontrol.com",
    senha: "244466666",
    perfil: "administrador",
    cargo: "Administrador do Sistema",
    telefone: "(35) 99876-5432",
    membroDesde: "2026-01-12",
    senhaAlteradaEm: "2026-09-15",
    ultimoAcessoEm: "",
  },
  {
    nome: "Secretaria de Teste",
    email: "secretario@educontrol.com",
    senha: "secretaria123",
    perfil: "secretario",
    cargo: "Secretário(a) Escolar",
    telefone: "(35) 99123-4567",
    membroDesde: "2026-03-02",
    senhaAlteradaEm: "2026-08-20",
    ultimoAcessoEm: "",
  },
];

const CHAVE = "educontrol:usuario";

export function fazerLogin(email: string, senha: string) {
  const emailLimpo = email.trim().toLowerCase();

  for (let i = 0; i < CONTAS.length; i++) {
    const conta = CONTAS[i];
    if (conta.email === emailLimpo && conta.senha === senha) {
      const usuario = { ...conta, ultimoAcessoEm: new Date().toISOString() };
      salvarUsuario(usuario);
      return usuario;
    }
  }

  return null;
}

export function salvarUsuario(usuario: Usuario) {
  sessionStorage.setItem(CHAVE, JSON.stringify(usuario));
}

export function pegarUsuario(): Usuario | null {
  if (typeof window === "undefined") {
    return null;
  }

  const texto = sessionStorage.getItem(CHAVE);
  if (texto === null) {
    return null;
  }

  return JSON.parse(texto);
}

export function sairDaConta() {
  sessionStorage.removeItem(CHAVE);
}
