const Url = {
  SERVER: 'https://23.javascript.pages.academy/kekstagram',
  DATA: 'https://23.javascript.pages.academy/kekstagram/data',
};

const getData = (onSuccess, onFail) => {
  fetch(Url.DATA)
    .then((response) => response.json())
    .then(onSuccess)
    .catch(() => {
      onFail('Не удалось загрузить фотографии:(');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    Url.SERVER,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (!response.ok) {
        onFail();
      }
      onSuccess();
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
