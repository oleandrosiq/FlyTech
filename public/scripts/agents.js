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

AppAgent.init();