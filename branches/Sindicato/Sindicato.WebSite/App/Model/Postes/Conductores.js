Ext.define('App.Model.Postes.Conductores', {
    extend: 'Ext.data.Model',
    fields: [
       { type: "int", name: "ID_CONDUCTOR" },

        { type: "string", name: "COD_CONDUCTOR" },

        { type: "int", name: "OBJECTID" },

        { type: "int", name: "COD_TIPO" },

        { type: "string", name: "DESC_TIPO" },

        { type: "string", name: "FORMACION" },

        { type: "int", name: "ID_POSTE_I" },

        { type: "string", name: "COD_POSTE_I" },

        { type: "int", name: "NODO_POSTE_I" },

        { type: "int", name: "ID_POSTE_F" },

        { type: "string", name: "COD_POSTE_F" },

        { type: "int", name: "NODO_POSTE_F" },

        { type: "float", name: "LONGITUD" },

        { type: "date", name: "FECHA_OPER", dateFormat: "d/m/Y", convert: Funciones.Fecha },

        { type: "string", name: "PROPIEDAD" },
        { type: "string", name: "TENSION" },

        { type: "string", name: "ESTADO" },
    ]
});