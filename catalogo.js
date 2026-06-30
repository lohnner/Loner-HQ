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
      "Segunda edição da adaptação Marvel de Star Wars, com a história Six Against the Galaxy. Na Loner HQ, esta HQ soma 19 páginas e segue o mesmo padrão de catalogação da Série Principal."
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
    id: "universo-dune",
    title: "Universo Dune",
    category: "Universo",
    year: "1965",
    tags: ["sci-fi", "Arrakis", "especiaria"],
    summary:
      "Saga de ficção científica criada a partir dos romances de Frank Herbert, centrada em Arrakis, na especiaria melange e nos conflitos entre casas, Fremen e ordens políticas e religiosas."
  },
  {
    id: "dune-marvel-1985",
    title: "Dune (Marvel)",
    category: "Série",
    year: "1985",
    tags: ["Marvel Comics", "Dune", "adaptação"],
    summary:
      "Minissérie em três edições publicada pela Marvel Comics em 1985, adaptando Dune para os quadrinhos com texto de Ralph Macchio e arte de Bill Sienkiewicz."
  },
  {
    id: "dune-marvel-1985-1",
    title: "Dune #1",
    category: "Edição",
    year: "1985",
    tags: ["Marvel Comics", "Dune", "adaptação"],
    summary:
      "Primeira edição da minissérie Dune publicada pela Marvel Comics em 1985, com adaptação de Ralph Macchio e arte de Bill Sienkiewicz."
  },
  {
    id: "dune-marvel-1985-2",
    title: "Dune #2",
    category: "Edição",
    year: "1985",
    tags: ["Marvel Comics", "Dune", "adaptação"],
    summary:
      "Segunda edição da minissérie Dune publicada pela Marvel Comics em 1985, continuando a adaptação oficial do filme para os quadrinhos."
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

// Cadastre novos universos, personagens, séries e HQs aqui para atualizar o Acervo automaticamente.
export const acervo = [
  {
    tipo: "universo",
    id: "star-wars",
    title: "Star Wars",
    href: "Universos/Star Wars/starwars.html"
  },
  {
    tipo: "universo",
    id: "dune",
    title: "Dune",
    href: "Universos/Dune/dune.html"
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
    id: "dune-marvel-1985",
    title: "Dune (Marvel)",
    year: "1985",
    universe: "Dune",
    href: "Universos/Dune/dune-marvel-1985/dune-marvel-1985.html"
  },
  {
    tipo: "serie",
    id: "star-wars-serie-principal",
    title: "Série Principal",
    year: "1997",
    universe: "Star Wars",
    href: "Universos/Star Wars/Saga Principal/saga-principal.html"
  },
  {
    tipo: "serie",
    id: "star-wars-a-batalha-de-jakku",
    title: "A Batalha de Jakku",
    year: "2024",
    universe: "Star Wars",
    href: "Universos/Star Wars/a-batalha-de-jakku/a-batalha-de-jakku.html"
  },
  {
    tipo: "serie",
    id: "star-wars-a-batalha-de-jakku-insurgencia-em-ascensao",
    title: "Insurgência em Ascensão",
    year: "2024",
    universe: "Star Wars",
    href: "Universos/Star Wars/a-batalha-de-jakku/insurgencia-em-ascensao/insurgencia-em-ascensao.html"
  },
  {
    tipo: "serie",
    id: "star-wars-a-batalha-de-jakku-republica-sitiada",
    title: "República Sitiada",
    year: "2024",
    universe: "Star Wars",
    href: "Universos/Star Wars/a-batalha-de-jakku/rep%C3%BAblica-sitiada/rep%C3%BAblica-sitiada.html"
  },
  {
    tipo: "serie",
    id: "daredevil-1964",
    title: "Daredevil",
    year: "1964",
    universe: "Marvel",
    character: "Demolidor",
    href: "Universos/Marvel/Demolidor/daredevil-1964.html"
  },
  {
    tipo: "serie",
    id: "batman-2025",
    title: "Batman (2025–)",
    year: "2025",
    universe: "DC Universe",
    character: "Batman",
    href: "Universos/DC Universe/Batman/batman-2025.html"
  },
  {
    tipo: "hq",
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
    tipo: "hq",
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
    tipo: "hq",
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
    tipo: "hq",
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
  },
  {
    tipo: "hq",
    id: "batman-1-2025",
    title: "Batman #1 (2025)",
    shortTitle: "Batman #1",
    universe: "DC Universe",
    series: "Batman (2025–)",
    href: "Universos/DC Universe/Batman/batman-1-2025.html",
    cover: "Universos/DC Universe/Batman/2025%20Batman%20(2025%E2%80%93)%20%231.jpg",
    pageCount: 22,
    xpReward: 22,
    fileName: "batman-1-2025.html"
  },
  {
    tipo: "hq",
    id: "batman-2-2025",
    title: "Batman #2 (2025)",
    shortTitle: "Batman #2",
    universe: "DC Universe",
    series: "Batman (2025–)",
    href: "Universos/DC Universe/Batman/batman-2-2025.html",
    cover: "Universos/DC Universe/Batman/Batman%20(2025%E2%80%93)%20%232.jpg",
    pageCount: 22,
    xpReward: 22,
    fileName: "batman-2-2025.html"
  },
  {
    tipo: "hq",
    id: "batman-3-2025",
    title: "Batman #3 (2025)",
    shortTitle: "Batman #3",
    universe: "DC Universe",
    series: "Batman (2025–)",
    href: "Universos/DC Universe/Batman/batman-3-2025.html",
    cover: "Universos/DC Universe/Batman/Batman%20(2025%E2%80%93)%20%233.jpg",
    pageCount: 22,
    xpReward: 22,
    fileName: "batman-3-2025.html"
  },
  {
    tipo: "hq",
    id: "batman-4-2025",
    title: "Batman #4 (2025)",
    shortTitle: "Batman #4",
    universe: "DC Universe",
    series: "Batman (2025–)",
    href: "Universos/DC Universe/Batman/batman-4-2025.html",
    cover: "Universos/DC Universe/Batman/Batman%20(2025%E2%80%93)%20%234.jpg",
    pageCount: 22,
    xpReward: 22,
    fileName: "batman-4-2025.html"
  },
  {
    tipo: "hq",
    id: "star-wars-a-batalha-de-jakku-insurgencia-em-ascensao-1-2024",
    title: "Star Wars: A Batalha de Jakku — Insurgência em Ascensão #1 (2024)",
    shortTitle: "Insurgência em Ascensão #1",
    universe: "Star Wars",
    series: "Insurgência em Ascensão",
    href: "Universos/Star Wars/a-batalha-de-jakku/insurgencia-em-ascensao/a-batalha-de-jakku-insurgencia-em-ascensao-1-2024.html",
    cover: "Universos/Star Wars/a-batalha-de-jakku/insurgencia-em-ascensao/a-batalha-de-jakku-insurgencia-em-ascensao%231.png",
    pageCount: 33,
    xpReward: 33,
    fileName: "a-batalha-de-jakku-insurgencia-em-ascensao-1-2024.html"
  },
  {
    tipo: "hq",
    id: "star-wars-a-batalha-de-jakku-insurgencia-em-ascensao-2-2024",
    title: "Star Wars: A Batalha de Jakku — Insurgência em Ascensão #2 (2024)",
    shortTitle: "Insurgência em Ascensão #2",
    universe: "Star Wars",
    series: "Insurgência em Ascensão",
    href: "Universos/Star Wars/a-batalha-de-jakku/insurgencia-em-ascensao/a-batalha-de-jakku-insurgencia-em-ascensao-2-2024.html",
    cover: "Universos/Star Wars/a-batalha-de-jakku/insurgencia-em-ascensao/a-batalha-de-jakku-insurgencia-em-ascensao%232.png",
    pageCount: 23,
    xpReward: 23,
    fileName: "a-batalha-de-jakku-insurgencia-em-ascensao-2-2024.html"
  },
  {
    tipo: "hq",
    id: "star-wars-a-batalha-de-jakku-insurgencia-em-ascensao-3-2024",
    title: "Star Wars: A Batalha de Jakku — Insurgência em Ascensão #3 (2024)",
    shortTitle: "Insurgência em Ascensão #3",
    universe: "Star Wars",
    series: "Insurgência em Ascensão",
    href: "Universos/Star Wars/a-batalha-de-jakku/insurgencia-em-ascensao/a-batalha-de-jakku-insurgencia-em-ascensao-3-2024.html",
    cover: "Universos/Star Wars/a-batalha-de-jakku/insurgencia-em-ascensao/a-batalha-de-jakku-insurgencia-em-ascensao%233.png",
    pageCount: 23,
    xpReward: 23,
    fileName: "a-batalha-de-jakku-insurgencia-em-ascensao-3-2024.html"
  },
  {
    tipo: "hq",
    id: "star-wars-a-batalha-de-jakku-insurgencia-em-ascensao-4-2024",
    title: "Star Wars: A Batalha de Jakku — Insurgência em Ascensão #4 (2024)",
    shortTitle: "Insurgência em Ascensão #4",
    universe: "Star Wars",
    series: "Insurgência em Ascensão",
    href: "Universos/Star Wars/a-batalha-de-jakku/insurgencia-em-ascensao/a-batalha-de-jakku-insurgencia-em-ascensao-4-2024.html",
    cover: "Universos/Star Wars/a-batalha-de-jakku/insurgencia-em-ascensao/a-batalha-de-jakku-insurgencia-em-ascensao%234.png",
    pageCount: 24,
    xpReward: 24,
    fileName: "a-batalha-de-jakku-insurgencia-em-ascensao-4-2024.html"
  },
  {
    tipo: "hq",
    id: "star-wars-a-batalha-de-jakku-republica-sitiada-1-2024",
    title: "A Batalha de Jakku: República Sitiada #1 (2024)",
    shortTitle: "República Sitiada #1",
    universe: "Star Wars",
    series: "República Sitiada",
    href: "Universos/Star Wars/a-batalha-de-jakku/rep%C3%BAblica-sitiada/a-batalha-de-jakku-republica-sitiada-1-2024.html",
    cover: "Universos/Star Wars/a-batalha-de-jakku/rep%C3%BAblica-sitiada/a-batalha-de-jakku-republica-sitiada%232.png",
    pageCount: 34,
    xpReward: 34,
    fileName: "a-batalha-de-jakku-republica-sitiada-1-2024.html"
  },
  {
    tipo: "hq",
    id: "dune-marvel-1985-1",
    title: "Dune #1 (1985)",
    shortTitle: "Dune #1",
    universe: "Dune",
    series: "Dune (Marvel)",
    href: "Universos/Dune/dune-marvel-1985/dune-marvel-1985-1-1985.html",
    cover: "Universos/Dune/dune-marvel-1985/dune-marvel-1985%231.png",
    pageCount: 36,
    xpReward: 36,
    fileName: "dune-marvel-1985-1-1985.html"
  },
  {
    tipo: "hq",
    id: "dune-marvel-1985-2",
    title: "Dune #2 (1985)",
    shortTitle: "Dune #2",
    universe: "Dune",
    series: "Dune",
    href: "Universos/Dune/dune-marvel-1985/dune-marvel-1985-2-1985.html",
    cover: "Universos/Dune/dune-marvel-1985/dune-marvel-1985%232.png",
    pageCount: 36,
    xpReward: 36,
    fileName: "dune-marvel-1985-2-1985.html"
  }
];

const hqsCatalogadas = acervo.filter((item) => item.tipo === "hq");

export const catalogo = {
  universos: acervo.filter((item) => item.tipo === "universo"),
  personagens: acervo.filter((item) => item.tipo === "personagem"),
  series: acervo.filter((item) => item.tipo === "serie"),
  hqs: hqsCatalogadas
};

export const comics = Object.fromEntries(catalogo.hqs.map((hq) => [hq.id, hq]));
