import { getConnection, sql, querys } from "../database"
export const getCliente = async (req, res) => {
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

export const createCliente = async (req, res) => {
    const { fullnameClient, telClient, correoClient, codTurisClient } = req.body;
    let { boolClient } = req.body;

    if (fullnameClient == null || telClient == null || correoClient == null || codTurisClient == null) {
        req.flash('message', 'Bad request. Por favor llene todos los campos');
        return res.redirect('/');
    }

    if (!boolClient) {
        boolClient = false;
    }


    try {
        const pool = await getConnection();

        // Verificar si la ciudad ya existe
        const existingClient = await pool.request()
            .input("emailClient", sql.Char(50), correoClient)
            .query(querys.getEmailClient);

        if (existingClient.recordset.length > 0) {
            req.flash('message', 'El cliente con este correo ya existe');
            return res.redirect('/');
        }

        // Obtén el último código de ciudad registrado
        const lastClient = await pool.request().query(querys.lastCodeClientRegister);

        let nextId = "CLI0001"; // Valor predeterminado si no hay registros

        if (lastClient.recordset.length > 0) {
            const lastId = lastClient.recordset[0].cod_cli;
            const numericPart = parseInt(lastId.substring(3)) + 1;
            nextId = "CLI" + numericPart.toString().padStart(4, '0');
        }

        const result = await pool
            .request()
            .input("idCliente", sql.Char(15), nextId)
            .input("fullnameClient", sql.Char(50), fullnameClient)
            .input("telClient", sql.Char(50), telClient)
            .input("correoClient", sql.Char(50), correoClient)
            .input("boolClient", sql.Bit, boolClient)
            .input("codTurisClient", sql.Char(50), codTurisClient)
            .query(querys.addNewClient);

        req.flash('success', 'Cliente añadido');
        res.redirect('/');
    } catch (error) {
        req.flash('message', 'Error al añadir cliente:', error.message);
        return res.redirect('/');
    }
}