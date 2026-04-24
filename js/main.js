(function () {
  const page = document.body.dataset.page || "home";

  const navItems = [
    { href: "index.html", label: "Home" },
    { href: "speakers.html", label: "Speakers" },
    { href: "bloggers.html", label: "Bloggers" },
    { href: "communities.html", label: "Communities" },
  ];

  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  header.innerHTML = `
    <header class="site-header">
      <div class="container nav">
        <a class="brand" href="index.html" aria-label="Kerala Tech Connect home">
          <span class="brand__mark"><i class="fa-solid fa-code"></i></span>
          <span>Kerala Tech Connect</span>
        </a>
        <nav class="nav__links" aria-label="Primary">
          ${navItems
            .map(
              (item) =>
                `<a class="nav__link ${isActive(item.href, page) ? "is-active" : ""}" href="${item.href}">${item.label}</a>`
            )
            .join("")}
        </nav>
      </div>
    </header>
  `;

  footer.innerHTML = `
    <footer class="footer">
      <div class="container footer__inner">
        <div>
          <strong>Kerala Tech Connect</strong>
          <p style="margin:8px 0 0; color: var(--muted);">
            Connecting colleges, organizers, creators, and communities across Kerala.
          </p>
        </div>
        <div class="footer__socials">
          <a class="social-link" href="https://linkedin.com" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
          <a class="social-link" href="https://x.com" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
          <a class="social-link" href="https://instagram.com" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  `;

  if (page === "home") {
    renderMiniHighlights();
    renderCards("featured-speakers-grid", window.ktcData.speakers.slice(0, 3), "speaker");
    renderCards("featured-communities-grid", window.ktcData.communities.slice(0, 3), "community");
  }

  if (page === "speakers") {
    renderFilterRow("speaker-filters", ["All", ".NET", "AI", "React", "Cloud", "Security"]);
    renderSpeakerCards();
    bindSearch("speaker-search", "speakers-grid", "speaker");
  }

  if (page === "bloggers") {
    renderFilterRow("blogger-filters", ["All", "YouTube", "Blog", "Medium", "React", "AI"]);
    renderBloggerCards();
    bindSearch("blogger-search", "bloggers-grid", "blogger");
  }

  if (page === "communities") {
    renderFilterRow("community-filters", ["All", "Kochi", "Trivandrum", "Calicut", "Thrissur", "Startups"]);
    renderCommunityCards();
    bindSearch("community-search", "communities-grid", "community");
  }

  wireFilters();
  wireReveal();

  function isActive(href, currentPage) {
    if (currentPage === "home" && href === "index.html") return true;
    return href.includes(currentPage);
  }

  function renderMiniHighlights() {
    const target = document.getElementById("hero-featured-list");
    target.innerHTML = window.ktcData.speakers
      .slice(0, 3)
      .map(
        (speaker) => `
          <div class="mini-item">
            <img class="mini-item__avatar" src="${avatarUrl(speaker.name)}" alt="${speaker.name}" />
            <div>
              <p class="mini-item__title">${speaker.name}</p>
              <p class="mini-item__meta">${speaker.location} | ${speaker.topics.join(" | ")}</p>
            </div>
          </div>
        `
      )
      .join("");
  }

  function renderSpeakerCards() {
    renderCards("speakers-grid", window.ktcData.speakers, "speaker");
  }

  function renderBloggerCards() {
    renderCards("bloggers-grid", window.ktcData.bloggers, "blogger");
  }

  function renderCommunityCards() {
    renderCards("communities-grid", window.ktcData.communities, "community");
  }

  function renderCards(targetId, items, type) {
    const target = document.getElementById(targetId);
    target.innerHTML = items.map((item) => cardMarkup(item, type)).join("");
  }

  function cardMarkup(item, type) {
    if (type === "speaker") {
      return `
        <article class="listing-card" data-search="${[item.name, item.location, ...item.topics, item.bio].join(" ").toLowerCase()}">
          <div class="listing-card__top">
            <img class="avatar" src="${avatarUrl(item.name)}" alt="${item.name}" />
            <div>
              <p class="card__title">${item.name}</p>
              <p class="card__meta"><i class="fa-solid fa-location-dot"></i> ${item.location}</p>
            </div>
          </div>
          <div class="card__chips">
            ${item.topics.map((topic) => `<span class="chip">${topic}</span>`).join("")}
          </div>
          <p class="card__description">${item.bio}</p>
          <div class="card__footer">
            <span class="card__subtitle">Speaker profile</span>
            <div class="icon-links">
              <a class="icon-btn" href="${item.social.linkedin}" aria-label="${item.name} LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
              <a class="icon-btn" href="${item.social.twitter}" aria-label="${item.name} Twitter"><i class="fa-brands fa-x-twitter"></i></a>
            </div>
          </div>
        </article>
      `;
    }

    if (type === "blogger") {
      return `
        <article class="listing-card" data-search="${[item.name, item.platform, ...item.topics, item.description].join(" ").toLowerCase()}">
          <div class="listing-card__top">
            <img class="avatar" src="${avatarUrl(item.name)}" alt="${item.name}" />
            <div>
              <p class="card__title">${item.name}</p>
              <p class="card__meta"><i class="fa-solid fa-circle-play"></i> ${item.platform}</p>
            </div>
          </div>
          <div class="card__chips">
            ${item.topics.map((topic) => `<span class="chip">${topic}</span>`).join("")}
          </div>
          <p class="card__description">${item.description}</p>
          <div class="card__footer">
            <span class="card__subtitle">Content link</span>
            <a class="text-link" href="${item.link}">Open content <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
          </div>
        </article>
      `;
    }

    return `
      <article class="listing-card" data-search="${[item.name, item.city, item.focus, item.description].join(" ").toLowerCase()}">
        <div class="card__title-row">
          <div>
            <p class="card__title">${item.name}</p>
            <p class="card__meta"><i class="fa-solid fa-location-dot"></i> ${item.city}</p>
          </div>
          <span class="chip">${item.focus}</span>
        </div>
        <p class="card__description">${item.description}</p>
        <div class="card__footer">
          <span class="card__subtitle">Join the community</span>
          <a class="text-link" href="${item.join}">Join link <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
      </article>
    `;
  }

  function renderFilterRow(targetId, items) {
    const target = document.getElementById(targetId);
    target.innerHTML = items
      .map((item, index) => `<button class="filter-btn ${index === 0 ? "is-active" : ""}" type="button" data-filter="${item}">${item}</button>`)
      .join("");
  }

  function wireFilters() {
    document.querySelectorAll(".filter-row").forEach((row) => {
      row.addEventListener("click", (event) => {
        const button = event.target.closest(".filter-btn");
        if (!button) return;
        row.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("is-active"));
        button.classList.add("is-active");
      });
    });
  }

  function bindSearch(inputId, gridId, type) {
    const input = document.getElementById(inputId);
    const filterRow = document.getElementById(inputId.replace("-search", "-filters"));
    const cards = () => [...document.getElementById(gridId).querySelectorAll(".listing-card")];

    const refresh = () => {
      const activeFilter = filterRow.querySelector(".filter-btn.is-active");
      const filter = activeFilter?.dataset.filter || "All";
      applyFilter(type, filter, gridId, input.value.trim().toLowerCase());
    };

    input.addEventListener("input", refresh);

    filterRow.addEventListener("click", (event) => {
      const button = event.target.closest(".filter-btn");
      if (!button) return;
      setTimeout(refresh, 0);
    });

    refresh();
  }

  function applyFilter(type, filter, gridId, query) {
    const cards = [...document.getElementById(gridId).querySelectorAll(".listing-card")];
    cards.forEach((card) => {
      const searchText = card.dataset.search;
      const matchesQuery = !query || searchText.includes(query);
      const matchesFilter =
        filter === "All" ||
        searchText.includes(filter.toLowerCase()) ||
        (type === "community" && filter === "Startups" && searchText.includes("startup")) ||
        (type === "blogger" && ["YouTube", "Blog", "Medium"].includes(filter) && searchText.includes(filter.toLowerCase()));
      card.style.display = matchesQuery && matchesFilter ? "" : "none";
    });
  }

  function avatarUrl(name) {
    const initials = name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    const bg = "#0f3d7a";
    const bg2 = "#66a6ff";
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
        <defs>
          <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${bg}" />
            <stop offset="100%" stop-color="${bg2}" />
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="28" fill="url(#g)" />
        <circle cx="84" cy="32" r="20" fill="#ffffff" fill-opacity="0.14" />
        <text x="50%" y="56%" text-anchor="middle" dominant-baseline="middle" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="700" fill="#ffffff">${initials}</text>
      </svg>
    `.trim();
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function wireReveal() {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${Math.min(Number(entry.target.dataset.delay || 0), 0.4)}s`;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((item, index) => {
      item.dataset.delay = String(index * 0.06);
      observer.observe(item);
    });
  }
})();
