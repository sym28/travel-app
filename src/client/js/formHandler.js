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
            try {
                const request = await fetch('http://localhost:8081/api-response')
                const data = await request.json()
                return data

            } catch (error) {
                console.log('error: ', error)
            }
        }

        const postData = async (userData) => {
            try {
                const response = await fetch('http://localhost:8081/api-call', {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(userData)
                })
                const data = await response.json()
                return data
            } catch (error) {
                console.log('error: ', error)
            }
        }
        
        const populateUI = async () => {
            // post userinput then get data from server
            await postData(user_data)
            const data = await getApiData()

            // populate dom elements with server data
            cityName.innerHTML = formText
            cityImage.setAttribute('src', data.imageURL)
            weatherText.innerHTML = `${data.temp} celcius. ${data.weatherDetails}`
        }

        populateUI()
        
    } else {
        document.getElementById('results').innerHTML = 'Please search for a city without numbers.'
    }

}


export { handleSubmit }
