function checkForName(inputText) {
    // checks for length of string
    if(inputText.length <= 2) {
        console.log(inputText)
        return false
    } else {
        console.log(inputText)
        return true
    }
}

export { checkForName }
