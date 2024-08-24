const specialists = document.querySelectorAll('.specialist-block');
            const seen = new Set();
            specialists.forEach(function(specialist, index) {
                const name = specialist.querySelector('.specialist-name').textContent;
                if (seen.has(name)) {
                    specialist.parentNode.removeChild(specialist);
                } else {
                    seen.add(name);
                }
            });