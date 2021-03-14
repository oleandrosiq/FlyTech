const AppForm = {
  init() {
    addEventsForm();
  }
}

function addEventsForm() {
  const btnAcessList = document.querySelector("#btnAcessList");
  const btnAcessDashboard = document.querySelector("#btnAcessDashboard");
  const buttonBack = document.querySelector("#backFormHome");

  btnAcessList.addEventListener('click', () => {
    window.location.href = "../views/agents.html";
  });

  btnAcessDashboard.addEventListener('click', () => {
    window.location.href = "../views/conta.html";
  });

  buttonBack.addEventListener('click', () => {
    window.location.href = "../views/conta.html";
  });

}

AppForm.init();