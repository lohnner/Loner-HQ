export const articles = [
  {
    id: "star-wars-1",
    title: "Star Wars #1",
    category: "Edição",
    year: "1977",
    tags: ["Marvel Comics", "adaptação", "sci-fi"],
    summary:
      "Primeira edição da adaptação em quadrinhos de Star Wars publicada pela Marvel Comics. Na Loner HQ, este verbete reúne capa, dados editoriais, personagens centrais e relações com a cronologia da série."
  },
  {
    id: "star-wars-2",
    title: "Star Wars #2",
    category: "Edição",
    year: "1977",
    tags: ["Marvel Comics", "adaptação", "sci-fi"],
    summary:
      "Segunda edição da adaptação Marvel de Star Wars, com a história Six Against the Galaxy. Na Loner HQ, este volume soma 19 páginas e segue o mesmo padrão de catalogação da Série Principal."
  },
  {
    id: "universo-star-wars",
    title: "Universo Star Wars",
    category: "Universo",
    year: "1977",
    tags: ["space opera", "cinema", "quadrinhos"],
    summary:
      "Conjunto de histórias, personagens, planetas e eras narrativas ligados a Star Wars. O portal organiza edições por linha temporal, editora, fase editorial e mídia de origem."
  },
  {
    id: "linha-do-tempo",
    title: "Linha do tempo editorial",
    category: "Guia",
    year: "Em Construção",
    tags: ["cronologia", "checklist", "coleção"],
    summary:
      "Guia para organizar publicações por ano, editora, fase e evento. A estrutura foi pensada para facilitar checklists de leitura e catalogação de coleções físicas ou digitais."
  },
  {
    id: "luke-skywalker",
    title: "Luke Skywalker",
    category: "Personagem",
    year: "1977",
    tags: ["jedi", "herói", "rebeldes"],
    summary:
      "Personagem central da trilogia clássica de Star Wars e presença recorrente nas adaptações em quadrinhos. O verbete acompanha aparições, aliados, antagonistas e fases da jornada."
  },
  {
    id: "colecao-loner",
    title: "Coleção Loner HQ",
    category: "Acervo",
    year: "2026",
    tags: ["catálogo", "capas", "biblioteca"],
    summary:
      "Índice geral da coleção local da Loner HQ, com espaço para capas, edições, notas de conservação, leituras feitas e futuras aquisições."
  }
];

// Cadastre novos universos, personagens, séries e volumes aqui para atualizar o Acervo automaticamente.
export const acervo = [
  {
    tipo: "universo",
    id: "star-wars",
    title: "Star Wars",
    href: "Universos/Star Wars/starwars.html"
  },
  {
    tipo: "universo",
    id: "marvel",
    title: "Marvel",
    href: "Universos/Marvel/index.html"
  },
  {
    tipo: "universo",
    id: "dc-universe",
    title: "DC Universe",
    href: "Universos/DC Universe/index.html"
  },
  {
    tipo: "personagem",
    id: "demolidor",
    title: "Demolidor",
    universe: "Marvel",
    href: "Universos/Marvel/Demolidor/demolidor.html"
  },
  {
    tipo: "personagem",
    id: "batman",
    title: "Batman",
    universe: "DC Universe",
    href: "Universos/DC Universe/Batman/batman.html"
  },
  {
    tipo: "serie",
    id: "star-wars-serie-principal",
    title: "Série Principal",
    universe: "Star Wars",
    href: "Universos/Star Wars/Saga Principal/saga-principal.html"
  },
  {
    tipo: "serie",
    id: "daredevil-1964",
    title: "1964 - Daredevil",
    universe: "Marvel",
    character: "Demolidor",
    href: "Universos/Marvel/Demolidor/daredevil-1964.html"
  },
  {
    tipo: "serie",
    id: "batman-2025",
    title: "2025 - Batman (2025–)",
    universe: "DC Universe",
    character: "Batman",
    href: "Universos/DC Universe/Batman/batman-2025.html"
  },
  {
    tipo: "volume",
    id: "star-wars-1-1977",
    title: "Star Wars #1 (1977)",
    shortTitle: "Star Wars #1",
    universe: "Star Wars",
    series: "Série Principal",
    href: "Universos/Star Wars/Saga Principal/star-wars-1-1977.html",
    cover: "Universos/Star Wars/Saga Principal/Star Wars #1.png",
    pageCount: 20,
    xpReward: 20,
    fileName: "star-wars-1-1977.html"
  },
  {
    tipo: "volume",
    id: "star-wars-2-1977",
    title: "Star Wars #2 (1977)",
    shortTitle: "Star Wars #2",
    universe: "Star Wars",
    series: "Série Principal",
    href: "Universos/Star Wars/Saga Principal/star-wars-2-1977.html",
    cover: "Universos/Star Wars/Saga Principal/Star Wars #2.png",
    pageCount: 19,
    xpReward: 19,
    fileName: "star-wars-2-1977.html"
  },
  {
    tipo: "volume",
    id: "daredevil-1-1964",
    title: "Daredevil #1 (1964)",
    shortTitle: "Daredevil #1",
    universe: "Marvel",
    series: "Daredevil (1964)",
    href: "Universos/Marvel/Demolidor/daredevil-1-1964.html",
    cover: "Universos/Marvel/Demolidor/1964 - Daredevil%231.jpg",
    pageCount: 23,
    xpReward: 23,
    fileName: "daredevil-1-1964.html"
  },
  {
    tipo: "volume",
    id: "daredevil-2-1964",
    title: "Daredevil #2 (1964)",
    shortTitle: "Daredevil #2",
    universe: "Marvel",
    series: "Daredevil (1964)",
    href: "Universos/Marvel/Demolidor/daredevil-2-1964.html",
    cover: "Universos/Marvel/Demolidor/1964 - Daredevil%232.jpg",
    pageCount: 23,
    xpReward: 23,
    fileName: "daredevil-2-1964.html"
  }
];

export const catalogo = {
  universos: acervo.filter((item) => item.tipo === "universo"),
  personagens: acervo.filter((item) => item.tipo === "personagem"),
  series: acervo.filter((item) => item.tipo === "serie"),
  volumes: acervo.filter((item) => item.tipo === "volume")
};

export const comics = Object.fromEntries(catalogo.volumes.map((volume) => [volume.id, volume]));
