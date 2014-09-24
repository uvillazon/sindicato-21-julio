Ext.define('App.Model.Combustibles.Combustibles', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "float", name: "CANT_DISPONIBLE" },
            { type: "float", name: "PRECIO_VENTA" },
            { type: "float", name: "PRECIO_COMPRA" },
            { type: "int", name: "ID_COMBUSTIBLE" },
            { type: "string", name: "NOMBRE" },
            { type: "string", name: "DESCRIPCION" },
            { type: "string", name: "UNIDAD" },
            { type: "string", name: "ESTADO" }
        ]
});