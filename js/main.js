let token = null



let params = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        username: "michel",
        password: "tructruc",
    })
}

fetch('https://felix.esdlyon.dev/login', params)
    .then(response => {reponse.json()})
    .then(data => {
        console.log(data.token)
        token = data.token
    })

if(!token){
    displayLoginPage()
}else{
    displayChatInterface()
}

// pour interroger l'IA il faut :
//un token à stocker dans un header Authorization : "Bearer ${token}"
//un header application.json
//le corps de requete doit etre en json, avec une clé "prompt", donc :
// {
// "prompt": "ma question"
// }