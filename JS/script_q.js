document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    const questionForm = document.getElementById('questionForm');
    const questionsContainer = document.getElementById('questionsContainer');

    // Загрузка имени пользователя при загрузке страницы
    loadCurrentUser();

    // Загрузка всех вопросов при загрузке страницы
    loadQuestions();

    // Обработка отправки формы
    questionForm.querySelector('button').addEventListener('click', function(event) {
        event.preventDefault();

        const username = usernameInput.value;
        const question = document.getElementById('question').value;

        if (!username) {
            alert('Пожалуйста, введите имя.');
            return;
        }

        if (username === '*AdminBio*') {
            alert('Вход как администратор выполнен.');
            loadQuestions();
            return;
        }

        if (!question) {
            alert('Пожалуйста, задайте вопрос.');
            return;
        }

        const questionData = {
            username: username,
            question: question,
            answer: null
        };

        saveQuestion(questionData);
        displayQuestion(questionData);
        clearForm();
    });

    // Функция для загрузки текущего пользователя
    function loadCurrentUser() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            usernameInput.value = currentUser.name; // Подстановка имени
            usernameInput.disabled = true; // Делаем поле имени недоступным для редактирования
        }
    }

    // Сохранение вопроса в localStorage
    function saveQuestion(questionData) {
        let questions = JSON.parse(localStorage.getItem('questions')) || [];
        questions.push(questionData);
        localStorage.setItem('questions', JSON.stringify(questions));
    }

    // Загрузка вопросов из localStorage
    function loadQuestions() {
        const questions = JSON.parse(localStorage.getItem('questions')) || [];
        questionsContainer.innerHTML = '';
        questions.forEach(displayQuestion);

        if (usernameInput.value === '*AdminBio*') {
            addReplyButtons();
        }
    }

    // Отображение вопроса на странице
    function displayQuestion(questionData) {
        const questionItem = document.createElement('div');
        questionItem.classList.add('question-item');

        questionItem.innerHTML = `<strong>${questionData.username}</strong>: ${questionData.question}
            <button class="delete-button">Удалить</button>`;

        if (questionData.answer) {
            const answerElement = document.createElement('div');
            answerElement.classList.add('admin-answer');
            answerElement.textContent = `Ответ от Биосферы: ${questionData.answer}`;
            questionItem.appendChild(answerElement);
        }

        // Добавляем обработчик для кнопки удаления
        questionItem.querySelector('.delete-button').addEventListener('click', function() {
            deleteQuestion(questionData);
            questionItem.remove();
        });

        questionsContainer.appendChild(questionItem);
    }

    // Очистка формы
    function clearForm() {
        document.getElementById('phone').value = '';
        document.getElementById('question').value = '';
    }

    // Удаление вопроса из localStorage
    function deleteQuestion(questionData) {
        let questions = JSON.parse(localStorage.getItem('questions')) || [];
        questions = questions.filter(q => q.question !== questionData.question || q.username !== questionData.username);
        localStorage.setItem('questions', JSON.stringify(questions));
    }

    // Добавление кнопок "Ответить" для *AdminBio*
    function addReplyButtons() {
        const questions = questionsContainer.querySelectorAll('.question-item');
        questions.forEach((questionItem, index) => {
            const replyButton = document.createElement('button');
            replyButton.classList.add('reply-button');
            replyButton.textContent = 'Ответить';
            replyButton.addEventListener('click', function() {
                const answer = prompt('Введите ваш ответ на вопрос:');
                if (answer) {
                    saveAnswer(index, answer);
                    location.reload(); // Обновляем страницу, чтобы показать новый ответ
                }
            });
            questionItem.appendChild(replyButton);
        });
    }

    // Сохранение ответа в localStorage
    function saveAnswer(index, answer) {
        let questions = JSON.parse(localStorage.getItem('questions')) || [];
        if (questions[index]) {
            questions[index].answer = answer;
            localStorage.setItem('questions', JSON.stringify(questions));
        }
    }

    // Автоматическая загрузка кнопок "Ответить" для *AdminBio* после нажатия на "Отправить"
    usernameInput.addEventListener('input', function() {
        if (usernameInput.value === '*AdminBio*') {
            questionForm.querySelector('button').addEventListener('click', function() {
                loadQuestions();
            });
        }
    });
});
