// Обработчик для строки поиска и фильтров
document.getElementById('SearchInput').addEventListener('input', applyCombinedFilter);
document.querySelectorAll('.workplace-filter, .specialization-filter, .position-filter').forEach(checkbox => {
    checkbox.addEventListener('change', applyCombinedFilter); // Слушатель для чекбоксов
});

// Функция для применения фильтров и поиска
function applyCombinedFilter() {
    const searchValue = document.getElementById('SearchInput').value.trim().toLowerCase(); // Получаем значение из строки поиска
    const selectedWorkplaces = Array.from(document.querySelectorAll('.workplace-filter:checked')).map(cb => cb.value);
    const selectedSpecializations = Array.from(document.querySelectorAll('.specialization-filter:checked')).map(cb => cb.value);
    const selectedPositions = Array.from(document.querySelectorAll('.position-filter:checked')).map(cb => cb.value);
    
    const specialists = document.querySelectorAll('.specialist-block');

    specialists.forEach(specialist => {
        const fullName = specialist.querySelector('.specialist-name').textContent.trim().toLowerCase(); // Получаем имя специалиста
        const spec = specialist.querySelector('.specialist-specialization').textContent;
        const job = specialist.querySelector('.specialist-position').textContent;
        const place = specialist.querySelector('.specialist-place-of-work').textContent;

        // Проверяем совпадения по чекбоксам
        const matchesWorkplace = selectedWorkplaces.length === 0 || selectedWorkplaces.some(workplace => place.includes(workplace));
        const matchesSpecialization = selectedSpecializations.length === 0 || selectedSpecializations.some(specialization => spec.includes(specialization));
        const matchesPosition = selectedPositions.length === 0 || selectedPositions.some(position => job.includes(position));

        // Проверяем совпадения по имени
        const matchesName = fullName.includes(searchValue);

        // Отображаем карточку, если она совпадает по имени и чекбоксам
        if (matchesWorkplace && matchesSpecialization && matchesPosition && matchesName) {
            specialist.style.display = 'block';
        } else {
            specialist.style.display = 'none';
        }
    });
}



function toggleDropdown(filterId, button) {
    var filterElement = document.getElementById(filterId);
    var buttonRect = button.getBoundingClientRect(); // Получаем позицию кнопки
    
    // Если фильтр виден, скрыть его, иначе показать
    if (filterElement.style.display === "block") {
        filterElement.style.display = "none";
    } else {
        filterElement.style.display = "block";
        
        // Установить положение фильтра точно под кнопкой
        filterElement.style.top = buttonRect.bottom + 10 + "px";
        filterElement.style.left = buttonRect.left + "px";
        filterElement.style.width = buttonRect.width + "px";
    }
}



// Сброс всех фильтров
function resetFilters() {
  const checkboxes = document.querySelectorAll('.workplace-filter, .specialization-filter, .position-filter');
  checkboxes.forEach(checkbox => checkbox.checked = false);
  const specialists = document.querySelectorAll('.specialist-block');
  specialists.forEach(specialist => specialist.style.display = 'block');
}
