﻿Ext.define('App.Store.Ingresos.Ingresos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Ingresos.Ingresos',
    url: 'Transferencias/ObtenerIngresosPaginados',
    sortProperty: 'ID_INGRESO'
});