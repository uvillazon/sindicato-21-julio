Ext.define('App.Model.OrdenesTrabajo.PersonalTrabajoDiario', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_TD" },
            { type: "int", name: "ID_OT" },
            { type: "int", name: "ID_RESP" },
            { type: "int", name: "ID_MOVIL" },
            { type: "string", name: "NOMBRE" },
            { type: "string", name: "APELLIDO" },
            { type: "string", name: "UNIDAD" },
            { type: "string", name: "AREA" },
            { type: "boolean", name: "active" },
    ],

});