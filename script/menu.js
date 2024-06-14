// função para abrir e fechar o menu

let  img = document.getElementById("img-menu")
let menu = document.getElementById("op-menu")

function AbrirMenu() {
    menu.style = "display: block; widith: 250px;"
    img.removeAttribute("onclick", "AbrirMenu()")
    img.setAttribute("onclick", "FecharMenu()")
}

function FecharMenu() {
    menu.style = "display: none; "
    img.removeAttribute("onclick", "FecharMenu()")
    img.setAttribute("onclick", "AbrirMenu()")
}