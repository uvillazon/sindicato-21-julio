Ext.define('App.Model.Gestion.Gestion', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_INICIO", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_FIN", dateFormat: "d/m/Y", convert: Funciones.Fecha },
          
            { type: "int", name: "ID_GESTION" },
            { type: "string", name: "CODIGO" },
            { type: "string", name: "DESCRIPCION" },
            { type: "string", name: "LOGIN" },
            { type: "string", name: "ESTADO" },
            { type: "string", name: "OBSERVACION_CIERRE" },
            { type: "float", name: "SALDO_A_FAVOR" },
            { type: "float", name: "SALDO_POR_COBRAR" },
            { type: "float", name: 'DISPONIBLE', mapping: "SALDO_A_FAVOR" },
            { type: "float", name: 'POR_COBRAR', mapping: "SALDO_POR_COBRAR" },
            { type: "float", name: 'TOTAL'},

        ]
});