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
    requires: ['App.Config.ux.Printer', 'App.Config.ux.Exporter'],
    stateId: null,
    store: null,
    disableSelection: false,
    equipo: '',
    funciones: null,
    imprimir: false,
    excel: false,
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
    reportesEquipo: true,
    cargarStore: true,
    reportesHistoricoEstados: true,
    //propiedad de los parametros del store si lo tiene
    paramsStore: null,
    //este campo indica si cargara los elementos asociados 
    cargarElementos: false,
    borrarParametros: false,
    noLimpiar: null,
    tabla: '',
    id_tabla: '',
    //solo para algunos elementos que contengan imagen. Inicialmente no se muestra las imagenes hidden : true, cambiar imagenes  : false para que no se oculte y se muestre
    imagenes: true,
    fbarmenu: null,
    fbarmenuArray: null,
    CargarComponentes: function () {
        var me = this;
        if (me.stateId != null) {
            //var cp = Ext.create('Ext.state.CookieProvider', {
            //    path: "/cgi-bin/",
            //    expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 30)), //30 days
            //    domain: "http://localhost:50684/"
            //});
            //alert("N/A");
            //Ext.state.Manager.setProvider(cp);
            Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
            //Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
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
        me.txt_busqueda = Ext.create("App.Config.Componente.TextFieldBase", { fieldLabel: me.textBusqueda, width: me.widthBsuqeda, labelWidth: me.tamBusqueda, hidden: me.busqueda })
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
            tooltip: 'Imprimir Datos',
            //enableToggle: true,
            scope: this,
            hidden: me.imprimir,
            tooltipType: 'qtip',
            handler: me.ImprimirReporte


        });
        me.btn_exportExcel = Ext.create('Ext.Button', {
            pressed: true,
            iconCls: 'page_excel',
            tooltip: 'Exportar Datos',
            //enableToggle: true,
            scope: this,
            hidden: me.excel,
            tooltipType: 'qtip',
            handler: me.ExportarReporte


        });

        me.btn_criterios = Ext.create('Ext.Button', {
            pressed: true,
            iconCls: 'building_add',
            tooltip: 'Introducir Criterios de Busqueda',
            //enableToggle: true,
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
            //enableToggle: true,
            scope: this,
            hidden: me.reportesEquipo,
            tooltipType: 'qtip',
            handler: me.ImprimirReporteEquipo


        });
        me.btn_historico = Ext.create('Ext.Button', {
            pressed: true,
            iconCls: 'clock',
            tooltip: 'Reporte Historicos Estados',
            //enableToggle: true,
            scope: this,
            hidden: me.reportesHistoricoEstados,
            tooltipType: 'qtip',
            handler: me.MostrarreporteHistoricoEstado


        });
        ///////////
        me.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
            me.txt_busqueda,
            me.button,
            me.btn_imprimir,
            me.btn_exportExcel,
            me.btn_criterios,
            me.btn_reportes,
            me.btn_historico
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
            displayMsg: 'Desplegando {0} - {1} de {2}',
            emptyMsg: "No existen " + me.equipo + ".",
            items: me.fbarmenu

        });
        //truco para mover al inicio cuando se empieza una nueva busqueda
        me.bar = me.bbar;
        if (me.fbarmenuArray != null) {
            me.getSelectionModel().on('selectionchange', me.onFbarmenuSeleccion, this);
        }

    },
    onFbarmenuSeleccion: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.record = disabled ? null : selections[0];
        for (x in me.fbarmenuArray) {
            Funciones.DisabledButton(me.fbarmenuArray[x], me, disabled);
        }
    },
    MostrarreporteHistoricoEstado: function () {
        var me = this;
        var datos = me.getSelectionModel().getSelection()[0];
        if (datos != null) {

            if (me.winHist == null) {
                me.winHist = Ext.create("App.Config.Abstract.Window", { botones: false });
                me.gridHist = Ext.create("App.View.Historicos.GridHistoricosEstado");
            }
            me.gridHist.CargarHistorico(me.tabla, datos.get(me.id_tabla));
            me.winHist.add(me.gridHist);
            me.winHist.show();
        } else {
            Ext.Msg.alert("Aviso", "Seleccione un Registro...");

        }

    },
    AgregarBtnToolbar: function (btn) {
        this.toolBar.add(btn);
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
                me.store.limpiarParametros(me.noLimpiar);
            }
            me.store.setExtraParam('Contiene', me.txt_busqueda.getValue());
            me.bar.moveFirst();
        }

    },
    buscarBotonCodigo: function () {
        var me = this;
        //me.store.setExtraParam('codigo', 'CODIGO');
        if (me.borrarParametros) {
            me.store.limpiarParametros(me.noLimpiar);
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
    ExportarReporte: function () {
        var me = this;
        //Ext.create('');
        var filename = 'exportarDatos';
        //alert("entro");
        var data = App.Config.ux.Exporter.exportGrid(me, 'excel', filename);
        //alert(data)
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent(data));
        //e.preventDefault();
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
    },
    AgregarBtnToolbar: function (btn) {
        this.toolBar.add(btn);
    },

});
