﻿Ext.define("App.Model.Choferes.Choferes", {
    extend: "Ext.data.Model",
    fields: [
        { type: "int", name: "ID_CHOFER" },
        { type: "int", name: "NRO_CHOFER" },
        { type: "string", name: "NOMBRE" },
        { type: "string", name: "APELLIDO_PATERNO" },
        { type: "string", name: "APELLIDO_MATERNO" },
        { type: "int", name: "NRO_LICENCIA" },
        { type: "string", name: "CATEGORIA_LIC" },
        { type: "int", name: "CI" },
        { type: "string", name: "EXPEDIDO" },
        { type: "date", name: "FECHA_NAC", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "date", name: "FECHA_INGRESO", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "date", name: "FECHA_BAJA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "string", name: "DOMICILIO" },
        { type: "string", name: "OBSERVACION" },
        { type: "string", name: "ESTADO_CIVIL" },
        { type: "int", name: "ID_SOCIO" },
        { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "int", name: "ID_USR" },
        { type: "string", name: "ESTADO" },
        { type: "string", name: "NOMBRE_SOCIO" },
        { type: "string", name: "NOMBRE_CHOFER" },
        { type: "string", name: "TELEFONO" },
        { type: "string", name: "CELULAR" },
        { type: "string", name: "CARNET" },
        { type: "string", name: "LICENCIA" },
        { type: "int", name: "ID_IMG" },
        { type: "float", name: "FONDO_EMERGENCIA" },
        { type: "float", name: "SALDO_FONDO_EMERGENCIA" },

    ]
});