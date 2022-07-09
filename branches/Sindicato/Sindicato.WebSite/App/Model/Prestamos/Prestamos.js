Ext.define('App.Model.Prestamos.Prestamos', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_LIMITE_PAGO", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },

            { type: "float", name: "IMPORTE_PRESTAMO" },
            { type: "float", name: "TOTAL_CANCELADO" },
            { type: "int", name: "ID_PRESTAMO" },
            { type: "int", name: "ID_CAJA" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "MONEDA" },
            { type: "string", name: "LOGIN_USR" },
            { type: "string", name: "CAJA" },
            { type: "string", name: "TIPO_PRESTAMO" },
            { type: "string", name: "TIPO_INTERES" },
            { type: "string", name: "SOCIO" },
            { type: "int", name: "NRO_MOVIL" },
            { type: "int", name: "SEMANAS" },
            { type: "float", name: "INTERES" },
            { type: "float", name: "MORA" },
            { type: "float", name: "DEBE" },
            { type: "float", name: "IMPORTE_INTERES" },
            { type: "float", name: "SALDO" },
            { type: "float", name: "COUTA" },
            { type: "float", name: "IMPORTE_TOTAL" },
            {
                type: 'string', name: 'ESTADO_PRESTAMO', mapping: function (raw) {
                    if (raw.DEBE == 0) {
                        return "CANCELADO";
                    }
                    else if (raw.DEBE > 0 && raw.MORA > 0) {
                        return "MORA"
                    }
                    else if (raw.TOTAL_CANCELADO > 0) {
                        return "CON_PAGOS"
                    }
                    else {
                        return raw.ESTADO;
                    }
                }
            },


            { type: "string", name: "ESTADO" },
            { type: "string", name: "ESTADO_CIERRE" },
            { type: "float", name: "SALDO_INTERES" },
            { type: "float", name: "SALDO_CAPITAL" },
    ]
});
