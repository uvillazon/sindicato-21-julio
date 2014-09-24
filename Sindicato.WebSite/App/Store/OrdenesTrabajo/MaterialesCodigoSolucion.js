Ext.define('App.store.OrdenesTrabajo.MaterialesCodigoSolucion', {
    extend: 'Ext.data.Store',
    requires: 'App.model.OrdenesTrabajo.MaterialesCodigoSolucion',
    model: 'App.model.OrdenesTrabajo.MaterialesCodigoSolucion',
    proxy: {
        type: 'jsonp',
        //type: 'ajax'
        url: Constantes.HOST + 'Materiales/ObtenerMaterialesPorSolucion',
        /*reader: {
            type: 'json',
            root: 'data'
        }*/
        reader: {
            root: 'Rows',
            totalProperty: 'Total'
        },
        simpleSortMode: true
    }, sorters: [{
        property: 'COD_ALTERNATIVO',
        direction: 'ASC'
    }]
});