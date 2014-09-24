Ext.define('App.Model.Cajas.Cajas', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "SALDO" },
            { type: "int", name: "ID_CAJA" },
            { type: "string", name: "DESCRIPCION" },
            { type: "string", name: "MONEDA" },
            { type: "string", name: "NRO_CUENTA" },
            { type: "string", name: "NOMBRE" },
            { type: "string", name: "CODIGO" }
        ]
});