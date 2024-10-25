document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    const questionForm = document.getElementById('questionForm');
    const questionsContainer = document.getElementById('questionsContainer');

    // Загрузка текущего пользователя
    loadCurrentUser();

    // Загрузка всех вопросов при загрузке страницы
    loadQuestions();

    // Обработка отправки формы
    questionForm.querySelector('button').addEventListener('click', function(event) {
        event.preventDefault();

        const username = usernameInput.value;
        const email = usernameInput.value;
        const question = document.getElementById('question').value;

        if (!username) {
            alert('Пожалуйста, введите имя.');
            return;
        }

        if (!question) {
            alert('Пожалуйста, задайте вопрос.');
            return;
        }

        const questionData = {
            username: username,
            question: question,
            userEmail: 1,
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
            document.getElementById('email').value = currentUser.email; // Подстановка email
            usernameInput.disabled = true; // Делаем поле имени недоступным для редактирования
            document.getElementById('email').disabled = true; // Делаем поле email недоступным для редактирования
        }
    }

    // Загрузка вопросов из localStorage
    function loadQuestions() {
        const questions = JSON.parse(localStorage.getItem('questions')) || [];
        questionsContainer.innerHTML = '';
        questions.forEach(displayQuestion);
    }

    // Отображение вопроса на странице
    function displayQuestion(questionData) {
        const questionItem = document.createElement('div');
        questionItem.classList.add('question-item');

        questionItem.innerHTML = `<strong>${questionData.username}</strong>: ${questionData.question}
            <button class="delete-button" style="display: none;">Удалить</button>`;

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            if (currentUser.isAdmin) {
                questionItem.querySelector('.delete-button').style.display = 'inline';
            } else if (currentUser.name === questionData.username) {
                questionItem.querySelector('.delete-button').style.display = 'inline';
            }
        }

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

    // Сохранение вопроса в localStorage
    function saveQuestion(questionData) {
        let questions = JSON.parse(localStorage.getItem('questions')) || [];
        questions.push(questionData);
        localStorage.setItem('questions', JSON.stringify(questions));
    }

    // Удаление вопроса из localStorage
    function deleteQuestion(questionData) {
        let questions = JSON.parse(localStorage.getItem('questions')) || [];
        questions = questions.filter(q => q.question !== questionData.question || q.username !== questionData.username);
        localStorage.setItem('questions', JSON.stringify(questions));
    }
});
