Ext.define('App.Model.Ventas.DetallesVenta', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "float", name: "MONTO" },
            { type: "string", name: "OBLIGACION" }
        ]
});

//PRODUCTO = x.SD_POS.CODIGO + " - " + x.SD_POS.SD_COMBUSTIBLES.NOMBRE,
//                ID_POS = x.ID_POS,
//                ID_POS_TURNO = x.ID_POS_TURNO,
//                ENT_LITTER = x.ENT_LITTER,
//                SAL_LITTER = x.SAL_LITTER,
//                TOTAL = x.ENT_LITTER - x.SAL_LITTER