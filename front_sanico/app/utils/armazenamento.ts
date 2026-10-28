export function lerLista(chave: string) {
  try {
    const texto = localStorage.getItem(chave);
    if (texto) {
      const lista = JSON.parse(texto);
      if (Array.isArray(lista)) {
        return lista;
      }
    }
  } catch {
    return [];
  }
  return [];
}

export function salvarLista(chave: string, lista: any[]) {
  try {
    localStorage.setItem(chave, JSON.stringify(lista));
    return true;
  } catch {
    return false;
  }
}
