Ext.define("App.View.Regulaciones.FormRegulacion", {
    extend: "App.Config.Abstract.Form",
    columns: 2,
    title: 'Datos de Regulacion de Hojas de Control',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        me.cargarEventos();
        this.callParent(arguments);
    },
    cargarEventos: function () {
        var me = this;
        me.cbx_parada.on('select', function (cbx, rec) {
            me.txt_id_parada.setValue(rec[0].get('ID_PARADA'));
            me.txt_caja.setValue("Parada : " + rec[0].get('NOMBRE') + " Caja :" + rec[0].get('CAJA'));
            me.txt_id_caja.setValue(rec[0].get('ID_CAJA'));
        });

        me.cbx_socio.on('select', function (cbx, rec) {
            me.txt_socio.setValue(rec[0].get('NOMBRE_SOCIO'));
            me.txt_nor_movil.setValue(rec[0].get('NRO_MOVIL'));
            me.txt_id_socio.setValue(rec[0].get('ID_SOCIO_MOVIL'));
            if (rec[0].get('PRECIO_HOJA') == 0) {
                Ext.Msg.alert("Aviso", "No tiene Configurado su Costo de Hoja Por favor Configurar.", function () {
                    me.num_precio.reset();
                });
            }
            else {
                me.num_precio.setValue(rec[0].get('PRECIO_HOJA'));
            }
        });



    },

    isValid: function () {
        var me = this;
        if (me.getForm().isValid()) {
            return true;
        }
        else {
            return false;
        }
    },


    CargarComponentes: function () {
        var me = this;

        me.txt_id_caja = Ext.widget('hiddenfield', {
            name: 'ID_CAJA',
            value: Constantes.Usuario.ID_CAJA
        });
        me.txt_id_socio = Ext.widget('hiddenfield', {
            name: 'ID_SOCIO_MOVIL',
            //value: Constantes.Usuario.ID_CAJA
        });
        me.txt_id_parada = Ext.widget('hiddenfield', {
            name: "ID_PARADA",
            hidden: true,
            value: Constantes.Usuario.ID_PARADA
        });

        me.date_fecha_compra = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha COMPRA",
            name: "FECHA_COMPRA",
            //            readOnly : true,
            //colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true
        });

        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Mes (MM-YYYY)",
            name: "MES",
            format: 'm-Y',
            submitFormat: 'd/m/Y',
            colspan : 2,
            //            readOnly : true,
            //colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            //readOnly: true
        });

        //me.txt_parada = Ext.create("App.Config.Componente.TextFieldBase", {
        //    fieldLabel: "Parada",
        //    name: "PARADA",
        //    readOnly: true,
        //    afterLabelTextTpl: Constantes.REQUERIDO,
        //    allowBlank: false,
        //    value: Constantes.Usuario.Parada
        //});
        me.store_parada = Ext.create('App.Store.Paradas.Paradas');

        me.cbx_parada = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Parada",
            name: "ID_PARADA",
            displayField: 'NOMBRE',
            store: me.store_parada,
            readOnly: Constantes.Usuario.ID_PARADA != 0 ? true : false,
            textoTpl: function () { return "{NOMBRE} - {DESCRIPCION}  , Resp : {RESPONSABLE}" }
        });

        me.txt_caja = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Parada/Caja",
            labelWidth: 70,
            name: "CAJA",
            colspan: 2,
            width: 480,
            readOnly: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            value: Constantes.Usuario.Caja
        });
        me.store_socio = Ext.create('App.Store.Socios.Socios');

        me.cbx_socio = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Nro Movil",
            name: "ID_SOCIO_1",
            displayField: 'NRO_MOVIL',
            store: me.store_socio,
            //colspan: 2,
            textoTpl: function () { return "Nro Movil :{NRO_MOVIL} - {NOMBRE} {APELLIDO_PATERNO} {APELLIDO_MATERNO}" }
        });
        me.txt_nor_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Movil",
            name: "NRO_MOVIL",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            //colspan: 2,
            //width: ,
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

        me.num_cantidad = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Cantidad",
            name: "CANTIDAD",
            //allowDecimals: true,
            maxValue: 999999999,
            minValue: 1,
            value: 1,
            //            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            //readOnly: true
        });
        me.num_precio = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Precio",
            name: "MONTO",
            //value: 25,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true
        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            width: 480,
            maxLength: 500,
            colspan: 2,
            //afterLabelTextTpl: Constantes.REQUERIDO,
            //allowBlank: false
        });
        me.items = [
            me.txt_id_caja, me.txt_id_socio,
            me.txt_id_parada,
            me.date_fecha_compra, me.cbx_parada,
            me.date_fecha,
             me.txt_caja,
            me.cbx_socio, me.txt_nor_movil,
            me.txt_socio,
            me.num_precio,
            me.num_cantidad

        ];



    },
    ImprimirHojas: function (id) {

        var ruta = fn.ObtenerUrlReportPDF("ReporteRegulacion", "ID_REGULACION=" + id);
        window.open(ruta);
    }
});
