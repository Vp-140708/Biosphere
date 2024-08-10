document.getElementById('searchInput').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const specialists = document.querySelectorAll('.specialist-block');

    specialists.forEach(function(specialist) {
        const name = specialist.querySelector('.specialist-name').textContent.toLowerCase();
        const description = specialist.querySelector('.specialist-description').textContent.toLowerCase();

        if (name.includes(searchValue) || description.includes(searchValue)) {
            specialist.style.display = 'block';
        } else {
            specialist.style.display = 'none';
        }
    });
});
