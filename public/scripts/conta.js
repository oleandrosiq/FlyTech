
const AppConta = {
  init() {
    addEventConta();
  }
}

function addEventConta() {
  const backHomeConta = document.querySelector("#backHomeConta");

  backHomeConta.addEventListener('click', () => {
    window.location.href = "../views/home.html";
  });

}

AppConta.init();