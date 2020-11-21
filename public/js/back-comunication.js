function loading() {
  $("#preloader .progress").fadeIn();
  $("#preloader").fadeIn().css({
    height: "4px",
  });
  $("#preloader").delay(500).fadeOut("slow");
}

document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector("button");
  const input = document.querySelector(".input-lab");
  const inputData = document.querySelector("#input-data2");
  const check = document.querySelector("#myonoffswitch");
  const select = document.querySelector("#select-date");
  let reserva = false;
  button.addEventListener("click", () => {
    loading();
    getConteudo(input.value);
  });
  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.querySelector("button").click();
    }
  });
  check.addEventListener("click", () => {
    if (!reserva) {
      inputData.classList.add("hide");
      select.classList.add("show");
      reserva = true;
    } else {
      inputData.classList.remove("hide");
      select.classList.remove("show");
      reserva = false;
    }
  });
});

async function getConteudo(value) {
  let endereco = `https://lab-manager.herokuapp.com/laboratorio/getByNome/${value}`;
  if (value == undefined || value == "") {
    endereco = "https://lab-manager.herokuapp.com/laboratorios";
  }
  try {
    const response = await fetch(endereco);
    const data = await response.json();
    show(data);
  } catch (error) {
    console.log(error);
  }
}

function show(users) {
  if (users.err || users.length == 0) {
    document.querySelector(
      ".resultado"
    ).innerHTML = `<h4><br> ${users.err}</h4>`;
    return;
  }
  let output = "";
  for (let user of users) {
    output += `<div class="lab">
        <div class="lab-title">
          <h1>${user.nome}</h1>
          <p>${user.descricao}
            <br> 
            ${user.capacidade} Computadores
          </p>
        </div>
        <div class="button-box">
          <button onclick="openReserva(${user.id})">Reservar</button>
        </div>
      </div>`;
  }
  document.querySelector(".resultado").innerHTML = output;
}

function getDiaDaSemana(dia) {
  switch (dia) {
    case 0:
      return "Domingo";
    case 1:
      return "Segunda";
    case 2:
      return "Terça";
    case 3:
      return "Quarta";
    case 4:
      return "Quinta";
    case 5:
      return "Sexta";
    case 6:
      return "Sábado";
  }
}

async function openReserva(id) {
  let endereco = `https://lab-manager.herokuapp.com/laboratorio/${id}`;
  let response = await fetch(endereco);
  let user = await response.json();
  document.querySelector(".reserva").style.display = "block";
  document.querySelector(".reserva-header").innerHTML = `      
        <h1>${user[0].nome}</h1>
        <p>${user[0].descricao} / ${user[0].capacidade} computadores</p>
        <i class="far fa-times-circle"></i>
  `;
  let output = "";
  user[0].horas_possiveis.split(",").forEach((u) => {
    output += `<option value="${u}">${u}</option>`;
  });
  document.querySelector("#select-time").innerHTML = output;

  let output2 = "";
  user[0].dias_possiveis.split(",").forEach((d) => {
    let dia = getDiaDaSemana(parseInt(d));
    output2 += `<option value="${d}">${dia}</option>`;
  });
  document.querySelector("#date").innerHTML = output2;

  let exit = document.querySelector(".reserva-header i");
  exit.addEventListener("click", () => {
    document.querySelector(".reserva").style.display = "none";
  });

  await document
    .querySelector("#btn-reserva")
    .addEventListener("click", efetuaReserva(user[0].id));
}

async function efetuaReserva(id) {
  let id_laboratorio = id;
  let data = document.querySelector("#date").value;
  let check = document.getElementById("myonoffswitch").checked;
  if (check) {
    data = document.getElementById("input-data2");
  }
  let hora = document.querySelector("#select-time").value;
  try {
    await fetch(`https://lab-manager.herokuapp.com/reserva`, {
      method: "POST",
      body: JSON.stringify({ id_laboratorio, data, hora }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
  } catch (error) {
    console.log(error);
  }
}

getConteudo("");
