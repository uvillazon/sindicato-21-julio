Ext.define("App.View.ConsumoPropio.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'CuentasPC',
    accionGrabar: 'GrabarConsumoPropio',
    view: '',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearComsumoPropio', 'Nuevo', Constantes.ICONO_CREAR, me.EventosConsumoPropio, me.toolbar, this);
        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.ImprimirReporteGrid, me.toolbar, this);
        Funciones.CrearMenu('btn_Detalle', 'Detalle', 'report', me.EventosConsumoPropio, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Editar', 'Editar', Constantes.ICONO_EDITAR, me.EventosConsumoPropio, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Eliminar', 'Eliminar', Constantes.ICONO_BAJA, me.EventosConsumoPropio, me.toolbar, this, null, true);

        me.grid = Ext.create('App.View.ConsumoPropio.GridConsumoPropio', {
            region: 'center',
            height: 350,
            imagenes: false,
            opcion: 'GridConsumoPropio',
            toolbar: me.toolbar
        });
        me.items = [me.grid];

        me.grid.on('itemclick', me.onItemClick, this);
        me.grid.getSelectionModel().on('selectionchange', me.onSelectChange, this);
        me.grid.on('itemdblclick', me.MostrarDetalle, this);
    },
    onItemClick: function (view, record, item, index, e) {
        var me = this;
        me.record = record;
        me.id = record.get('ID_CONSUMO_PROPIO');
    },
    onSelectChange: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        Funciones.DisabledButton('btn_Editar', me.toolbar, disabled);
        Funciones.DisabledButton('btn_Detalle', me.toolbar, disabled);
        Funciones.DisabledButton('btn_Eliminar', me.toolbar, disabled);
    },
    EventosConsumoPropio: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_CrearComsumoPropio" || btn.getItemId() == "btn_Editar") {
            var me = this;
            var win = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Nuevo Cliente' });
            var formcliente = Ext.create("App.View.ConsumoPropio.Forms", {
                columns: 1,
                botones: false,
                title: 'Formulario de Registro de Cliente Consumo',
                opcion: 'FormCliente'
            });
            //            formcliente.EventosFormEditarVentaCredito();
            if (btn.getItemId() == "btn_Editar") {
                formcliente.CargarDatos(me.record);
                win.btn_guardar.setText("Editar Cliente Consumo");
            }
            win.add(formcliente);
            win.btn_guardar.on('click', function () {
                Funciones.AjaxRequestWin("ClientesConsumo", "GuardarCliente", win, formcliente, me.grid, "Esta Seguro de Guardar el Cliente", null, win);
            });
            win.show();
        }
        else if (btn.getItemId() == "btn_Eliminar") {
            Funciones.AjaxRequestGrid("ClientesConsumo", "EliminarCliente", me, "Esta Seguro de Eliminar el Cliente", { ID_CLIENTE: me.record.get('ID_CLIENTE') }, me.grid, null);
        }
        else if (btn.getItemId() == "btn_Detalle") {
            me.MostrarDetalle();
        }
        else {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    },
    MostrarDetalle: function () {
        var win = Ext.create('App.Config.Abstract.Window', { title: 'Detalle de Consumo :' + this.record.get('NOMBRE') });
        var grid = Ext.create('App.View.ConsumoPropio.GridConsumoPropio', {
            opcion: 'GridConsumo'
        });
        grid.getStore().setExtraParams({ ID_CLIENTE: this.record.get('ID_CLIENTE') });
        grid.getStore().load();
        win.add(grid);
        win.show();
    }
});
