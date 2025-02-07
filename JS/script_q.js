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
            showNotification('Пожалуйста, введите имя.');
            return;
        }

        if (!question) {
            showNotification('Пожалуйста, задайте вопрос.');
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

    // Функция для отображения вопроса на странице с возможностью ответа для администратора
    function displayQuestion(questionData) {
        const questionItem = document.createElement('div');
        questionItem.classList.add('question-item');
        
        // Формирование базовой информации о вопросе
        let contentHTML = `<strong>${questionData.username}</strong>: ${questionData.question}`;
        
        // Если на вопрос уже дан ответ, отображаем его
        if (questionData.answer) {
            contentHTML += `<div class="admin-answer">Ответ от Биосферы: ${questionData.answer}</div>`;
        }
        
        questionItem.innerHTML = contentHTML;
        
        // Создаём кнопку "Удалить"
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Удалить';
        deleteButton.style.display = 'none';
        questionItem.appendChild(deleteButton);
        
        // Загружаем текущего пользователя
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            // Если администратор или пользователь задал этот вопрос, показываем кнопку удаления
            if (currentUser.isAdmin || currentUser.name === questionData.username) {
                deleteButton.style.display = 'inline';
            }
        }
        
        deleteButton.addEventListener('click', function () {
            deleteQuestion(questionData);
            questionItem.remove();
        });
        
        // Если текущий пользователь — администратор, добавляем кнопку для ответа
        if (currentUser && currentUser.isAdmin) {
            const answerButton = document.createElement('button');
            answerButton.classList.add('answer-button');
            // Если уже есть ответ — показываем возможность редактирования, иначе — дать ответ
            answerButton.textContent = questionData.answer ? 'Редактировать ответ' : 'Ответить';
            questionItem.appendChild(answerButton);
            
            answerButton.addEventListener('click', function () {
                // Запрашиваем ответ через prompt. Если на вопрос уже был дан ответ, подставляем его по умолчанию.
                let newAnswer = prompt("Введите ответ на вопрос:", questionData.answer ? questionData.answer : "");
                if (newAnswer !== null) {
                    questionData.answer = newAnswer;
                    // Обновляем данные в LocalStorage
                    let allQuestions = JSON.parse(localStorage.getItem('questions')) || [];
                    for (let i = 0; i < allQuestions.length; i++) {
                        if (allQuestions[i].question === questionData.question && allQuestions[i].username === questionData.username) {
                            allQuestions[i].answer = newAnswer;
                            break;
                        }
                    }
                    localStorage.setItem('questions', JSON.stringify(allQuestions));
                    
                    // Обновляем отображение ответа на странице
                    const existingAnswerDiv = questionItem.querySelector('.admin-answer');
                    if (existingAnswerDiv) {
                        existingAnswerDiv.textContent = "Ответ от Биосферы: " + newAnswer;
                    } else {
                        const answerDiv = document.createElement('div');
                        answerDiv.classList.add('admin-answer');
                        answerDiv.textContent = "Ответ от Биосферы: " + newAnswer;
                        questionItem.insertBefore(answerDiv, answerButton);
                    }
                    // Меняем текст кнопки
                    answerButton.textContent = newAnswer ? 'Редактировать ответ' : 'Ответить';
                }
            });
        }
        
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
