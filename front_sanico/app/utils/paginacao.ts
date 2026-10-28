export function dividirEmBlocos(lista: any[], tamanho: number) {
  if (tamanho < 1) {
    tamanho = 1;
  }

  const blocos = [];

  for (let i = 0; i < lista.length; i = i + tamanho) {
    blocos.push(lista.slice(i, i + tamanho));
  }

  return blocos;
}
