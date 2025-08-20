document.addEventListener('DOMContentLoaded', () => {
  // Select all destination cards
  const cards = document.querySelectorAll('.destination-card');
  // Select the filter dropdowns
  const familySelect = document.getElementById('family-select');
  const continentSelect = document.getElementById('continent-select');
  const typeSelect = document.getElementById('type-select');
  // Select the clear button
  const clearBtn = document.querySelector('.clear-btn');

  // Function to filter cards based on selected values
  function filter() {
    const famVal = familySelect.value;      // Selected family value
    const contVal = continentSelect.value;  // Selected continent value
    const typeVal = typeSelect.value;       // Selected type value

    cards.forEach(card => {
      // Check if card matches selected filters
      const matchesFamily = !famVal || card.dataset.family === famVal;
      const matchesCont = !contVal || card.dataset.continent === contVal;
      const matchesType = !typeVal || card.dataset.type === typeVal;

      // Show card if all selected filters match, else hide
      if (matchesFamily && matchesCont && matchesType) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Attach filter function to dropdown change events
  familySelect.addEventListener('change', filter);
  continentSelect.addEventListener('change', filter);
  typeSelect.addEventListener('change', filter);

  // Clear all filters and reset cards
  clearBtn.addEventListener('click', () => {
    familySelect.value = '';
    continentSelect.value = '';
    typeSelect.value = '';
    filter();
  });

  // Initial filtering on page load
  filter();
});
