function myEvents() {

    document.getElementById('button').addEventListener('click', (event) => {
        Client.handleSubmit(event)
    })

}

export {myEvents}