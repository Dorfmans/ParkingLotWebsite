import { service } from "../services/index.js"
import { view } from "../view/index.js"
import { CostumersListComponent } from "./costumersList.js"


export const  UpdateComponent = (params) => {
    const labels = []
    view.getSpinner();
    setTimeout(() => {

        service.getVehicle().then((datas) => {
            datas.forEach(element => {
                if(element.label != null){
                    labels.push(element.label)
                }
            })
        })
        
        view.getUpdate()
    
        service.getVehicle().then((datas) => {
            datas.forEach(element => {
                if(element.id == params){
                    paramsToInput(element)
                }
            })
        })
        const forms = document.getElementById("signup")
    
        forms.addEventListener("submit", (e) => {
        e.preventDefault()
        
            const updateCostumer = {
                owner: document.getElementById('owner').value,
                model: document.getElementById('model').value,
                label: document.getElementById('label').value,
                type: document.getElementById('type').value,
                obs: document.getElementById('obs').value
            } 
    
            if(labels.includes(updateCostumer.label)) {
                return alert(`Label: ${updateCostumer.label} already signed up`)
            }else{
                service.putVehicle(updateCostumer, params).then(() => {
                    forms.reset()
                    CostumersListComponent()
                })
            }
    
        })
        const cancel = document.getElementById("cancel")
            cancel.addEventListener('click', (e) => {
                e.preventDefault()
                forms.reset()
                CostumersListComponent()
            })    
    }, 600)
}

const paramsToInput = (object) => {
    document.getElementById('owner').value = object.owner
    document.getElementById('model').value = object.model
    document.getElementById('label').value = object.label
    document.getElementById('type').value = object.type
    document.getElementById('obs').value = object.obs
}
