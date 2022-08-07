import express from "express";

import { checkin, checkout, deleteActivity, getActivity } from "./src/controllers/activitiesController.js";
import { deleteVehicle, getVehicle, postVehicle, putVehicle } from "./src/controllers/vehiclesController.js";

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    next();
})

app.use(express.json());

app.get("/api/vehicles", getVehicle);
app.post("/api/vehicles", postVehicle);
app.put("/api/vehicles/:id", putVehicle);
app.delete("/api/vehicles/:id", deleteVehicle);


app.get('/api/activities', getActivity)
app.post('/api/activities/checkin', checkin)
app.put('/api/activities/checkout', checkout)
app.delete('/api/activities/:id', deleteActivity)


app.listen(8000, () => {
    console.log("8000 is running...");
});