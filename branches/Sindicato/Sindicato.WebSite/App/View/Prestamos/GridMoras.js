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
        Funciones.CrearMenu('btn_Crear', 'Crear Mora', Constantes.ICONO_CREAR, me.CargarFormMora, me.toolbar, this, null, false);
        Funciones.CrearMenu('btn_Eliminar', 'Eliminar Mora', Constantes.ICONO_BAJA, me.Eliminar, me.toolbar, this, null, true);
        me.fbarmenu = me.toolbar,
        me.fbarmenuArray = ["btn_Eliminar"];
        me.store = Ext.create("App.Store.Prestamos.Moras");
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                return Constantes.CargarCssEstados(record.get("ESTADO"), 'PRESTAMOS');
            }
        };
        me.CargarComponentes();
        me.columns = [
               { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Fecha", width: 80, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Nro Semana", width: 80, sortable: true, dataIndex: "NRO_SEMANA" },
                { header: "Dias Retraso", width: 80, sortable: true, dataIndex: "DIAS_RETRASO" },
                { header: "Importe Mora", width: 100, sortable: false, dataIndex: "IMPORTE_MORA" },
                { header: "Observaciones", width: 200, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Estado", width: 80, sortable: false, dataIndex: "ESTADO" },
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
    CargarFormMora: function () {
        var me = this;
        Funciones.AjaxRequest("Prestamos", "ObtenerPlanAPagar", me, { ID_PRESTAMO: me.prestamo.get('ID_PRESTAMO') }, function (result) {
            if (result.success == true) {
                me.FormMora(result.data);
            }
            else {
                Ext.MessageBox.alert('Error', result.msg);
            }
        });
    },
    FormMora: function (record) {
        var me = this;
        //console.log(me.prestamo);
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Prestamos.FormMora", {
            columns: 2,
            botones: false
        });
        //form.txt_socio.setVisible(false);
        //form.getForm().loadRecord(record);
        Funciones.loadRecordCmp(form, record);
        form.txt_observacion.setValue("Mora Correspondiente a la Cuota Nro. " + record.NRO_SEMANA);
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {

            Funciones.AjaxRequestWinSc("Prestamos", "GuardarMora", win, form, me, "Esta Seguro de Guardar", { ID_PRESTAMO: me.prestamo.get('ID_PRESTAMO') }, win, null);


        });

    },
});