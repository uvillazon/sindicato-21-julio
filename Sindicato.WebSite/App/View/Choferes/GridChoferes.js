Ext.define("App.View.Choferes.GridChoferes", {
    extend: "App.Config.Abstract.Grid",
    title: 'Choferes Registrados',

    //    stateId: 'MNGridResponsables',
    criterios: true,
    textBusqueda: 'Chofer',
    tamBusqueda: 70,
    equipo: '',
    initComponent: function () {
        var me = this;
        if (me.opcion == "GridPrincipal") {
            me.CargarGridPrincipal();
        }
        else {
            alert("No selecciono ninguna opcion");
        }
        this.callParent(arguments);
    },
    CargarGridPrincipal: function () {
        var me = this;
        me.store = Ext.create("App.Store.Choferes.Choferes");
        me.CargarComponentes();
        me.columns = [
             { xtype: "rownumberer", width: 30, sortable: false },
        //            { header: " - ", width: 30, sortable: false, dataIndex: "ID_CHOFER", hidden: true },
            //{header: "Img", width: 155, sortable: true, dataIndex: 'ID_IMG', renderer: me.renderImagen },
            { header: "Nro<br>Chofer", width: 70, sortable: true, dataIndex: "NRO_CHOFER" },
            { header: "Nombre Completo", width: 150, sortable: true, dataIndex: "NOMBRE_CHOFER" },
            { header: "Fondo<br>Emergencia", width: 50, sortable: true, dataIndex: "FONDO_EMERGENCIA" },
            { header: "Deposito<br>Fondo Emer.", width: 70, sortable: true, dataIndex: "SALDO_FONDO_EMERGENCIA" },
            { header: "Saldo<br>Fondo Emer.", width: 70, sortable: true, dataIndex: "SALDO" },
            { header: "Nro Licencia", width: 70, sortable: true, dataIndex: "LICENCIA" },
            { header: "Carnet<br>Identidad", width: 70, sortable: true, dataIndex: "CARNET" },
            //{ header: "Expedido", width: 70, sortable: true, dataIndex: "EXPEDIDO" },
            { header: "Fecha<br>Nacimiento", width: 70, sortable: true, dataIndex: "FECHA_NAC", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Fecha <br>Ingreso", width: 70, sortable: true, dataIndex: "FECHA_INGRESO", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Domicilio", width: 150, sortable: true, dataIndex: "DOMICILIO" },
            { header: "Telefonos", width: 100, sortable: true, dataIndex: "TELEFONO" },
            { header: "Celular", width: 100, sortable: true, dataIndex: "CELULAR" },
            { header: "Obervacion", width: 70, sortable: true, dataIndex: "OBSERVACION" },
            { header: "Estado<br>Civil", width: 70, sortable: true, dataIndex: "ESTADO_CIVIL" },
            { header: "Garante", width: 150, sortable: true, dataIndex: "NOMBRE_SOCIO" },
        ];

       
    },
    renderImagen: function (val, metaData, record) {
        //  alert(record.data.ID)
        if (record.data.ID_IMG == 0) {
            return null;
        }
        else {
            return '<img src="' + Constantes.URLIMAGEN + 'id=' + val + '&tamano=150"/>';
        }
    }
});