import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button[data-start]');
const calendarOpenerInput = document.querySelector('#datetime-picker');
const daysToShow = document.querySelector('span[data-days]');
const hoursToShow = document.querySelector('span[data-hours]');
const minutesToShow = document.querySelector('span[data-minutes]');
const secondsToShow = document.querySelector('span[data-seconds]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = Date.now();
    if (selectedDates[0] < now) {
      iziToast.show(iziToastOptions);
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

const iziToastOptions = {
  message: 'Please choose a date in the future',
  messageColor: 'white',
  messageSize: '16px',
  backgroundColor: 'red',
  position: 'topRight',
  timeout: 5000,
  drag: true,
  overlay: true,
  overlayClose: true,
};

const datePicker = flatpickr(calendarOpenerInput, options);

startBtn.addEventListener('click', startCount);

function startCount() {
  const intervalId = setInterval(() => {
    const startTime = Date.now();
    const endTime = datePicker.selectedDates[0];
    const elapsedTime = endTime - startTime;
    if (elapsedTime <= 1000) {
      clearInterval(intervalId);
      daysToShow.textContent = '00';
      hoursToShow.textContent = '00';
      minutesToShow.textContent = '00';
      secondsToShow.textContent = '00';
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(elapsedTime);
    daysToShow.textContent = String(days).padStart(2, '0');
    hoursToShow.textContent = String(hours).padStart(2, '0');
    minutesToShow.textContent = String(minutes).padStart(2, '0');
    secondsToShow.textContent = String(seconds).padStart(2, '0');
    console.log(convertMs(elapsedTime));
    startBtn.disabled = true;
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
