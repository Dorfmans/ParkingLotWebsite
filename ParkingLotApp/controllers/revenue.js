import { view } from "../view/index.js"
import { service } from "../services/index.js"


export const RevenueComponent = () => {
    view.getSpinner()
    setTimeout(() => {

        view.getRevenue()
        
        let revenueObject = []
        
        service.getActivities().then((datas) => {
            datas.forEach(element => {
                if(element.price != null) {
                revenueObject.push(element)
            }
        })
        dateGenerate()
        revenueGenerate()
    })

    let filteredDates = []
    const dateGenerate = () => {
        const rawDates = []
        revenueObject.forEach((element) => {
            rawDates.push(dateConverter(element.checkout_at))
        })
        filteredDates = new Set(rawDates)
        
    }
    
    const dateConverter = (time) => {
        const date = new Date(time).getDate()
        return date
    }
    
    const revenueGenerate = () => {
        let value = {
            counter: 0,
            total: 0
        }
        revenueObject.forEach((element) => {
            if(typeof element.price == 'number') {
                value.counter++
                value.total += element.price
            }
        })
        createNewLine(value)
        createOptions(filteredDates)
    }
    const table = document.getElementById('tbody')
    
    const createNewLine = (value) => {
        const newLine = document.createElement('tr')
        const htmlData = `
        <td id="counter">${value.counter}</td>
        <td id="total">$ ${value.total.toFixed(2)}</td>
        <td><select id="dates"></select></td>
        `
        newLine.innerHTML = htmlData
        renderGraph()
        return table.appendChild(newLine)
    }
    
    const createOptions = (dates) => {
        const select = document.getElementById('dates')
        dates.forEach((element) => {
            const option = new Option(element, element)
            select.add(option)
        })
    }
    
    table.addEventListener('click', (e) => {
        if(e.path[0].id == 'dates') {
            filterByDate(e)
        }
    })
    
    const filterByDate = (e) => {
        const day = e.path[0].value
        let value = {
            counter: 0,
            total: 0
        }
        revenueObject.forEach((element) => {
            if(dateConverter(element.checkout_at) == day) {
                value.counter++
                value.total += element.price
            }
        })
        updateHmtl(value)
    }
    
    const updateHmtl = (value) => {
        document.getElementById('counter').innerText = value.counter
        document.getElementById('total').innerHTML = `$ ${value.total.toFixed(2)}`
    }

    let piechart = [['Day', 'Revenue']]
    
    const filterRevenueByDate = (dates) => { 
        let value = {
            counter: 0,
            total: 0
        }
        
        dates.forEach((e) => {
            value.total = 0
            revenueObject.forEach((element) => {
                if(dateConverter(element.checkout_at) == e) {
                    value.counter++
                    value.total += element.price
                }
            })
            piechart.push([`${e}` , +value.total.toFixed(2)])
        })
    }
    
    const renderGraph = () => {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        
        function drawChart() {
            filterRevenueByDate(filteredDates)
        var data = google.visualization.arrayToDataTable(piechart);
        
        var options = {
            is3D: true
        };
        
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        
        chart.draw(data, options);
    }
}}, 600)}