Ext.define("App.View.Listas.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    alias: "widget.PrincipalListas",
    controlador: 'Listas',
    accionCrear: 'GrabarListaSP',
    accionCrearLista: 'GrabarListaItemSP',
    accionBaja: 'BajaLista',
    view: '',
    initComponent: function () {
        var me = this;
        //        alert(me.view);
        me.CargarComponentes();
        me.CargarEventos();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.grid = Ext.create('App.View.Listas.GridListas', {
            region: 'west',
            width: '45%'

        });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('id12', 'Crear Lista', Constantes.ICONO_CREAR, me.CrearTipoLista, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);
        me.grid_listas = Ext.create("App.View.Listas.Grids", {
            height: 250,
            opc: 'GridListaItems'
        });
        me.toolbarLista = Funciones.CrearMenuBar('left');
        Funciones.CrearMenu('id12', 'Crear', Constantes.ICONO_CREAR, me.CrearListaItem, me.toolbarLista, this);
        Funciones.CrearMenu('id13', 'Eliminar', Constantes.ICONO_BAJA, me.CargarEventos, me.toolbarLista, this);
        me.grid_listas.addDocked(me.toolbarLista, 1);
//        me.grid_listaRel = Ext.create("App.View.Listas.Grids", {
//            height: 250,
//            opc: 'GridListaItemRel'
//        })
//        me.toolbarListaRel = Funciones.CrearMenuBar('left');
//        Funciones.CrearMenu('id12', 'Crear', Constantes.ICONO_CREAR, me.CrearListaItemRel, me.toolbarListaRel, this);
//        Funciones.CrearMenu('id13', 'Eliminar', Constantes.ICONO_BAJA, me.CargarEventos, me.toolbarListaRel, this);
//        me.grid_listaRel.addDocked(me.toolbarListaRel, 1);

        me.form_panel = Ext.create("App.Config.Abstract.FormPanel", {
            items: [me.grid_listas, me.grid_listaRel]
        });
        me.items = [me.grid, me.form_panel];
        //me.grid.on('cellclick', me.CargarDatos, this);

    },
    CargarEventos: function () {
        var me = this;
        me.grid.on('cellclick', me.CargarLista, this);
        me.grid_listas.on('cellclick', me.CargarListaItems, this);

    },
    CargarLista: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        me.grid_listas.getStore().setExtraParam("ID_LISTA", record.get('ID_LISTA'));
        me.grid_listas.getStore().load();
        me.grid_listas.data = record;
    },
    CargarListaItems: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        //me.grid_listaRel.getStore().setExtraParam("condicion", me.grid_listas.data.get('LISTA'));
        me.grid_listaRel.getStore().setExtraParam("ID_PADRE", record.get('ID_TABLA'));
        me.grid_listaRel.getStore().load();
        me.grid_listaRel.data = record; 
    },
    CrearTipoLista: function () {
        var me = this;
        //if (me.win == null) {
        me.Formulario = Ext.create('App.View.Listas.FormLista', { botones: false });
        me.win = Ext.create('App.Config.Abstract.Window', { botones: true, items: me.Formulario }).show();
        me.win.btn_guardar.on('click', me.GuardarTipoLista, this);
        //alert(me.win.getId());
        //}
        //else {
        //    me.win.show();
        //    alert(me.win.getId());
        //}
    },
    CrearListaItem: function () {
        var me = this;
        if (me.grid_listas.data != null) {
            me.FormularioRel = Ext.create('App.View.Listas.FormListaRel', { botones: false, data: me.grid_listas.data });
            me.winLista = Ext.create('App.Config.Abstract.Window', { botones: true, items: me.FormularioRel }).show();
            me.winLista.btn_guardar.on('click', me.GuardarLista, this);
        }
        else {
            Ext.MessageBox.alert('Error', "Seleccione una Lista Primero");
        }
        
    },
    CrearListaItemRel: function () {
        var me = this;
        if (me.grid_listaRel.data != null) {
            me.FormularioRelLista = Ext.create('App.View.Listas.FormListaRel', { botones: false, data: me.grid_listaRel.data , opcion : 'ListaRel' });
            me.winListaRel = Ext.create('App.Config.Abstract.Window', { botones: true, items: me.FormularioRelLista }).show();
            me.FormularioRelLista.loadRecord(me.grid_listaRel.data);
            me.FormularioRelLista.cbx_lista.clearValue();
            me.winListaRel.btn_guardar.on('click', me.GuardarListaRel, this);
        }
        else {
            Ext.MessageBox.alert('Error', "Seleccione una Lista Primero");
        }

    },
    GuardarTipoLista: function () {
        var me = this;
        Funciones.AjaxRequestWin(me.controlador, me.accionCrear, me.win, me.Formulario, me.grid, null, null, me.win);
    },
    GuardarLista: function () {
        var me = this;
        Funciones.AjaxRequestWin(me.controlador, me.accionCrearLista, me.winLista, me.FormularioRel, me.grid_listas, null, { ID_LISTA: me.grid_listas.data.get('ID_LISTA') }, me.winLista);
    },
    GuardarListaRel: function () {
        var me = this;
        Funciones.AjaxRequestWin(me.controlador, me.accionCrearLista, me.winListaRel, me.FormularioRelLista, me.grid_listaRel, null, { ID_PADRE: me.grid_listaRel.data.get('ID_TABLA') }, me.winListaRel);
    }
});
