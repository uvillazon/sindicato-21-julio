Ext.define('App.Model.Ventas.DetallesVenta', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "int", name: "ID_POS" },
            { type: "int", name: "ID_POS_TURNO" },
            { type: "float", name: "ENT_LITTER" },
            { type: "float", name: "SAL_LITTER" },
            { type: "float", name: "TOTAL" },
            { type: "string", name: "PRODUCTO" },
            { type: "string", name: "CODIGO" }
        ]
});

//PRODUCTO = x.SD_POS.CODIGO + " - " + x.SD_POS.SD_COMBUSTIBLES.NOMBRE,
//                ID_POS = x.ID_POS,
//                ID_POS_TURNO = x.ID_POS_TURNO,
//                ENT_LITTER = x.ENT_LITTER,
//                SAL_LITTER = x.SAL_LITTER,
//                TOTAL = x.ENT_LITTER - x.SAL_LITTER