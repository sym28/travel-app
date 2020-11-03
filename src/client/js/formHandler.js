import fetch from "node-fetch"

function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('name').value
    let date = document.getElementById('date').value
    let cityName = document.getElementById('city-name')
    let cityImage = document.getElementById('city-image')
    let weatherText = document.getElementById('weather-data')
    let validFormText = Client.checkForName(formText)
    const user_data = {
        city: formText,
        date: date
    }
    
    if(validFormText){
        
        const getApiData = async () => {
            const request = await fetch('http://localhost:8081/api-response')
            try {
                const data = await request.json()
                console.log('retrieved data from server:', data)
                cityName.innerHTML = formText
                cityImage.setAttribute('src', data.imageURL)
                weatherText.innerHTML = `${data.temp} celcius. ${data.weatherDetails}`
    
            } catch (error) {
                console.log('error: ', error)
            }
        }

        const postData = async (userData) => {
            const response = await fetch('http://localhost:8081/api-call', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userData)
            })
            try {
                const data = await response.json()
                return data
            } catch (error) {
                console.log('error: ', error)
            }
        }
        
        const postThenGet = async () => {
            postData(user_data)
            .then(getApiData())      
        }

        postThenGet()
        
    } else {
        document.getElementById('results').innerHTML = 'Please search for a city without numbers.'
    }

}


export { handleSubmit }
