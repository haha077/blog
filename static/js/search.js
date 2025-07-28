async function loadSearchIndex() {
    const res = await fetch('/index.json');
    const pages = await res.json();

    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('searchResults');

    const fuse = new Fuse(pages, {
        keys: ['title', 'description', 'content'],
        threshold: 0.3
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        resultsContainer.innerHTML = '';

        if (!query) return;

        const results = fuse.search(query);
        results.forEach(({ item }) => {
            const el = document.createElement('div');
            el.innerHTML = `<a href="${item.url}"><h3>${item.title}</h3><p>${item.description}</p></a>`;
            resultsContainer.appendChild(el);
        });
    });
}
document.addEventListener('DOMContentLoaded', loadSearchIndex);
