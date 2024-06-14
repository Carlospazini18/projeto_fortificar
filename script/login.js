const login = {
    'adm': {
        'user': 'Administrador',
        'password': 'adm123' 
    },
    'dona': {
        'user': 'Donatario01',
        'password': 'dona123'
    }
}

function logar() {

    var LoginUsuario = document.getElementById('EmailUsuario').value.trim()
    var PasswordUsuario = document.getElementById('PasswordUsuario').value.trim()

    let ErroLogin = document.getElementById('ErroLogin')

    if (LoginUsuario == login['adm']['user'] && PasswordUsuario == login['adm']['password']) {
        ErroLogin.innerText = ''
        window.location.href = '../paginas/adm/dashboard.html'
    }
    else if (LoginUsuario == login['dona']['user'] && PasswordUsuario == login['dona']['password']) {
        ErroLogin.innerText = ''
        window.location.href = '../paginas/dona/resultado.html'
    }
    else {
        ErroLogin.innerText = '* dados incorreto, tente novamente'
        ErroLogin.style = "color: red; "
    }

}