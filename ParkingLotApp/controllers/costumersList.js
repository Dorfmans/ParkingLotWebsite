import { service } from "../services/index.js"
import { view } from "../view/index.js"
import { UpdateComponent } from "./update.js"

export const CostumersListComponent = () => {
    view.getSpinner()

    setTimeout(() => {
        view.getCostumersList()

    service.getVehicle().then((datas) => {
        datas.forEach((element) => {

            if(element.label != null){
                createNewLine(
                    element.owner,
                    element.model,
                    element.label,
                    element.type,
                    element.obs,
                    element.id
                    )
            }
        })
    })
    const table = document.getElementById('tbody')
    table.addEventListener('click', (e) => {
    const button = e.path[0].innerText
    const id = e.path[0].id

    if(button === 'Edit'){
        UpdateComponent(id)
    }

    if(button === 'Delete'){
        deleteCostumer(id)
    }})}, 600)
}

const createNewLine = (owner, model, label, type, observartions, id) => {
    const table = document.getElementById('tbody')

    const newLine = document.createElement('tr')

    const htmlData = `
        <td class="none">${owner}</td>
        <td>${model}</td>
        <td>${label}</td>
        <td class="none">${type}</td>
        <td class="none">${observartions}</td>
        <td>
            <div class="costumerList__container__button">
                <a id="${id}" class="costumersList__table__button">Edit</a>
                <a id="${id}" class="costumersList__table__button" type="button">Delete</a>
            </div>
        </td>
    `

    newLine.innerHTML = htmlData
    return table.appendChild(newLine)
}

const deleteCostumer = (id) => {
    service.deleteVehicle(id).then(() => {
        CostumersListComponent()
    })
}