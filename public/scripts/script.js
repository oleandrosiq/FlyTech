const App = {
  init() {
    Rules.redirectWindow();
    Modals.openViewRegisterSucess();
  },

  reload() {

  }
}

const DOM = {
  display: document.querySelector("#displayAgent"),

  addAgentDisplay(agent) {
    this.display.innerHTML += agent;
    console.log(agent);
  }
}

console.log(DOM.display);

const Modals = {
  openViewRegisterSucess() {
    const submitForm = document.querySelector("#submitForm");
    const sectionForm = document.querySelector("#ladingForm");
    const modal = document.querySelector("#modalSucess");

    submitForm.addEventListener('click', () => {
      modal.style.display = "flex";
      sectionForm.style.display = "none";
    });
  }
}

const Form = {

  stateForm: false,

  stopSubmit(event) {
    event.preventDefault();
    form = event.target;

    this.formSubmit(form);
  },

  formSubmit(form) {
    
    if (this.validateFields()) {
      form.submit();
    }

  },

  validateNumber() {
    const input = document.querySelector("#whats");
    number = input.value.split();

    console.log(number.lenght);

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

      alert("Por favor, preencha todos os campos");

      return;
    }

    for (let day of fields.days) {
      if (day.classList[1] === "active") {
        console.log(day);
      }
    }

    // enviar os dados para o backend e dar um reload apagando a section e criando 
    // o html dos agents com base nos dados do backend e mostrando na tela

    // metodo criando html do agent
    this.createHTMLAgent(
      nameUser, emailUser, senhaUser, photoUser, whatsUser, bio, selectService,
      priceMin, priceMax, timeAte, timeDas
    );
  },

  validateProfileInputs(profile) {
    const inputName = profile[0];
    const inputEmail = profile[1];
    const inputSenha = profile[2];
    const inputPhoto = profile[3];
    const inputWhats = profile[4];

    
    // alterar o state
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

    // this.validateFields(form, select, textarea);
  },

  getDaysActive(element) {
    element.target.classList.toggle("active");
  },

  createHTMLAgent(nameUser, photoUser, whatsUser, bio, selectService,
    priceMin, priceMax, timeAte, timeDas) {
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

        <button type="button">
          <img src="/public/assets/images/Vector.svg" alt="Entrar em contato via WhatsApp">
          Entrar em contato
        </button>
      </div>
    </div>
    `
      // Lembrar de integrar o whatsApp o link
      DOM.addAgentDisplay(HTML);
  }
}

const Rules = {
  addEventClick() {
    const days = document.querySelectorAll("li");

    if (window.location.pathname === "/public/views/home.html") {
      const solicitService = document.querySelector("#solicitService");
      const getInFlestyle = document.querySelector("#getInFlestyle");

      solicitService.addEventListener('click', () => {
        window.location.href = "agents.html";
      });

      getInFlestyle.addEventListener('click', () => {
        window.location.href = "form.html";
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

  },

  redirectWindow() {
    this.addEventClick();
  }
}

App.init();