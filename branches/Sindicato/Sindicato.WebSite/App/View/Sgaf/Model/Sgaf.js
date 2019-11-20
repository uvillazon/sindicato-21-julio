Ext.define('App.View.Sgaf.Model.Sgaf', {
    extend: 'Ext.data.Model',
    fields: [
        {
            type: "string", name: "ID", convert: function (v,record) {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }
        },
        { type: "int", name: "ID_LINEA" },
        { type: "int", name: "ID_STATUS", defaultValue: 0 },
        { type: "string", name: "FECHA_CONTABILIDAD" },
        { type: "string", name: "TIPO_CONTABILIZACION" },
        { type: "string", name: "IDPROVEEDOR" },
        { type: "string", name: "NIT_PROVEEDOR" },
        { type: "string", name: "FECHA_FACTURA" },
        { type: "string", name: "NRO_AUTORIZACION" },
        { type: "string", name: "NRO_FACT_PROV" },
        { type: "string", name: "NIT_ELFEC" },
        { type: "string", name: "COD_CONTROL" },
        { type: "string", name: "PLACA" },
        { type: "string", name: "OBSERVACIONES" },
        { type: "string", name: "PRECIO_UNI" },
        { type: "string", name: "IMPORTE_TOTAL" },
        { type: "string", name: "AUXILIAR" },
        { type: "string", name: "IDOBRA" },
        { type: "string", name: "CENTRO_COSTOS" },
        { type: "string", name: "GRUPO_CC" },
        { type: "string", name: "IDPRODUCTO" },
        { type: "string", name: "RESULTADO" }


        /*
         { type: "int", name: "ID_LINEA" },
        { type: "int", name: "ID_STATUS" },
        { type: "date", name: "FECHA_CONTABILIDAD", dateFormat: "d/m/Y" },
        { type: "string", name: "TIPO_CONTABILIZACION" },
        { type: "int", name: "IDPROVEEDOR" },
        { type: "string", name: "NIT_PROVEEDOR" },
        { type: "date", name: "FECHA_FACTURA", dateFormat: "d/m/Y" },
        { type: "string", name: "NRO_AUTORIZACION" },
        { type: "string", name: "NRO_FACT_PROV" },
        { type: "string", name: "NIT_ELFEC" },
        { type: "string", name: "COD_CONTROL" },
        { type: "string", name: "PLACA" },
        { type: "string", name: "OBSERVACIONES" },
        { type: "float", name: "PRECIO_UNI" },
        { type: "float", name: "IMPORTE_TOTAL" },
        { type: "string", name: "AUXILIAR" },
        { type: "int", name: "IDOBRA" },
        { type: "int", name: "CENTRO_COSTOS" },
        { type: "int", name: "GRUPO_CC" },
        { type: "int", name: "IDPRODUCTO" },
        { type: "string", name: "RESULTADO" }
        */
    ]
});