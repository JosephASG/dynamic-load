import { getConnection, sql, querys } from "../database"


export const getData = async (req, res) => {
    try {
        const pool = await getConnection()
        const resultCities = await pool.request().query(querys.getAllCities)
        const resultTurisSites = await pool.request().query(querys.getAllSites)
        const resultClient = await pool.request().query(querys.getAllClients)

        const citiesJSON = resultCities.recordset;
        const sitesJSON = resultTurisSites.recordset;
        const clientsJSON = resultClient.recordset;

        res.render('index', { ciudad: citiesJSON, sitios: sitesJSON, clientes: clientsJSON });
    } catch (error) {
        req.flash('message', 'Error al obtener los datos');
        res.redirect('/');
    }
};
