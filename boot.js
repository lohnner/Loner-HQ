(() => {
  const version = Date.now().toString();
  const stylesheet = document.querySelector("link[data-loner-cache-bust]");

  if (stylesheet) {
    const href = stylesheet.getAttribute("href");
    stylesheet.setAttribute("href", href + (href.includes("?") ? "&" : "?") + "v=" + version);
  }

  const app = document.createElement("script");
  app.type = "module";
  app.src = document.currentScript.dataset.lonerApp + "?v=" + version;
  document.head.append(app);
})();
