Ext.define('App.Model.Paradas.Paradas', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_PARADA" },
            { type: "int", name: "ID_CAJA" },
            { type: "string", name: "NOMBRE" },
            { type: "string", name: "CAJA" },
            { type: "string", name: "DIRECCION" },
            { type: "string", name: "RESPONSABLE" },
            { type: "string", name: "DESCRIPCION" },
            { type: "date", name: "FECHA_INICIO", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_FIN", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "string", name: "ESTADO" },
            { type: "int", name: "ID_USUARIO" },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        ]
});