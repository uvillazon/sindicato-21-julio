Ext.define('App.Store.OrdenesTrabajo.OrdenesTrabajoResponsable', {
    alternateClassName: 'App.store.OrdenesTrabajo.OrdenesTrabajoResponsable',
    extend: 'Ext.data.Store',
    model: 'App.Model.OrdenesTrabajo.OrdenesTrabajo',
    remoteSort: true,
    autoLoad: false,//siempre false
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'OrdenesTrabajo/ObtenerOrdenesTrabajoPorResponsable',
        reader: {
            root: 'Rows',
            totalProperty: 'Total'
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'ID_OT',
        direction: 'DESC'
    }]
});