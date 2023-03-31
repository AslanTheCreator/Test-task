const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

let count = 0; //счетчик для старта и сброса таймера

const createTimerAnimator = () => {
  let interval = 0;
  return (seconds) => {
    if (!(count % 2)) {
      interval = setInterval(() => {
        if (seconds <= 0) {
          clearInterval(interval);
        }

        let hour = Math.floor((seconds / 3600) % 60);
        let minute = Math.floor((seconds / 60) % 60);
        let sec = Math.floor(seconds % 60);

        timerEl.innerHTML = addZero(hour) + ':' + addZero(minute) + ':' + addZero(sec);

        seconds--;
      }, 1000);
    } else {
      clearInterval(interval);

      timerEl.innerHTML = '00:00:00';
    }
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
  const value = e.target.value;

  e.target.value = value.replace(/\D/g, ''); //используем регулярное выражение
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  if (!(count % 2)) {
    buttonEl.textContent = 'Reset';
    inputEl.disabled = true;
  } else {
    buttonEl.textContent = 'Start';
    inputEl.disabled = false;
  }

  animateTimer(seconds);

  inputEl.value = '';

  count++;
});

//функция для корректного отображения времени
const addZero = (value) => {
  return value < 10 ? `0${value}` : value;
};
