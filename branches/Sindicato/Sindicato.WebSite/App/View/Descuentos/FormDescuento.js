﻿Ext.define("App.View.Descuentos.FormDescuento", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    record: '',
    title: 'Datos Descuento',
    Eventos: true,
    modoConsulta: false,
    initComponent: function () {
        var me = this;
        if (!me.modoConsulta) {
            me.CargarComponentes();
            me.cargarEventos();
        }
        else {
            me.CargarComponentesConsulta();
        }
        this.callParent(arguments);
    },
    CargarComponentesConsulta: function () {
        var me = this;
        me.hid_id = Ext.widget('hiddenfield', {
            name: 'ID_DESCUENTO',
        });
        me.txt_descuento = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Descuento",
            name: "DESCUENTO",
            width: 480,
            colspan: 2
        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
        });
        me.txt_total = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Total BS",
            name: "TOTAL"

        });
        me.txt_descripcion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Descripcion",
            name: "DESCRIPCION",
            width: 480,
            colspan: 2,
            maxLength: 500,
        });
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            width: 480,
            colspan: 2
        });
        me.items = [
            me.hid_id,
            me.txt_descuento,
            me.date_fecha, me.txt_total,
            me.txt_descripcion,
            me.txt_estado
        ];


    },
    CargarComponentes: function () {
        var me = this;
        me.hid_id = Ext.widget('hiddenfield', {
            name: 'ID_DESCUENTO',
        });
        me.hid_idCierre = Ext.widget('hiddenfield', {
            name: 'ID_CIERRE',
        });
        me.txt_descuento = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Descuento",
            name: "DESCUENTO",
            width: 480,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.store_periodo = Ext.create('App.Store.Cierres.Cierres');
        me.store_periodo.setExtraParams({ ESTADO: 'ACTIVO' });
        me.cbx_periodo = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Periodo",
            name: "ID_CIERRE",
            displayField: 'CODIGO',
            store: me.store_periodo,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        
        me.txt_descripcion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Descripcion",
            name: "DESCRIPCION",
            width: 480,
            colspan: 2,
            maxLength: 500,
        });

        me.num_importeSocio = Ext.create("App.Config.Componente.NumberFieldBase", {
            name: "IMPORTE_SOCIO",
            width : 200,
            fieldLabel: "Importe p/Socio",
            maxLength: 12,
            allowNegative: false,
            allowDecimals: true
        });
        me.num_importeTotal = Ext.create("App.Config.Componente.NumberFieldBase", {
            name: "IMPORTE_TOTAL",
            width: 200,
            fieldLabel: "Importe p/Total",
            maxLength: 12,
            allowNegative: false,
            allowDecimals: true
        });
        //me.btn_crear = Funciones.CrearMenu('btn_crear', 'Crear Descuento', Constantes.ICONO_CREAR, null, null, this);
        me.btn_generar = Ext.create('Ext.Button', { text: 'Generar',iconCls : 'cog' });
        var cmp_generar = Ext.create('Ext.form.FieldContainer', {
            colspan: 2,
            width : 480,
            layout: {
                type: 'table',
                columns: 3
            },
            items: [me.num_importeSocio, me.num_importeTotal, me.btn_generar]
        });
        me.gridDetalles = Ext.create('App.View.Descuentos.GridDetalles', {
            width: 500,
            colspan : 2,
            height: 450,
            modoEdicion : true


        });
        me.txt_total = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Total BS",
            name: "TOTAL",
            readOnly: true,
            width: 480,
            colspan : 2

        });
        me.items = [
            me.hid_id,me.hid_idCierre,
            me.txt_descuento,
            me.cbx_periodo, me.date_fecha,
            me.txt_descripcion,
            cmp_generar,
            me.gridDetalles,
            me.txt_total
        ];
       
    },
    cargarEventos: function () {
        var me = this;
        me.num_importeSocio.on('change', function (f,n,o) {
            if (!Funciones.isEmpty(n)) {
                me.num_importeTotal.reset();
            }
        });
        me.num_importeTotal.on('change', function (f, n, o) {
            if (!Funciones.isEmpty(n)) {
                me.num_importeSocio.reset();
            }
        });
        me.cbx_periodo.on('select', function (cbx,rec) {
            me.hid_idCierre.setValue(rec[0].get('ID_CIERRE'));
        });
        me.btn_generar.on('click', function () {
            if (me.getForm().isValid()) {
                var importeSocio = me.num_importeSocio.getValue();
                var importeTotal = me.num_importeTotal.getValue();
                if (Funciones.isEmpty(importeSocio) && Funciones.isEmpty(importeTotal)) {
                    Ext.Msg.alert("Error", "Escriba un Importe");
                }
                else {
                    console.log("dasdsads");
                }
            }
            else {
                Ext.Msg.alert("Error", "Complete el Formulario");
            }
        });
    },

    //actualizarNuevoSaldo: function (isNew) {
    //    var me = this;
    //    var res = me.num_saldo.getValue() - me.num_ingreso.getValue();
    //    if (res < 0) {
    //        Ext.Msg.alert("Error", "No Puede Retirar mas de lo que tiene", function () {
    //            me.txt_nuevo_saldo.reset();
    //            me.num_ingreso.reset();
    //        });


    //    }
    //    else {
    //        me.txt_nuevo_saldo.setValue(res);
    //    }
    //},
    //ocultarSaldos: function (value) {
    //    var me = this;
    //    me.num_saldo.setVisible(value);
    //    me.txt_nuevo_saldo.setVisible(value);
    //    me.cbx_socio.setVisible(value);
    //}
});
