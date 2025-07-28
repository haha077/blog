document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("searchResults");

  if (!input) return;

  fetch(window.__baseurl + "index.json")
    .then((res) => res.json())
    .then((data) => {
      const fuse = new Fuse(data, {
        keys: ["title", "content"],
        threshold: 0.3,
      });

      input.addEventListener("input", function () {
        const keyword = input.value.trim();
        resultsContainer.innerHTML = "";
        if (!keyword) return;

        const results = fuse.search(keyword);
        results.slice(0, 10).forEach(({ item }) => {
          const el = document.createElement("div");
          el.innerHTML = `<a href="${item.permalink}">${item.title}</a>`;
          resultsContainer.appendChild(el);
        });
      });
    });
});
