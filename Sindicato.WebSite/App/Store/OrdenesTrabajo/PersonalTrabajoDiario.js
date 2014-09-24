Ext.define('App.Store.OrdenesTrabajo.PersonalTrabajoDiario', {
    alternateClassName: 'App.store.OrdenesTrabajo.PersonalTrabajoDiario',
    extend: 'Ext.data.Store',
    model: 'App.Model.OrdenesTrabajo.PersonalTrabajoDiario',
    autoLoad: false,//siempre false
    proxy: {
        type: 'ajax',
        url: Constantes.HOST + 'OrdenesTrabajo/ObtenerPersonalMovilOrdenTrabajo',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});