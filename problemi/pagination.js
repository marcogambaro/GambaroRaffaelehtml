document.addEventListener("DOMContentLoaded", () => {
  const state = {
    items: [
      { id: "cifre", title: "Somma Delle Cifre", difficulty: 2 },
      { id: "legendre", title: "La leggenda di p-Olignac", difficulty: 3 },
      { id: "rsa", title: "RSA (Respiratory Sinus Arrhythmia)", difficulty: 3.5 },
      { id: "limite", title: "Limiti Notevoli", difficulty: 2 },
      { id: "xor", title: "L'Algebra dello XOR", difficulty: 4.2 },
      { id: "normale", title: "Un esercizio Normale", difficulty: 5.0 },
      { id: "subadd", title: "Subadditività", difficulty: 4 },
      { id: "conteggio", title: "Trova il conteggio", difficulty: 1.0 },
      { id: "piccionebuco", title: "Lo scavo del Piccionebuco", difficulty: 2.5 },
    ],
    itemsPerPage: 10,
    currentPage: 1,
    maxPageButtons: 7,
  };

  const listEl = document.getElementById("item-list");
  const paginationEl = document.getElementById("pagination");
  if (!listEl || !paginationEl) return;

  function clampDifficulty(d) {
    return Math.max(0, Math.min(5, Number(d) || 0));
  }

  function difficultyColor(d) {
    if (d <= 1.0) return "#29fa80";
    else if (d <= 2.0) return "#19c340";
    else if (d <= 3.0) return "#f7f313";
    else if (d <= 4.0) return "#f39c12";
    else if (d < 5.0) return "#e74c3c";
    else return "#a52f21";
  }

  function totalPages() {
    return Math.max(1, Math.ceil(state.items.length / state.itemsPerPage));
  }

  function clampPage(p) {
    return Math.min(totalPages(), Math.max(1, p));
  }

  function pageSlice(page) {
    const start = (page - 1) * state.itemsPerPage;
    return state.items.slice(start, start + state.itemsPerPage);
  }

  function getPageButtons(current, total, maxButtons) {
    if (total <= maxButtons) return Array.from({ length: total }, (_, i) => i + 1);
    const buttons = [];
    const windowSize = maxButtons - 2;
    const half = Math.floor(windowSize / 2);
    let left = current - half;
    let right = current + half;
    if (left < 2) { right += (2 - left); left = 2; }
    if (right > total - 1) { left -= (right - (total - 1)); right = total - 1; }
    left = Math.max(2, left);
    right = Math.min(total - 1, right);
    buttons.push(1);
    if (left > 2) buttons.push("…");
    for (let p = left; p <= right; p++) buttons.push(p);
    if (right < total - 1) buttons.push("…");
    buttons.push(total);
    return buttons;
  }

  function renderList() {
    const page = clampPage(state.currentPage);
    state.currentPage = page;
    listEl.innerHTML = "";

    for (const item of pageSlice(page)) {
      const { id, title } = item;
      const difficulty = clampDifficulty(item.difficulty);

      const li = document.createElement("li");
      li.className = "item-row";

      // CLICK REDIRECT
      li.style.cursor = "pointer";
      li.addEventListener("click", () => {
        window.location.href = `./${encodeURIComponent(id)}/index.html`;
      });

      const titleSpan = document.createElement("span");
      titleSpan.className = "item-title";
      titleSpan.textContent = title;

      const starSpan = document.createElement("span");
      starSpan.className = "stars";
      starSpan.style.setProperty("--fill", (difficulty / 5) * 100 + "%");
      starSpan.style.color = difficultyColor(difficulty);
      starSpan.title = `${difficulty.toFixed(1)} / 5`;

      li.appendChild(titleSpan);
      li.appendChild(starSpan);
      listEl.appendChild(li);
    }
  }

  function renderPagination() {
    const current = state.currentPage;
    const total = totalPages();
    paginationEl.innerHTML = "";

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "←";
    prevBtn.disabled = current === 1;
    prevBtn.onclick = () => goToPage(current - 1);
    paginationEl.appendChild(prevBtn);

    for (const b of getPageButtons(current, total, state.maxPageButtons)) {
      if (b === "…") {
        const ell = document.createElement("button");
        ell.textContent = "…";
        ell.disabled = true;
        ell.className = "ellipsis";
        paginationEl.appendChild(ell);
        continue;
      }
      const btn = document.createElement("button");
      btn.textContent = b;
      if (b === current) btn.classList.add("active");
      btn.onclick = () => goToPage(b);
      paginationEl.appendChild(btn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "→";
    nextBtn.disabled = current === total;
    nextBtn.onclick = () => goToPage(current + 1);
    paginationEl.appendChild(nextBtn);
  }

  function goToPage(p) {
    state.currentPage = clampPage(p);
    renderList();
    renderPagination();
  }

  function injectCSS() {
    const style = document.createElement("style");
    style.textContent = `
      #item-list { padding-left: 1.2rem; }
      .item-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 0.4rem 0.6rem;
        border-radius: 6px;
      }
      .item-row:hover { background: #f5f5f5; }
      .item-title { flex: 1; }

      .stars {
        position: relative;
        display: inline-block;
        font-size: 1.2rem;
        line-height: 1;
      }
      .stars::before {
        content: "★★★★★";
        color: #ddd;
      }
      .stars::after {
        content: "★★★★★";
        position: absolute;
        left: 0;
        top: 0;
        width: var(--fill, 0%);
        overflow: hidden;
        white-space: nowrap;
        color: currentColor;
      }

      #pagination {
        display: flex;
        gap: 0.35rem;
        justify-content: center;
        margin-top: 1rem;
        flex-wrap: wrap;
      }
      #pagination button {
        border: 1px solid #ccc;
        background: white;
        padding: 0.35rem 0.6rem;
        border-radius: 6px;
        cursor: pointer;
      }
      #pagination button[disabled] { opacity: 0.5; cursor: not-allowed; }
      #pagination .active { border-color: black; font-weight: 700; }
      #pagination .ellipsis { border: none; background: transparent; cursor: default; }
    `;
    document.head.appendChild(style);
  }

  injectCSS();
  goToPage(1);
});
