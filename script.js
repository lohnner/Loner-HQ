const articles = [
  {
    id: "star-wars-1",
    title: "Star Wars #1",
    category: "Edicao",
    year: "1977",
    tags: ["Marvel Comics", "adaptacao", "sci-fi"],
    summary:
      "Primeira edicao da adaptacao em quadrinhos de Star Wars publicada pela Marvel Comics. Na Loner HQ, este verbete reune capa, dados editoriais, personagens centrais e relacoes com a cronologia da saga."
  },
  {
    id: "universo-star-wars",
    title: "Universo Star Wars",
    category: "Universo",
    year: "1977",
    tags: ["space opera", "cinema", "quadrinhos"],
    summary:
      "Conjunto de historias, personagens, planetas e eras narrativas ligados a Star Wars. O portal organiza edicoes por linha temporal, editora, fase editorial e midia de origem."
  },
  {
    id: "linha-do-tempo",
    title: "Linha do tempo editorial",
    category: "Guia",
    year: "Em construcao",
    tags: ["cronologia", "checklist", "colecao"],
    summary:
      "Guia para organizar publicacoes por ano, editora, fase e evento. A estrutura foi pensada para facilitar checklists de leitura e catalogacao de colecoes fisicas ou digitais."
  },
  {
    id: "luke-skywalker",
    title: "Luke Skywalker",
    category: "Personagem",
    year: "1977",
    tags: ["jedi", "heroi", "rebeldes"],
    summary:
      "Personagem central da trilogia classica de Star Wars e presenca recorrente nas adaptacoes em quadrinhos. O verbete acompanha aparicoes, aliados, antagonistas e fases da jornada."
  },
  {
    id: "colecao-loner",
    title: "Colecao Loner HQ",
    category: "Acervo",
    year: "2026",
    tags: ["catalogo", "capas", "biblioteca"],
    summary:
      "Indice geral da colecao local da Loner HQ, com espaco para capas, edicoes, notas de conservacao, leituras feitas e futuras aquisicoes."
  }
];

const userKey = "loner-hq-users-v1";
const sessionKey = "loner-hq-session-v1";

const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");
const accountPanel = document.querySelector("#accountPanel");
const accountName = document.querySelector("#accountName");
const authBadge = document.querySelector("#authBadge");
const authMessage = document.querySelector("#authMessage");
const showRegister = document.querySelector("#showRegister");
const showLogin = document.querySelector("#showLogin");
const logoutButton = document.querySelector("#logoutButton");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#siteSearch");
const searchResults = document.querySelector("#searchResults");
const articleContent = document.querySelector("#articleContent");
const navLinks = document.querySelectorAll("[data-section]");

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(userKey)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(userKey, JSON.stringify(users));
}

function setMessage(text, type = "") {
  if (!authMessage) {
    return;
  }

  authMessage.textContent = text;
  authMessage.className = `auth-message ${type}`.trim();
}

async function hashPassword(password) {
  if (!crypto.subtle) {
    return btoa(unescape(encodeURIComponent(password)));
  }

  const encoded = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function setSession(username) {
  localStorage.setItem(sessionKey, username);
  updateAuthState();
}

function clearSession() {
  localStorage.removeItem(sessionKey);
  updateAuthState();
}

function updateAuthState() {
  if (!loginForm || !registerForm || !accountPanel || !authBadge || !accountName) {
    return;
  }

  const username = localStorage.getItem(sessionKey);
  const loggedIn = Boolean(username);

  loginForm.hidden = loggedIn;
  registerForm.hidden = true;
  accountPanel.hidden = !loggedIn;
  authBadge.textContent = loggedIn ? "Online" : "Visitante";
  authBadge.style.color = loggedIn ? "var(--success)" : "var(--muted)";
  accountName.textContent = username || "";

  if (loggedIn) {
    setMessage("Sessao ativa neste navegador.", "success");
  } else if (!authMessage.textContent) {
    setMessage("Entre ou crie uma conta local.");
  }
}

function renderArticle(articleId) {
  if (!articleContent) {
    return;
  }

  const article = articles.find((item) => item.id === articleId);

  if (!article) {
    return;
  }

  articleContent.innerHTML = `
    <h3>${article.title}</h3>
    <p>${article.summary}</p>
    <div class="meta-list" aria-label="Metadados do verbete">
      <span>${article.category}</span>
      <span>${article.year}</span>
      ${article.tags.map((tag) => `<span>${tag}</span>`).join("")}
    </div>
  `;
}

function renderSearchResults(query) {
  if (!searchResults) {
    return;
  }

  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    searchResults.hidden = true;
    searchResults.innerHTML = "";
    return;
  }

  const matches = articles.filter((article) => {
    const searchable = [article.title, article.category, article.year, article.summary, ...article.tags]
      .join(" ")
      .toLowerCase();
    return searchable.includes(normalized);
  });

  if (!matches.length) {
    searchResults.hidden = false;
    searchResults.innerHTML = '<div class="search-result" role="status"><strong>Nenhum verbete encontrado</strong><span>Tente outro termo.</span></div>';
    return;
  }

  searchResults.hidden = false;
  searchResults.innerHTML = matches
    .map(
      (article) => `
        <button class="search-result" type="button" data-open-article="${article.id}">
          <strong>${article.title}</strong>
          <span>${article.category} - ${article.tags.join(", ")}</span>
        </button>
      `
    )
    .join("");
}

function setActiveSection(section) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.section === section);
  });
}

showRegister?.addEventListener("click", () => {
  loginForm.hidden = true;
  registerForm.hidden = false;
  setMessage("Cadastro local para esta pagina.");
});

showLogin?.addEventListener("click", () => {
  registerForm.hidden = true;
  loginForm.hidden = false;
  setMessage("Entre com seu usuario e senha.");
});

registerForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(registerForm);
  const username = String(formData.get("novoUsuario")).trim();
  const password = String(formData.get("novaSenha"));
  const confirmation = String(formData.get("confirmarSenha"));

  if (username.length < 3) {
    setMessage("O usuario precisa ter pelo menos 3 caracteres.", "error");
    return;
  }

  if (password.length < 6) {
    setMessage("A senha precisa ter pelo menos 6 caracteres.", "error");
    return;
  }

  if (password !== confirmation) {
    setMessage("As senhas nao conferem.", "error");
    return;
  }

  const users = getUsers();
  const exists = users.some((user) => user.username.toLowerCase() === username.toLowerCase());

  if (exists) {
    setMessage("Esse usuario ja existe.", "error");
    return;
  }

  users.push({
    username,
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString()
  });

  saveUsers(users);
  registerForm.reset();
  setSession(username);
  setMessage("Conta criada com sucesso.", "success");
});

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const username = String(formData.get("usuario")).trim();
  const password = String(formData.get("senha"));
  const users = getUsers();
  const user = users.find((item) => item.username.toLowerCase() === username.toLowerCase());

  if (!user) {
    setMessage("Usuario nao encontrado.", "error");
    return;
  }

  const passwordHash = await hashPassword(password);

  if (passwordHash !== user.passwordHash) {
    setMessage("Senha incorreta.", "error");
    return;
  }

  loginForm.reset();
  setSession(user.username);
  setMessage("Login realizado.", "success");
});

logoutButton?.addEventListener("click", () => {
  clearSession();
  setMessage("Voce saiu da conta.");
});

searchInput?.addEventListener("input", (event) => {
  renderSearchResults(event.target.value);
});

searchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  renderSearchResults(searchInput.value);
});

document.addEventListener("click", (event) => {
  const articleButton = event.target.closest("[data-open-article]");
  const sectionLink = event.target.closest("[data-section]");

  if (articleButton) {
    renderArticle(articleButton.dataset.openArticle);
    if (searchResults) {
      searchResults.hidden = true;
    }
    articleContent?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  if (sectionLink) {
    setActiveSection(sectionLink.dataset.section);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (searchResults) {
      searchResults.hidden = true;
    }
  }
});

updateAuthState();
