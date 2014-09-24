Ext.define("App.Config.Abstract.View", {
    extend: 'Ext.view.View',
    margins: '0 2 0 0',
    singleSelect: true,
    overItemCls: 'x-view-over',
    itemSelector: 'div.thumb-wrap',
    baseCls: 'img-chooser-view',
    height: 400,
    width: 400,
    title: 'Imagenes del PUesto',
    autoScroll: true,
    CargarComponentes: function () {
        var me = this;
        if (me.stateId != null) {
            Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        }
        //        this.store = store = Ext.create('App.Usuario.Store.Usuarios');
        if (me.store != null) {
            if (me.paramsStore != null) { this.store.setExtraParams(me.paramsStore);}
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
            enableToggle: true,
            scope: this,
            hidden: me.imprimir,
            tooltipType: 'qtip',
            handler: me.ImprimirReporte


        });

        me.btn_criterios = Ext.create('Ext.Button', {
            pressed: true,
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
            emptyMsg: "No existen " + me.equipo + "."

        });
        me.bar = me.bbar;
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
    }

});
