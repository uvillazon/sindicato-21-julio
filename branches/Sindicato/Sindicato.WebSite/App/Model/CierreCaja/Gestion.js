Ext.define('App.Model.CierreCaja.Gestion', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID" },
            { type: "string", name: "GESTION" },
            { type: "string", name: "OBSERVACION" },
            { type: "date", name: "FECHA_INI" },
            { type: "date", name: "FECHA_FIN" },
            { type: "float", name: "SALDO_COOPERATIVA" }

        ]
});