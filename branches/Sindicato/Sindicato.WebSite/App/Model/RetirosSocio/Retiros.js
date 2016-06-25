Ext.define('App.Model.RetirosSocio.Retiros', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_RETIRO" },
            { type: "int", name: "ID_SOCIO_MOVIL" },
            { type: "int", name: "NRO_MOVIL" },
            { type: "float", name: "RETIRO" },
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "string", name: "OBSERVACION" },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "string", name: "LOGIN" },
            { type: "string", name: "ESTADO" },
            { type: "string", name: "SOCIO" },
            { type: "string", name: "CAJA" },
            

        ]
});