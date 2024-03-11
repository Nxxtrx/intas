import {testArray, tests, formatTime} from "../utils/constants";
import '../vendor/normalize.css'
import './index.scss'

const contentContainer = document.querySelector('.test-container');
const sidebar = document.querySelector('.sidebar')
const closeSidebar = sidebar.querySelector('.sidebar__close-btn')
const sidebarLinkList = sidebar.querySelectorAll('.sidebar__test ')
const sidebarState = localStorage.getItem('sidebar');
const sidebarLinkState = localStorage.getItem('sidebar-active-link')

// Проверка локал сторадж при для отслеживания состояния сайдбара и активного линка
if (sidebarLinkState !== null) {
  sidebarLinkList[sidebarLinkState].classList.add('sidebar__test_type_active');
}

if (sidebarState !== null && sidebarState === 'true') {
  sidebar.classList.add('open');
} else {
  sidebar.classList.remove('open');
}

// обработчик для линков сайдбара
sidebarLinkList.forEach((item, index) => {
  item.querySelector('.sidebar__link').addEventListener('click', () => {
    sidebarLinkList.forEach((el) => {
      el.classList.remove('sidebar__test_type_active');
  });
    item.classList.toggle('sidebar__test_type_active')
    localStorage.setItem('sidebar-active-link', index)
  })
})

// открытие\закрытие  сайдбара
closeSidebar.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  localStorage.setItem('sidebar', sidebar.classList.contains('open') ? true : false)
})

// функция для отображения тестового окна
function showContent() {
  const hash = window.location.hash.slice(1);
  contentContainer.innerHTML = '';

  // отображение контента в зависимости от хэша
  switch (hash) {
    case '/':
      contentContainer.innerHTML = '<p class="test-container__empty">Выберите тест из списка</p>';
      break;
    case '/test/1':
    case '/test/2':
    case '/test/3':
    case '/test/4':
      const testNumber = parseInt(hash.match(/\d+/)[0])-1
      contentContainer.innerHTML = showTestDescription(tests[testNumber].description);
      addStartButtonListener(testArray, tests[testNumber].name)
      cancelTest()
      clearInterval()
      break;
    default:
      contentContainer.innerHTML = '<p class="test-container__empty">Выберите тест из списка</p>';
  }
}

// разметка окна с описанием теста
function showTestDescription(text) {
  return `
    <p class="test__title">Описание</p>
    <p class="test__description">${text}</p>
    <button class="test__start-btn">Начать</button>
    <button class="test__break-btn">Отмена</button>
  `
}

// функция запуска теста
function addStartButtonListener(testArray, name) {
  const startBtn = document.querySelector('.test__start-btn');
  startBtn.addEventListener('click', () => startTest(testArray, name));
}

// функция отмены теста
function cancelTest() {
  const cancelBtn = document.querySelector('.test__break-btn');
  cancelBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    window.location.href = '/'
    localStorage.removeItem('sidebar-active-link')
  })
}

// функция отслеживания времени
function updateTestTime(startTime) {
  const currentTime = new Date();
  const elapsedTime = formatTime(Math.round((currentTime - startTime) / 1000));
  const timeElement = document.querySelector('.test__time');
  if (timeElement) {
    timeElement.textContent = `${elapsedTime}`;
  }
}

// функция подсчета ответов
function countCompletedTests() {
  const completedTests = document.querySelectorAll('input[type="radio"]:checked').length;
  const totalTests = testArray.length;
  const resultElement = document.querySelector('.test__point');
  if (resultElement) {
    resultElement.textContent = `${completedTests}/${totalTests}`;
  }
}

// функция подсчета правильных ответов
function countCorrectAnswers(answers, test) {
  let correctCount = 0
  test.forEach((item, index) => {
    if(item.correctAnswer == answers[index].answer){
      correctCount+=1
    }
  })
  return correctCount
}

// функция для создания массива с ответами 
function createAnswerArray() {
  const answers = []
  document.querySelectorAll('.test__answer-element').forEach((item, index) => {
    const question = document.querySelectorAll('.test__answer')
    const selectedInput = item.querySelector('input[type="radio"]:checked');
    const answerIndex = testArray[index].correctAnswer
    if (selectedInput) {
      answers.push({
        question: question[index].textContent,
        answer: selectedInput.value,
        answerText: testArray[index].answers[selectedInput.value],
        correctAnswerIndex: answerIndex,
        correctAnswerText: testArray[index].answers[answerIndex]
      })
    } else {
      answers.push({
        question: question[index].textContent,
        answer: null,
        answerText: 'Ответ не выбран',
        correctAnswerIndex: answerIndex,
        correctAnswerText: testArray[index].answers[answerIndex]
      })
    }
  })
  return answers
}

// функция старта теста
function startTest(testArray, name) {
  const startTime = new Date();
  const timerInterval = setInterval(() => updateTestTime(startTime), 1000);

  contentContainer.innerHTML = `
  <div class="test__header">
    <button class="test__btn test__btn_type_exit">Выход</button>
    <p class="test__name">${name}</p>
    <div class="test__result-container">
      <button class="test__btn test__btn_type_reset">Сбросить все ответы</button>
      <p class="test__point">0/${testArray.length}</p>
      <p class="test__time">00:00:00</p>
    </div>
  </div>
  <form>
    ${testArray.map((test, index) => `
    <p class="test__answer">${index+1}. ${test.question}</p>
    <div class="test__answer-element">
      ${test.answers && test.answers.map((answer, answerIndex) => 
        `
          <label>
            <input type="radio" name="question${index}" value="${answerIndex}">
            ${answer}
          </label>
        `).join('')}
    </div>
    `).join('')}
  </form>
  <div class="test__complete-container">
    <button class="test__complete-btn">Завершить</button>
  </div>
  ` 

  const resetTest = document.querySelector('.test__btn_type_reset');
  const exitBtn = document.querySelector('.test__btn_type_exit')
  const popup = document.querySelector('.popup')
  const completeBtn = document.querySelector('.test__complete-btn');
  
  // кнопки подтверждения выхода из теста в попапе
  popup.querySelector('.popup__btn_type_exit').addEventListener('click', () => {
    window.location.href = '/';
    localStorage.removeItem('sidebar-active-link');
  })
  popup.querySelector('.popup__btn_type_cancel').addEventListener('click', () => popup.classList.remove('popup_type_opened'))
  
  // выход из теста
  exitBtn.addEventListener('click', () => {popup.classList.add('popup_type_opened')})
  // повтор теста
  resetTest.addEventListener('click', () => {
    document.querySelectorAll('input[type="radio"]').forEach(radioButton => {
        radioButton.checked = false;
    });
  })

  
  // таймаут для остановки теста по истечению 10 секунд после его начала 
  const timeOut = setTimeout(() => {
    clearInterval(timerInterval);
    const answers = createAnswerArray()
    showResult(answers, testArray)
    localStorage.setItem(`${name}`, `${countCorrectAnswers(answers, testArray)} из ${testArray.length}`)
  }, 10000);

  // кнопка завершения теста
  completeBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    const answers = createAnswerArray()
    showResult(answers, testArray)
    clearTimeout(timeOut)
    localStorage.setItem(`${name}`, `${countCorrectAnswers(answers, testArray)} из ${testArray.length}`)
  });

  // обработчик для нажатия вариантов ответа
  document.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('change', countCompletedTests);
  });

  // очистка таймаутов при выходе из теста
  window.addEventListener('popstate', ()=> clearTimeout(timeOut))
  window.addEventListener('popstate', ()=> clearInterval(timerInterval))
}

// функция предоставления результатов
function showResult(answers, testArray) {
  const formElement = contentContainer.querySelector('form')
  const completeContainer = document.querySelector('.test__complete-container')
  if(formElement) {
    formElement.remove()
    completeContainer.remove()
  }
  contentContainer.innerHTML += `
    <div class='result'>
      <p class='result__title'>Тест завершен</p>
      <p class='result__output'>Вы ответили на ${countCorrectAnswers(answers, testArray)} из ${testArray.length} вопросов.</p>
      <p class="result__answer-title">Ваши ответы</p>
      <div class="result__answer-container">
        ${answers.map((item, index) => `
          <div class="result__item">
            <p class="result__question">${item.question}</p>
            <p class="result__answer">Правильный ответ: ${item.correctAnswerText}</p>
            <p class="result__answer"> Вы ответили: ${item.answerText}</p>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="test__complete-container">
      <button class="test__refresh-btn">Пройти еще раз</button>
    </div>
  `
  const testName = document.querySelector('.test__name').textContent
  const resetBtn = contentContainer.querySelector('.test__refresh-btn');
  const exitBtn = contentContainer.querySelector('.test__btn_type_exit')
  const resetAnswerBtn = document.querySelector('.test__btn_type_reset')

  resetAnswerBtn.style.cursor = 'default'

  resetBtn.addEventListener('click', () => startTest(testArray, testName))
  exitBtn.addEventListener('click', ()=> {
    window.location.href = '/';
    localStorage.removeItem('sidebar-active-link');
  })
}

// обновление содержимого при переходе
window.addEventListener('hashchange', showContent);

// первая загрузка страницы
window.addEventListener('load', showContent);