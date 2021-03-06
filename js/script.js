let name = "";
let toSend = "Todos";
let typeMessage = "message";
let numberOfMessages = 0;
let messagesRaw = [];
let messagesHTML = [];
let textMessage = "";
let messagesPromisse;
let promissedMessage;

let messagesBody = document.querySelector("main");
messagesBody.innerHTML = "";

let socialBar = document.querySelector("aside");

function enterRoom() {
  name = prompt ("Qual é o seu nome?");

  const promisse = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants",
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

}

function successRoom(reply) {
//  console.log(reply.status);
}

function errorRoom(error) {
  if (error.response.status === 400) {
    alert("Usuário já cadastrado, escolha outro nome.");

    main();
  }
}

function promisseMessages() {
  messagesPromisse = axios.get(`https://mock-api.driven.com.br/api/v4/uol/messages`);

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
  let messagesCounter = 0;
  for (let i = 0; i < numberOfMessages; i++) {
    if (messagesRaw[i].type === "message"){

      messagesHTML[messagesCounter] = `
      <div class="${messagesRaw[i].type}">
        <div class="message-text" data-identifier="message">
          <span class="time">(${messagesRaw[i].time})</span>
          <span class="from">${messagesRaw[i].from}</span>
          <span class="messageStatus">para</span>
          <span class="to">${messagesRaw[i].to}: </span>
          <span class="text">${messagesRaw[i].text} </span>
        </div>
      </div>
      
      `;
      messagesCounter++;
    }
    else if (messagesRaw[i].type === "private_message"){
      if (messagesRaw[i].to === name) {

        messagesHTML[messagesCounter] = `
        <div class="${messagesRaw[i].type}">
        <div class="message-text" data-identifier="message">
        <span class="time">(${messagesRaw[i].time})</span>
        <span class="from">${messagesRaw[i].from}</span>
        <span class="messageStatus">reservadamente para</span>
        <span class="to">${messagesRaw[i].to}: </span>
        <span class="text">${messagesRaw[i].text} </span>
        </div>
        </div>
        
        `;
        messagesCounter++;

      } else {
        messagesCounter++;
      }
    } else {
      messagesHTML[messagesCounter] = `
      <div class="${messagesRaw[i].type}">
        <div class="message-text" data-identifier="message">
          <span class="time">(${messagesRaw[i].time})</span>
          <span class="from">${messagesRaw[i].from}</span>
          <span class="messageStatus">${messagesRaw[i].text}</span>
        </div>
      </div>
      
      `;
      messagesCounter++;

    }
  }
}

function printMessages() {
  messagesBody.innerHTML = "";

  for (let i = 0; i < numberOfMessages; i++) {
    messagesBody.innerHTML += messagesHTML[i];
  }

  messagesBody.scrollIntoView({block: "end"});
}

function sendMessage() {
  textMessage = document.querySelector("input").value;

  promissedMessage = axios.post(`https://mock-api.driven.com.br/api/v4/uol/messages`,
  {
    from: `${name}`,
    to: `${toSend}`,
    text: `${textMessage}`,
    type: `${typeMessage}`
  });

  textMessage = document.querySelector("input");
  textMessage.value = "";

  promissedMessage.then(successMessage); 
  promissedMessage.catch(errorMessage);
}

function reloadPage(){
  window.location.reload()
}

function showBar() {
  socialBar.classList.toggle("display-none");
}

function main() {
  enterRoom();

  setInterval(keepOnline, 5000);
  
  promisseMessages();

  setInterval(promisseMessages, 3000);

}

main();

let input = document.querySelector("input");

input.addEventListener("keyup", checkKeyPress, false);

function checkKeyPress(key) {
  if (key.keyCode == "13") {
    sendMessage();
  }
}
