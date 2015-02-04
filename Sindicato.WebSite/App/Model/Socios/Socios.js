Ext.define("App.Model.Socios.Socios", {
    extend: "Ext.data.Model",
    fields: [
        { type: "int", name: "ID_SOCIO" },
        { type: "int", name: "ID_MOVIL" },
        { type: "int", name: "ID_SOCIO_MOVIL" },
        { type: "int", name: "NRO_MOVIL" },
        { type: "string", name: "DESCRIPCION" },
        { type: "string", name: "SOCIO" },//detalle Completo
        { type: "string", name: "TIPO_MOVIL" },
        { type: "string", name: "NOMBRE" },
        { type: "string", name: "NOMBRE_SOCIO" },
        
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
        { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "int", name: "ID_USR" },
        { type: "string", name: "TELEFONO" },
        { type: "string", name: "CELULAR" },
        { type: "string", name: "ESTADO" },
//        { name: 'CON_IMAGEN', type: 'boolean' },
        { type: "int", name: "ID_IMG" },

    ]
});