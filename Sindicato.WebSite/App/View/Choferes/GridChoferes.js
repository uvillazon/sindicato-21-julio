Ext.define("App.View.Choferes.GridChoferes", {
    extend: "App.Config.Abstract.Grid",
//    title: 'Socios Registrados',

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
            {header: "Img", width: 155, sortable: true, dataIndex: 'ID_IMG', renderer: me.renderImagen },
            { header: "Nro<br>Chofer", width: 70, sortable: true, dataIndex: "NRO_CHOFER" },
            { header: "Nombre", width: 100, sortable: true, dataIndex: "NOMBRE" },
            { header: "Apellido<br>Paterno", width: 100, sortable: true, dataIndex: "APELLIDO_PATERNO" },
            { header: "Apellido<br>Materno", width: 100, sortable: true, dataIndex: "APELLIDO_MATERNO" },
            { header: "Nro Licencia", width: 70, sortable: true, dataIndex: "NRO_LICENCIA" },
            { header: "Categoria<br>Licencia", width: 70, sortable: true, dataIndex: "CATEGORIA_LIC" },
            { header: "Carnet<br>Identidad", width: 70, sortable: true, dataIndex: "CI" },
            { header: "Expedido", width: 70, sortable: true, dataIndex: "EXPEDIDO" },
            { header: "Fecha<br>Nacimiento", width: 70, sortable: true, dataIndex: "FECHA_NAC", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Fecha <br>Ingreso", width: 70, sortable: true, dataIndex: "FECHA_INGRESO", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Domicilio", width: 100, sortable: true, dataIndex: "DOMICILIO" },
            { header: "Telefonos", width: 100, sortable: true, dataIndex: "TELEFONO" },
            { header: "Celular", width: 100, sortable: true, dataIndex: "CELULAR" },
            { header: "Obervacion", width: 70, sortable: true, dataIndex: "OBSERVACION" },
            { header: "Estado<br>Civil", width: 70, sortable: true, dataIndex: "ESTADO_CIVIL" },
            { header: "Garante", width: 150, sortable: true, dataIndex: "NOMBRE_SOCIO" },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_SOCIO", hidden: true },
            { header: " - ", width: 30, sortable: false, dataIndex: "ID_USR", hidden: true },
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