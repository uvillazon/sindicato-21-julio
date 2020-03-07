Ext.define("App.View.Hojas.FormHoja", {
    extend: "App.Config.Abstract.Form",
    columns: 2,
    title: 'Datos de Venta de Hojas de Control',
    listeners: {
        boxready: function (form) {
            var me = this;
            if (Constantes.HOJAS == "MES") {
                me.cargarFechasInicioFinCant(new Date());
            }
        }
    },
    cargarFechasInicioFinCant: function (dt) {
        var me = this;
        Funciones.AjaxRequest("VentaHojas", "ObtenerFechaIniFinCant", form, { FECHA: dt }, function (res) {

            console.log(res);
            me.txt_fecha_ini_uso.setValue(res.FECHA_INI);
            me.txt_fecha_fin_uso.setValue(res.FECHA_FIN);
            me.txt_cantidad_hojas_uso.setValue(res.CANTIDAD);

        });
    },
    initComponent: function () {
        var me = this;
        if (Constantes.HOJAS == "MES") {
            me.CargarComponentes();
            me.cargarEventos();
        }
        else {
            me.CargarComponentesDia();
            me.cargarEventosDia();
        }
        this.callParent(arguments);
    },
    cargarEventos: function () {
        var me = this;
        //me.cbx_parada.on('select', function (cbx, rec) {
        //    me.txt_id_parada.setValue(rec[0].get('ID_PARADA'));
        //    me.txt_caja.setValue("Parada : " + rec[0].get('NOMBRE') + " Caja :" + rec[0].get('CAJA'));
        //    me.txt_id_caja.setValue(rec[0].get('ID_CAJA'));
        //});

        me.date_fecha.on('select', function (dat, value) {
            me.cargarFechasInicioFinCant(value);
        });
        me.cbx_socio.on('select', function (cbx, rec) {
            Funciones.AjaxRequest("VentaHojas", "Verificar", me, { ID_SOCIO_MOVIL: rec[0].get('ID_SOCIO_MOVIL') }, function (res) {
                //console.log(res);
                if (res.success) {
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
                        //    }
                    }
                }
                else {
                    Ext.Msg.alert("Aviso", res.msg, function () {
                        me.txt_socio.reset();
                        me.txt_nor_movil.reset();
                        me.txt_id_socio.reset();
                        me.num_precio.reset();
                        cbx.focus();
                    });
                }
            });
        });



    },

    cargarEventosDia: function () {
        var me = this;
        me.cbx_socio.on('select', function (cbx, rec) {
            Funciones.AjaxRequest("VentaHojas", "Verificar", me, { ID_SOCIO_MOVIL: rec[0].get('ID_SOCIO_MOVIL') }, function (res) {
                //console.log(res);
                if (res.success) {
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
                        //    }
                    }
                }
                else {
                    Ext.Msg.alert("Aviso", res.msg, function () {
                        me.txt_socio.reset();
                        me.txt_nor_movil.reset();
                        me.txt_id_socio.reset();
                        me.num_precio.reset();
                        cbx.focus();
                    });
                }
            });

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

        me.txt_tipo_hoja = Ext.widget('hiddenfield', {
            name: 'HOJAS',
            value: Constantes.HOJAS
        });

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
            value: 1
            //value: Constantes.Usuario.ID_PARADA
        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Compra",
            name: "FECHA_COMPRA",
            //            readOnly : true,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            //readOnly: true
        });

        me.txt_fecha_ini_uso = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Fecha Ini. Uso",
            name: "FECHA_INI_USU",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            //colspan: 2,
            //width: ,
            readOnly: true,
        });

        me.txt_fecha_fin_uso = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Fecha Fin Uso",
            name: "FECHA_FIN_USU",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            //colspan: 2,
            //width: ,
            readOnly: true,
        });

        me.txt_cantidad_hojas_uso = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cant. Hojas Uso",
            name: "CANT_HOJAS_USO",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            colspan: 2,
            //width: ,
            readOnly: true,
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
            //hidden: true,
            //            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true
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
            me.txt_tipo_hoja,
            me.txt_id_caja, me.txt_id_socio,
            me.txt_id_parada,
            me.date_fecha,
            me.txt_fecha_ini_uso, me.txt_fecha_fin_uso,
            me.txt_cantidad_hojas_uso,
            //me.cbx_parada, me.txt_caja,
            me.cbx_socio, me.txt_nor_movil,
            me.txt_socio,
            me.num_precio,
            me.num_cantidad

        ];



    },

    CargarComponentesDia: function () {
        var me = this;

        me.txt_tipo_hoja = Ext.widget('hiddenfield', {
            name: 'HOJAS',
            value: Constantes.HOJAS
        });

        me.txt_id_caja = Ext.widget('hiddenfield', {
            name: 'ID_CAJA',
            value: Constantes.Usuario.ID_CAJA
        });
        me.txt_id_socio = Ext.widget('hiddenfield', {
            name: 'ID_SOCIO_MOVIL',
        });
        me.txt_id_parada = Ext.widget('hiddenfield', {
            name: "ID_PARADA",
            hidden: true,
            value: 1
        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Compra",
            name: "FECHA_COMPRA",
            maximo : 'max',
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
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
            maxValue: 999999999,
            minValue: 1,
            value: 1,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
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
        });
        me.items = [
            me.txt_tipo_hoja,
            me.txt_id_caja, me.txt_id_socio,
            me.txt_id_parada,
            me.date_fecha,
            me.cbx_socio, me.txt_nor_movil,
            me.txt_socio,
            me.num_precio,
            me.num_cantidad

        ];



    },

    ImprimirHojas: function (id) {

        var ruta = fn.ObtenerUrlReportPDF("ReporteHojas", "ID_VENTA=" + id);
        //window.open(ruta);
        //var ruta = fn.ObtenerUrlReportPDF("ReporteRegulacion", "ID_REGULACION=" + id);
        //var ruta = fn.ObtenerUrlReportPDF("ReporteRegulacion", "ID_REGULACION=2");
        var panel = Ext.create("App.View.Reports.ReportsPDF", {
            ruta: ruta,
            pageScale: 1.50,
        });
        panel.show();
    }
});
