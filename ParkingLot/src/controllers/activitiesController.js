import { openDatabase } from "../database.js"

export const checkin = async (request, response) => {
    const { label } = request.body
    
    const db = await openDatabase()
    const vehicle = await db.get(
        `
        SELECT * FROM vehicles
        WHERE label = ?
        `,
        [label]
    )

    if(vehicle) {
        const checkinAt  = (new Date()).getTime()
        const data = await db.run(
            `
            INSERT INTO activities (vehicle_id, checkin_at)
            VALUES (?, ?)
            `,
            [vehicle.id, checkinAt]
        )
        db.close()
        response.send({
            vehicle_id: vehicle.id,
            message: `[ ${vehicle.model}, label: ${vehicle.label} checked-in at ${new Date(checkinAt)} ]`
        })
        return
    }
    db.close()
    response.status(404)
    response.send({
        message: `label: ${label} not found...`
    })
}

export const checkout = async (request, response) => {
        const { label, price } = request.body
    
    const db = await openDatabase()
    const vehicle = await db.get(
        `
        SELECT * FROM vehicles
        WHERE label = ?
        `,
        [label]
    )

    if(vehicle) {
        const hasActivity = await db.get(
        `
        SELECT * FROM activities
        WHERE vehicle_id = ?
        AND checkout_at IS NULL
        `,
        [vehicle.id]
        )
        
        if(hasActivity) {
            const checkoutAt  = (new Date()).getTime()
            const data = await db.run(
                `
                UPDATE activities
                    SET checkout_at = ?,
                        price = ?
                    WHERE id = ?
                `,
                [checkoutAt, price, hasActivity.id ]
                )
                db.close()
                response.send({
                    vehicle_id: vehicle.id,
                    message: `[ ${vehicle.model}, label: ${vehicle.label} ] checked-out at ${checkoutAt}. Price: ${price}`
                })

                return
        }  

        db.close()
        response.status(400)
        response.send({
            message: `label: ${label} did not checked-in...`
        })
    }

    db.close()
    response.status(404)
    response.send({
        message: `label: ${label} not found...`
    })
}

export const deleteActivity = async (request, response) => {
    const { id } = request.params;
    
    const db = await openDatabase()
    
    const data = await db.get(
        `
        DELETE FROM activities
        WHERE id = ?
        `,
        [id]
    )
    db.close()
    response.send({
        id,
        message: `[ Receipt ${id} ] deleted successfully...`
    })
}

export const getActivity = async (request, response) => {
    const db = await openDatabase();

    const activities = await db.all(`SELECT * FROM activities`);
    db.close();
    response.send(activities);
}