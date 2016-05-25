Ext.define("App.View.TiposPrestamos.FormTipoPrestamo", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    record: '',
    title: 'Datos del Tipo Ingreso a cuenta',
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
        me.store_categoria = Ext.create('App.Store.Listas.StoreLista');
        me.store_categoria.setExtraParam('ID_LISTA', Lista.Buscar('TIPO_PRESTAMO'));

        me.cbx_categoria = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Categoria Prestamo",
            name: "CATEGORIA",
            width: 240,
            store: me.store_categoria,
            selectOnFocus: true
        });
        me.txt_nro_tipo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Tipo",
            name: "ID_TIPO",
            readOnly: true

        });
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo Prestamo",
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
        me.txt_importe_maximo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe Maximo",
            name: "IMPORTE_MAXIMO",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,

        });
        me.txt_importe_minimo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe Minimo",
            name: "IMPORTE_MINIMO",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,

        });
        me.cbx_tipo_interes = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo Interes",
            name: "TIPO_INTERES",
            width: 480,
            colspan :2,
            store: ["INTERES","MONTO FIJO"],
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.txt_interes = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Interes %",
            name: "INTERES",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
           

        });
        me.txt_interes_fijo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Interes Fijo",
            name: "INTERES_FIJO",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false

        });

       

        me.txt_multa_mora = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Multa p/ Mora",
            name: "MULTA_POR_MORA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,

        });
        me.txt_semanas = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nro Semanas",
            name: "SEMANAS",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,

        });


        me.items = [
           me.txt_nro_tipo, me.cbx_categoria,
           me.txt_nombre,
           me.cbx_caja, me.txt_moneda,
           me.txt_importe_maximo, me.txt_importe_minimo,
           me.cbx_tipo_interes,
           me.txt_interes, me.txt_interes_fijo,
           me.txt_semanas, me.txt_multa_mora,
           me.txt_observacion
        ];
    },
    CargarComponentesConsulta: function () {
        var me = this;
       
        me.txt_nro_tipo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Tipo",
            name: "ID_TIPO"

        });
        me.txt_categoria = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Categoria",
            name: "CATEGORIA"
        });
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo Prestamo",
            name: "NOMBRE"

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
        me.txt_importe_max = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Maximo",
            name: "IMPORTE_MAXIMO",
           
        });
        me.txt_importe_min = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Minimo",
            name: "IMPORTE_MINIMO",

        });
        me.txt_tipo_interes = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo Interes",
            name: "TIPO_INTERES",

        });
        me.txt_interes = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Interes %",
            name: "INTERES",

        });
        me.txt_interes_fijo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Interes Fijo",
            name: "INTERES_FIJO",

        });

        me.txt_semanas = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Semanas",
            name: "SEMANAS",

        });

        me.txt_mora = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Multa Por Mora",
            name: "MULTA_POR_MORA",

        });


        me.items = [
            me.txt_nro_tipo, me.txt_categoria,
              me.txt_nombre,            me.txt_caja,
            me.txt_moneda, me.txt_tipo_interes,
            me.txt_interes, me.txt_interes_fijo,
            me.txt_importe_max, me.txt_importe_min,
            me.txt_semanas , me.txt_mora,
            me.txt_observacion

        ];
    },
    cargarEventos: function () {
        var me = this;
        me.cbx_caja.on('select', function (cbx, record) {
            me.txt_moneda.setValue(record[0].get('MONEDA'));
        });
        me.cbx_tipo_interes.on('select', function (cbx, rec) {
            if (cbx.getValue() === 'INTERES') {
                me.txt_interes_fijo.reset();
                me.txt_interes.reset();
                me.txt_interes_fijo.setDisabled(true);
                me.txt_interes.setDisabled(false);
            }
            else {
                me.txt_interes_fijo.reset();
                me.txt_interes.reset();
                me.txt_interes_fijo.setDisabled(false);
                me.txt_interes.setDisabled(true);
            }
        });
    },
});
