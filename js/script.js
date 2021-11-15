const name = "blavlu";

function enterRoom() {
    console.log("tried to enter");

    const promisse = axios.post(
      "https://mock-api.driven.com.br/api/v4/uol/participants",
      {
        name: `${(name)}`
      }
    );

    promisse.then(successRoom); 
    promisse.catch(errorRoom);
  }

function successRoom() {
    console.log("Success enter room");
}

function keepOnline() {
  axios.post (`https://mock-api.driven.com.br/api/v4/uol/status`,
  {name: `${(name)}`
  });

  console.log("keep");
}

function successRoom(reply) {
  console.log(reply.status);
}

function errorRoom(error) {
  if (error.response.status === 400) {
    console.log("Usuário já cadastrado");
  }

//  console.log("Status code: " + error.response.status); // Ex: 404
//	console.log("Mensagem de erro: " + error.response.data); // Ex: Not Found
}

function main() {
  enterRoom();
  setInterval(keepOnline, 5000);
}

main();