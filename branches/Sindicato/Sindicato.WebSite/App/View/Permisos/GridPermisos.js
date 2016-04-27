Ext.define("App.View.Permisos.GridPermisos", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Permisos',
    tamBusqueda: 50,
    title: 'Permisos Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Permisos.Permisos");
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                return Constantes.CargarCssEstados(record.get("ESTADO"), 'PERMISOS');
            }
        };
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Nro.<br>Permiso", width: 80, sortable: false, dataIndex: "ID_PERMISO" },
                { header: "Nro Movil", width: 80, sortable: false, dataIndex: "NRO_MOVIL" },
                { header: "Socio", width: 150, sortable: false, dataIndex: "SOCIO" },
                { header: "Motivo", width: 100, sortable: false, dataIndex: "MOTIVO" },
                { header: "Obsservacion", width: 200, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Cant. Hojas<br>Permitidas", width: 100, sortable: false, dataIndex: "CANT_HOJAS_OBLIG" },
                { header: "Desde", width: 80, sortable: true, dataIndex: "FECHA_INI", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Hasta", width: 80, sortable: true, dataIndex: "FECHA_FIN", renderer: Ext.util.Format.dateRenderer('d/m/Y') },

                { header: "Estado", width: 80, sortable: false, dataIndex: "ESTADO" },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN_USR" },
                { header: "Motivo Baja", width: 100, sortable: false, dataIndex: "OBSERVACION_BAJA" },
                { header: "Fecha <br>Registro", width: 80, sortable: true, dataIndex: "FECHA_BAJA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Login Baja", width: 80, sortable: false, dataIndex: "LOGIN_BAJA" }
        ];


    }
});
