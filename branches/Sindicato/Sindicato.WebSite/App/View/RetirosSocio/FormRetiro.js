Ext.define("App.View.RetirosSocio.FormRetiro", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    record: '',
    title: 'Datos del Retiro',
    Eventos : true,
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        if (me.Eventos) {
            me.cargarEventos();
        }
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        
        me.txt_id_socio_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            name: "ID_SOCIO_MOVIL"

        });
       
        me.store_socio = Ext.create('App.Store.Socios.Socios');
        me.cbx_socio = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Movil",
            name: "ID_SOCIO_MOVIL_1",
            displayField: 'NRO_MOVIL',
            valueField: 'ID_SOCIO_MOVIL',
            store: me.store_socio,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "Nro Movil :{NRO_MOVIL} - {NOMBRE} {APELLIDO_PATERNO} {APELLIDO_MATERNO}" }
        });
        me.txt_nro_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Movil",
            name: "NRO_MOVIL",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true,
        });
        me.txt_socio = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Socio",
            name: "SOCIO",
            colspan: 2,
            width: 480,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true,
        });

        me.store_caja = Ext.create('App.Store.Cajas.Cajas');
        me.store_caja.setExtraParams(me.paramsStore);
        me.cbx_caja = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Caja",
            name: "ID_CAJA",
            displayField: 'NOMBRE',
            valueField: 'ID_CAJA',
            colspan : 2,
            store: me.store_caja,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{NOMBRE} - {DESCRIPCION}" }
        });

        me.num_saldo_caja = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Saldo Caja",
            name: "SALDO_CAJA",
            readOnly: true,
            allowDecimals: true,
            maxValue: 999999999
        });
        me.txt_nuevo_saldo_caja = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nuevo Saldo Caja",
            name: "NUEVO_SALDO_CAJA",
            readOnly: true
        });


        me.txt_nro_recibo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Recibo",
            readOnly : true,
            name: "ID_RETIRO"

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
            readOnly : true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.num_saldo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Saldo",
            name: "SALDO",
            readOnly: true,
            allowDecimals: true,
            maxValue: 999999999
        });

        me.num_ingreso = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe",
            name: "RETIRO",
            colspan: 2,
            allowDecimals: true,
            maxValue: 999999999,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_nuevo_saldo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nuevo Saldo",
            name: "NUEVO_SALDO",
            readOnly: true
        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            value : 'SIN OBSERVACION',
            width: 480,
            colspan: 2,
            maxLength: 500,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.gridDetalle = Ext.create('App.View.Cierres.GridDetalleSocio', {
            width: 480,
            height: 250,
            hidden : false,
            colspan : 2,
        });
        me.items = [
             me.txt_id_socio_movil,
            me.txt_nro_recibo, me.date_fecha,
            me.cbx_socio,me.txt_nro_movil,
            me.txt_socio,
            me.gridDetalle,
            me.num_saldo, me.txt_nuevo_saldo,
            me.cbx_caja,
            me.num_saldo_caja , me.txt_nuevo_saldo_caja,
            me.num_ingreso,
            me.txt_observacion
        ];



    },
    cargarEventos: function () {
        var me = this;
        me.cbx_socio.on('select', function (cbx, rec) {
            me.txt_socio.setValue(rec[0].get('NOMBRE_SOCIO'));
            me.txt_nro_movil.setValue(rec[0].get('NRO_MOVIL'));
            me.txt_id_socio_movil.setValue(rec[0].get('ID_SOCIO_MOVIL'));
            me.num_saldo.setValue(rec[0].get('SALDO'));
            me.gridDetalle.getStore().setExtraParams({ ID_SOCIO_MOVIL: rec[0].get('ID_SOCIO_MOVIL'), codigo: 'POR_CANCELAR' });
            me.gridDetalle.getStore().load();
        });
        me.num_ingreso.on('change', function (num, newvalue, oldvalue) {
            me.actualizarNuevoSaldo(true);
        });

        me.cbx_caja.on('select', function (cbx, rec) {
            me.num_saldo_caja.setValue(rec[0].get('SALDO'));
        });
    },

    actualizarNuevoSaldo: function (isNew) {
        var me = this;
        var res = me.num_saldo.getValue() - me.num_ingreso.getValue();
        if (res < 0) {
            Ext.Msg.alert("Error", "No Puede Retirar mas de lo que tiene", function () {
                me.txt_nuevo_saldo.reset();
                me.num_ingreso.reset();
            });
            

        }
        else { 
            me.txt_nuevo_saldo.setValue(res);
            me.txt_nuevo_saldo_caja.setValue(me.num_saldo_caja.getValue() - me.num_ingreso.getValue());
        }
    },
    ocultarSaldos: function (value) {
        var me = this;
        me.num_saldo.setVisible(value);
        me.txt_nuevo_saldo.setVisible(value);
        me.cbx_socio.setVisible(value);
    },
    ImprimirRecibo: function (id) {

        var ruta = fn.ObtenerUrlReportPDF("ReporteRetiro", "ID_RETIRO=" + id);
        window.open(ruta);
    }
});
