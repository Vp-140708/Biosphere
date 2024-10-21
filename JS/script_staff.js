document.getElementById('SearchInput').addEventListener('input', function() {
  const searchValue = this.value.toLowerCase();
  const specialists = document.querySelectorAll('.specialist-block');
  
  specialists.forEach(function(specialist) {
    const orderList = document.querySelector('select').value;
    let search;
    switch (orderList) {
      case 'Job_title':
        search = specialist.querySelector('.specialist-position').textContent.toLowerCase();
        break;
      case 'Specialization':
        search = specialist.querySelector('.specialist-specialization').textContent.toLowerCase();
        break;
      case 'Place_of_work':
        search = specialist.querySelector('.specialist-place-of-work').textContent.toLowerCase();
        break;
      default:
        search = specialist.querySelector('.specialist-name').textContent.toLowerCase();
    }
    if (searchValue === '') {
      specialist.style.display = 'block';
    } else if (search.includes(searchValue)) {
      specialist.style.display = 'block';
    } else {
      specialist.style.display = 'none';
    }
  });
});

document.querySelector('select').addEventListener('change', function() {
  document.getElementById('SearchInput').value = '';
  const specialists = document.querySelectorAll('.specialist-block');
  specialists.forEach(function(specialist) {
    specialist.style.display = 'block';
  });
});

// Функция для сброса всех фильтров
function resetFilters() {
  // Сбрасываем все чекбоксы
  const checkboxes = document.querySelectorAll('.workplace-filter, .specialization-filter, .position-filter');
  checkboxes.forEach(checkbox => {
      checkbox.checked = false;
  });

  // Показываем все карточки специалистов
  const specialists = document.querySelectorAll('.specialist-block');
  specialists.forEach(specialist => {
      specialist.style.display = '';
  });
}

// Функция для показа/скрытия выпадающего меню
function toggleDropdown() {
  var dropdown = document.getElementById("combinedFilter");
  dropdown.style.display = (dropdown.style.display === "none" || dropdown.style.display === "") ? "block" : "none";
}

// Функция для применения фильтров
function applyCombinedFilter() {
  // Получаем выбранные значения из чекбоксов
  const selectedWorkplaces = Array.from(document.querySelectorAll('.workplace-filter:checked')).map(cb => cb.value);
  const selectedSpecializations = Array.from(document.querySelectorAll('.specialization-filter:checked')).map(cb => cb.value);
  const selectedPositions = Array.from(document.querySelectorAll('.position-filter:checked')).map(cb => cb.value);

  const specialists = document.querySelectorAll('.specialist-block');

  specialists.forEach(specialist => {
      const spec = specialist.querySelector('.specialist-specialization').textContent;
      const job = specialist.querySelector('.specialist-position').textContent;
      const place = specialist.querySelector('.specialist-place-of-work').textContent;

      // Проверяем, что специалист соответствует выбранным фильтрам
      const matchesWorkplace = selectedWorkplaces.length === 0 || selectedWorkplaces.some(workplace => place.includes(workplace));
      const matchesSpecialization = selectedSpecializations.length === 0 || selectedSpecializations.some(specialization => spec.includes(specialization));
      const matchesPosition = selectedPositions.length === 0 || selectedPositions.some(position => job.includes(position));

      if (matchesWorkplace && matchesSpecialization && matchesPosition) {
          specialist.style.display = '';
      } else {
          specialist.style.display = 'none';
      }
  });

}
