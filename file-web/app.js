// Select your input type file and store it in a variable
const input = document.getElementById('file');
const target = document.getElementById('result');

const uploadURL = `http://localhost:3000/upload`;

const formatResponse = (response) => {
  console.log('response', response);
  const {
    predictions
  } = response;
  if (!predictions.length) return;

  for (var i = 0; i < predictions.length; i++) {
    const {
      probability,
      tagName
    } = predictions[i];
    return `${tagName} with ${probability * 100} % likelyhood`;
  }
}

function onSelectFile() {
  let data = new FormData();
  data.append('file', input.files[0]);
  fetch(uploadURL, {
    method: 'POST',
    body: data
  })
  .then(handleResponse)
  .catch(err => {
    alert(err);
  })
}

async function handleResponse(response) {
  const json = await response.json();

  target.innerHTML = JSON.stringify(formatResponse(json));
}

input.addEventListener('change', onSelectFile, false);
