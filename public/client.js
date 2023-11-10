document.addEventListener('DOMContentLoaded', login_check());

/*function start_log_in(){
    const EL_chatting_div = document.getElementById('chatting');
    EL_chatting_div.innerHTML = ""

    var login_div = document.createElement("div");
    EL_chatting_div.appendChild(login_div);

    var brukerbox = document.createElement("input");
    brukerbox.type = "text"
    brukerbox.placeholder = "Brukernavn"

    var passordbox = document.createElement("input");
    passordbox.type = "password"
    passordbox.placeholder = "Passord"

    var login_button = document.createElement("button");
    login_button.textContent = "Logg inn"
    login_button.id = "idæææ"
    login_button.onclick = "log_in()"; //ÆÆÆÆÆÆ HÆÆÆÆ??

    login_div.appendChild(brukerbox);
    login_div.appendChild(passordbox);
    login_div.appendChild(login_button);
}

function log_in(){
    console.log("jeg lever? JEG LEVER!")
} */

function login_check(){
    const login_div = document.getElementById('login_div')
    const chat_div = document.getElementById('chatting')
    const logut_button = document.getElementById('loggut_btn')
    fetch('/login_check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            hoho: "hoho"
        })
    })
        .then(res => res.json())
        .then(data =>{
            if (data.success) {
                login_div.style.display = "none"
                logut_button.style.display = "flex"
                chat_div.style.display = "flex"
                load_tasks()
            } else {
                login_div.style.display = "flex"
                logut_button.style.display = "none"
                chat_div.style.display = "none"
            }
        })
}


function attempt_log_in(){
    const brukerinput = document.getElementById('brukerbox').value
    const passordinput = document.getElementById('passordbox').value
    const login_div = document.getElementById('login_div')
    const chat_div = document.getElementById('chatting')
    const logut_button = document.getElementById('loggut_btn')

    console.log(brukerinput + passordinput)

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: brukerinput,
            password: passordinput,
            login_div: login_div
        })
    })
        .then(res => res.json())
        .then(data =>{
            console.log(data.message)
            if (data.success) {
                login_div.style.display = "none"
                chat_div.style.display = "flex"
                logut_button.style.display = "flex"
                load_tasks()
            }
        })
}


function log_out(){
    fetch('/log_out', {})
        .then(res => res.json())
        .then(data =>{
            if (data.success) {
                login_check()
            } else {
                console.log("Upsitt, du forblir logget inn antar jeg... litt sussy ngl");
            }
        });
}

function registrer(){
    const brukerinput = document.getElementById('brukerbox').value
    const passordinput = document.getElementById('passordbox').value
    fetch('/registrer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: brukerinput,
            password: passordinput
        })
    })

}


function ask(){
    console.log("ÆÆÆ JEG BLE TATT PÅ");
    const input_value = document.getElementById('taskbox').value;
    const EL_brukerbox = document.getElementById('brukerbox').value;

    
    //if (input_value){

    console.log(input_value)
    console.log(EL_brukerbox)
    fetch('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            task: input_value,
        }) // sender Jason objekt
    })
        .then(res => res.json())
        .then(data =>{
            if (data.success) {
                console.log("Task goog");
            } else {
                console.log("Task badd");
            }
            load_tasks();
        });
    //}
}

function load_tasks() {
    var EL_chatbox = document.getElementById('chatbox');
    fetch('/load_tasks')
        .then(res => res.json())
        .then(data => {
            console.log("DETTE BURDE FUNGERE ÆÆÆ")
            EL_chatbox.innerHTML = "";
            var currentuser = data.username
            data.tasks.forEach((item, index) => {
                var bruker = item.bruker
                var task = item.task


                var p = document.createElement("p");
                p.innerHTML = bruker + ": " + task + " ";
                EL_chatbox.appendChild(p);
                
                if (bruker == currentuser) {
                    var btn = document.createElement('button')
                    btn.textContent = "SUSSY ,':{"
                    btn.id = "delete_button"
                    btn.onclick = function() {
                        deleteTask(index)
                    }
                    p.appendChild(btn)
                }
                
                EL_chatbox.appendChild(p)
            });
            console.log(data.tasks);
            // ta data.tasks fra severing, legg html
        })
}

function deleteTask(index){
    fetch(`/delete/${index}`, { // shit + knapp venstre for backspace dette er rart...
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            load_tasks()
            console.log("SUS!")
        } else {
            load_tasks()
            alert("HVA HAR DU GJORT??? HVORFOR KAN IKKE JEG SLETTE??? DIN IDIOT!!! forsvinn din sussy importer.")

        }
    })
}