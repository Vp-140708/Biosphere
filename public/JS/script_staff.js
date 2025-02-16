
document.getElementById('SearchInput').addEventListener('input', applyCombinedFilter);
document.querySelectorAll('.workplace-filter, .specialization-filter, .position-filter').forEach(checkbox => {
    checkbox.addEventListener('change', applyCombinedFilter); 
});


function applyCombinedFilter() {
    const searchValue = document.getElementById('SearchInput').value.trim().toLowerCase(); 
    const selectedWorkplaces = Array.from(document.querySelectorAll('.workplace-filter:checked')).map(cb => cb.value);
    const selectedSpecializations = Array.from(document.querySelectorAll('.specialization-filter:checked')).map(cb => cb.value);
    const selectedPositions = Array.from(document.querySelectorAll('.position-filter:checked')).map(cb => cb.value);
    
    const specialists = document.querySelectorAll('.specialist-block');

    specialists.forEach(specialist => {
        const fullName = specialist.querySelector('.specialist-name').textContent.trim().toLowerCase(); 
        const spec = specialist.querySelector('.specialist-specialization').textContent;
        const job = specialist.querySelector('.specialist-position').textContent;
        const place = specialist.querySelector('.specialist-place-of-work').textContent;

        
        const matchesWorkplace = selectedWorkplaces.length === 0 || selectedWorkplaces.some(workplace => place.includes(workplace));
        const matchesSpecialization = selectedSpecializations.length === 0 || selectedSpecializations.some(specialization => spec.includes(specialization));
        const matchesPosition = selectedPositions.length === 0 || selectedPositions.some(position => job.includes(position));

        
        const matchesName = fullName.includes(searchValue);

        
        if (matchesWorkplace && matchesSpecialization && matchesPosition && matchesName) {
            specialist.style.display = 'block';
        } else {
            specialist.style.display = 'none';
        }
    });
}



function toggleDropdown(filterId, button) {
    var filterElement = document.getElementById(filterId);
    var buttonRect = button.getBoundingClientRect(); 
    
    
    if (filterElement.style.display === "block") {
        filterElement.style.display = "none";
    } else {
        filterElement.style.display = "block";
        
        
        filterElement.style.top = buttonRect.bottom + 10 + "px";
        filterElement.style.left = buttonRect.left + "px";
        filterElement.style.width = buttonRect.width + "px";
    }
}




function resetFilters() {
  const checkboxes = document.querySelectorAll('.workplace-filter, .specialization-filter, .position-filter');
  checkboxes.forEach(checkbox => checkbox.checked = false);
  const specialists = document.querySelectorAll('.specialist-block');
  specialists.forEach(specialist => specialist.style.display = 'block');
}
document.addEventListener("DOMContentLoaded", function () {
    const educationButtons = document.querySelectorAll(".education-btn");

    educationButtons.forEach((button) => {
        button.addEventListener("click", function () {
            let educationBlock = this.nextElementSibling;

            if (educationBlock.classList.contains("active")) {
                educationBlock.style.maxHeight = "0";
                educationBlock.style.opacity = "0";
                educationBlock.classList.remove("active");
                this.innerHTML = "Квалификация ⬇";
            } else {
                educationBlock.style.maxHeight = educationBlock.scrollHeight + "px";
                educationBlock.style.opacity = "1";
                educationBlock.classList.add("active");
                this.innerHTML = "Квалификация ⬆";
            }
        });
    });
});
