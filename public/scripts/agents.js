const AppAgent = {
  init() {
    addEventAgents();
  }
}

function addEventAgents() {
  const btnBackAgent = document.querySelector("#btnBackAgent");

  btnBackAgent.addEventListener('click', () => {
    window.location.href = "../views/home.html";
  });
}

async function getAgent() {

  try { 
    const users = await fetch("http://localhost:3000/users");
    const data = await users.json();

    console.log(data);

  } catch (error) {
    console.log(error);
  }

  console.log(users);
  
}

window.onload = () => {
  getAgent();
}

AppAgent.init();