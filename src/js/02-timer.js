import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
require('flatpickr/dist/themes/dark.css');

const datePick = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minsEl = document.querySelector('[data-minutes]');
const secsEl = document.querySelector('[data-seconds]');

button.setAttribute('disabled', 'true');

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      button.removeAttribute('disabled');
    }
  },
};

const flatLibrary = flatpickr(datePick, options);
// const userDate = flatLibrary.selectedDates[0];
button.addEventListener('click', onStartTime);

function onStartTime() {
  const userDate = flatLibrary.selectedDates[0];
  timerId = setInterval(() => {
    const nowDate = Date.now();
    const countTime = userDate - nowDate;
    if (countTime <= 0) {
      clearInterval(timerId);
      return;
    }
    const cheater = convertMs(countTime);
    updateCountDown(cheater);
  }, 1000);
}

function updateCountDown({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minsEl.textContent = addLeadingZero(minutes);
  secsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
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
