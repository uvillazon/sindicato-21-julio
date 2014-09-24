﻿Ext.define('App.Model.OrdenesTrabajo.OrdenesTrabajo', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_OT" },
            { type: 'int', name: 'ID_OT1', defaultValue: 'ID_OT', convert: Funciones.CopiarRecordmodelo },
            { type: "int", name: "ID_PLA" },
            { type: "int", name: "ID_SOL_MAN" },
            { type: 'int', name: 'NRO_SOL', defaultValue: 'ID_SOL_MAN', convert: Funciones.CopiarRecordmodelo },
            { type: "string", name: "TIPO_OT" },
            { type: "string", name: "LUGAR_TRABAJO" },
            { type: "int", name: "ASIGNADO_A" },
            { type: "string", name: "NOMBRE_ASIGNADO" },
            { type: "string", name: "NOMBRE_MOVIL" },
            { type: "int", name: "MOVIL_ASIG" },
            { type: "date", name: "FECHA_ASIG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_PROB_EJE", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "int", name: "ID_COD_MAN" },
            { type: "int", name: "ID_COD_DEF" },
            { type: "int", name: "ID_COD_SOL" },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "string", name: "LOGIN_USR" },
            
            { type: "string", name: "COD_MAN" },
            { type: "string", name: "COD_DEF" },
            { type: "string", name: "COD_SOL" },
            { type: "string", name: "DESCRIP_MAN" },
            { type: "string", name: "DESCRIP_DEF" },
            { type: "string", name: "DESCRIP_SOL" },

            { type: "int", name: "ID_POSTE" },
            { type: "string", name: "COD_POSTE" },
            { type: "int", name: "ID_PUESTO" },
            { type: "string", name: "COD_PUESTO" },
            { type: "int", name: "ID_ELEMENTO_1" },
            { type: "string", name: "COD_ELEMENTO_1" },
            { type: "int", name: "ID_ELEMENTO_2" },
            { type: "string", name: "COD_ELEMENTO_2" },
            { type: "int", name: "ID_FUENTE" },
            { type: "string", name: "COD_FUENTE" },
            { type: "string", name: "OBSERV" },
            { type: "string", name: "TIPO_OBJ_INTERV" },
            { type: "string", name: "COD_OBJ_INTERV" },
            { type: "int", name: "ID_OBJ_INTERV" },
            { type: "string", name: "ESTADO" },
            { type: "string", name: "ESTADO_PLA" },
            { type: "string", name: "OT_EXTRA" },
            { name: 'CON_PLANILLA', type: 'boolean' },
            { name: 'CON_INFORME', type: 'boolean' },//
            { name: 'CON_TRAB_EJEC', type: 'boolean' },
            { name: 'REPORTE_CONTRATISTA', type: 'string' },
            { type: "string", name: "INSTRUCCIONES" },
            { name: 'RELEVAMIENTO', type: 'boolean' },
            { type: "string", name: 'DESC_PROBL' },
            //area de la SM
            { type: "string", name: 'AREA_UBIC' },
            { type: "string", name: "UBICACION" },
            { type: "string", name: "REPORTA_NOMBRE" },
            { type: "date", name: "FECHA_PROBL", dateFormat: "d/m/Y", convert: Funciones.Fecha },
    ]
});