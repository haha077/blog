document.addEventListener("DOMContentLoaded", async () => {
  const baseurl = window.__baseurl || "/";
  let pages = [];

  try {
    const res = await fetch(baseurl + "index.json");
    pages = await res.json();
  } catch (err) {
    console.error("加载 index.json 失败：", err);
    return;
  }

  const input = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("searchResults");

  if (!input || !resultsContainer) {
    console.warn("搜索框或结果容器未找到");
    return;
  }

  const fuse = new Fuse(pages, {
    keys: ["title", "description", "content"],
    threshold: 0.3,
  });

  function performSearch(query) {
    resultsContainer.innerHTML = "";

    if (!query) return;

    const results = fuse.search(query);

    if (results.length === 0) {
      resultsContainer.innerHTML = "<p>未找到匹配内容。</p>";
      return;
    }

    results.forEach(({ item }) => {
      const el = document.createElement("div");
      el.innerHTML = `
        <div style="margin-bottom: 1em;">
          <a href="${item.url}" style="font-weight: bold; font-size: 1.1em;">${item.title}</a>
          <p style="margin: 0.3em 0;">${item.description}</p>
        </div>`;
      resultsContainer.appendChild(el);
    });
  }

  input.addEventListener("input", () => {
    performSearch(input.value.trim());
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      performSearch(input.value.trim());
    }
  });
});
