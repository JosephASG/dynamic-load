import { Router } from "express";
import { getSite, createTurismSite } from "../controllers/sitios.controller.js";
const router = Router()

router.get('/turismsites', getSite)
router.post('/turismsites', createTurismSite)
// router.get('/turismsites/count', getTotalCities)
// router.get('/turismsites/:id', deleteCityId)
// router.delete('/turismsites/:id', deleteCityId)
// router.post('/turismsites/update', updateCityId)


export default router; 