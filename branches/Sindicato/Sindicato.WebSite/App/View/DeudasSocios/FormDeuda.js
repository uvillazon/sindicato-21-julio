Ext.define("App.View.DeudasSocios.FormDeuda", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    record: '',
    title: 'Datos deuda',
    Eventos: true,
    modoConsulta: false,
    paramsStore: {},
    initComponent: function () {
        var me = this;
        if (!me.modoConsulta) {
            me.CargarComponentes();
            if (me.Eventos) {
                me.cargarEventos();
            }
        }
        else {
            me.CargarComponentesConsulta();
        }
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.txt_nro_ingreso = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Deuda",
            name: "ID_DEUDA",
            readOnly: true

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true
        });

        me.store_categoria = Ext.create('App.Store.Listas.StoreLista');
        me.store_categoria.setExtraParam('ID_LISTA', Lista.Buscar('CATEGORIA_INGRESO'));

        me.cbx_categoria = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Categoria Ingreso",
            name: "CATEGORIA",
            width: 480,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            store: me.store_categoria,
            selectOnFocus: true
        });


        me.txt_motivo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Motivo",
            name: "MOTIVO",
            width: 480,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });

        me.store_caja = Ext.create('App.Store.Cajas.Cajas');
        me.store_caja.setExtraParams(me.paramsStore);
        me.cbx_caja = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Caja",
            name: "ID_CAJA",
            displayField: 'NOMBRE',
            valueField: 'ID_CAJA',
            store: me.store_caja,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{NOMBRE} - {DESCRIPCION}" }
        });
        me.txt_moneda = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Moneda",
            name: "MONEDA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true

        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            width: 480,
            colspan: 2,
            //maxLength: 500,
        });
        me.txt_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe Deuda",
            name: "IMPORTE",
            width: 480,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,

        });
        me.items = [
           me.txt_nro_ingreso, me.date_fecha,
           me.cbx_categoria,
           me.txt_motivo,
           me.cbx_caja, me.txt_moneda,
           me.txt_importe,
           me.txt_observacion
        ];
    },
    CargarComponentesConsulta: function () {
        var me = this;
       
        me.txt_nro_recibo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Deuda",
            name: "ID_DEUDA"

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
        });

        me.txt_categoria = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Categoria",
            name: "CATEGORIA",
            width: 480,
            colspan: 2
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
        me.items = [
            me.txt_nro_recibo, me.date_fecha,
            me.txt_categoria,
            me.txt_concepto,
            me.txt_caja, me.txt_moneda,
            me.txt_total,
            me.txt_observacion

        ];
    },
    cargarEventos: function () {
        var me = this;
        me.cbx_caja.on('select', function (cbx, record) {
            me.txt_moneda.setValue(record[0].get('MONEDA'));
        });
    },
    ImprimirRecibo: function (id) {

        var ruta = fn.ObtenerUrlReportPDF("ReporteIngreso", "ID_INGRESO=" + id);
        window.open(ruta);
    }
});
