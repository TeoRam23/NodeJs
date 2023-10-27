document.addEventListener('DOMContentLoaded', load_tasks());

function ask(){
    console.log("ÆÆÆ JEG BLE TATT PÅ");
    const text_field = document.getElementById('text_field');
    const input_value = document.getElementById('task').value;
    
    //if (input_value){

    console.log(input_value)
    fetch('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ task: input_value }) // sender Jason objekt
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
    var EL_ul = document.getElementById('tasks_ul');
    fetch('/load_tasks')
        .then(res => res.json())
        .then(data => {
            EL_ul.innerHTML = "";
            data.tasks.forEach((item, index) => {
                var li = document.createElement("li");
                li.innerHTML = item;
                EL_ul.appendChild(li);
            });
            console.log(data.tasks);
            // ta data.tasks fra severing, legg html
        })
}