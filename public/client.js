document.addEventListener('DOMContentLoaded', load_tasks());

function start_log_in(){
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
    login_button.onclick = "log_in()"; //ÆÆÆÆÆÆ HÆÆÆÆ??

    login_div.appendChild(brukerbox);
    login_div.appendChild(passordbox);
    login_div.appendChild(login_button);
}

function log_in(){
    console.log("jeg lever? JEG LEVER!")
}

function ask(){
    console.log("ÆÆÆ JEG BLE TATT PÅ");
    const text_field = document.getElementById('text_field');
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
            bruker: EL_brukerbox
        }) // sender Jason objekt
    })
        .then(res => res.json())
        .then(data =>{
            if (data.success) {
                console.log("Task goog");
            } else {
                // må endres til å legge til task
                console.log("Task badd");
            }
            text_field.innerHTML = data.message ;
            load_tasks();
        });
    //}
}

function load_tasks() {
    var EL_chatbox = document.getElementById('chatbox');
    var EL_brukerbox = document.getElementById('brukerbox').value;
    fetch('/load_tasks')
        .then(res => res.json())
        .then(data => {
            EL_chatbox.innerHTML = "";
            data.tasks.forEach((item, index) => {
                var bruker = item.bruker
                var task = item.task


                var p = document.createElement("p");
                p.innerHTML = bruker + ": " + task;
                EL_chatbox.appendChild(p);

                var btn = document.createElement('button')
                btn.textContent = "SUSSY ,':{"
                btn.id = "delete_button"
                btn.onclick = function() {
                    deleteTask(index)
                }
                p.appendChild(btn)
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
            alert("HVA HAR DU GJORT??? HVORFOR KAN IKKE JEG SLETTE??? DIN IDIOT!!!")
        }
    })
}


function setbruker(){
    var EL_brukerbox = document.getElementById('brukerbox')
}