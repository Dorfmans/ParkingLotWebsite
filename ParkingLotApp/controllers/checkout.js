import { service } from "../services/index.js"
import { view } from "../view/index.js"

export const CheckoutComponent = (params) => {
    view.getSpinner()

    setTimeout(() => {

        view.getCheckout()
    
        service.getVehicle().then((datas) => {
            datas.forEach(element => {
                if(element.id == params) {
                    addParamsToScreen(element)
                    searchActivity(params)
                }
            })
        })
    }, 600)}
    
let label = ''
const addParamsToScreen = (object) => {
    label = object.label
    const newLine = document.getElementById('tbody')
    const htmlData = `
        <td>${object.owner}</td>
        <td>${object.model}</td>
        <td>${object.label}</td>
    `
    newLine.innerHTML = htmlData
}

const searchActivity = (id) => {
    service.getActivities().then((datas) => {
        datas.forEach((element) => {
            if(element.vehicle_id == id) {
                addParamsToInput(element)
            }
        })
    })
}

const hourPrice = 5
const minutesPrice = hourPrice / 60

const addParamsToInput = (object) => {
    const checkinAt = new Date(object.checkin_at)
    const checkoutAt = new Date()
    const hoursParkedInMs = checkoutAt - checkinAt
    const hoursParked = getHours(hoursParkedInMs)
    const receipt = (hoursParked.minutes + (hoursParked.hours * 60)) * minutesPrice
    const hoursParkedInput = document.getElementById('hoursParked')
    const receiptInput = document.getElementById('receipt')
    
    if (hoursParked.minutes < 10 && hoursParked.hours < 10)
        hoursParkedInput.value = `Hours Parked 0${hoursParked.hours}:0${hoursParked.minutes}`
    
    if (hoursParked.hours < 10)
        hoursParkedInput.value = `Hours Parked 0${hoursParked.hours}:${hoursParked.minutes}`

    if (hoursParked.minutes < 10)
        hoursParkedInput.value = `Hours Parked ${hoursParked.hours}:0${hoursParked.minutes}`
        
    if (receipt < 10) {
        receiptInput.value = `$: 0${receipt.toFixed(2)}`
    
    } else {
        receiptInput.value = `$: ${receipt.toFixed(2)}` 
    }

    const checkout = document.getElementById('checkout')
    checkout.addEventListener('click', () => {
        const price = document.getElementById('receipt').value
        const stringPrice = price.split(' ')
        const object = {
            label: label,
            price: Number(stringPrice[1])
        }
        checkoutApi(object)
    })
}


const getHours = (timeInMs) => {
    const hoursAndMinutes = {
        hours: +(timeInMs / 3600000).toFixed(0),
        minutes: +((timeInMs / 60000) % 60).toFixed(0)
    }
    return hoursAndMinutes
}

const checkoutApi = (object) => {
    service.putActivity(object).then(() => {
        window.location.href = "../checkin.html"
    })
}