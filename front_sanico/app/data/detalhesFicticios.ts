const RESPONSAVEIS = ["Marcos", "Patrícia", "Roberto", "Sandra", "Fernando", "Luciana", "Ricardo", "Juliana"];
const PARENTESCOS = ["Mãe", "Pai", "Mãe", "Avó", "Pai", "Mãe", "Tio", "Mãe"];
const RUAS = ["Rua das Flores", "Av. Brasil", "Rua Minas Gerais", "Rua São José", "Av. Getúlio Vargas", "Rua Dom Pedro II"];
const BAIRROS = ["Centro", "Jardim Bela Vista", "Vila Nova", "São Geraldo", "Santa Rita"];

function doisDigitos(numero: number) {
  if (numero < 10) {
    return "0" + numero;
  }
  return "" + numero;
}

function digitosFicticios(id: number, tamanho: number) {
  let texto = "";
  let valor = id * 7919 + 104729;
  for (let i = 0; i < tamanho; i++) {
    valor = (valor * 31 + 17) % 1000003;
    texto = texto + (valor % 10);
  }
  return texto;
}

export function detalhesDoAluno(aluno: any) {
  const id = aluno.id;
  const partes = aluno.nome.split(" ");
  const sobrenome = partes[partes.length - 1];
  const anoEscolar = parseInt(aluno.turma, 10);
  let idade = 12;
  if (anoEscolar >= 6 && anoEscolar <= 9) {
    idade = anoEscolar + 5;
  }
  const anoNascimento = 2026 - idade;
  const mes = (id * 5) % 12 + 1;
  const dia = (id * 7) % 27 + 1;

  const cpf = digitosFicticios(id, 11);
  const telefone = "35" + "9" + digitosFicticios(id + 50, 8);
  const posicao = id % RESPONSAVEIS.length;

  return {
    matricula: "2026" + doisDigitos(id) + digitosFicticios(id, 2),
    dataMatricula: "2026-02-" + doisDigitos((id % 8) + 1),
    dataNascimento: anoNascimento + "-" + doisDigitos(mes) + "-" + doisDigitos(dia),
    idade: idade,
    cpf: cpf.substring(0, 3) + "." + cpf.substring(3, 6) + "." + cpf.substring(6, 9) + "-" + cpf.substring(9, 11),
    turno: "Manhã",
    responsavelNome: RESPONSAVEIS[posicao] + " " + sobrenome,
    parentesco: PARENTESCOS[posicao],
    responsavelTelefone: telefone,
    responsavelEmail: RESPONSAVEIS[posicao].toLowerCase().replace("í", "i").replace("á", "a") + "." + sobrenome.toLowerCase() + "@exemplo.com",
    endereco: RUAS[id % RUAS.length] + ", " + (100 + id * 13) + " - " + BAIRROS[id % BAIRROS.length] + ", Santa Rita do Sapucaí - MG",
  };
}
