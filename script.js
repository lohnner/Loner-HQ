import { firebaseConfig, firebaseReady } from "./firebase-config.js?v=authdomain-20260627";

const articles = [
  {
    id: "star-wars-1",
    title: "Star Wars #1",
    category: "Edição",
    year: "1977",
    tags: ["Marvel Comics", "adaptação", "sci-fi"],
    summary:
      "Primeira edição da adaptação em quadrinhos de Star Wars publicada pela Marvel Comics. Na Loner HQ, este verbete reúne capa, dados editoriais, personagens centrais e relações com a cronologia da saga."
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

const comics = {
  "star-wars-1-1977": {
    id: "star-wars-1-1977",
    title: "Star Wars #1 (1977)",
    shortTitle: "Star Wars #1",
    universe: "Star Wars",
    saga: "Saga Principal",
    href: "Universos/Star Wars/Saga Principal/star-wars-1-1977.html",
    cover: "Universos/Star Wars/Saga Principal/Star Wars #1.png"
  }
};

const defaultAvatarPath = "Avatar/homemaranha.png";
const readXpReward = 20;

const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");
const accountPanel = document.querySelector("#accountPanel");
const authBadge = document.querySelector("#authBadge");
const authMessage = document.querySelector("#authMessage");
const showRegister = document.querySelector("#showRegister");
const showLogin = document.querySelector("#showLogin");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#siteSearch");
const searchResults = document.querySelector("#searchResults");
const articleContent = document.querySelector("#articleContent");
const navLinks = document.querySelectorAll("[data-section]");
const profilePage = document.querySelector("#profilePage");

let firebaseServices = null;
let currentUser = null;
let currentProfile = null;
let currentInteraction = {};
let interactionUnsubscribe = null;
let readersUnsubscribe = null;
let volumeActions = null;
let readersButton = null;
let pendingAuthError = "";

function rootPath() {
  const path = decodeURIComponent(window.location.pathname).replace(/\\/g, "/");

  if (path.includes("/Universos/Star Wars/Saga Principal/")) {
    return "../../../";
  }

  if (path.includes("/Universos/Star Wars/")) {
    return "../../";
  }

  if (path.includes("/Universos/")) {
    return "../";
  }

  return "";
}

function assetPath(path) {
  if (!path) {
    return "";
  }

  if (/^(https?:|data:|\/)/.test(path)) {
    return path;
  }

  return `${rootPath()}${path}`;
}

function loginOriginWarning() {
  if (window.location.protocol === "file:") {
    return "Para login, abra pelo arquivo abrir-loner-hq-local.cmd ou use http://localhost:8765/index.html.";
  }

  if (window.location.hostname === "127.0.0.1") {
    return "Para login Google, use localhost no lugar de 127.0.0.1.";
  }

  return "";
}

function pagePath(path, params = {}) {
  const url = new URL(`${rootPath()}${path}`, window.location.href);
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });
  return url.href;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeSearchText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function timestampToMillis(value) {
  if (!value) {
    return 0;
  }

  if (typeof value.toMillis === "function") {
    return value.toMillis();
  }

  if (typeof value === "number") {
    return value;
  }

  return Date.parse(value) || 0;
}

function xpNeededForLevel(level) {
  return Math.pow(level - 1, 2) * 100;
}

function levelFromXp(xp) {
  let level = 1;
  while (xp >= xpNeededForLevel(level + 1)) {
    level += 1;
  }
  return level;
}

function xpProgress(profile = {}) {
  const xp = Number(profile.xp || 0);
  const level = Number(profile.level || levelFromXp(xp));
  const currentFloor = xpNeededForLevel(level);
  const nextFloor = xpNeededForLevel(level + 1);
  const current = Math.max(0, xp - currentFloor);
  const next = Math.max(1, nextFloor - currentFloor);

  return {
    level,
    xp,
    current,
    next,
    percent: Math.min(100, Math.max(0, (current / next) * 100))
  };
}

function setMessage(text, type = "") {
  if (!authMessage) {
    return;
  }

  authMessage.textContent = text;
  authMessage.className = `auth-message ${type}`.trim();
}

function setActiveSection(section) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.section === section);
  });
}

function normalizeAuthForms() {
  const loginLabel = document.querySelector('label[for="loginUser"]');
  const registerLabel = document.querySelector('label[for="registerUser"]');
  const loginUser = document.querySelector("#loginUser");
  const registerUser = document.querySelector("#registerUser");

  if (loginLabel) {
    loginLabel.textContent = "E-mail";
  }

  if (registerLabel) {
    registerLabel.textContent = "Novo e-mail";
  }

  if (loginUser) {
    loginUser.type = "email";
    loginUser.autocomplete = "email";
  }

  if (registerUser) {
    registerUser.type = "email";
    registerUser.autocomplete = "email";
  }

  if (loginForm && !document.querySelector("#googleLoginButton")) {
    const googleButton = document.createElement("button");
    googleButton.className = "button google";
    googleButton.type = "button";
    googleButton.id = "googleLoginButton";
    googleButton.textContent = "Entrar com Google";
    showRegister?.insertAdjacentElement("beforebegin", googleButton);
  }
}

function setFirebaseUnavailable() {
  loginForm?.querySelectorAll("input, button").forEach((item) => {
    item.disabled = true;
  });
  registerForm?.querySelectorAll("input, button").forEach((item) => {
    item.disabled = true;
  });

  if (authBadge) {
    authBadge.textContent = "Configurar";
    authBadge.style.color = "var(--danger)";
  }

  setMessage("Cole a configuração do Web App em firebase-config.js para ativar login e perfis.", "error");
  updateVolumeActionsUi();
  renderProfilePageUnavailable();
}

async function loadFirebase() {
  if (!firebaseReady) {
    setFirebaseUnavailable();
    return null;
  }

  if (firebaseServices) {
    return firebaseServices;
  }

  const [appModule, authModule, firestoreModule] = await Promise.all([
    import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
    import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"),
    import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js")
  ]);

  const app = appModule.initializeApp(firebaseConfig);
  const auth = authModule.getAuth(app);
  const db = firestoreModule.getFirestore(app);

  await authModule.setPersistence(auth, authModule.browserLocalPersistence).catch(() => {});

  firebaseServices = {
    auth,
    db,
    GoogleAuthProvider: authModule.GoogleAuthProvider,
    getRedirectResult: authModule.getRedirectResult,
    signInWithPopup: authModule.signInWithPopup,
    createUserWithEmailAndPassword: authModule.createUserWithEmailAndPassword,
    signInWithEmailAndPassword: authModule.signInWithEmailAndPassword,
    signInWithRedirect: authModule.signInWithRedirect,
    signOut: authModule.signOut,
    onAuthStateChanged: authModule.onAuthStateChanged,
    collection: firestoreModule.collection,
    doc: firestoreModule.doc,
    getDoc: firestoreModule.getDoc,
    getDocs: firestoreModule.getDocs,
    onSnapshot: firestoreModule.onSnapshot,
    serverTimestamp: firestoreModule.serverTimestamp,
    setDoc: firestoreModule.setDoc
  };

  return firebaseServices;
}

function userRef(uid) {
  return firebaseServices.doc(firebaseServices.db, "users", uid);
}

function userComicRef(uid, comicId) {
  return firebaseServices.doc(firebaseServices.db, "users", uid, "comics", comicId);
}

function comicInteractionRef(comicId, uid) {
  return firebaseServices.doc(firebaseServices.db, "comics", comicId, "interactions", uid);
}

async function ensureProfile(user) {
  const ref = userRef(user.uid);
  const snapshot = await firebaseServices.getDoc(ref);

  if (snapshot.exists()) {
    const profile = snapshot.data();
    const normalizedLevel = levelFromXp(Number(profile.xp || 0));

    if (profile.level !== normalizedLevel) {
      await firebaseServices.setDoc(ref, { level: normalizedLevel }, { merge: true });
      return { ...profile, level: normalizedLevel };
    }

    return profile;
  }

  const profile = {
    uid: user.uid,
    nick: "",
    nickLower: "",
    avatarPath: defaultAvatarPath,
    xp: 0,
    level: 1,
    createdAt: firebaseServices.serverTimestamp(),
    updatedAt: firebaseServices.serverTimestamp()
  };

  await firebaseServices.setDoc(ref, profile, { merge: true });
  return { ...profile, createdAt: null, updatedAt: null };
}

function openNickDialog(user, profile) {
  return new Promise((resolve) => {
    const existing = document.querySelector("#nickDialog");
    existing?.remove();

    const suggestedNick = profile.nick || user.displayName || "";
    const overlay = document.createElement("div");
    overlay.className = "modal-backdrop";
    overlay.id = "nickDialog";
    overlay.innerHTML = `
      <section class="modal-dialog nick-dialog" role="dialog" aria-modal="true" aria-labelledby="nickTitle">
        <h2 id="nickTitle">Escolha seu Nick</h2>
        <p>Esse nome vai aparecer para os outros usuários da Loner HQ.</p>
        <form id="nickForm" class="auth-form">
          <label for="nickInput">Nick público</label>
          <input id="nickInput" name="nick" minlength="3" maxlength="24" required value="${escapeHtml(suggestedNick)}" />
          <button class="button primary" type="submit">Salvar Nick</button>
          <p class="auth-message" id="nickMessage" aria-live="polite"></p>
        </form>
      </section>
    `;
    document.body.append(overlay);

    const input = overlay.querySelector("#nickInput");
    const message = overlay.querySelector("#nickMessage");
    input?.focus();
    input?.select();

    overlay.querySelector("#nickForm")?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const nick = String(new FormData(event.currentTarget).get("nick")).trim();

      if (nick.length < 3) {
        message.textContent = "Use pelo menos 3 caracteres.";
        message.className = "auth-message error";
        return;
      }

      const updatedProfile = {
        uid: user.uid,
        nick,
        nickLower: nick.toLowerCase(),
        avatarPath: profile.avatarPath || defaultAvatarPath,
        xp: Number(profile.xp || 0),
        level: levelFromXp(Number(profile.xp || 0)),
        updatedAt: firebaseServices.serverTimestamp()
      };

      await firebaseServices.setDoc(userRef(user.uid), updatedProfile, { merge: true });
      overlay.remove();
      resolve({ ...profile, ...updatedProfile });
    });
  });
}

async function ensureNick(user, profile) {
  if (profile.nick) {
    return profile;
  }

  return openNickDialog(user, profile);
}

function temporaryProfileFromAuth(user) {
  const fallbackNick = user.displayName || user.email?.split("@")[0] || "Usuário";

  return {
    uid: user.uid,
    nick: fallbackNick,
    avatarPath: defaultAvatarPath,
    xp: 0,
    level: 1,
    firestoreBlocked: true
  };
}

function renderSignedOut() {
  if (!loginForm || !registerForm || !accountPanel || !authBadge) {
    return;
  }

  loginForm.hidden = false;
  registerForm.hidden = true;
  accountPanel.hidden = true;
  accountPanel.innerHTML = "";
  authBadge.textContent = "Visitante";
  authBadge.style.color = "var(--muted)";

  const originWarning = loginOriginWarning();

  if (pendingAuthError) {
    setMessage(pendingAuthError, "error");
  } else {
    setMessage(originWarning || "Entre com e-mail ou Google para salvar perfil e leituras.", originWarning ? "error" : "");
  }
}

function renderSignedIn(profile) {
  if (!loginForm || !registerForm || !accountPanel || !authBadge) {
    return;
  }

  const progress = xpProgress(profile);
  const nick = profile.nick || "Sem nick";

  loginForm.hidden = true;
  registerForm.hidden = true;
  accountPanel.hidden = false;
  authBadge.textContent = "Online";
  authBadge.style.color = "var(--success)";
  accountPanel.innerHTML = `
    <div class="profile-summary">
      <img class="profile-avatar" src="${assetPath(profile.avatarPath || defaultAvatarPath)}" alt="Avatar de ${escapeHtml(nick)}" />
      <div class="profile-summary-body">
        <strong>${escapeHtml(nick)}</strong>
        <span>Level ${progress.level}</span>
        <div class="xp-meter" aria-label="Barra de XP">
          <span style="width: ${progress.percent}%"></span>
        </div>
        <small>${progress.current} / ${progress.next} XP</small>
      </div>
    </div>
    <div class="profile-actions">
      <button class="button ghost" type="button" id="openMyProfile">Meu Perfil</button>
      <button class="button ghost" type="button" id="logoutButton">Sair</button>
    </div>
  `;
  setMessage("Perfil conectado na Loner HQ.", "success");
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
    <h3>${escapeHtml(article.title)}</h3>
    <p>${escapeHtml(article.summary)}</p>
    <div class="meta-list" aria-label="Metadados do verbete">
      <span>${escapeHtml(article.category)}</span>
      <span>${escapeHtml(article.year)}</span>
      ${article.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
    </div>
  `;
}

function renderSearchResults(query) {
  if (!searchResults) {
    return;
  }

  const normalized = normalizeSearchText(query);

  if (!normalized) {
    searchResults.hidden = true;
    searchResults.innerHTML = "";
    return;
  }

  const matches = articles.filter((article) => {
    const searchableText = [article.title, article.category, article.year, article.summary, ...article.tags].join(" ");
    const searchable = normalizeSearchText(searchableText);
    return searchable.includes(normalized);
  });

  if (!matches.length) {
    searchResults.hidden = false;
    searchResults.innerHTML =
      '<div class="search-result" role="status"><strong>Nenhum verbete encontrado</strong><span>Tente outro termo.</span></div>';
    return;
  }

  searchResults.hidden = false;
  searchResults.innerHTML = matches
    .map(
      (article) => `
        <button class="search-result" type="button" data-open-article="${article.id}">
          <strong>${escapeHtml(article.title)}</strong>
          <span>${escapeHtml(article.category)} - ${article.tags.map(escapeHtml).join(", ")}</span>
        </button>
      `
    )
    .join("");
}

function isVolumePage() {
  return decodeURIComponent(window.location.pathname).includes("star-wars-1-1977.html");
}

function createVolumeActions() {
  if (!isVolumePage()) {
    return;
  }

  const article = document.querySelector(".article");
  const header = document.querySelector(".article-header");

  if (!article || !header || document.querySelector("#volumeActions")) {
    return;
  }

  volumeActions = document.createElement("div");
  volumeActions.className = "interaction-toolbar";
  volumeActions.id = "volumeActions";
  volumeActions.setAttribute("aria-label", "Ações do volume");
  volumeActions.innerHTML = `
    <button class="button" type="button" data-comic-action="owned">Eu Tenho</button>
    <button class="button" type="button" data-comic-action="read">Eu Li</button>
    <button class="button" type="button" data-comic-action="favorite">Favoritar</button>
    <button class="button ghost" type="button" id="readersButton">Já Leram (0)</button>
  `;
  article.insertBefore(volumeActions, header);
  readersButton = volumeActions.querySelector("#readersButton");
  updateVolumeActionsUi();
}

function updateVolumeActionsUi() {
  if (!volumeActions) {
    return;
  }

  const loggedIn = Boolean(currentUser && currentProfile?.nick && firebaseServices && !currentProfile.firestoreBlocked);
  volumeActions.querySelectorAll("[data-comic-action]").forEach((button) => {
    const action = button.dataset.comicAction;
    const active = Boolean(currentInteraction[action === "owned" ? "owned" : action]);
    button.disabled = !loggedIn;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

async function awardReadXp() {
  if (!currentUser || !currentProfile) {
    return;
  }

  const nextXp = Number(currentProfile.xp || 0) + readXpReward;
  const nextLevel = levelFromXp(nextXp);

  await firebaseServices.setDoc(
    userRef(currentUser.uid),
    {
      xp: nextXp,
      level: nextLevel,
      updatedAt: firebaseServices.serverTimestamp()
    },
    { merge: true }
  );

  currentProfile = { ...currentProfile, xp: nextXp, level: nextLevel };
  renderSignedIn(currentProfile);
  renderProfilePage();
}

async function toggleComicAction(action) {
  if (!firebaseServices || !currentUser || !currentProfile?.nick || currentProfile.firestoreBlocked) {
    setMessage("Entre na conta para salvar este volume.", "error");
    return;
  }

  const comic = comics["star-wars-1-1977"];
  const firestoreField = action === "owned" ? "owned" : action;
  const nextValue = !currentInteraction[firestoreField];
  const now = firebaseServices.serverTimestamp();
  const shouldAwardXp = action === "read" && nextValue && !currentInteraction.readXpGranted;
  const profileXp = Number(currentProfile.xp || 0) + (shouldAwardXp ? readXpReward : 0);
  const basePayload = {
    uid: currentUser.uid,
    nick: currentProfile.nick,
    avatarPath: currentProfile.avatarPath || defaultAvatarPath,
    xp: profileXp,
    level: levelFromXp(profileXp),
    comicId: comic.id,
    title: comic.title,
    shortTitle: comic.shortTitle,
    universe: comic.universe,
    saga: comic.saga,
    href: comic.href,
    cover: comic.cover,
    updatedAt: now,
    [firestoreField]: nextValue
  };

  if (action === "read" && nextValue) {
    basePayload.readAt = now;

    if (shouldAwardXp) {
      basePayload.readXpGranted = true;
    }
  }

  if (action === "favorite" && nextValue) {
    basePayload.favoriteAt = now;
  }

  if (action === "owned" && nextValue) {
    basePayload.ownedAt = now;
  }

  await Promise.all([
    firebaseServices.setDoc(comicInteractionRef(comic.id, currentUser.uid), basePayload, { merge: true }),
    firebaseServices.setDoc(userComicRef(currentUser.uid, comic.id), basePayload, { merge: true })
  ]);

  if (shouldAwardXp) {
    await awardReadXp();
  }

  currentInteraction = { ...currentInteraction, ...basePayload };
  updateVolumeActionsUi();
}

function stopInteractionWatchers() {
  if (interactionUnsubscribe) {
    interactionUnsubscribe();
    interactionUnsubscribe = null;
  }

  if (readersUnsubscribe) {
    readersUnsubscribe();
    readersUnsubscribe = null;
  }
}

function watchVolumeData() {
  if (!firebaseServices || !isVolumePage()) {
    return;
  }

  if (readersUnsubscribe) {
    readersUnsubscribe();
  }

  readersUnsubscribe = firebaseServices.onSnapshot(
    firebaseServices.collection(firebaseServices.db, "comics", "star-wars-1-1977", "interactions"),
    (snapshot) => {
      const total = snapshot.docs.filter((item) => item.data().read).length;
      if (readersButton) {
        readersButton.textContent = `Já Leram (${total})`;
      }
    }
  );

  if (interactionUnsubscribe) {
    interactionUnsubscribe();
    interactionUnsubscribe = null;
  }

  if (!currentUser) {
    currentInteraction = {};
    updateVolumeActionsUi();
    return;
  }

  interactionUnsubscribe = firebaseServices.onSnapshot(
    comicInteractionRef("star-wars-1-1977", currentUser.uid),
    (snapshot) => {
      currentInteraction = snapshot.exists() ? snapshot.data() : {};
      updateVolumeActionsUi();
    }
  );
}

async function openReadersModal() {
  if (!firebaseServices) {
    setMessage("Configure o Firebase para carregar os leitores.", "error");
    return;
  }

  const existing = document.querySelector("#readersModal");
  existing?.remove();

  const overlay = document.createElement("div");
  overlay.className = "modal-backdrop";
  overlay.id = "readersModal";
  overlay.innerHTML = `
    <section class="modal-dialog readers-dialog" role="dialog" aria-modal="true" aria-labelledby="readersTitle">
      <div class="modal-header">
        <h2 id="readersTitle">Já Leram Star Wars #1</h2>
        <button class="button ghost" type="button" data-modal-close>Fechar</button>
      </div>
      <div class="reader-list" id="readerList" role="list">
        <p>Carregando leitores...</p>
      </div>
    </section>
  `;
  document.body.append(overlay);

  const list = overlay.querySelector("#readerList");
  const snapshot = await firebaseServices.getDocs(
    firebaseServices.collection(firebaseServices.db, "comics", "star-wars-1-1977", "interactions")
  );
  const readers = snapshot.docs
    .map((item) => item.data())
    .filter((item) => item.read)
    .sort((a, b) => timestampToMillis(b.readAt) - timestampToMillis(a.readAt))
    .slice(0, 25);

  if (!readers.length) {
    list.innerHTML = "<p>Nenhum usuário marcou leitura ainda.</p>";
    return;
  }

  list.innerHTML = readers
    .map((reader) => {
      const profile = xpProgress(reader);
      return `
        <button class="reader-row" type="button" data-profile-uid="${escapeHtml(reader.uid)}">
          <img src="${assetPath(reader.avatarPath || defaultAvatarPath)}" alt="Avatar de ${escapeHtml(reader.nick || "Usuário")}" />
          <span>
            <strong>${escapeHtml(reader.nick || "Usuário")}</strong>
            <small>Level ${profile.level}</small>
          </span>
        </button>
      `;
    })
    .join("");
}

async function getPublicProfile(uid) {
  const snapshot = await firebaseServices.getDoc(userRef(uid));
  return snapshot.exists() ? snapshot.data() : null;
}

function renderProfilePageUnavailable(
  title = "Perfil indisponível",
  text = "Para usar perfis, cole a configuração do Web App em firebase-config.js e publique as regras do Firestore."
) {
  if (!profilePage) {
    return;
  }

  profilePage.innerHTML = `
    <section class="content-band">
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(text)}</p>
    </section>
  `;
}

function profileComicList(items, emptyText) {
  if (!items.length) {
    return `<p class="empty-state">${emptyText}</p>`;
  }

  return `
    <ul class="profile-comic-list">
      ${items
        .map(
          (item) => `
            <li>
              <a href="${assetPath(item.href)}">${escapeHtml(item.title || item.shortTitle || "HQ")}</a>
              <span>${escapeHtml(item.universe || "")}</span>
            </li>
          `
        )
        .join("")}
    </ul>
  `;
}

async function renderProfilePage() {
  if (!profilePage || !firebaseServices) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const uid = params.get("uid") || currentUser?.uid;

  if (!uid) {
    profilePage.innerHTML = `
      <section class="content-band">
        <h2>Meu Perfil</h2>
        <p>Entre na sua conta para abrir seu perfil da Loner HQ.</p>
      </section>
    `;
    return;
  }

  const profile = await getPublicProfile(uid);

  if (!profile || !profile.nick) {
    profilePage.innerHTML = `
      <section class="content-band">
        <h2>Perfil</h2>
        <p>Esse usuário ainda não escolheu um Nick público.</p>
      </section>
    `;
    return;
  }

  const interactionsSnapshot = await firebaseServices.getDocs(
    firebaseServices.collection(firebaseServices.db, "users", uid, "comics")
  );
  const interactions = interactionsSnapshot.docs.map((item) => item.data());
  const reads = interactions
    .filter((item) => item.read)
    .sort((a, b) => timestampToMillis(b.readAt) - timestampToMillis(a.readAt))
    .slice(0, 8);
  const favorites = interactions
    .filter((item) => item.favorite)
    .sort((a, b) => timestampToMillis(b.favoriteAt) - timestampToMillis(a.favoriteAt))
    .slice(0, 8);
  const progress = xpProgress(profile);

  profilePage.innerHTML = `
    <section class="profile-page-card">
      <div class="profile-hero">
        <img class="profile-avatar large" src="${assetPath(profile.avatarPath || defaultAvatarPath)}" alt="Avatar de ${escapeHtml(profile.nick)}" />
        <div>
          <h2>${escapeHtml(profile.nick)}</h2>
          <p>Level ${progress.level}</p>
          <div class="xp-meter wide" aria-label="Barra de XP">
            <span style="width: ${progress.percent}%"></span>
          </div>
          <small>${progress.current} / ${progress.next} XP para o próximo level</small>
        </div>
      </div>

      <div class="profile-sections">
        <section>
          <h3>Últimas HQs lidas</h3>
          ${profileComicList(reads, "Ainda não marcou nenhuma leitura.")}
        </section>
        <section>
          <h3>HQ favoritos</h3>
          ${profileComicList(favorites, "Ainda não favoritou nenhuma HQ.")}
        </section>
      </div>
    </section>
  `;
}

function openProfile(uid) {
  window.open(pagePath("perfil.html", { uid }), "_blank", "noopener");
}

function setupEvents() {
  showRegister?.addEventListener("click", () => {
    loginForm.hidden = true;
    registerForm.hidden = false;
    setMessage("Cadastro com e-mail e senha pelo Firebase.");
  });

  showLogin?.addEventListener("click", () => {
    registerForm.hidden = true;
    loginForm.hidden = false;
    setMessage("Entre com e-mail e senha ou Google.");
  });

  loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!firebaseServices) {
      setFirebaseUnavailable();
      return;
    }

    const formData = new FormData(loginForm);
    const email = String(formData.get("usuario")).trim();
    const password = String(formData.get("senha"));

    try {
      await firebaseServices.signInWithEmailAndPassword(firebaseServices.auth, email, password);
      loginForm.reset();
      setMessage("Login realizado.", "success");
    } catch (error) {
      setMessage(authErrorMessage(error), "error");
    }
  });

  registerForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!firebaseServices) {
      setFirebaseUnavailable();
      return;
    }

    const formData = new FormData(registerForm);
    const email = String(formData.get("novoUsuario")).trim();
    const password = String(formData.get("novaSenha"));
    const confirmation = String(formData.get("confirmarSenha"));

    if (password !== confirmation) {
      setMessage("As senhas não conferem.", "error");
      return;
    }

    try {
      await firebaseServices.createUserWithEmailAndPassword(firebaseServices.auth, email, password);
      registerForm.reset();
      setMessage("Conta criada. Agora escolha seu Nick.", "success");
    } catch (error) {
      setMessage(authErrorMessage(error), "error");
    }
  });

  searchInput?.addEventListener("input", (event) => {
    renderSearchResults(event.target.value);
  });

  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    renderSearchResults(searchInput.value);
  });

  document.addEventListener("click", async (event) => {
    const articleButton = event.target.closest("[data-open-article]");
    const sectionLink = event.target.closest("[data-section]");
    const logoutButton = event.target.closest("#logoutButton");
    const googleButton = event.target.closest("#googleLoginButton");
    const profileButton = event.target.closest("#openMyProfile");
    const comicAction = event.target.closest("[data-comic-action]");
    const modalClose = event.target.closest("[data-modal-close]");
    const readerButton = event.target.closest("#readersButton");
    const profileUserButton = event.target.closest("[data-profile-uid]");

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

    if (logoutButton && firebaseServices) {
      await firebaseServices.signOut(firebaseServices.auth);
      setMessage("Você saiu da conta.");
    }

    if (googleButton && firebaseServices) {
      try {
        const originWarning = loginOriginWarning();

        if (originWarning) {
          setMessage(originWarning, "error");
          return;
        }

        pendingAuthError = "";
        const provider = new firebaseServices.GoogleAuthProvider();
        provider.addScope("email");
        provider.addScope("profile");
        setMessage("Abrindo login do Google...", "success");
        await firebaseServices.signInWithPopup(firebaseServices.auth, provider);
      } catch (error) {
        const code = error?.code || "";

        if (code.includes("auth/popup-blocked") || code.includes("auth/operation-not-supported-in-this-environment")) {
          try {
            const provider = new firebaseServices.GoogleAuthProvider();
            provider.addScope("email");
            provider.addScope("profile");
            setMessage("Redirecionando para o Google...", "success");
            await firebaseServices.signInWithRedirect(firebaseServices.auth, provider);
          } catch (redirectError) {
            pendingAuthError = authErrorMessage(redirectError);
            setMessage(pendingAuthError, "error");
          }
          return;
        }

        pendingAuthError = authErrorMessage(error);
        setMessage(pendingAuthError, "error");
      }
    }

    if (profileButton && currentUser) {
      openProfile(currentUser.uid);
    }

    if (comicAction) {
      await toggleComicAction(comicAction.dataset.comicAction);
    }

    if (readerButton) {
      await openReadersModal();
    }

    if (profileUserButton) {
      openProfile(profileUserButton.dataset.profileUid);
    }

    if (modalClose) {
      modalClose.closest(".modal-backdrop")?.remove();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (searchResults) {
        searchResults.hidden = true;
      }
      document.querySelectorAll(".modal-backdrop").forEach((modal) => modal.remove());
    }
  });
}

function authErrorMessage(error) {
  const code = error?.code || "";

  if (code.includes("auth/invalid-credential") || code.includes("auth/wrong-password")) {
    return "E-mail ou senha incorretos.";
  }

  if (code.includes("auth/user-not-found")) {
    return "Usuário não encontrado.";
  }

  if (code.includes("auth/email-already-in-use")) {
    return "Esse e-mail já está cadastrado.";
  }

  if (code.includes("auth/popup-closed-by-user") || code.includes("auth/redirect-cancelled-by-user")) {
    return "O login do Google foi fechado antes de terminar.";
  }

  if (code.includes("auth/cancelled-popup-request")) {
    return "Já existe uma janela de login do Google aberta.";
  }

  if (code.includes("auth/popup-blocked")) {
    return "O navegador bloqueou a janela do Google. Libere popup para localhost ou tente de novo.";
  }

  if (code.includes("auth/unauthorized-domain")) {
    return "Domínio não autorizado. Abra por localhost ou adicione este domínio no Firebase Auth.";
  }

  if (code.includes("auth/operation-not-allowed")) {
    return "Ative e salve o provedor Google em Authentication > Sign-in method, com nome público do projeto e e-mail de suporte.";
  }

  if (code.includes("auth/configuration-not-found")) {
    return "O Firebase Auth ainda não está configurado nesse projeto.";
  }

  if (code.includes("auth/api-key-not-valid")) {
    return "A apiKey do Firebase está incorreta.";
  }

  if (code.includes("auth/account-exists-with-different-credential")) {
    return "Esse e-mail já existe com outro método de login.";
  }

  return "Não foi possível concluir o login agora.";
}

function dataErrorMessage(error) {
  const code = error?.code || "";

  if (code.includes("permission-denied")) {
    return "Login feito, mas o Firestore bloqueou o perfil. Publique as regras do arquivo firestore.rules no Firebase.";
  }

  if (code.includes("unavailable")) {
    return "Login feito, mas o Firestore não respondeu agora. Tente de novo em instantes.";
  }

  return "Login feito, mas não foi possível carregar seu perfil.";
}

async function startAuth() {
  try {
    await loadFirebase();
  } catch (error) {
    console.error(error);
    setMessage("Não foi possível carregar o Firebase.", "error");
    return;
  }

  if (!firebaseServices) {
    return;
  }

  try {
    await firebaseServices.getRedirectResult(firebaseServices.auth);
  } catch (error) {
    pendingAuthError = authErrorMessage(error);
    setMessage(pendingAuthError, "error");
  }

  firebaseServices.onAuthStateChanged(firebaseServices.auth, async (user) => {
    currentUser = user;

    if (!user) {
      currentProfile = null;
      currentInteraction = {};
      stopInteractionWatchers();
      renderSignedOut();
      watchVolumeData();
      renderProfilePage();
      updateVolumeActionsUi();
      return;
    }

    try {
      pendingAuthError = "";
      const baseProfile = await ensureProfile(user);
      currentProfile = await ensureNick(user, baseProfile);
      renderSignedIn(currentProfile);
      watchVolumeData();
      renderProfilePage();
      updateVolumeActionsUi();
    } catch (error) {
      console.error(error);
      currentProfile = temporaryProfileFromAuth(user);
      renderSignedIn(currentProfile);
      watchVolumeData();
      renderProfilePageUnavailable("Perfil bloqueado", dataErrorMessage(error));
      updateVolumeActionsUi();
      setMessage(dataErrorMessage(error), "error");
    }
  });
}

normalizeAuthForms();
setupEvents();
createVolumeActions();
startAuth();
