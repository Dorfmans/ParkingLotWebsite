import { CostumersListComponent } from "./controllers/costumersList.js";
import { RevenueComponent } from "./controllers/revenue.js";
import { SignUpComponent } from "./controllers/signup.js";
import { view } from "./view/index.js" 

view.getSpinner()
    setTimeout(() => {
        view.getIndex();
    }, 600)

const link = document.getElementById('link')

link.addEventListener('click', (e) => {
    const option = e.path[0].innerText

    switch(option) {
        case "Sign Up":
            SignUpComponent()
            break
        case "Costumers":
            CostumersListComponent()
            break
        case "Check-In":
            window.location.href = "./checkin.html"
            break
        case "Revenue":
            RevenueComponent()
            break
        default : view.getIndex()
    }
})