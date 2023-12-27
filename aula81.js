const carro = document.getElementById("carro")
const carro2 = document.getElementById("carro2")
const buzina = document.getElementById("buzina")
const parar = document.getElementById("parar")
const sirene = document.getElementById("sirene")
const turnCarro = document.getElementById("turnCarro")
const selecionarCarro = document.getElementById("selecionarCarro")
const sortear1novamente = document.getElementById("sortear1novamente")
const btn_esquerda = document.getElementById("btn_esquerda")
const btn_direita = document.getElementById("btn_direita")

const carrosOpcoes = [...document.getElementsByTagName("option")]

function sorteioCarro1() {
  let qualSortear1 = carrosOpcoes.length - 1
  let sorteio1 = Math.round(Math.random() * qualSortear1)
  return sorteio1
}

function sorteioCarro2() {
  let qualSortear = carrosOpcoes.length - 1
  let sorteio = Math.round(Math.random() * qualSortear)
  return sorteio
}

const avaliarSorteio1 = () => {
  let qualSorteou1 = sorteioCarro1()
  let sorteado1 = 0
  carrosOpcoes.map((el, ind) => {
    if (qualSorteou1 == ind) {
      sorteado1 = qualSorteou1
    }
  })
  selecionarCarro.selectedIndex = sorteado1
}
avaliarSorteio1()

const avaliarSorteio = () => {
  let qualSorteou = sorteioCarro2()
  let sorteado = 0
  carrosOpcoes.map((el, ind) => {
    if (qualSorteou == ind) {
      sorteado = qualSorteou
    }
  })
  carro2.innerHTML = carrosOpcoes[sorteado].value
}
avaliarSorteio()

const init = () => {
  carro.style = "position: relative; left: 0px;"
  carro2.style = "position: relative; left: -100px;"
}
window.onload = init

let anima = null

const move = (dir) => {
  carro.style.left = parseInt(carro.style.left) + (25*dir) + "px"
  carro.style.transform = `scaleX(${-dir})`
}

btn_esquerda.addEventListener("click", () => {
  clearInterval(anima)
  anima = setInterval(move, 250, -1)
})

parar.addEventListener("click", () => {
  clearInterval(anima)
})

btn_direita.addEventListener("click", () => {
  clearInterval(anima)
  anima = setInterval(move, 250, 1)
})

let larguraDaTela = window.innerWidth - 72

const carroNaoBater = () => {
  let pos = parseInt(carro.style.left)
  if (pos >= larguraDaTela) {
    carro.style.left = window.innerWidth - 100 + "px"
  }
  if (pos <= 0) {
    carro.style.left = 0 + "px"
  }
}

setInterval(carroNaoBater, 1)

const carroNPC = () => {
  let pos2 = parseInt(carro2.style.left)
  pos2 += 25
  carro2.style = `position: relative; left: ${pos2}px;`
  carro2.style.transform = "scaleX(-1)"
  if (pos2 >= larguraDaTela) {
    carro2.style.left = "-200px"
    sorteioCarro2()
    avaliarSorteio()
  }
}

setInterval(carroNPC, 200)

const lembreteSalvarCarro = () => {
  carro.innerHTML = selecionarCarro.value
}
setInterval(lembreteSalvarCarro, 1)

let audioBuzina = new Audio("audios/buzina.mp3")
buzina.addEventListener("click", () => {
  audioBuzina.play()
})

let audioSirene = new Audio("audios/sirene.mp3")
audioSirene.loop = true
sirene.addEventListener("click", () => {
  sirene.classList.toggle("estaAtivada")
  const estaAtivada = sirene.classList.contains("estaAtivada")
  if (estaAtivada) {
    audioSirene.play()
  } else {
    audioSirene.pause()
  }
})

let audioTurnCarro = new Audio("audios/carroLigado.mp3")
audioTurnCarro.loop = true
turnCarro.addEventListener("click", () => {
  turnCarro.classList.toggle("ligado")
  const estaLigado = turnCarro.classList.contains("ligado")
  if (estaLigado) {
    audioTurnCarro.play()
  } else {
    audioTurnCarro.pause()
  }
})

sortear1novamente.addEventListener("click", () => {
  sorteioCarro1()
  avaliarSorteio1()
})