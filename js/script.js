const name = Math.random();
let numberOfMessages = 0;
let messagesRaw = [];
let messagesHTML = [];

let messagesBody = document.querySelector("main");
messagesBody.innerHTML = "";

function enterRoom() {
    const promisse = axios.post(
      "https://mock-api.driven.com.br/api/v4/uol/participants",
      {
        name: `${(name)}`
      }
    );

    promisse.then(successRoom); 
    promisse.catch(errorRoom);
  }

function keepOnline() {
  axios.post (`https://mock-api.driven.com.br/api/v4/uol/status`,
  {name: `${(name)}`
  });

  console.log("keep");
}

function successRoom(reply) {
//  console.log(reply.status);
}

function errorRoom(error) {
  if (error.response.status === 400) {
    console.log("Usuário já cadastrado");
  }
}

function promisseMessages() {
  const messagesPromisse = axios.get(`https://mock-api.driven.com.br/api/v4/uol/messages`);

  messagesPromisse.then(getMessages); 
  messagesPromisse.catch(errorMessages);
}

function getMessages(messagesObject) {
  messagesRaw = messagesObject.data;

  numberOfMessages = messagesRaw.length;

  convertMessagesToHTML();

  printMessages();
}

function errorMessages(errorObject) {
  console.log(errorObject);
  console.log("something bad happened");
}

function convertMessagesToHTML() {
  for (let i = 0; i < numberOfMessages; i++) {
    if (messagesRaw[i].type === "message"){

      messagesHTML[i] = `
      <div class="${messagesRaw[i].type}">
        <div class="message-text" data-identifier="message">
          <span class="time">(${messagesRaw[i].time})</span>
          <span class="from">${messagesRaw[i].from}</span>
          <span class="messageStatus">para</span>
          <span class="to">${messagesRaw[i].to}: </span>
          <span class="text">${messagesRaw[i].text} </span>
        </div>
      </div>
      
      `
    }
    else if (messagesRaw[i].type === "private_message"){
      messagesHTML[i] = `
      <div class="${messagesRaw[i].type}">
        <div class="message-text" data-identifier="message">
          <span class="time">(${messagesRaw[i].time})</span>
          <span class="from">${messagesRaw[i].from}</span>
          <span class="messageStatus">reservadamente para</span>
          <span class="to">${messagesRaw[i].to}: </span>
          <span class="text">${messagesRaw[i].text} </span>
        </div>
      </div>
      
      `
    } else {
      messagesHTML[i] = `
      <div class="${messagesRaw[i].type}">
        <div class="message-text" data-identifier="message">
          <span class="time">(${messagesRaw[i].time})</span>
          <span class="from">${messagesRaw[i].from}</span>
          <span class="messageStatus">${messagesRaw[i].text}</span>
        </div>
      </div>
      
      `
    }
  }
}

function printMessages() {
  for (let i = 0; i < numberOfMessages; i++) {
    messagesBody.innerHTML += messagesHTML[i];
  }
}

function main() {
  enterRoom();

  setInterval(keepOnline, 5000);
  
  promisseMessages();

  getMessages();

  printMessages();

}

main();