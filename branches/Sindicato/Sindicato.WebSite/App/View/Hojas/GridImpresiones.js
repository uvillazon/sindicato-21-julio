Ext.define("App.View.Hojas.GridImpresiones", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    busqueda: false,
    imprimir: true,
    excel: true,
    cargarStore: true,
    textBusqueda: 'Buscar Impresiones',
    tamBusqueda: 70,
    title: 'Impresiones Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_Crear', 'Crear Impresion', Constantes.ICONO_CREAR, me.FormCrearImpresion, me.toolbar, this, null, false);
        me.fbarmenu = me.toolbar,
        me.store = Ext.create("App.Store.Hojas.Impresiones");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Fecha", width: 80, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Nro Movil", width: 80, sortable: false, dataIndex: "NRO_MOVIL" },
                { header: "Socio", width: 200, sortable: false, dataIndex: "SOCIO" },
                { header: "Total de Hojas", width: 120, sortable: false, dataIndex: "TOTAL_HOJAS" },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN" }
        ];


    },
    FormCrearImpresion: function () {
        var me = this;
        win = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Venta' });
        form = Ext.create("App.View.Hojas.FormImpresionHoja", { botones: false });
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            if (form.isValid()) {
                Funciones.AjaxRequestWinSc("VentaHojas", "GuardarImpresionHojas", win, form, me, "Esta Seguro de Guardar", null, win, function (result) {
                    //console.dir(result);
                    form.ImprimirHojas(result.id);
                });
            }
            else {
                Ext.Msg.alert("Error", "Falta Compeltar Formulario. Al menos una hoja debe de venderse");
            }
        });

    },
});