console.log("Clientside js is loaded")

fetch("http://localhost:3000/weather").then((response) => {
    response.json().then ((data) => {
        console.log(data)
    })
})

