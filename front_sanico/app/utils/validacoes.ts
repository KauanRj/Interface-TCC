export function apenasDigitos(texto: string) {
  return texto.replace(/\D/g, "");
}

export function validarNome(valor: string) {
  const nome = valor.trim();
  const proibidos = "0123456789@#$%&*()_+=<>?/\\|{}[]~^\"!";

  if (nome === "") {
    return "Informe o nome.";
  }
  if (nome.length < 3) {
    return "O nome deve ter pelo menos 3 caracteres.";
  }
  if (nome.length > 80) {
    return "O nome deve ter no máximo 80 caracteres.";
  }
  for (let i = 0; i < nome.length; i++) {
    if (proibidos.includes(nome[i])) {
      return "O nome não pode ter números ou símbolos.";
    }
  }
  return "";
}

export function validarEmail(valor: string) {
  const email = valor.trim();

  if (email === "") {
    return "Informe o e-mail.";
  }

  const posArroba = email.indexOf("@");
  const dominio = email.slice(posArroba + 1);
  const posPonto = dominio.lastIndexOf(".");

  if (email.includes(" ") || posArroba < 1 || posArroba !== email.lastIndexOf("@")) {
    return "Informe um e-mail válido, como nome@escola.com.";
  }
  if (posPonto < 1 || dominio.length - posPonto - 1 < 2) {
    return "Informe um e-mail válido, como nome@escola.com.";
  }
  return "";
}

export function validarTelefone(valor: string) {
  const digitos = apenasDigitos(valor);

  if (digitos === "") {
    return "";
  }
  if (digitos.length !== 10 && digitos.length !== 11) {
    return "Informe o telefone com DDD, como (35) 99999-9999.";
  }
  if (digitos[0] === "0") {
    return "O DDD informado não é válido.";
  }
  if (digitos.length === 11 && digitos[2] !== "9") {
    return "Celulares com 11 dígitos começam com 9 depois do DDD.";
  }
  return "";
}

export function formatarTelefone(valor: string) {
  const d = apenasDigitos(valor).slice(0, 11);

  if (d.length === 0) {
    return "";
  }
  if (d.length <= 2) {
    return "(" + d;
  }
  if (d.length <= 6) {
    return "(" + d.slice(0, 2) + ") " + d.slice(2);
  }
  if (d.length <= 10) {
    return "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6);
  }
  return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
}

export function validarCargo(valor: string) {
  const cargo = valor.trim();

  if (cargo === "") {
    return "Informe o cargo.";
  }
  if (cargo.length < 2) {
    return "O cargo deve ter pelo menos 2 caracteres.";
  }
  if (cargo.length > 60) {
    return "O cargo deve ter no máximo 60 caracteres.";
  }
  return "";
}

export function validarNovaSenha(atual: string, nova: string, confirmacao: string) {
  if (atual === "" || nova === "" || confirmacao === "") {
    return "Preencha todos os campos.";
  }
  if (nova.length < 8) {
    return "A nova senha deve ter pelo menos 8 caracteres.";
  }
  if (nova === atual) {
    return "A nova senha deve ser diferente da senha atual.";
  }
  if (nova !== confirmacao) {
    return "As senhas não coincidem.";
  }
  return "";
}

export function formatarCpf(valor: string) {
  const digitos = apenasDigitos(valor).slice(0, 11);
  let texto = digitos.slice(0, 3);
  if (digitos.length > 3) {
    texto = texto + "." + digitos.slice(3, 6);
  }
  if (digitos.length > 6) {
    texto = texto + "." + digitos.slice(6, 9);
  }
  if (digitos.length > 9) {
    texto = texto + "-" + digitos.slice(9, 11);
  }
  return texto;
}

function digitoDoCpf(digitos: string, tamanho: number) {
  let soma = 0;
  for (let i = 0; i < tamanho; i++) {
    soma = soma + parseInt(digitos[i], 10) * (tamanho + 1 - i);
  }
  const resto = (soma * 10) % 11;
  if (resto === 10) {
    return 0;
  }
  return resto;
}

export function validarCpf(valor: string) {
  const digitos = apenasDigitos(valor);

  if (digitos === "") {
    return "Informe o CPF.";
  }
  if (digitos.length !== 11) {
    return "O CPF deve ter 11 dígitos.";
  }
  if (digitos === digitos[0].repeat(11)) {
    return "Informe um CPF válido.";
  }
  if (digitoDoCpf(digitos, 9) !== parseInt(digitos[9], 10)) {
    return "Informe um CPF válido.";
  }
  if (digitoDoCpf(digitos, 10) !== parseInt(digitos[10], 10)) {
    return "Informe um CPF válido.";
  }
  return "";
}

export function validarDataNascimento(valor: string, idadeMinima: number, idadeMaxima: number) {
  if (valor === "") {
    return "Informe a data de nascimento.";
  }
  const nascimento = new Date(valor + "T00:00:00");
  if (isNaN(nascimento.getTime())) {
    return "Informe uma data válida.";
  }
  const hoje = new Date();
  if (nascimento > hoje) {
    return "A data de nascimento não pode ser no futuro.";
  }
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const jaFezAniversario =
    hoje.getMonth() > nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() >= nascimento.getDate());
  if (jaFezAniversario === false) {
    idade = idade - 1;
  }
  if (idade < idadeMinima || idade > idadeMaxima) {
    return "A idade deve estar entre " + idadeMinima + " e " + idadeMaxima + " anos.";
  }
  return "";
}

export function calcularIdade(dataNascimento: string) {
  const nascimento = new Date(dataNascimento + "T00:00:00");
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const jaFezAniversario =
    hoje.getMonth() > nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() >= nascimento.getDate());
  if (jaFezAniversario === false) {
    idade = idade - 1;
  }
  return idade;
}
