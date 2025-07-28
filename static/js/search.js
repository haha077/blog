document.addEventListener("DOMContentLoaded", async () => {
  console.log("🔍 search.js loaded");

  const baseurl = window.__baseurl || "/";
  const input = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("searchResults");

  if (!input || !resultsContainer) {
    console.warn("❌ DOM 元素未找到");
    return;
  }

  let pages = [];
  try {
    const res = await fetch(baseurl + "index.json");
    pages = await res.json();
    console.log("✅ 索引加载成功:", pages.length);
  } catch (err) {
    console.error("❌ 索引加载失败:", err);
    return;
  }

  const fuse = new Fuse(pages, {
    keys: ["title", "description", "content"],
    threshold: 0.3,
  });

  function performSearch(query) {
    console.log("🔍 搜索关键词:", query);
    resultsContainer.innerHTML = "";
    if (!query) return;

    const results = fuse.search(query);
    if (results.length === 0) {
      resultsContainer.innerHTML = "<p>未找到匹配内容。</p>";
      return;
    }

    results.forEach(({ item }) => {
      const el = document.createElement("div");
      el.innerHTML = `<div>
        <a href="${item.url}">${item.title}</a><br>
        <p>${item.description}</p>
      </div>`;
      resultsContainer.appendChild(el);
    });
  }

  input.addEventListener("keydown", (e) => {
    console.log("键盘事件:", e.key);
    if (e.key === "Enter") {
      e.preventDefault();
      performSearch(input.value.trim());
    }
  });
});
