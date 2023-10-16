function ask(){
    console.log("ÆÆÆ JEG BLE TATT PÅ")
    const text_field = document.getElementById('text_field')

    fetch('/ask')
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            alert(data.message)
            text_field.innerHTML= data.message.repeat(data.amount)
        });
}