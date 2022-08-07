const getIndex = () => {
    const main = document.getElementById('root')
    const dadosHtml = `
        <section class="index">
            <h1 class="index__item">WELCOME TO...</h1>
            <a class="index__link" href="../checkin.html"><img src="../assets/img/index.png" /></a>
        </section>
        `
    main.innerHTML = dadosHtml
}

const getSpinner = () => {
    const main = document.getElementById('root')
    const dadosHtml = `
    <section class="container">
        <div id="spinner"></div>
    </section>
      `
    main.innerHTML = dadosHtml

}

const getSignUp = () => {
    const main = document.getElementById('root')

    const htmlData = `
        <form class="signup" id="signup">
            <h1 class="signup__title">New Costumer</h1>
            <label>Costumer Name</label>
            <input id="owner" type="text" placeholder="Insert your name...">

            <label>Vehicle Model</label>
            <input id="model" type="text" placeholder="Insert the vehicle model...">

            <label>Vehicle Label</label>
            <input id="label" type="text" placeholder="Insert the vehicle label...">

            <label>Vehicle Type</label>
            <select id="type" type="text" placeholder="Insert the vehicle type...">
                <option value="1">Car</option>
                <option value="2">Motorcycle</option>
            </select>

            <label>Observations</label>
            <input id="obs" type="text" placeholder="Insert your observation...">

            <div class="signup__item">
                <button class="button" id="cancel" type="button">Cancel</button>
                <button class="button" id="submit" type="submit">Submit</button>
            </div>
        </form>
    `
    main.innerHTML = htmlData
}

const getCostumersList = () => {
    const main = document.getElementById('root')

    const htmlData = `
        <section class="costumersList">
            <h1 class="costumersList__title">Costumers List</h1>
                <table class="costumersList__table" id="tbody">
                    <tr id="tr">
                        <th class="none">Owner</th>
                        <th>Model</th>
                        <th >Label</th>
                        <th class="none">Type</th>
                        <th class="none">Observations</th>
                        <th><a>New</a></th>
                    </tr>
                </table>
        </section>
    `
    main.innerHTML = htmlData
}

const getUpdate = () => {
    const main = document.getElementById('root')

    const htmlData = `
        <form class="signup" id="signup">
            <h1 class="signup__title">Edit Costumer</h1>
            <label>Costumer Name</label>
            <input id="owner" type="text" placeholder="Insert your name...">

            <label>Vehicle Model</label>
            <input id="model" type="text" placeholder="Insert the vehicle model...">

            <label>Vehicle Label</label>
            <input id="label" type="text" placeholder="Insert the vehicle label...">

            <label>Vehicle Type</label>
            <select id="type" type="text" placeholder="Insert the vehicle type...">
                <option value="1">Car</option>
                <option value="2">Motorcycle</option>
            </select>

            <label>Observations</label>
            <input id="obs" type="text" placeholder="Insert your observation...">

            <div signup__item>
                <button class="button" id="cancel" type="button">Cancel</button>
                <button class="button" id="submit" type="submit">Update</button>
            </div>
        </form>
    `
    main.innerHTML = htmlData
}

const getCheckin = () => {
    const main = document.getElementById('root')

    const htmlData = `
        <section class="checkin">
            <h2 class="checkin__title">Current Checked-In</h2>

            <table id="tbody" class="checkin__table">
                <tr>
                    <th>Model</th>
                    <th>Label</th>
                    <th>Option</th>
                </tr>
            </table>
            <div class="checkin__item">
                <label>Label</label>
                <select class="checkin__input" id="select"></select>
                <a class="checkin__item__link" type="button" id="addNew">Add New</a>
    
                <div class="checkin__button">
                    <button id="checkin" class="button">Check-In</button>
                </div>
            </div>
        </section>
    `
    main.innerHTML = htmlData
}

const getCheckout = () => {
    const main = document.getElementById('root')

    const htmlData = `
        <section class="checkout">
            <h2 class="checkout__title">Costumer Data</h2>
            <table class="checkout__table">
                <tr>
                    <th>Costumer</th>
                    <th>Model</th>
                    <th>Label</th>
                </tr>
                <tr id="tbody"></tr>
            </table>
            <div class="checkout_item">
                <label>Hours Parked</label>
                <input class="input" id="hoursParked" type="text" placeholder="Hours parked..." disabled/>
            </div>

            <div class="checkout__item">
                <label>Receipt</label>
                <input class="input" id="receipt" type="text" placeholder="Receipt..." disabled/>
            </div>

            <div class="checkout__button">
                    <button id="checkout" class="button">Check-Out</button>
            </div>
        </section>
    `
    main.innerHTML = htmlData
}

const getRevenue = () => {
    const main = document.getElementById('root')

    const htmlData = `
        <section class="revenue">
            <h1 class="revenue__title">Revenue List</h1>
            <table class="revenue__table">
                <thead>
                    <tr>
                        <th>Vehicles Count</th>
                        <th>Total</th>
                        <th>Day</th>
                    </tr>
                </thead>
                <tbody id="tbody"></tbody>
            </table>
            <div class="revenue__graph">
                <div id="piechart"></div>
            </div>
        </section>
    `
    main.innerHTML = htmlData
}


export const view = {
    getSignUp,
    getCostumersList,
    getUpdate,
    getCheckin,
    getCheckout,
    getRevenue,
    getIndex,
    getSpinner
}