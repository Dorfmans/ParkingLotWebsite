const url = "http://localhost:8000/api"

// Vehicle Services
const postVehicle = (costumerObject) => {
    return fetch(url + "/vehicles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(costumerObject)
    }).then((response) => {
        if(response.status != 200){
            alert(`Server error: ${response.status}`)
        }
            alert(`Successful sign up: ${response.status} `)
    })
}

const getVehicle = () => {
    return fetch(url + "/vehicles").then((response) => {
        if(response.status != 200){
            alert(`Server error: ${response.status}`)
        }
            return response.json()
    })
}

const putVehicle = (costumerObject, id) => {
    return fetch(`${url}/vehicles/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(costumerObject)
    }).then((response) => {
        if(response.status != 200){
            alert(`Server error: ${response.status}`)
        }
            alert(`Edited successfully... ${response.status} `)
    })
}

const deleteVehicle = (id) => {
    return fetch(`${url}/vehicles/${id}`, {
        method: "DELETE"
    }).then((response) => {
        if(response.status != 200){
            alert(`Server error: ${response.status}`)
        }
            return response.json()
    }
)}

// Activities Services

const getActivities = () => {
    return fetch(url + "/activities").then((response) => {
        if(response.status != 200){
            alert(`Server error: ${response.status}`)
        }
            return response.json()
    })
}

const postActivity = (label) => {
    return fetch(url + "/activities/checkin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({label})
    }).then((response) => {
        if(response.status != 200){
            return alert(`Server error: ${response.status}`)
        }
            return response.json()
    })
}

const putActivity = (object) => {
    return fetch(url + "/activities/checkout", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
    }).then((response) => {
        if(response.status != 200){
            return alert(`Server error: ${response.status}`)
        }
            return response.json()
    })
}



export const service = {
    getVehicle,
    postVehicle,
    putVehicle,
    deleteVehicle,
    getActivities,
    postActivity,
    putActivity
}