Ext.define("App.View.Ingresos.GridIngresos", {
    extend: "Ext.grid.Panel",
    //title: 'Ingresos Registradas',
    iconCls: '',
    criterios: true,
    textBusqueda: 'Buscar Ingreso',
    imprimir: false,
    width: 550,
    height: 350,
    equipo: 'Ingresos',
    win: null,
    formulario: null,
    imagenes: true,
    toolbar: '',
    initComponent: function () {
        var me = this;
        if (me.opcion == "GridIngresos") {
            me.CargarGridIngresos();
            me.eventosGrid();
        }
        else {
            alert("No selecciono ninguna opcion");
        }
        this.callParent(arguments);
    },
    eventosGrid: function () {
        var me = this;
        me.cbx_mes.on('select', function (cmb, record) {
            me.store.setExtraParam('MES', record[0].get('CODIGO'));
            me.store.setExtraParam('ANIO', me.cbx_anio.getValue());
            me.store.load();
        });
        me.cbx_anio.on('select', function (cmb, record) {
            me.store.setExtraParam('ANIO', record[0].get('CODIGO'));
            me.store.setExtraParam('MES', me.cbx_mes.getValue());
            me.store.load();
        });

    },
    CargarGridIngresos: function () {
        var me = this;
        var fecha_actual = new Date();
        me.store = Ext.create("App.Store.Ingresos.Ingresos");
        me.store.load();
        //me.CargarComponentes();

        me.store_mes = Ext.create('App.Store.Listas.StoreLista');
        me.store_mes.setExtraParam('ID_LISTA', Lista.Buscar('MES'));
        me.cbx_mes = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Mes",
            name: "MES",
            displayField: 'VALOR',
            valueField: 'CODIGO',
            store: me.store_mes,
            //afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.store_anio = Ext.create('App.Store.Listas.StoreLista');
        me.store_anio.setExtraParam('ID_LISTA', Lista.Buscar('ANIO'));
        me.cbx_anio = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "A\u00f1o",
            name: "ANIO",
            displayField: 'VALOR',
            valueField: 'CODIGO',
            store: me.store_anio,
            //afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.button_search = Ext.create('Ext.Button', {
            pressed: true,
            text: 'Buscar',
            hidden: me.busqueda,
            iconCls: 'zoom',
            tooltip: 'Buscar por Mes',
            enableToggle: true,
            scope: this

        });

        me.store_mes.on('load', function () {
            var meses = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
            me.cbx_mes.setValue(meses[fecha_actual.getMonth()].toString());
        });

        me.store_anio.on('load', function () {
            me.cbx_anio.setValue(fecha_actual.getFullYear().toString());
        });
        ///////////
        me.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
            me.cbx_mes,
            me.cbx_anio,
            me.button_search,
            me.button_new
            ]
        });

        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen " + me.equipo + ".",
            items: me.toolbar
        });

        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro <br>Comprobante", width: 100, sortable: false, dataIndex: "NRO_COMP" },
            { header: "Fecha", width: 150, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Detalle", width: 250, sortable: false, dataIndex: "CONCEPTO" },
            { header: "Importe<br>BOB", width: 100, sortable: false, dataIndex: "IMPORTE" }
        ];
        me.button_search.on('click', this.buscarBotonCodigo, this);
        this.dockedItems = me.toolBar;
        me.dock = this.dockedItems;

    }
});