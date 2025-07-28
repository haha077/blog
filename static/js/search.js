document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("/index.json");
  const pages = await res.json();

  const input = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("searchResults");

  const fuse = new Fuse(pages, {
    keys: ["title", "description", "content"],
    threshold: 0.3,
  });

  function performSearch(query) {
    resultsContainer.innerHTML = "";

    if (!query) return;

    const results = fuse.search(query);

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

  // 实时搜索
  input.addEventListener("input", () => {
    const query = input.value.trim();
    performSearch(query);
  });

  // 按回车键时执行搜索
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = input.value.trim();
      performSearch(query);
      e.preventDefault(); // 防止回车刷新页面或提交表单
    }
  });
});
