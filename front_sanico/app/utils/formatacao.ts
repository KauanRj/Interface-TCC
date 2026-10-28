function lerData(valor?: string) {
  if (!valor) {
    return null;
  }

  let data = new Date(valor);
  if (valor.length === 10) {
    data = new Date(valor + "T12:00:00");
  }

  if (isNaN(data.getTime())) {
    return null;
  }
  return data;
}

export function formatarDataLonga(valor?: string) {
  const data = lerData(valor);
  if (data === null) {
    return "—";
  }
  return data.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
}

export function formatarDataCurta(valor?: string) {
  const data = lerData(valor);
  if (data === null) {
    return "—";
  }
  return data.toLocaleDateString("pt-BR");
}

export function formatarUltimoAcesso(valor?: string) {
  const data = lerData(valor);
  if (data === null) {
    return "—";
  }

  const hora = data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  const hoje = new Date();
  const ontem = new Date();
  ontem.setDate(ontem.getDate() - 1);

  if (data.toDateString() === hoje.toDateString()) {
    return "Hoje, " + hora;
  }
  if (data.toDateString() === ontem.toDateString()) {
    return "Ontem, " + hora;
  }
  return data.toLocaleDateString("pt-BR") + " " + hora;
}

export function primeiroNome(nome?: string) {
  if (!nome) {
    return "";
  }
  return nome.trim().split(" ")[0];
}
