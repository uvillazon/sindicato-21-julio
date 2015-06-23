Ext.define('App.Model.Ventas.DetallesVentaEdit', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA_USO", dateFormat: "d/m/Y"},
            { type: "int", name: "ID_DETALLE" },
            { type: "int", name: "ID_VENTA" },
            { type: "float", name: "MONTO" },
            { type: "string", name: "OBSERVACION" }
        ]
});

//PRODUCTO = x.SD_POS.CODIGO + " - " + x.SD_POS.SD_COMBUSTIBLES.NOMBRE,
//                ID_POS = x.ID_POS,
//                ID_POS_TURNO = x.ID_POS_TURNO,
//                ENT_LITTER = x.ENT_LITTER,
//                SAL_LITTER = x.SAL_LITTER,
//                TOTAL = x.ENT_LITTER - x.SAL_LITTER