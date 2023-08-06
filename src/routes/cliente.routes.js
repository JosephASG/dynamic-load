import { Router } from "express";
import { getCliente, createCliente } from "../controllers/cliente.controller.js";
const router = Router()

router.get('/cliente', getCliente)
router.post('/cliente', createCliente)
// router.get('/cliente/count', getTotalCities)
// router.get('/cliente/:id', deleteCityId)
// router.delete('/cliente/:id', deleteCityId)
// router.post('/cliente/update', updateCityId)


export default router; 