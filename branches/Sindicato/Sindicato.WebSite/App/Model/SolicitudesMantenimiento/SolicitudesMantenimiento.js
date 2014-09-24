Ext.define('App.Model.SolicitudesMantenimiento.SolicitudesMantenimiento', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_SOL_MAN" },
            { type: 'int', name: 'NRO_SOL', defaultValue: 'ID_SOL_MAN', convert: Funciones.CopiarRecordmodelo },
            { type: "string", name: "UNIDAD_SOLICITANTE" },
            { type: "string", name: "TIPO_DOCUMENTO" },
            { type: "int", name: "NRO_DOCUMENTO" },
            { type: "string", name: "NOMBRE_AFECTADO" },
            { type: "string", name: "AREA_UBIC" },
            { type: "string", name: "UBICACION" },
            { type: "int", name: "NUS" },
            { type: "int", name: "ID_POSTE" },
            { type: "string", name: "COD_POSTE" },
            { type: "int", name: "ID_PUESTO" },
            { type: "string", name: "COD_PUESTO" },

            { type: "int", name: "ID_ELEMENTO_1" },
            { type: "string", name: "COD_ELEMENTO_1" },
            { type: "int", name: "ID_ELEMENTO_2" },
            { type: "string", name: "COD_ELEMENTO_2" },
            { type: "int", name: "ID_ALIMENTADOR" },
            { type: "string", name: "COD_ALIMENTADOR" },

            { type: "string", name: "REPORTA_NOMBRE" },
            { type: "string", name: "REPORTA_MOVIL" },
            { type: "int", name: "ID_COD_MAN" },
            { type: "int", name: "ID_COD_DEF" },
            { type: "string", name: "COD_MAN" },
            { type: "string", name: "COD_DEF" },
            { type: "string", name: "DESCRIP_MAN" },
            { type: "string", name: "DESCRIP_DEF" },

            { type: "string", name: "DESC_PROBL" },
            { type: "date", name: "FECHA_PROBL", dateFormat: "d/m/Y", convert: Funciones.Fecha },

            { type: "string", name: "HORA_PROBL" },
            { type: "int", name: "NRO_RECLAMO" },
            { type: "string", name: "NOM_USR_REG" },
            { type: "int", name: "NRO_OA" },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "string", name: "LOGIN_USR" },
            { type: "string", name: "ESTADO" },
            //PARA SUBESTACIONES
            { type: "int", name: "ID_SUBEST" },
            { type: "string", name: "NOM_SUBEST" },
            { type: "string", name: "ACLA_RIESGO" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "TIPO_EQUIPO" },
            { type: "int", name: "ID_EQUIPO" },
            { type: "string", name: "COD_EQUIPO" },
            { type: "string", name: "ESCENARIO" }
    ]
});