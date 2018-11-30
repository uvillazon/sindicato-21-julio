﻿Ext.define("App.View.DeudasSocios.FormSociosDeuda", {
    extend: "App.Config.Abstract.Form",
    title: "Lista de Socios con Deudas Pendientes",
    botones: false,
    columns: 2,
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        me.EventosForm();
        this.callParent(arguments);
    },
    EventosForm: function () {
        var me = this;
        me.btn_quitar.on('click', function () {
            Funciones.AjaxRequestWin("Socios", "GuardarSocMovHoja", win, form, me.gridObligaciones, "Esta Seguro de Guardar Los Cambios", null, win);
        });
        me.btn_agregar.on('click', function () {
            var win = Ext.create("App.Config.Abstract.Window", { botones: true, title: 'Configuracion de Obligaciones' });
            var form = Ext.create("App.View.DeudasSocios.Forms", { opcion: 'formAgregarSocio', columns: 1 });
            win.add(form);
            form.txt_id.setValue(me.id_deuda.getValue());
            //alert(me.record.get('OBLIGACION'));
            //form.loadRecord(me.record);
            win.show();
            win.btn_guardar.on('click', function () {
                Funciones.AjaxRequestWin("Socios", "GuardarSocMovHoja", win, form, me.gridObligaciones, "Esta Seguro de Guardar Los Cambios", null, win);
            });
        });
        me.gridDetalles.getSelectionModel().on('selectionchange', function (selModel, selections) {
            var disabled = selections.length === 0;
            me.record = disabled ? null : selections[0];
            Funciones.DisabledButton("btn_QuitarSocio", me, disabled);
        });
        me.gridDetalles.getStore().on('load', function (str, rec) {
            var total = 0;
            str.each(function (rec) {
                console.dir(rec);
                total = total + rec.get('IMPORTE');
            });
            me.txt_total.setValue(total);
        });
    },

    CargarComponentes: function () {
        var me = this;
        me.id_deuda = Ext.widget('hiddenfield', {
            name: 'ID_DEUDA',
        });
        me.txt_nro_recibo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Deuda",
            name: "ID_DEUDA"

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
        });
        me.txt_concepto = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Motivo",
            name: "MOTIVO",
            width: 480,
            colspan: 2
        });

        me.txt_caja = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Caja",
            name: "CAJA",

        });
        me.txt_moneda = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Moneda",
            name: "MONEDA",

        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            width: 480,
            colspan: 2,
            //maxLength: 500,
        });
        me.txt_total = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Total BS",
            name: "IMPORTE",
            width: 480,
            colspan: 2

        });
        me.gridDetalles = Ext.create("App.View.DeudasSocios.GridDetalles", { height: 250, width: 550, colspan: 2 });
        //me.gridKardex = Ext.create("App.View.Socios.Grids", { opcion: "GridKardexObligaciones", height: 250, width: 400 });
        me.btn_quitar = Funciones.CrearMenu('btn_QuitarSocio', 'Quitar Socio', "cross", null, null, me, null, true);
        me.btn_agregar = Funciones.CrearMenu('btn_AgregarSocio', 'Agregar Socio', "add", null, null, me, null, false);
        me.items = [
            me.id_deuda,
           me.txt_nro_recibo, me.date_fecha,
           me.txt_concepto,
           me.txt_caja, me.txt_moneda,
           me.txt_total,
           me.txt_observacion,
           me.gridDetalles,
           me.btn_agregar, me.btn_quitar

        ];
    }
});