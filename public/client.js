function ask(){
    console.log("ÆÆÆ JEG BLE TATT PÅ")
    const text_field = document.getElementById('text_field')
    const input_value = document.getElementById('task').value
    if (input_value){

    console.log(input_value)
    fetch('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ task: input_value }) // sender Jason objekt
    })
        .then(res => res.json())
        .then(data =>{

            // må endres til å legge til task
            console.log(data)
            text_field.innerHTML = data.message.repeat(data.amount) 
        });
    }
}

function load_tasks() {
    const tasks_p = document.getElementById('tasks_p')

    fetch('/load_tasks')
        .then(res => res.json())
        .then(data => {
            tasks_p.innerHTML = ""
            data.tasks.forEach((item) => {
                tasks_p.innerHTML += item + " | "
            });
            console.log(data.tasks)
            // ta data.tasks fra severing, legg html
        })
}