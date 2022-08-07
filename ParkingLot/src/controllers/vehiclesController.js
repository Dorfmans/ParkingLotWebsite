import { openDatabase } from "../database.js";

export const getVehicle = async (request, response) => {
    const db = await openDatabase();

    const vehicles = await db.all(`SELECT * FROM vehicles`);
    db.close();
    response.send(vehicles);
}

export const postVehicle = async (request, response) => {
    const { model, label, type, owner, obs } = request.body;

    const db = await openDatabase();

    const data = await db.run(
        `
        INSERT INTO 
            vehicles (model, label, type, owner, obs)
        VALUES (?, ?, ?, ?, ?)
        `,
        [model, label, type, owner, obs]
    );
    db.close();
    response.send({
        id: data.lastID,
        model,
        label,
        type,
        owner,
        obs,
    });
}

export const putVehicle = async (request, response) => {
    const { model, label, type, owner, obs } = request.body;
    const { id } = request.params;

    const db = await openDatabase()

    const vehicle = await db.get(
        `
        SELECT * FROM vehicles
        WHERE id = ?
        `,
        [id]
    )

    if(vehicle) {
        const data = await db.run(
            `
            UPDATE vehicles
                SET model = ?,
                    label = ?,
                    type = ?,
                    owner = ?,
                    obs= ?
            WHERE id= ?
            `,
            [model, label, type, owner, obs, id]
        )

            db.close()

            response.send({
                id,
                model,
                label,
                type,
                owner,
                obs,
            })

        return
    }

    db.close()
    response.send(vehicle || {})
}

export const deleteVehicle = async (request, response) => { 
    const { id } = request.params;
    
    const db = await openDatabase()
    
    const { model, label } = await db.get(
        `
        SELECT model, label FROM vehicles
        `
    )
    const data = await db.get(
        `
        DELETE FROM vehicles
        WHERE id = ?
        `,
        [id]
    )
    db.close()
    response.send({
        id,
        message: `[ ${model}, label: ${label} ] deleted successfully...`
    })
}