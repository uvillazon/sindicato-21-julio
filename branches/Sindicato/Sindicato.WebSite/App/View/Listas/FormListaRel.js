Ext.define("App.View.Listas.FormListaRel", {
    extend: "App.Config.Abstract.Form",
    title: "Formulario Listas ",
    opcion : '',
    initComponent: function () {
        var me = this;
        if (me.opcion == '') {
            me.CargarComponentes();
        }
        else {
            me.CargarComponentesRel();
        }
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: 'ID_TABLA',
            hidden: true
        });
        me.txt_lista = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: 'Tipo Lista',
            value: me.data.get('LISTA'),
            disabled : true
        });
        me.cbx_estado = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: 'Estado',
            name: 'ESTADO',
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            store: ['A', 'I'],
            value : 'A'

        });
        if (me.data.get('TIPO_VALOR') == "CADENA") {
            if (me.data.get('MAYUS_MINUS') == 'MINUS') {
                var opc = 'Minuscula';
            }
            else {
                var opc = '';
            }
           
            me.num_valor = Ext.create("App.Config.Componente.TextFieldBase", {
                fieldLabel: 'Valor',
                name: 'VALOR',
                afterLabelTextTpl: Constantes.REQUERIDO,
                allowBlank: false,
                opc: opc,
                maxLength: me.data.get("TAM_LIMITE")

            });
        }
        else {
            alert(me.data.get('TAM_LIMITE'));
            me.num_valor = Ext.create("App.Config.Componente.NumberFieldBase", {
                fieldLabel: 'Valor',
                name: 'VALOR',
                afterLabelTextTpl: Constantes.REQUERIDO,
                decimalSeparator: '.',
                allowDecimals: true,
                allowBlank: false,
                maxLength: me.data.get("TAM_LIMITE")

            });
        }
        me.txt_codigo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: 'Cod. Lista',
            name: 'CODIGO',
            itemId: 'CODIGO',
            afterLabelTextTpl: Constantes.REQUERIDO,
            maxLength: 15,
            allowBlank: false,
            //margin: '10'sadsad
        });
        //////////////////////////////
        this.items = [
        /*  me.txt_id_bb,*/
            me.txt_id,
            me.txt_lista,
            me.txt_codigo,
            me.num_valor,
            me.cbx_estado
        ];
    },
    CargarComponentesRel: function () {
        var me = this;
        me.txt_valor = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: 'Valor',
            name: 'VALOR',
            itemId: 'VALOR',
            width: 240,
            disabled: true,
            vtype: null
            //margin: '10'sadsad
        });
        me.txt_codigo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: 'Cod. Lista',
            name: 'CODIGO',
            itemId: 'CODIGO',
            allowBlank: false,
            disabled: true,
            width: 240
            //margin: '10'sadsad
        });
        var c = Ext.create("App.Config.ux.form.ClearButton", { animateClearButton: true });

        me.cbx_tipo_lista = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: 'Tipo',
            name: 'CODIGOLISTA',
            width: 240,
            displayField: 'LISTA',
            plugins: ['clearbutton'],
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            selectOnFocus: true,
            store: Ext.create('App.Store.Listas.Listas', { pageSize: 3000 }).load(),
            listConfig: {
                getInnerTpl: function () {
                    return '<div data-qtip="{DESCRIPCION}">{LISTA}</div>';
                }
            },
        });
        me.store_lista = Ext.create('App.Store.Listas.StoreLista', {autoLoad : false});
        me.cbx_tipo_lista.on('select', function (cmb, record, index) {
            me.store_lista.load(
               { params: { ID_LISTA: record[0].get('ID_LISTA') } }
               );
            me.cbx_lista.clearValue();
        });
        me.cbx_lista = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: 'Lista',
            name: 'ID_TABLA',
            width: 240,
            displayField: 'VALOR',
            valueField: 'ID_TABLA',
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            selectOnFocus: true,
            store: me.store_lista
        });

        //////////////////////////////
        this.items = [
            me.txt_id,
            me.txt_codigo,
            me.txt_valor,
            me.cbx_tipo_lista,
            me.cbx_lista
        ];
    },
});
