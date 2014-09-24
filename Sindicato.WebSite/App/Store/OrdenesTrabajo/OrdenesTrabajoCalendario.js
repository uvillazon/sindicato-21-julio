Ext.define('App.Store.OrdenesTrabajo.OrdenesTrabajoCalendario', {
    extend: 'Extensible.calendar.data.EventStore',
    autoLoad: false,//siempre false
    proxy: {
        type: 'ajax',
        url: Constantes.HOST + 'OrdenesTrabajo/ObtenerOrdenesTrabajoPorResponsableCalendario',
        noCache: false,

        reader: {
            type: 'json',
            root: 'data'
        }
    }
});