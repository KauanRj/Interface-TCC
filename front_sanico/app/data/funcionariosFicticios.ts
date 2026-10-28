const RUAS = ["Rua das Palmeiras", "Av. Brasil", "Rua Tiradentes", "Rua XV de Novembro", "Av. Getúlio Vargas"];
const BAIRROS = ["Centro", "Jardim Alvorada", "Vila Nova", "São Geraldo", "Santa Rita"];

function doisDigitos(numero: number) {
  if (numero < 10) {
    return "0" + numero;
  }
  return "" + numero;
}

function digitosFicticios(id: number, tamanho: number) {
  let texto = "";
  let valor = id * 6007 + 90001;
  for (let i = 0; i < tamanho; i++) {
    valor = (valor * 29 + 13) % 1000033;
    texto = texto + (valor % 10);
  }
  return texto;
}

export function detalhesDoFuncionario(funcionario: any) {
  const id = funcionario.id;
  const partes = funcionario.nome.split(" ");
  const cpf = digitosFicticios(id, 11);
  const efetivo = funcionario.vinculo === "Efetivo";

  let jornada = "40 horas semanais";
  if (funcionario.cargo.indexOf("Professor") === 0) {
    jornada = "24 horas semanais";
  }

  let fimContrato = "";
  if (!efetivo) {
    fimContrato = "2026-12-" + doisDigitos(10 + id);
  }

  return {
    matricula: "F" + doisDigitos(id) + digitosFicticios(id, 3),
    dataNascimento: 1975 + id * 3 + "-" + doisDigitos((id * 5) % 12 + 1) + "-" + doisDigitos((id * 7) % 27 + 1),
    cpf: cpf.substring(0, 3) + "." + cpf.substring(3, 6) + "." + cpf.substring(6, 9) + "-" + cpf.substring(9, 11),
    dataAdmissao: efetivo ? 2012 + id + "-03-01" : "2026-02-02",
    fimContrato: fimContrato,
    jornada: jornada,
    telefone: "35" + "9" + digitosFicticios(id + 80, 8),
    email: partes[0].toLowerCase() + "." + partes[partes.length - 1].toLowerCase() + "@escola.exemplo.com",
    endereco: RUAS[id % RUAS.length] + ", " + (50 + id * 17) + " - " + BAIRROS[id % BAIRROS.length] + ", Santa Rita do Sapucaí - MG",
  };
}

export const FUNCIONARIOS_BASE = [
  { id: 1, nome: "Mariana Silva", cargo: "Professora", setor: "Matemática", status: "Ativo", vinculo: "Efetivo" },
  { id: 2, nome: "Carlos Mendes", cargo: "Coordenador", setor: "Pedagógico", status: "Ativo", vinculo: "Efetivo" },
  { id: 3, nome: "Fernanda Lima", cargo: "Diretora", setor: "Gestão", status: "Ativo", vinculo: "Efetivo" },
  { id: 4, nome: "Juliana Costa", cargo: "Secretaria", setor: "Administrativo", status: "Pendente", vinculo: "Contratado" },
  { id: 5, nome: "Ricardo Santos", cargo: "Supervisor", setor: "Ensino Médio", status: "Ativo", vinculo: "Contratado" },
];
