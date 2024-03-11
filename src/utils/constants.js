const testArray = [
  {
    question: 'Вопрос',
    answers: [
      "Вариант А", "Вариант Б", "Вариант В", "Вариант Г", "Вариант Д", "Вариант Е"
    ],
    correctAnswer: 0
  },
  {
    question: 'Вопрос',
    answers: [
      "Вариант А", "Вариант Б", "Вариант В", "Вариант Г", "Вариант Д", "Вариант Е"
    ],
    correctAnswer: 0
  },
  {
    question: 'Вопрос',
    answers: [
      "Вариант А", "Вариант Б", "Вариант В", "Вариант Г", "Вариант Д", "Вариант Е"
    ],
    correctAnswer: 0
  },
  {
    question: 'Вопрос',
    answers: [
      "Вариант А", "Вариант Б", "Вариант В", "Вариант Г", "Вариант Д", "Вариант Е"
    ],
    correctAnswer: 0
  },
  {
    question: 'Вопрос',
    answers: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin odio sit amet.", 
      "Lorem ipsum dolor sit amet, aliquam sollicitudin odio sit amet."
    ],
    correctAnswer: 0
  },

]

const tests = [
  {
    name: `Test's name`,
    description: '1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper volutpat tristique. Fusce et nunc porttitor, pretium urna at, sagittis purus. Nullam sagittis congue sapien non sodales. Aliquam vel condimentum lacus, sit amet feugiat velit. Suspendisse congue imperdiet dui, sit amet cursus mi viverra sed. Nam porttitor venenatis vehicula. Vestibulum sed arcu vel lorem venenatis tempor.'
  },
  {
    name: `Another Test`,
    description: '2Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper volutpat tristique. Fusce et nunc porttitor, pretium urna at, sagittis purus. Nullam sagittis congue sapien non sodales. Aliquam vel condimentum lacus, sit amet feugiat velit. Suspendisse congue imperdiet dui, sit amet cursus mi viverra sed. Nam porttitor venenatis vehicula. Vestibulum sed arcu vel lorem venenatis tempor.'
  },
  {
    name: `Test`,
    description: '3Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper volutpat tristique. Fusce et nunc porttitor, pretium urna at, sagittis purus. Nullam sagittis congue sapien non sodales. Aliquam vel condimentum lacus, sit amet feugiat velit. Suspendisse congue imperdiet dui, sit amet cursus mi viverra sed. Nam porttitor venenatis vehicula. Vestibulum sed arcu vel lorem venenatis tempor.'
  },  
  {
    name: `Название теста`,
    description: '4Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper volutpat tristique. Fusce et nunc porttitor, pretium urna at, sagittis purus. Nullam sagittis congue sapien non sodales. Aliquam vel condimentum lacus, sit amet feugiat velit. Suspendisse congue imperdiet dui, sit amet cursus mi viverra sed. Nam porttitor venenatis vehicula. Vestibulum sed arcu vel lorem venenatis tempor.'
  },
]

// функция для форматирования времени
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}


export {testArray, tests, formatTime};