import { service } from '../services/index.js'
import { view } from '../view/index.js'

export const SignUpComponent = () => {
    view.getSpinner()
    setTimeout(() => {
        const labels = []
        service.getVehicle().then((datas) => {
            datas.forEach(element => {
                if(element.label != null){
                    labels.push(element.label)
                }
            })
        })
    
        view.getSignUp()
    
        const forms = document.getElementById("signup")
    
        forms.addEventListener("submit", (e) => {
        e.preventDefault()
        
        const signupCostumer = {
            owner: document.getElementById('owner').value,
            model: document.getElementById('model').value,
            label: document.getElementById('label').value,
            type: document.getElementById('type').value,
            obs: document.getElementById('obs').value
        }
        if(labels.includes(signupCostumer.label)) {
            return alert(`Label: ${signupCostumer.label} already signed up`)
        }else{
            forms.reset()
            service.postVehicle(signupCostumer)
        }
    
        })
        const cancel = document.getElementById("cancel")
            cancel.addEventListener('click', (e) => {
                e.preventDefault()
                forms.reset()
            })   
    }, 600)
}