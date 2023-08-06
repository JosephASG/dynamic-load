import { Router } from "express";
import { getCity, getCityId, createCity, deleteCityId, getTotalCities, updateCityId } from "../controllers/city.controller.js";
const router = Router()

router.get('/city', getCity)
router.post('/city', createCity)
router.get('/city/count', getTotalCities)
router.get('/city/:id', deleteCityId)
router.post('/city/update', updateCityId)


export default router; 