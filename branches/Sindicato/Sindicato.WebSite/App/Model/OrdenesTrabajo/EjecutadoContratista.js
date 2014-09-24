Ext.define('App.model.OrdenesTrabajo.EjecutadoContratista', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'ID_TE', type: 'int' },
        { name: 'ID_OT', type: 'int' },
        { name: 'ID_SOL_MAN', type: 'int' },
        { name: 'LUGAR_TRABAJO' },
        { name: 'COD_FUENTE' },
        { name: 'INSTRUCCIONES' },
        { name: 'FECHA_EJE_INI', type: 'date' },
        { name: 'FECHA_EJE_FIN', type: 'date' },
        { name: 'DISTANCIA', type: 'int' },
        { name: 'INCR_DOMG' },
        { name: 'INCR_TERR' },
        { name: 'INCR_EMER' }
    ]
});