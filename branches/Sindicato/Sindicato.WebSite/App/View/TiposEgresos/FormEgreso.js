Ext.define("App.View.TiposEgresos.FormEgreso", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    record: '',
    title: 'Datos del Tipo Egreso a cuenta',
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
        //me.store_categoria = Ext.create('App.Store.Listas.StoreLista');
        //me.store_categoria.setExtraParam('ID_LISTA', Lista.Buscar('CATEGORIA_EGRESO'));

        //me.cbx_categoria = Ext.create("App.Config.Componente.ComboBase", {
        //    fieldLabel: "Categoria Ingreso",
        //    name: "CATEGORIA",
        //    width: 240,
        //    store: me.store_categoria,
        //    selectOnFocus: true
        //});
        me.txt_nro_tipo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Tipo",
            name: "ID_TIPO",
            readOnly: true,
            colspan :2,

        });
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo Ingreso",
            name: "NOMBRE",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            width: 480,
            colspan: 2
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
            fieldLabel: "Importe Total",
            name: "IMPORTE",
            width: 480,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,

        });
        me.items = [
           me.txt_nro_tipo,// me.cbx_categoria,
           me.txt_nombre,
           me.cbx_caja, me.txt_moneda,
           me.txt_importe,
           me.txt_observacion
        ];
    },
    CargarComponentesConsulta: function () {
        var me = this;
       
        me.txt_nro_tipo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Tipo",
            name: "ID_TIPO"

        });
        //me.txt_categoria = Ext.create("App.Config.Componente.TextFieldBase", {
        //    fieldLabel: "Categoria",
        //    name: "CATEGORIA"
        //});
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo Ingreso",
            name: "NOMBRE"

        });

        me.txt_caja = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Caja",
            name: "CAJA",
            width: 480,
            colspan: 2
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
            name: "IMPORTE"

        });
        me.items = [
            me.txt_nro_tipo, //me.txt_categoria,
              me.txt_nombre,
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
});
