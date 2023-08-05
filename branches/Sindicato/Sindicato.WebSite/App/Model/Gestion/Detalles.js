Ext.define('App.Model.Gestion.Detalles', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
           
            { type: "int", name: "ID_GESTION" },
            { type: "string", name: "DETALLE" },
             { type: "string", name: "TIPO" },
            { type: "float", name: "CANT_PREST_CANCELADOS" },
            { type: "float", name: "CANT_PREST_POR_COBRAR" },
            { type: "float", name: "TOTAL_PRESTAMO" },
            { type: "float", name: "TOTAL_INTERES" },
            { type: "float", name: "TOTAL_MORAS" },
            { type: "float", name: "TOTAL_CONDONACION_INTERES" },
            { type: "float", name: "TOTAL_CANCELADO" },
            { type: "float", name: "DEBE" },
            { type: "float", name: "HABER" },
            { type: "float", name: "TOTAL_MORA_CANCELADO" },
            { type: "float", name: "TOTAL_INTERES_CANCELADO" },
            { type: "float", name: "CANTIDAD" },
            { type: "float", name: "TOTAL_POR_COBRAR" },
            
            
        ]
});