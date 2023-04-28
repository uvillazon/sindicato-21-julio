﻿Ext.define('App.Store.Prestamos.Moras', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Prestamos.Moras',
    url: 'Prestamos/ObtenerMorasPaginados',
    sortProperty: 'ID_MORA',
    sortDirection : 'DESC'
});