const AppHome = {

  init() {
    addEventHome();
  }
}

function addEventHome() {
  const solicitService = document.querySelector("#solicitService");
  const getInFlestyle = document.querySelector("#getInFlestyle");

  solicitService.addEventListener('click', () => {
    window.location.href = "../views/agents.html";
    console.log("Entrei")
  });

  getInFlestyle.addEventListener('click', () => {
    window.location.href = "../views/conta.html";
    console.log("Entrei")
  });
}

AppHome.init();