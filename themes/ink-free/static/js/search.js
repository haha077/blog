async function initSearch() {
  const response = await fetch(`${window.__baseurl}index.json`);
  const data = await response.json();
  const options = {
    keys: ['title', 'summary'],
    threshold: 0.3,
  };
  const fuse = new Fuse(data, options);

  const input = document.getElementById('searchInput');
  const resultsBox = document.getElementById('searchResults');

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const results = fuse.search(input.value);
      resultsBox.innerHTML = results.map(r => {
        const item = r.item;
        return `<div><a href="${item.permalink}">${item.title}</a><p>${item.summary}</p></div>`;
      }).join('') || '<p>没有找到匹配结果。</p>';
    }
  });
}

document.addEventListener('DOMContentLoaded', initSearch);
