let token = null
const loginPage = document.querySelector('.login')
const chatPage = document.querySelector('.chat')


let premierMessageIa = {
    author : "Felix",
    content : "Bonjour je suis l'IA"
}
let premierMessageUser = {
    author : "Jean-michel",
    content : "bonjour je suis jean-michel. Quel est la couleur du ciel ?",
}
let deuxiemeMessageIa = {
    author : "Felix",
    content : "Quelle est ta question ?"
}


let messages = [premierMessageIa, premierMessageUser, deuxiemeMessageIa]
async function login(username, password){
console.log(username, password)
let params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    }

    return await fetch('https://felix.esdlyon.dev/login', params)
        .then((response) =>  response.json())
        .then((json) => {

            return json.token
        })
}



function displayLoginForm(){

    loginPage.style.display = 'block'
    chatPage.style.display = 'none'

    let username = document.querySelector('.username')
    let password = document.querySelector('.password')
    let loginButton = document.querySelector('.submitLogin')
    loginButton.addEventListener('click', ()=>{

            login(username.value, password.value).then((data) => {
            token = data
            displayChat()
            //console.log(token)
        })
    })
}

function displayMessages(){
    document.querySelector('.messages').innerHTML = ""
        messages.forEach(message => {

            divMessage = document.createElement('div')
            divMessage.classList.add('message')
            let paragraphe = document.createElement('p')
            paragraphe.textContent = message.content
            divMessage.appendChild(paragraphe)


            if(message.author === "Felix")
            {
                divMessage.classList.add('felix')
            }else{
                divMessage.classList.add('user')

            }
            document.querySelector('.messages').appendChild(divMessage)
        })



}

function handlePrompt(){
    let prompt = document.querySelector('.prompt')
    let submitButton = document.querySelector('.chatSubmit')

    submitButton.addEventListener('click', ()=>{
        addMessageToMessagesArray({
            author : "User",
            content:prompt.value
        })
        displayMessages()


        askIa(prompt.value).then((data) => {
            console.log(data)
            addMessageToMessagesArray({
                author : "Felix",
                content:data
            })
            displayMessages()
        })
    })
}

async function askIa(prompt)
{
    let params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            prompt: prompt,
        })
    }
   return await fetch('https://felix.esdlyon.dev/ollama', params)
        .then(response => response.json())
        .then((json) => {
            console.log(json)
            return json.message
        })
}

function addMessageToMessagesArray(message)
{
    messages.push(message)
}

function displayChat(){
    chatPage.style.display = 'block'
    loginPage.style.display = 'none'

    displayMessages()
    handlePrompt()
}



if(!token){
    displayLoginForm()
}else{
    displayChat()
    displayMessages()
}

