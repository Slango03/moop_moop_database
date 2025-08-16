fetch('data/games.json')
  .then(res => res.json())
  .then(games => {
    const tagContainer = document.getElementById('tagFilters');
    const resultsList = document.getElementById('results');

    // Get all unique tags
    const allTags = Array.from(
      new Set(games.flatMap(g => g.tags))
    ).sort();

    // Render checkboxes
    allTags.forEach(tag => {
      const label = document.createElement('label');
      label.innerHTML = `
        <input type="checkbox" value="${tag}" />
        ${tag}
      `;
      tagContainer.appendChild(label);
    });

    // Return checked tags
    function getSelectedTags() {
      return Array.from(
        tagContainer.querySelectorAll('input:checked')
      ).map(cb => cb.value);
    }

    // Filter and display games
    function render() {
      const selected = getSelectedTags();
      const filtered = selected.length === 0
        ? games
        : games.filter(game =>
            selected.every(tag => game.tags.includes(tag))
          );

      resultsList.innerHTML = filtered.map(game => `
        <li>
          <strong>${game.title}</strong> (${game.releaseYear})<br/>
          Genre: ${game.genre}<br/>
          Tags: ${game.tags.join(', ')}<br/>
          <p>${game.description}</p>
        </li>
      `).join('');
    }

    tagContainer.addEventListener('change', render);
    render();
  })
  .catch(console.error);
