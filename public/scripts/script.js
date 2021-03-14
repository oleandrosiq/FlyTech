const displayAgent = document.querySelector("#displayAgent");

const App = {
  init() {
    Rules.addEventClick();
    Form.getAgents();
  },

  reload() {

  }
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

  stopSubmit(event) {
    event.preventDefault();

    if (this.validateFields()) {  
      this.sendToBackEnd();
      Modals.openViewRegisterSucess();
      
    } else {
      console.log("Preencha todos os inputss");
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
      max_p: parseFloat(data.prices[1]),
      min_p: parseFloat(data.prices[0]),
      type: service,
      number: `${data.profile[4]}`,
      disp: `${data.times[1]}, ${data.times[0]}, ${weekday}`
    }
    
    try {
      const result = await fetch("http://localhost:3000/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      });

    } catch (error) {
      console.log(error);
    }
  },

  getValuesDashboard() {
    const dashboard = document.querySelector("#dashboard");
    
    console.log(dashboard);
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
  },

  getAgents() {
    const array = this.getUsers();

    array.forEach((element) => {
      timeBef = element.disp.split(',')[0];
      timeAft = element.disp.split(',')[1];
      
      this.createHTMLAgent(element.name, element.image, element.type, element.number, element.bio,
        timeBef, timeAft, element.disp, element.min_p, element.max_p);

    });
  },

  getUsers() {
    const arrayTeste = [
      {
        "id": 0,
        "name": "Luís Henrique",
        "email": "",
        "pass": "",
        "number": "1199999999",
        "image": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.5WpGDTCnw4WX1n4C1-y6lAHaFj%26pid%3DApi&f=1",
        "bio": "Me chamo luis e sou um pato",
        "disp": "12:00, 15:00, 1,1,0,1,0",
        "min_p": 25,
        "max_p": 100,
        "type": 4,
        "created": "2021-03-14T20:14:53.837Z"
      },
      {
        "id": 0,
        "name": "Leandro Henrique",
        "email": "",
        "pass": "",
        "number": "11992929929",
        "image": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.gXG622b-JKKei-tPYfT-cgHaFj%26pid%3DApi&f=1",
        "bio": "Me chamo Leando e sou uma girafa",
        "disp": "12:00, 18:00, 0,0,1,1,1",
        "min_p": 30,
        "max_p": 120,
        "type": 4,
        "created": "2021-03-14T20:16:54.303Z"
      }
    ]

    return arrayTeste;
  },

  createHTMLAgent(
    nameUser, 
    photoUser, 
    selectService, 
    numberUser, 
    bio, 
    timeDas, 
    timeAte, 
    days, 
    priceMin, 
    priceMax) {

      switch (selectService) {
        case selectService = 1:
          selectService = "Barbeiro"
        break;
        case selectService = 2:
          selectService = "Manicure"
        break;
        case selectService = 3:
          selectService = "Manicure e Cabeleireiro(a)"
        break;
        case selectService = 4:
          selectService = "Cabeleireiro(a)"
        break;
        
      }

      console.log(days[4]);

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
        <div class="content-day-hours ${( days[2] === '0' ? "notActive" : "" )}">
          <span class="day">
            Dia <br /> 
            <h1>Segunda</h1>
          </span>

          <span class="hours"> 
            Horário <br /> 
            <h1><span></span> - <span></span></h1>
          </span>

        </div>

        <div class="content-day-hours ${( days[3] === '0' ? "notActive" : "" )}">
          <span class="day">
            Dia <br /> 
            <h1>Terça</h1>
          </span>

          <span class="hours"> 
            Horário <br /> 
            <h1><span>${timeDas}</span> - <span>${timeAte}</span></h1>
          </span>
        </div>

        <div class="content-day-hours ${( days[4] === '0' ? "notActive" : "" )}">
          <span class="day">
            Dia <br /> 
            <h1>Quarta</h1>
          </span>

          <span class="hours"> 
            Horário <br /> 
            <h1><span>${timeDas}</span> - <span>${timeAte}</span></h1>
          </span>
        </div>

        <div class="content-day-hours ${( days[5] === '0' ? "notActive" : "" )}">
          <span class="day">
            Dia <br /> 
            <h1>Quinta</h1>
          </span>

          <span class="hours"> 
            Horário <br /> 
            <h1><span></span> - <span></span></h1>
          </span>
        </div>

        <div class="content-day-hours ${( days[6] === '0' ? "notActive" : "" )}">
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

        <a href="https://api.whatsapp.com/send?l=pt_BR&phone=${numberUser}&text=Tenho interesse em seu serviço de ${selectService} ${nameUser}" class="button" target="_blank">
          <img src="../assets/images/Vector.svg" alt="Whatsapp">Entrar em contato
        </a>
      </div>
    </div>
    `
    displayAgent.innerHTML += HTML;

  }
}

const Rules = {
  addEventClick() {
    const days = document.querySelectorAll("li");

    for (let day of days) {
      day.addEventListener('click', Form.getDaysActive);
    }

  },
}
  
App.init();