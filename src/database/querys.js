export const querys = {
    getAllCities: 'select * from ciudad',
    addNewCity: 'INSERT INTO ciudad (cod_ciud, nombre_ciud, estado_ciud) VALUES (@idCiud, @nameCiud, @stateCiud)',
    getCityId: 'SELECT * FROM ciudad WHERE cod_ciud = @codCiud',
    deleteCity: 'DELETE FROM ciudad WHERE cod_ciud = @codCiud',
    getTotalCities: 'SELECT COUNT(*) FROM ciudad',
    updateCityId: 'UPDATE ciudad SET nombre_ciud = @nameCiud, estado_ciud = @stateCiud WHERE cod_ciud = @idCiud',
    lastCodeCityRegister: 'SELECT TOP 1 cod_ciud FROM ciudad ORDER BY cod_ciud DESC',
    getCityName: 'SELECT * FROM ciudad WHERE nombre_ciud = @nameCiud',
    //Sitios turísticos
    getAllSites: 'select * from turisticos',
    addNewTurisSite: 'INSERT INTO turisticos (cod_turis, nombre_turis, direccion_turis,telefono_turis,estado_turis,cod_ciud) VALUES (@idSite, @nameSite, @locationSite,@telSite,@boolSite,@codCiud)',
    getTurisSiteName: 'SELECT * FROM turisticos WHERE nombre_turis = @nameSite',
    lastCodeSiteRegister: 'SELECT TOP 1 cod_turis FROM turisticos ORDER BY cod_turis DESC',
    // Clientes
    getAllClients: 'select * from cliente',
    addNewClient: 'INSERT INTO cliente (cod_cli, nombre_cli, telefono_cli,correo_cli,estado_cli,cod_turis) VALUES (@idCliente, @fullnameClient, @telClient,@correoClient,@boolClient,@codTurisClient)',
    getEmailClient: 'SELECT * FROM cliente WHERE correo_cli = @emailClient',
    lastCodeClientRegister: 'SELECT TOP 1 cod_cli FROM cliente ORDER BY cod_cli DESC'
}