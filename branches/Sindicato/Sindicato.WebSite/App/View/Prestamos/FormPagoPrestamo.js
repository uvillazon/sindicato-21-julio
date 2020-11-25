Ext.define("App.View.Prestamos.FormPagoPrestamo", {
    extend: "App.Config.Abstract.Form",
    columns: 2,
    title: 'Pago de Prestamo',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        me.cargarEventos();
        this.callParent(arguments);
    },
    //cargarEventos: function () {
    //    var me = this;
    //    //me.cbx_parada.on('select', function (cbx, rec) {
    //    //    me.txt_id_parada.setValue(rec[0].get('ID_PARADA'));
    //    //    me.txt_caja.setValue("Parada : " + rec[0].get('NOMBRE') + " Caja :" + rec[0].get('CAJA'));
    //    //    me.txt_id_caja.setValue(rec[0].get('ID_CAJA'));
    //    //});

    //    me.cbx_socio.on('select', function (cbx, rec) {
    //        me.txt_socio.setValue(rec[0].get('NOMBRE_SOCIO'));
    //        me.txt_nor_movil.setValue(rec[0].get('NRO_MOVIL'));
    //        me.txt_id_socio.setValue(rec[0].get('ID_SOCIO_MOVIL'));
    //        if (rec[0].get('PRECIO_HOJA') == 0) {
    //            Ext.Msg.alert("Aviso", "No tiene Configurado su Costo de Hoja Por favor Configurar.", function () {
    //                me.num_precio.reset();
    //            });
    //        }
    //        else {
    //            me.num_precio.setValue(rec[0].get('PRECIO_HOJA'));
    //        }
    //    });



    //},

    cargarEventos : function(){
        var me = this;
        me.cbx_tipo_pago.on('select', function (cbx, record) {
            if (cbx.getValue() === "PAGAR CUOTA") {
                me.txt_importe.setReadOnly(true);
                me.setLoading(true);
                Funciones.getRequest("Prestamos", "ObtenerImporteDeuda", "POST", { TIPO: cbx.getValue(), FECHA: me.date_fecha.getRawValue(), ID_PRESTAMO: me.txt_nro_prestamo.getValue() }).then({
                    success: function (res) {
                        me.txt_importe.setValue(res.data.importe);
                        me.txt_cuota_capital.setValue(res.data.cuota_capital);
                        me.txt_cuota_interess.setValue(res.data.cuota_interes);
                    },
                    failure: function (errorMessage) {
                        Ext.Msg.alert("Error", errorMessage);
                    }
                }).always(function () {
                    return me.setLoading(false);
                });
            }
            else if (cbx.getValue() === "PAGAR TOTAL DEUDA") {
                me.txt_importe.setReadOnly(true);
                me.setLoading(true);
                Funciones.getRequest("Prestamos", "ObtenerImporteDeuda", "POST", { TIPO: cbx.getValue(), FECHA: me.date_fecha.getRawValue(), ID_PRESTAMO: me.txt_nro_prestamo.getValue() }).then({
                    success: function (res) {
                        me.txt_importe.setValue(res.data.importe);
                        me.txt_cuota_capital.setValue(res.data.cuota_capital);
                        me.txt_cuota_interess.setValue(res.data.cuota_interes);
                        me.txt_condonacion_interes.setValue(res.data.condonacion_interes);
                    },
                    failure: function (errorMessage) {
                        Ext.Msg.alert("Error", errorMessage);
                    }
                }).always(function () {
                    return me.setLoading(false);
                });
            }
            else {
                Ext.Msg.alert("Error", 'No Existe el Tipo definido');
            }
        });
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
        me.txt_nro_prestamo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Prestamo",
            name: "ID_PRESTAMO",
            readOnly: true

        });

        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
            colspan: 1,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true
        });

        me.txt_nor_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Movil",
            name: "NRO_MOVIL",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            colspan : 2,
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

        me.txt_caja = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Caja",
            name: "CAJA",
            readOnly: true
        });
        me.txt_importe_prestamo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Prestamo",
            name: "IMPORTE_PRESTAMO",
            readOnly: true

        });
        me.txt_importe_interes = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Interes",
            name: "IMPORTE_INTERES",
            readOnly: true

        });
        me.txt_importe_total = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Total",
            name: "IMPORTE_TOTAL",
            readOnly: true

        });

        me.txt_debe = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Debe",
            name: "DEBE",
            readOnly: true

        });

        me.txt_cancelado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cancelado",
            name: "TOTAL_CANCELADO",
            readOnly: true

        });

        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            width: 480,
            colspan: 2,
            //maxLength: 500,
        });

        me.cbx_tipo_pago = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Pago",
            name: "TIPO_PAGO",
            width: 480,
            colspan: 2,
            store: ["PAGAR CUOTA", "PAGAR TOTAL DEUDA", "EXTENDER PRESTAMO"],
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.txt_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe a Cancelar",
            name: "COUTA",
            width: 480,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,

        });

        me.txt_cuota_capital = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cuota Capital",
            name: "CUOTA_CAPITAL",
            readOnly: true,
            value  : 0

        });
        me.txt_cuota_interess = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cuota Interes",
            name: "CUOTA_INTERES",
            readOnly: true,
            value : 0

        });
        me.txt_condonacion_interes = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Condonacion de Interes",
            name: "CONDONACION_INTERES",
            readOnly: true,
            labelWidth : 150,
            value: 0,
            width: 480,
            colspan: 2,

        });


        me.items = [
            me.txt_id_caja, me.txt_id_socio,
            me.txt_nro_prestamo, me.date_fecha,
            me.txt_nor_movil,
            me.txt_socio,
            me.txt_caja, me.txt_importe_prestamo,
            me.txt_importe_interes, me.txt_importe_total,
            me.txt_debe, me.txt_cancelado,
            me.cbx_tipo_pago,
            me.txt_importe,
            me.txt_cuota_capital, me.txt_cuota_interess,
            me.txt_condonacion_interes,
            me.txt_observacion
        ];



    }
});
