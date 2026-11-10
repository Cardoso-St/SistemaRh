/**
 * Remove acentos de uma string e a converte para letras minúsculas.
 * Útil para fazer buscas e filtros insensíveis a acentos e caixa.
 */
export const normalizarTexto = (texto = "") =>
    texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
