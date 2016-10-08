Ext.define('App.Model.Prestamos.PlanPagos', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA_PAGO", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            
            { type: "float", name: "CAPITAL_A_PAGAR" },
            { type: "float", name: "IMPORTE_A_PAGAR" },
             { type: "float", name: "IMPORTE_TOTAL" },
            { type: "int", name: "ID_PRESTAMO" },
            { type: "int", name: "ID_PLAN" },
            { type: "string", name: "LOGIN_USR" },
            { type: "float", name: "SEMANAS" },
            { type: "float", name: "NRO_SEMANA" },
            { type: "float", name: "SALDO_PLAN" },
            { type: "float", name: "SALDO_PRESTAMO" },
            { type: "float", name: "INTERES_A_PAGAR" },
            { type: "string", name: "ESTADO" }
        ]
});