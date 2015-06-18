Ext.define('App.Model.Descuentos.Descuentos', {
    extend: 'Ext.data.Model',
    fields: [
                { type: "int", name: "ID_DESCUENTO" },
                { type: "int", name: "ID_CIERRE" },
                { type: "string", name: "PERIODO" },
                { type: "string", name: "DESCUENTO" },
                { type: "string", name: "DESCRIPCION" },
                { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
                { type: "float", name: "TOTAL" },
                { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
                { type: "string", name: "ESTADO" },
                { type: "string", name: "LOGIN" }
        ]
});