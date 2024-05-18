import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', doSubmit);

function doSubmit(event) {
  event.preventDefault();
  const value = event.target.elements.state.value;
  const delayValue = event.target.elements.delay.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value === 'fulfilled') {
        resolve(delayValue);
      } else {
        reject(delayValue);
      }
    }, delayValue);
  });
  promise
    .then(value =>
      iziToast.show({
        message: `✅ Fulfilled promise in ${value}ms`,
        messageColor: 'white',
        backgroundColor: 'green',
        position: 'topRight',
        drag: true,
        overlay: true,
        overlayClose: true,
      })
    )
    .catch(value =>
      iziToast.show({
        message: `❌ Rejected promise in ${delayValue}ms`,
        messageColor: 'white',
        backgroundColor: 'red',
        position: 'topRight',
        drag: true,
        overlay: true,
        overlayClose: true,
      })
    );
  this.reset();
}
