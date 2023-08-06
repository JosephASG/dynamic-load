import { getConnection, sql, querys } from "../database"
export const getSite = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query(querys.getAllSites)
        console.log(result)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const createTurismSite = async (req, res) => {
    const { nameSite, locationSite, telSite, codCiud } = req.body;
    let { boolSite } = req.body;

    if (nameSite == null || locationSite == null || telSite == null || codCiud == null) {
        req.flash('message', 'Bad request. Por favor llene todos los campos');
        return res.redirect('/');
    }

    if (!boolSite) {
        boolSite = false;
    }


    try {
        const pool = await getConnection();

        // Verificar si la ciudad ya existe
        const existingSite = await pool.request()
            .input("nameSite", sql.Char(50), nameSite)
            .query(querys.getTurisSiteName);

        if (existingSite.recordset.length > 0) {
            req.flash('message', 'El sitio turístico ya existe');
            return res.redirect('/');
        }

        // Obtén el último código de ciudad registrado
        const lastSite = await pool.request().query(querys.lastCodeSiteRegister);

        let nextId = "ST0001"; // Valor predeterminado si no hay registros

        if (lastSite.recordset.length > 0) {
            const lastId = lastSite.recordset[0].cod_turis;
            const numericPart = parseInt(lastId.substring(2)) + 1;
            nextId = "ST" + numericPart.toString().padStart(4, '0');
        }

        const result = await pool
            .request()
            .input("idSite", sql.Char(15), nextId)
            .input("nameSite", sql.Char(50), nameSite)
            .input("locationSite", sql.Char(50), locationSite)
            .input("telSite", sql.Char(50), telSite)
            .input("boolSite", sql.Bit, boolSite)
            .input("codCiud", sql.Char(50), codCiud)
            .query(querys.addNewTurisSite);

        req.flash('success', 'Sitio turístico agregado');
        res.redirect('/');
    } catch (error) {
        req.flash('message', 'Error al crear sitio turístico:', error.message);
        return res.redirect('/');
    }
}

export const getCityId = async (req, res) => {
    const { id } = req.params;

    const pool = await getConnection();
    try {
        const result = await pool.request()
            .input('codCiud', sql.Char, id)
            .query(querys.getCityId);

        console.log(result);

        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).json({ msg: 'City not found' });
        }
    } catch (error) {
        console.error("Error fetching city data:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export const deleteCityId = async (req, res) => {
    const { id } = req.params;

    const pool = await getConnection();
    try {
        const result = await pool.request()
            .input('codCiud', sql.Char, id)
            .query(querys.deleteCity);

        if (result.rowsAffected[0] > 0) {
            req.flash('success', 'Ciudad eliminada correctamente');
            res.redirect('/');
        } else {
            req.flash('message', 'Ciudad no encontrada');
            res.redirect('/');
        }
    } catch (error) {
        console.error("Error deleting city:", error);
        req.flash('message', 'Error eliminando ciudad: ', error.message);
        res.redirect('/');
    }
}

export const getTotalCities = async (req, res) => {

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .query(querys.getTotalCities);

        console.log(result);

        res.json({ msg: 'Get successfully', result: result.recordset[0][''] });

    } catch (error) {
        console.error("Error getting cities count:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export const updateCityId = async (req, res) => {
    const { idCiudad, nombreCiudad, estadoCiudad } = req.body;

    if (nombreCiudad == null || estadoCiudad === null) {
        req.flash('message', 'Bad request. Por favor llene todos los campos');
        return res.redirect('/');
    }

    const pool = await getConnection();

    try {
        const result = await pool
            .request()
            .input("nameCiud", sql.Char(50), nombreCiudad)
            .input("stateCiud", sql.Bit, estadoCiudad)
            .input("idCiud", sql.Char(15), idCiudad)
            .query(querys.updateCityId);

        if (result.rowsAffected[0] > 0) {
            req.flash('success', 'Ciudad actualizada correctamente');
            res.redirect('/');
        } else {
            req.flash('message', 'Ciudad no encontrada.');
            return res.redirect('/');
        }
    } catch (error) {
        console.error("Error updating city:", error);
        req.flash('message', 'Error al actualizar la ciudad:', error.message);
        return res.redirect('/');
    }
}
