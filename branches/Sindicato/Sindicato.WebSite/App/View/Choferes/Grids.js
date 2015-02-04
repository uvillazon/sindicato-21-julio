Ext.define("App.View.Choferes.Grids", {
    extend: "Ext.grid.Panel",
    margins: '0 2 0 0',
    loadMask: true,
    opcion: "",
    pieTitulo: '',
    btnEliminarRecord: false,
    fbarmenu: null,
    initComponent: function () {
        var me = this;
        switch (me.opcion) {
            case "GridFamiliares":
                me.title = "Familiares";
                me.pieTitulo = "Familiares";
                me.CargarGridFamiliares();
                break;
            case "GridDocumentos":
                me.title = "Documentos";
                me.pieTitulo = "Documentos";
                me.CargarGridDocumentos();
                break;
            case "GridAntecedentes":
                me.title = "Antecedentes";
                me.pieTitulo = "Antecedentes";
                me.CargarGridAntecedentes();
                break;
            case "GridFondoAsalariado":
                me.title = "Fondo Asalariado";
                me.pieTitulo = "Fondo Asalariado";
                me.CargarGridFondoAsalariado();
                break;
            case "GridHistoricoGarante":
                me.title = "Historico Cambio de Garante";
                me.pieTitulo = "Detalles";
                me.CargarGridHistoricoGarante();
                break;
            default:
                alert("Defina el tipo primero");

        }
        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen " + me.pieTitulo + ".",
            items: me.fbarmenu
        });

        this.callParent(arguments);
    },
    CargarGridFamiliares: function () {

        var me = this;
        me.store = Ext.create("App.Store.Familiares.Familiares");
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_FAMILIAR", hidden: true },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_SOCIO", hidden: true },
            { header: "Parentesco", width: 100, sortable: true, dataIndex: "PARENTESCO" },
            { header: "Nombre", width: 200, sortable: true, dataIndex: "NOMBRE", renderer: this.obtenerNombreCompleto },
            { header: "Edad", width: 100, sortable: true, dataIndex: "FECHA_NAC", renderer: Funciones.obtenerEdad },
            { header: "Carnet<br>Identidad", width: 70, sortable: true, dataIndex: "CI" },
            { header: "Dirección", width: 200, sortable: true, dataIndex: "DIRECCION" },
            { header: "Teléfono", width: 200, sortable: true, dataIndex: "TELEFONO" },
        //{ header: "Observaciones", width: 200, sortable: true, dataIndex: "OBSERVACION" },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_USR", hidden: true }
        ];

    },

    obtenerNombreCompleto: function (val, meta, record) {
        return record.data.NOMBRE + ' ' + record.data.APELLIDO_PATERNO + ' ' + record.data.APELLIDO_MATERNO;
    },
    CargarGridDocumentos: function () {
        var me = this;
        me.store = Ext.create("App.Store.Socios.Documentos");
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_DOCUMENTACION", hidden: true },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_SOCIO", hidden: true },
            { header: "Fecha<br>Presentacion", width: 100, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Tipo<br>Documento", width: 100, sortable: true, dataIndex: "TIPO" },
            { header: "Detalle", width: 250, sortable: true, dataIndex: "DETALLE" },
            { header: "Ver<br>Documento", width: 100, sortable: true, dataIndex: "DOCUMENTACION" },



            { header: " - ", width: 30, sortable: false, dataIndex: "ID_USR", hidden: true }
        ];

    },
    CargarGridFondoAsalariado: function () {
        var me = this;
        me.store = Ext.create("App.Store.Socios.Desempenos");
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_DESEMPEÑO", hidden: true },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_SOCIO", hidden: true },
            { header: "Fecha", width: 100, sortable: true, dataIndex: "FECHA_DESDE", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Recibo", width: 100, sortable: true, dataIndex: "RECIBO" },
            { header: "Ingreso", width: 100, sortable: true, dataIndex: "INGRESO" },
            { header: "Egreso", width: 100, sortable: true, dataIndex: "EGRESO" },
            { header: "Saldo", width: 100, sortable: true, dataIndex: "SALDO" },
            { header: "Detalle", width: 250, sortable: true, dataIndex: "DETALLE" },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_USR", hidden: true },
        ];
    },
    CargarGridAntecedentes: function () {
        var me = this;
        me.store = Ext.create("App.Store.Socios.Antecedentes");
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_ANTECEDENTE", hidden: true },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_SOCIO", hidden: true },
            { header: "Fecha", width: 100, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Tipo<br>Documento", width: 150, sortable: true, dataIndex: "MOTIVO" },
            { header: "Detalle", width: 250, sortable: true, dataIndex: "DETALLE" },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_USR", hidden: true },
        ];
    },
    CargarGridHistoricoGarante: function () {
        var me = this;
        me.store = Ext.create("App.Store.Choferes.Garantes");
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Garante", width: 150, sortable: false, dataIndex: "SOCIO" },

            { header: "Fecha Inicio", width: 80, sortable: true, dataIndex: "FECHA_INI", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Fecha Fin", width: 80, sortable: true, dataIndex: "FECHA_FIN", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Observaciones", width: 200, sortable: true, dataIndex: "OBSERVACION" },
            { header: "Estado", width: 70, sortable: false, dataIndex: "ESTADO" },
            { header: "Login", width: 70, sortable: false, dataIndex: "LOGIN" },
        ];
    }
});

