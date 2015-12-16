Ext.define("App.View.Hojas.FormHoja", {
    extend: "App.Config.Abstract.Form",
    columns: 2,
    title: 'Datos de Venta de Hojas de Control',
    initComponent: function () {
        var me = this;
        me.CargarStoreDiasDisponibles();
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
            
            var fecha = me.date_fecha.getValue();
            me.gridHojas.getStore().removeAll();
            me.CalcularTotales();
            me.cbx_diasDisponibles.getStore().load({ params: { FECHA_VENTA: fecha, ID_SOCIO_MOVIL: rec[0].get('ID_SOCIO_MOVIL'), NRO_MOVIL: rec[0].get('NRO_MOVIL') } });
        });
        me.date_fecha.on('select', function (dat, val) {
            console.dir(val);
            alert("2ntro");
        });

        me.cbx_diasDisponibles.on('select', function (cbx, rec) {
            if (!me.gridHojas.getStore().existeRecord('FECHA_TEXT', rec[0].get('FECHA_TEXT'))) {
                var precio = me.num_precio.getValue();
                var reco = Ext.create('App.Model.Ventas.DetallesVenta', {
                    FECHA_USO: rec[0].get('FECHA'),
                    MONTO: precio,
                    OBSERVACION: 'VENTA DE HOJA',
                    FECHA_TEXT: rec[0].get('FECHA_TEXT')

                });
                me.gridHojas.getStore().add(reco);
                me.CalcularTotales();

            }
            else {
                Ext.Msg.alert("Error", "Ya existe el registro. Elija otra fecha.", function () {

                    cbx.reset();
                });
            }

        });

    },
    CalcularTotales: function () {
        var me = this;

        var total = 0;
        var cantidad = 0;
        me.gridHojas.getStore().each(function (record) {
            total = total + record.get('MONTO');
            cantidad++;
        });
        me.num_total.setValue(total);
        me.num_totalcondescuento.setValue(total);
        me.num_cantidad.setValue(cantidad);

    },
    isValid: function () {
        var me = this;
        if (me.getForm().isValid()) {
            if (me.gridHojas.getStore().count() > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    },
    GridDetalleJson: function () {
        var me = this;
        var modified = me.gridHojas.getStore().getModifiedRecords() //step 1
        var recordsToSend = [];
        if (!Ext.isEmpty(modified)) {
            Ext.each(modified, function (record) { //step 2
                //console.dir(record);
                recordsToSend.push(Ext.apply(record.data));
            });
            console.dir(recordsToSend);
            recordsToSend = Ext.JSON.encode(recordsToSend);
            return recordsToSend;
        }
        else {
            return false;
        }

    },
    CargarStoreDiasDisponibles: function () {
        var me = this;
        Ext.define('fechasDisponibles', {
            extend: 'Ext.data.Model',
            fields: [
                { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
                { type: "string", name: "FECHA_TEXT" }
            ]
        });

        var store_diasDisponibles = Ext.create('Ext.data.Store', {
            model: 'fechasDisponibles',
            proxy: {
                type: 'ajax',
                url: Constantes.HOST + "VentaHojas/ObtenerFechaDisponibles",
                reader: {
                    type: "json",
                    root: "Rows",
                    successProperty: "success",
                    totalProperty: "Total"
                },
                simpleSortMode: true
            },
            autoLoad: false
        });
        me.cbx_diasDisponibles = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Fechas Disponibles",
            name: "FECHAS_DISPONIBLES",
            displayField: 'FECHA_TEXT',
            store: store_diasDisponibles,
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
        me.txt_id_parada = Ext.widget('hiddenfield', {
            name: "ID_PARADA",
            hidden: true,
            value: Constantes.Usuario.ID_PARADA
        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Venta",
            name: "FECHA_VENTA",
            //            readOnly : true,
            //colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
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
            name: "TOTAL_HOJAS",
            //allowDecimals: true,
            maxValue: 999999999,
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
        me.num_total = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Total",
            name: "TOTAL",
            //value: 25,
            readOnly: true
        });
        me.num_descuento = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Descuento",
            name: "DESCUENTO",
            allowDecimals: true,
            maxValue: 999999999,
            value: 0,
            readOnly: true
        });
        me.num_totalcondescuento = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Total - Descuento",
            name: "TOTAL_VENTA",

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
        me.gridHojas = Ext.create("App.View.Hojas.Grids", {
            opcion: "GridHojasMovil",
            colspan: 2,
            width: 480,
            height: 250
        });
        me.items = [
            me.txt_id_caja, me.txt_id_socio,
            me.txt_id_parada,
            me.date_fecha,
            me.cbx_parada, me.txt_caja,
            me.cbx_socio, me.txt_nor_movil,
            me.txt_socio,
            me.num_precio,
            me.cbx_diasDisponibles,
            me.gridHojas,
            me.num_total, me.num_cantidad,
            me.num_descuento, me.num_totalcondescuento,
            me.txt_observacion

        ];



    },
    CrearHojas: function (record) {
        var me = this;
    }
});
