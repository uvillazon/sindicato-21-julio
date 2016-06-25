Ext.define('App.Model.IngresosPorSocios.Ingresos', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "IMPORTE_PRESTAMO" },
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
            { type: "float", name: "SALDO" },
            { type: "string", name: "ESTADO" }
        ]
});


ID_PRESTAMO = x.ID_PRESTAMO,
              ID_CAJA = x.ID_CAJA,
              CAJA = x.SD_CAJAS.NOMBRE,
              FECHA = x.FECHA,
              FECHA_REG = x.FECHA_REG,
              IMPORTE_PRESTAMO = x.IMPORTE_PRESTAMO,
              LOGIN_USR = x.LOGIN_USR,
              MONEDA = x.MONEDA,
              TIPO_INGRESO = x.SD_TIPOS_PRESTAMOS.NOMBRE,
              OBSERVACION = x.OBSERVACION,
              NRO_MOVIL = x.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL,
              SOCIO = x.SD_SOCIO_MOVILES.ObtenerNombreSocio(),
              SEMENAS = x.SEMENAS,
              INTERES = x.INTERES,
              SALDO = x.SALDO,
              ESTADO = x.ESTADO