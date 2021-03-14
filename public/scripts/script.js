const App = {
  init() {
    Rules.redirectWindow();
  },

  reload() {

  }
}

const DOM = {
  display: document.querySelector("#displayAgent"),
}

const Modals = {
  openViewRegisterSucess() {
    const sectionForm = document.querySelector("#ladingForm");
    const modal = document.querySelector("#modalSucess");

    modal.style.display = "flex";
    sectionForm.style.display = "none";
  }
}

const Form = {

  stateForm: false,

  stopSubmit(event) {
    event.preventDefault();

    if (this.validateFields()) {  
      console.log("Passei");
    } else {
      console.log("Não passei");
    }
  },

  async sendToBackEnd(  ) {
    const data = { profile, days, times, prices, selectService, bio } = this.getFields();
    var weekday = [];

    for (let day of days) {
      if (day.classList[1] === "active") {
        weekday.push(1);
      } else {
        weekday.push(0);
      }
    }

    var service;

    switch (data.selectService) {
      case "Barbeiro":
        service = 1;
      break;
      case "Manicure":
        service = 2;
      break;
      case "Manicure e Cabeleireiro(a)":
        service = 3;
      break;
      case "Cabeleireiro(a)":
        service = 4;
      break;
      default:
        service = 3;
    }

   const user = { 
     name: data.profile[0], 
     email: data.profile[1], 
     pass: data.profile[2], 
     bio: data.bio,
     image: data.profile[3],
     max_p: data.prices[1],
     min_p: data.prices[0],
     type: service,
     number: data.profile[4],
     disp: `${data.times[1]}, ${data.times[0]}, ${weekday}`
    }

    try {
      const result = await fetch("http://localhost:3000/create", {
        method: "POST",
        body: JSON.stringify(user)
      });

      console.log(result);

    } catch (error) {
      
    }
  },

  getValuesDashboard() {
    const dashboard = document.querySelector("#dashboard");

  },

  validateFields() {
    const fields = { profile, days, times, prices, selectService, bio } = this.getFields();
    nameUser = fields.profile[0];
    emailUser = fields.profile[1];
    senhaUser = fields.profile[2];
    photoUser = fields.profile[3];
    whatsUser = fields.profile[4];
    bio = fields.bio;
    selectService = fields.selectService;
    priceMin = fields.prices[0];
    priceMax = fields.prices[1];
    timeAte = fields.times[0];
    timeDas = fields.times[1];

    if(
      nameUser.trim() === "" || 
      emailUser.trim() === "" || 
      senhaUser.trim() === "" ||
      photoUser.trim() === "" ||
      whatsUser.trim() === "" ||
      bio.trim() === "" ||
      selectService.trim() === "" ||
      priceMin.trim() === "" ||
      priceMax.trim() === "" ||
      timeAte.trim() === "" ||
      timeDas.trim() === "" 
      ) {
 
        Notification.requestPermission();

        if (Notification.permission === 'granted') {
          new Audio('/public/assets/notification.mp3').play();
          new Notification("Ainda tem campos vazios", {
            body: "Preencha todos os campos! 🚫",
          })
        }

      return;
    }

    return true;

    // enviar os dados para o backend e dar um reload apagando a section e criando 
    // o html dos agents com base nos dados do backend e mostrando na tela

    // metodo criando html do agent
  },

  getFields() {
    const form = document.querySelectorAll("#form input");
    const select = document.querySelector("#select");
    const textarea = document.querySelector("#bio");
    
    return {
      profile: [ form[0].value, form[1].value, form[2].value, form[3].value, form [4].value ],
      days: [ form[7], form[8], form[9], form[10], form[11] ],
      times: [ form[12].value, form[13].value ],
      prices: [ form[5].value, form[6].value ],
      selectService: select.value,
      bio: textarea.value
    }
  },

  getDaysActive(element) {
    element.target.classList.toggle("active");
    // enviar os dias ativos para o backEnd
  },

  // pegar os dados do back end
  // nameUser, photoUser, whatsUser, bio, selectService,
  // priceMin, priceMax, timeAte, timeDas, days

  createHTMLAgent() {

    const HTML = `
      <div class="agent">
      <div class="profile">
        <img src="${photoUser}" alt="Foto de perfil">

        <div class="name-ocupation">
          <h1>${nameUser}</h1>

          <p>${selectService}</p>
        </div>

      </div>

      <div class="bio">
        <p>
          ${bio}
        </p>
      </div>

      <div class="day-hour">
        <div class="content-day-hours notActive">
          <span class="day">
            Dia <br /> 
            <h1>Segunda</h1>
          </span>

          <span class="hours"> 
            Horário <br /> 
            <h1><span></span> - <span></span></h1>
          </span>

        </div>

        <div class="content-day-hours ">
          <span class="day">
            Dia <br /> 
            <h1>Terça</h1>
          </span>

          <span class="hours"> 
            Horário <br /> 
            <h1><span>${timeDas}</span> - <span>${timeAte}</span></h1>
          </span>
        </div>

        <div class="content-day-hours ">
          <span class="day">
            Dia <br /> 
            <h1>Quarta</h1>
          </span>

          <span class="hours"> 
            Horário <br /> 
            <h1><span>${timeDas}</span> - <span>${timeAte}</span></h1>
          </span>
        </div>

        <div class="content-day-hours notActive">
          <span class="day">
            Dia <br /> 
            <h1>Quinta</h1>
          </span>

          <span class="hours"> 
            Horário <br /> 
            <h1><span></span> - <span></span></h1>
          </span>
        </div>

        <div class="content-day-hours ">
          <span class="day">
            Dia <br /> 
            <h1>Sexta</h1>
          </span>

          <span class="hours"> 
            Horário <br /> 
            <h1><span>${timeDas}</span> - <span>${timeAte}</span></h1>
          </span>
        </div>
      </div>

      <div class="footer">
        <div class="price">
          <h1>Preços</h1>

          <div class="values">
            <p>Minimo - <span>R$${priceMin}</span></p>
            <p>Maximo - <span>R$${priceMax}</span></p>
          </div>
        </div>

        <a href="https://api.whatsapp.com/send?l=pt_BR&phone=5519999669175&text=Tenho interesse em seu serviço de Cabeleireiro Leandro Siqueira" class="button" target="_blank">
          <img src="/public/assets/images/Vector.svg" alt="Whatsapp">Entrar em contato
        </a>
      </div>
    </div>
    `
      // Lembrar de integrar o whatsApp o link
      
  }
}

const Rules = {
  addEventClick() {
    const days = document.querySelectorAll("li");
    const btnAcessList = document.querySelector("#btnAcessList");
    const btnAcessDashboard = document.querySelector("#btnAcessDashboard");

    if (window.location.pathname === "/public/views/home.html") {
      const solicitService = document.querySelector("#solicitService");
      const getInFlestyle = document.querySelector("#getInFlestyle");

      solicitService.addEventListener('click', () => {
        window.location.href = "agents.html";
      });

      getInFlestyle.addEventListener('click', () => {
        window.location.href = "conta.html";
      });
    }

    if (window.location.pathname === "/public/views/agents.html") {
      const btnBackAgent = document.querySelector("#btnBackAgent");

      btnBackAgent.addEventListener('click', () => {
        window.location.href = "home.html";
      });
    }

    if (window.location.pathname === "/public/views/form.html") {
      const backFormHome = document.querySelector("#backFormHome");

      backFormHome.addEventListener('click', () => {
        window.location.href = "home.html";
      });
    }

    for (let day of days) {
      day.addEventListener('click', Form.getDaysActive);
    }

    btnAcessList.addEventListener('click', () => {
      window.location.href = "/public/views/agents.html";
    });

    btnAcessDashboard.addEventListener('click', () => {
      window.location.href = "/public/views/conta.html";
    });

  },

  redirectWindow() {
    this.addEventClick();
  }
}

App.init();