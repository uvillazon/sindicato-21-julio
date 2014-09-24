Ext.define('App.Store.OrdenesTrabajo.DetallesReemplazo', {
    extend: 'Ext.data.Store',
    model: 'App.Model.OrdenesTrabajo.DetallesReemplazo',
    remoteSort: true,
    autoLoad: false,//siempre false
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'OrdenesTrabajo/ObtenerOrdenesTrabajoPaginado',
        reader: {
            root: 'Rows',
            totalProperty: 'Total'
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'TIPO_OT',
        direction: 'ASC'
    }]
});