function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('name').value
    let date = document.getElementById('date').value
    let cityName = document.getElementById('city-name')
    let cityImage = document.getElementById('city-image')
    let weatherText = document.getElementById('weather-data')
    let validFormText = Client.checkForName(formText)

    if(validFormText){

        const user_data = {
            city: formText,
            date: date
        }

        // send user input to server for api call
        fetch('http://localhost:8081/api-call', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user_data)
        })

        console.log("::: Form Submitted :::")

        // get api response from server
        fetch('http://localhost:8081/api-response')
        .then(res => res.json())
        .then(data => {
            console.log('retrieved data from server:', data)
            cityName.innerHTML = formText
            cityImage.setAttribute('src', data.imageURL)
            weatherText.innerHTML = `${data.temp} celcius. ${data.weatherDetails}`
        })
        
    } else {
        document.getElementById('results').innerHTML = 'Please search for a city without numbers.'
    }

}


export { handleSubmit }
