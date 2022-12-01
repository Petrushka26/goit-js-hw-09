import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const formIn = document.querySelector('.form');

formIn.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.target.elements;
  let delayVal = Number(delay.value);
  const stepVal = Number(step.value);
  const amountVal = Number(amount.value);

  for (let i = 1; i <= amountVal; i += 1) {
    createPromise(i, delayVal)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayVal += stepVal;
  }
}
