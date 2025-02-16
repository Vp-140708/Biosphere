document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    const questionForm = document.getElementById('questionForm');
    const questionsContainer = document.getElementById('questionsContainer');

    
    loadCurrentUser();

    
    loadQuestions();

    
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

    
    function loadCurrentUser() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            usernameInput.value = currentUser.name; 
            document.getElementById('email').value = currentUser.email; 
            usernameInput.disabled = true; 
            document.getElementById('email').disabled = true; 
        }
    }

    
    function loadQuestions() {
        const questions = JSON.parse(localStorage.getItem('questions')) || [];
        questionsContainer.innerHTML = '';
        questions.forEach(displayQuestion);
    }

    
    function displayQuestion(questionData) {
        const questionItem = document.createElement('div');
        questionItem.classList.add('question-item');
        
        
        let contentHTML = `<strong>${questionData.username}</strong>: ${questionData.question}`;
        
        
        if (questionData.answer) {
            contentHTML += `<div class="admin-answer">Ответ от Биосферы: ${questionData.answer}</div>`;
        }
        
        questionItem.innerHTML = contentHTML;
        
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Удалить';
        deleteButton.style.display = 'none';
        questionItem.appendChild(deleteButton);
        
        
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            
            if (currentUser.isAdmin || currentUser.name === questionData.username) {
                deleteButton.style.display = 'inline';
            }
        }
        
        deleteButton.addEventListener('click', function () {
            deleteQuestion(questionData);
            questionItem.remove();
        });
        
        
        if (currentUser && currentUser.isAdmin) {
            const answerButton = document.createElement('button');
            answerButton.classList.add('answer-button');
            
            answerButton.textContent = questionData.answer ? 'Редактировать ответ' : 'Ответить';
            questionItem.appendChild(answerButton);
            
            answerButton.addEventListener('click', function () {
                
                let newAnswer = prompt("Введите ответ на вопрос:", questionData.answer ? questionData.answer : "");
                if (newAnswer !== null) {
                    questionData.answer = newAnswer;
                    
                    let allQuestions = JSON.parse(localStorage.getItem('questions')) || [];
                    for (let i = 0; i < allQuestions.length; i++) {
                        if (allQuestions[i].question === questionData.question && allQuestions[i].username === questionData.username) {
                            allQuestions[i].answer = newAnswer;
                            break;
                        }
                    }
                    localStorage.setItem('questions', JSON.stringify(allQuestions));
                    
                    
                    const existingAnswerDiv = questionItem.querySelector('.admin-answer');
                    if (existingAnswerDiv) {
                        existingAnswerDiv.textContent = "Ответ от Биосферы: " + newAnswer;
                    } else {
                        const answerDiv = document.createElement('div');
                        answerDiv.classList.add('admin-answer');
                        answerDiv.textContent = "Ответ от Биосферы: " + newAnswer;
                        questionItem.insertBefore(answerDiv, answerButton);
                    }
                    
                    answerButton.textContent = newAnswer ? 'Редактировать ответ' : 'Ответить';
                }
            });
        }
        
        questionsContainer.appendChild(questionItem);
    }

    
    function clearForm() {
        document.getElementById('phone').value = '';
        document.getElementById('question').value = '';
    }

    
    function saveQuestion(questionData) {
        let questions = JSON.parse(localStorage.getItem('questions')) || [];
        questions.push(questionData);
        localStorage.setItem('questions', JSON.stringify(questions));
    }

    
    function deleteQuestion(questionData) {
        let questions = JSON.parse(localStorage.getItem('questions')) || [];
        questions = questions.filter(q => q.question !== questionData.question || q.username !== questionData.username);
        localStorage.setItem('questions', JSON.stringify(questions));
    }
});
