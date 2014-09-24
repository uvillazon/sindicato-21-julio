Ext.define("App.Config.Abstract.Grid", {
    extend: "Ext.grid.Panel",
    width: 450,
    margins: '0 2 0 0',
    loadMask: true,
    fieldSet: '',
    equipo: '',
    value: '',
    split: true,
    stateful: true,
    requires: ['App.Config.ux.Printer'],
    stateId: null,
    store: null,
    disableSelection: false,
    equipo: '',
    funciones: null,
    imprimir: false,
    criterios: false,
    busqueda: false,
    ventanaCriterio: null,
    tituloImpresion: '',
    textBusqueda: 'Buscar',
    widthBsuqeda: 250,
    tamBusqueda: 120,
    //datos para cargar las imagenes
    equipoImagen: '',
    equipoId: '',
    reportes: '',
    title: '',
    reportesEquipo: true,
    cargarStore: true,
    //propiedad de los parametros del store si lo tiene
    paramsStore: null,
    //este campo indica si cargara los elementos asociados 
    cargarElementos: false,
    borrarParametros: false,
    //solo para algunos elementos que contengan imagen. Inicialmente no se muestra las imagenes hidden : true, cambiar imagenes  : false para que no se oculte y se muestre
    imagenes: true,
    fbarmenu: null,
    cmp : null,
    CargarComponentes: function () {
        var me = this;
        if (me.stateId != null) {
            Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        }
        if (me.title == '') {
            me.iconCls = '';
        }
        //        this.store = store = Ext.create('App.Usuario.Store.Usuarios');
        if (me.store != null) {
            if (me.paramsStore != null) { this.store.setExtraParams(me.paramsStore); }
            if (me.cargarStore) {
                this.store.load();
            }
        }
        if (me.reportes != '') {
            me.reportesEquipo = false;
        }
        me.widthBsuqeda = (me.tamBusqueda != 120) ? me.tamBusqueda + 130 : me.widthBsuqeda;
        me.txt_busqueda = me.cmp == null ?  Ext.create("App.Config.Componente.TextFieldBase", { fieldLabel: me.textBusqueda, width: me.widthBsuqeda, labelWidth: me.tamBusqueda, hidden: me.busqueda }) : me.cmp;
        me.button = Ext.create('Ext.Button', {
            pressed: true,
            text: 'Buscar',
            hidden: me.busqueda,
            iconCls: 'zoom',
            tooltip: 'Buscar por Nombre',
            enableToggle: true,
            scope: this

        });
        //////////
        me.btn_imprimir = Ext.create('Ext.Button', {
            pressed: true,
            iconCls: 'printer',
            text: 'Imprimir',
            tooltip: 'Imprimir Datos',
            enableToggle: true,
            scope: this,
            hidden: me.imprimir,
            tooltipType: 'qtip',
            handler: me.ImprimirReporte


        });

        me.btn_criterios = Ext.create('Ext.Button', {
            pressed: true,
            text: 'Criterios',
            iconCls: 'building_add',
            tooltip: 'Introducir Criterios de Busqueda',
            enableToggle: true,
            scope: this,
            hidden: me.criterios,
            handler: function () {
                this.Criterios();
            }
        });
        me.btn_reportes = Ext.create('Ext.Button', {
            pressed: true,
            iconCls: 'page_excel',
            tooltip: 'Reporte de Todos los Equipo',
            enableToggle: true,
            scope: this,
            hidden: me.reportesEquipo,
            tooltipType: 'qtip',
            handler: me.ImprimirReporteEquipo


        });
        ///////////
        me.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
            me.txt_busqueda,
            me.button,
            me.btn_imprimir,
            me.btn_criterios,
            me.btn_reportes
            ]
        });
        this.dockedItems = me.toolBar;
        me.dock = this.dockedItems;
        //////////////////////////
        me.txt_busqueda.on('specialkey', this.buscarEnterCodigo, this);
        me.button.on('click', this.buscarBotonCodigo, this);
        //////////////////////////
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen " + me.equipo + ".",
            items: me.fbarmenu

        });
        me.bar = me.bbar;
    },
    CargarParametrosStore: function (paramsStore) {
        this.paramsStore = paramsStore;
        this.store.setExtraParams(this.paramsStore);
        this.store.load();
    },
    buscarEnterCodigo: function (f, e) {

        var me = this;
        if (e.getKey() == e.ENTER) {
            if (me.borrarParametros) {
                me.store.limpiarParametros();
            }
            me.store.setExtraParam('Contiene', me.txt_busqueda.getValue());
            me.bar.moveFirst();
        }

    },
    buscarBotonCodigo: function () {
        var me = this;
        //me.store.setExtraParam('codigo', 'CODIGO');
        if (me.borrarParametros) {
            me.store.limpiarParametros();
        }
        me.store.setExtraParam('Contiene', me.txt_busqueda.getValue());
        me.bar.moveFirst();

    },
    Criterios: function () {
        var me = this;
        if (me.ventanaCriterio == null) {
            me.ventanaCriterio = Ext.create("App.Busqueda.Vistas.VentanaCriterios", { title: " Criterios de Busqueda", height: 160, width: 410, storeBuscar: me.getStore(), gridBuscar: me, data: me.txt_busqueda.getValue(), equipo: me.equipo, tmp: me.bar });
        }
        me.ventanaCriterio.show();
    },
    ImprimirReporte: function () {
        var me = this;
        // alert(me.tituloImpresion);
        App.Config.ux.Printer.filtros = me.tituloImpresion;
        App.Config.ux.Printer.print(me);

    },
    CargarStore: function () {
        var me = this;
        me.funciones.CargarStoreEquiposConImagen(me.equipoImagen);
        if (me.cargarElementos) {
            me.funciones.CargarStoreElemento();
        }
    },
    renderImagen: function (val) {
        return this.funciones.ObtenerEquiposConImagen(val);
    },
    renderCodigo: function (val) {
        if (val != 0) {
            return this.funciones.ObtenerCodigoElemento(val);
        }
        else {
            return '';
        }
    },
    ImprimirReporteEquipo: function () {
        var me = this;
        window.open(host + 'ReportesSubestacion/' + me.reportes + '');
    },
    moverInicio: function () {
        var me = this;
        me.bar.moveFirst();
    }

});
