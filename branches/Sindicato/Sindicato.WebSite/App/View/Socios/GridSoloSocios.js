Ext.define("App.View.Socios.GridSoloSocios", {
    extend: "App.Config.Abstract.Grid",
    title: 'Socios',
    criterios: true,
    textBusqueda: 'Socios',
    tamBusqueda: 50,
    title: 'Socios Registrados',
    equipo: '',
    fbarmenuArray : ["btn_EliminarSocio"],
    initComponent: function () {
        var me = this;
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_EliminarSocio', 'Eliminar', 'cross', me.EliminarSocio, me.toolbar, this, null,true);
        me.fbarmenu = me.toolbar;
        me.CargarGridKardex();
        this.callParent(arguments);
    },
    CargarGridKardex: function () {
        var me = this;
        me.store = Ext.create("App.Store.Socios.SoloSocios");
        me.CargarComponentes();
       
       

        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nombre", width: 80, sortable: false, dataIndex: "NOMBRE" },
            { header: "Apellido<br>Paterno", width: 80, sortable: false, dataIndex: "APELLIDO_PATERNO" },
            { header: "Apellido<br>Materno", width: 80, sortable: false, dataIndex: "APELLIDO_MATERNO" },
            { header: "CI", width: 80, sortable: false, dataIndex: "CI" },
            { header: "Domicilio", width: 80, sortable: false, dataIndex: "DOMICILIO" },
            { header: "Telefono", width: 80, sortable: false, dataIndex: "TELEFONO" },
             { header: "Nro Moviles", width: 80, sortable: false, dataIndex: "NRO_MOVILES" },
          

        ];
    },
    EliminarSocio: function () {
        var me = this;
        if (me.record == null) {
            Ext.Msg.alert("Aviso", "Seleccione un Regitro");
        }
        else {

            Funciones.AjaxRequestGrid("Socios", "EliminarSocio", me, "Se eliminara todos los registros asociados al socio Esta seguro que desea continuar?", { ID_SOCIO: me.record.get('ID_SOCIO') }, me, null);
        }
    }
    
});