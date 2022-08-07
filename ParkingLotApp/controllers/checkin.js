import { view } from "../view/index.js"
import { service } from "../services/index.js"

import { SignUpComponent } from "./signup.js"
import { CheckoutComponent } from "./checkout.js"

view.getSpinner()
setTimeout(()=>{

    view.getCheckin()
    
    let checkedinId = []
    
    service.getActivities().then((datas) => {
        datas.forEach(element => {
            if(element.checkout_at == null){
                checkedinId.push(element.vehicle_id)
            }
        })
        getVehicle()
    })
    
    let vehicles = []
    const getVehicle = () => {
        service.getVehicle().then((datas) => {
            datas.forEach(element => {
                if(checkedinId.includes(element.id)) {
                    createNewLine(element)
                }
                if(element.label != null){
                    vehicles.push(element)
                }
            })
            createOptions(vehicles)
        })
    }
    
    const createNewLine = (object) => {
        const table = document.getElementById('tbody')
    
        const newLine = document.createElement('tr')
    
        const htmlData = `
            <td>${object.model}</td>
            <td>${object.label}</td>
            <td>
                <a id="${object.id}" class="checkin__table__item">Check-Out</a>
            </td>
        `
    
        newLine.innerHTML = htmlData
        return table.appendChild(newLine)
    }
    
    const createOptions = (vehicles) => {
        const hasVehicles = []
        vehicles.forEach((element) => {
            if(checkedinId.includes(element.id)){
                return
            }
                hasVehicles.push(element)
        })
    
        const select = document.getElementById('select')
        hasVehicles.forEach((element) => {
            const option = new Option(element.label, element.id)
            select.add(option)
        })
    }
    
    const main = document.getElementById('root')
    
    main.addEventListener('click', (e) => {
        const button = e.path[0].innerText
        const id = e.path[0].id
    
        if(button === 'Check-Out'){
            CheckoutComponent(id)
        }
    
        if(button === 'Check-In'){
            const select = document.getElementById('select')
            searchID(select.value)
    
        }
    
        if(button === 'Add New'){
            SignUpComponent()
        }
    })
    
    const searchID = (id) => {
        service.getVehicle().then((datas) => {
            datas.forEach((element) => {
                if(element.id == id) {
                    checkinApi(element)
                }
            })
        })
    }
    
    const checkinApi = (object) => {
        service.postActivity(object.label).then((datas) => {
            alert(datas.message)
            window.location.reload()
        })
    }
}, 600)