﻿Ext.define("App.View.Socios.Grids", {
    extend: "Ext.grid.Panel",
    margins: '0 2 0 0',
    loadMask: true,
    opcion: "",
    pieTitulo: '',
    btnEliminarRecord: false,
    fbarmenu: null,
    initComponent: function () {
        var me = this;
        //me.store = Ext.create("App.Store.Listas.Listas");
        if (me.opcion == "GridFamiliares") {
            me.title = "Familiares";
            me.pieTitulo = "Familiares";
            me.CargarGridFamiliares();
        }
        else if (me.opcion == "GridDocumentos") {
            me.title = "Documentos";
            me.pieTitulo = "Documentos";
            me.CargarGridDocumentos();
        }
        else if (me.opcion == "GridDesempenos") {
            me.title = "Desempenos";
            me.pieTitulo = "Desempenos";
            me.CargarGridDesempenos();
        }
        else if (me.opcion == "GridAntecedentes") {
            me.title = "Antecedentes";
            me.pieTitulo = "Antecedentes";
            me.CargarGridAntecedentes();
        }
        else if (me.opcion == "GridAutomoviles") {
            me.title = "Automoviles";
            me.pieTitulo = "Automoviles";
            me.CargarGridAutomoviles();
        }
        else {
            alert("Defina el tipo primero");
        }
        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen " + me.pieTitulo + ".",
            items: me.fbarmenu
        });
        me.on('itemclick', me.onItemClick, this);
        me.getSelectionModel().on('selectionchange', me.onSelectChange, this);
        this.callParent(arguments);
    },
    onItemClick: function (view, record, item, index, e) {
        var me = this;
        me.record = record;
        me.id = record.get('ID_SOCIO');
    },
    onSelectChange: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        if (disabled) {
            me.record = null;
        }
        //        Funce = this;
        //       iones.DisabledButton('btn_Detalle', me.toolbar, disabled);
    },
    CargarGridFamiliares: function () {
        var me = this;
        me.store = Ext.create("App.Store.Familiares.Familiares");
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_FAMILIAR", hidden: true },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_SOCIO", hidden: true },
            { header: "Nombres", width: 200, sortable: true, dataIndex: "NOMBRE_COMPLETO" },
            { header: "Edad", width: 70, sortable: true, dataIndex: "EDAD" },
            { header: "Carnet<br>Identidad", width: 70, sortable: true, dataIndex: "CI" },
            { header: "Fecha<br>Nacimiento", width: 100, sortable: true, dataIndex: "FECHA_NAC", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Parentesco", width: 100, sortable: true, dataIndex: "PARENTESCO" },
            { header: "Observaciones", width: 200, sortable: true, dataIndex: "OBSERVACION" },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_USR", hidden: true }
        ];

    },
    CargarGridDocumentos: function () {
        var me = this;
        me.store = Ext.create("App.Store.Socios.Documentos");
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_DOCUMENTACION", hidden: true },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_SOCIO", hidden: true },
            { header: "Documentacion", width: 100, sortable: true, dataIndex: "DOCUMENTACION" },
            { header: "Tipo<br>Documento", width: 100, sortable: true, dataIndex: "TIPO" },
            { header: "Observaciones", width: 250, sortable: true, dataIndex: "OBSERVACION" },
            { header: "Fecha Presentacion", width: 100, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_USR", hidden: true }
        ];

    },
    CargarGridDesempenos: function () {
        var me = this;
        me.store = Ext.create("App.Store.Socios.Desempenos");
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_DESEMPEÑO", hidden: true },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_SOCIO", hidden: true },
            { header: "Cargo <br>Desempeñado", width: 100, sortable: true, dataIndex: "CARGO" },
            { header: "Observaciones", width: 250, sortable: true, dataIndex: "OBSERVACION" },
            { header: "Fecha <br>Desde", width: 100, sortable: true, dataIndex: "FECHA_DESDE", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Fecha <br>Hasta", width: 100, sortable: true, dataIndex: "FECHA_HASTA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
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
            { header: "Motivo<br>Antecedente", width: 150, sortable: true, dataIndex: "MOTIVO" },
            { header: "Observaciones", width: 250, sortable: true, dataIndex: "OBSERVACION" },
            { header: "Fecha", width: 100, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_USR", hidden: true },
        ];
    },
    CargarGridAutomoviles: function () {
        var me = this;
        me.store = Ext.create("App.Store.Socios.Autos");
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Img", width: 155, sortable: true, dataIndex: 'ID_AUTO', renderer: me.renderImagenAuto },
            { header: "Nro Movil", width: 70, sortable: true, dataIndex: "MOVIL" },
            { header: "Tipo", width: 100, sortable: true, dataIndex: "TIPO" },
            { header: "Marca", width: 100, sortable: true, dataIndex: "MARCA" },
            { header: "Modelo", width: 100, sortable: true, dataIndex: "MODELO" },
            { header: "Placa", width: 100, sortable: true, dataIndex: "PLACA" },
            { header: "Color", width: 100, sortable: true, dataIndex: "COLOR" },
            { header: "Descripcion", width: 100, sortable: true, dataIndex: "DESCRIPCION" },
            { header: "Fecha", width: 100, sortable: true, dataIndex: "FECHA_ALTA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_USR", hidden: true },
        ];
    },
    renderImagenAuto: function (val, metaData, record) {
        if (record.data.ID_AUTO == 0) {
            return '<img src="../Content/Iconos/no-imagen.jpg" />';
        }
        else {
            return '<img src="' + Constantes.URLIMAGEN + 'id=' + val + '&tamano=150&TABLA=SD_AUTOS"/>';
        }
    }
});

