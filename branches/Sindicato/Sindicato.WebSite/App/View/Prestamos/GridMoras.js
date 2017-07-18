Ext.define("App.View.Prestamos.GridMoras", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    busqueda: true,
    imprimir: true,
    excel: true,
    cargarStore: false,
    textBusqueda: 'Buscar Mora',
    tamBusqueda: 70,
    title: 'Moras Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_Crear', 'Crear Mora', Constantes.ICONO_CREAR, me.FormMora, me.toolbar, this, null, false);
        Funciones.CrearMenu('btn_Eliminar', 'Eliminar Mora', Constantes.ICONO_BAJA, me.Eliminar, me.toolbar, this, null, true);
        me.fbarmenu = me.toolbar,
        me.fbarmenuArray = ["btn_Eliminar"];
        me.store = Ext.create("App.Store.Prestamos.Moras");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Fecha", width: 80, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Fecha Limite", width: 80, sortable: true, dataIndex: "FECHA_LIMITE_PAGO_MORA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Importe Mora", width: 100, sortable: false, dataIndex: "IMPORTE_MORA" },
                { header: "Observaciones", width: 200, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN_USR" }
        ];


    },
    Eliminar: function () {
        var me = this;
        Funciones.AjaxRequestGrid("Prestamos", "EliminarMora", me, "Esta seguro de Eliminar la Mora?", { ID_MORA: me.record.get('ID_MORA') }, me, null, null);
    },
    setPrestamo: function (record) {
        var me = this;
        me.prestamo = record;
    },
    FormMora: function () {
        var me = this;
        //console.log(me.prestamo);
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Prestamos.FormMora", {
            columns: 2,
            botones: false
        });
        //form.txt_socio.setVisible(false);
        //form.getForm().loadRecord(me.prestamo);
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {

            Funciones.AjaxRequestWinSc("Prestamos", "GuardarMora", win, form, me, "Esta Seguro de Guardar", { ID_PRESTAMO: me.prestamo.get('ID_PRESTAMO') }, win, null);


        });

    },
});