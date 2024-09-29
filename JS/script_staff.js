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

document.getElementById('theme-switcher').addEventListener('click', function() {
  if (document.body.classList.contains('dark-theme')) {
    document.getElementById('filter1').style.backgroundColor = '#0398b9';
  } else {
    document.getElementById('filter1').style.backgroundColor = '#9cfaa1';
  }
});
