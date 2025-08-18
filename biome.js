document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.destination-card');
  const familySelect = document.getElementById('family-select');
  const continentSelect = document.getElementById('continent-select');
  const typeSelect = document.getElementById('type-select');
  const clearBtn = document.querySelector('.clear-btn');

  function filter() {
    const famVal = familySelect.value;
    const contVal = continentSelect.value;
    const typeVal = typeSelect.value;

    cards.forEach(card => {
      const matchesFamily = !famVal || card.dataset.family === famVal;
      const matchesCont = !contVal || card.dataset.continent === contVal;
      const matchesType = !typeVal || card.dataset.type === typeVal;

      if (matchesFamily && matchesCont && matchesType) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  familySelect.addEventListener('change', filter);
  continentSelect.addEventListener('change', filter);
  typeSelect.addEventListener('change', filter);

  clearBtn.addEventListener('click', () => {
    familySelect.value = '';
    continentSelect.value = '';
    typeSelect.value = '';
    filter();
  });

  filter();
});
