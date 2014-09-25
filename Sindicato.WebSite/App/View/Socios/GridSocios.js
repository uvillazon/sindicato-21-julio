Ext.define("App.View.Socios.GridSocios", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Socios',
    tamBusqueda: 50,
    equipo: '',
    initComponent: function () {
        var me = this;
        if (me.opcion == "GridSocios") {
            me.CargarGridSocios();
        }
        else {
            alert("No selecciono ninguna opcion");
        }
        this.callParent(arguments);
    },
    CargarGridSocios: function () {
        var me = this;
        me.store = Ext.create("App.Store.Socios.Socios");
        me.CargarComponentes();
        me.columns = [
          { xtype: "rownumberer", width: 30, sortable: false },
        //        { header: " - ", width: 30, sortable: false, dataIndex: "ID_SOCIO", hidden: true },
        {header: "Img", width: 155, sortable: true, dataIndex: 'ID_IMG', renderer: me.renderImagen },
        { header: "Nro<br>Movil", width: 70, sortable: true, dataIndex: "NRO_MOVIL" },
        { header: "Tipo<br>Movil", width: 100, sortable: true, dataIndex: "TIPO_MOVIL" },
        { header: "Fecha <br>Ingreso", width: 80, sortable: true, dataIndex: "FECHA_INGRESO", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
        { header: "Nombres", width: 150, sortable: true, dataIndex: "NOMBRE" },
        { header: "Apellido<br>Paterno", width: 100, sortable: true, dataIndex: "APELLIDO_PATERNO" },
        { header: "Apellido<br>Materno", width: 100, sortable: true, dataIndex: "APELLIDO_MATERNO" },
        { header: "Nro Licencia", width: 70, sortable: true, dataIndex: "NRO_LICENCIA" },
        { header: "Categoria <br>Licencia", width: 70, sortable: true, dataIndex: "CATEGORIA_LIC" },
        { header: "Carnet<br>Identidad", width: 70, sortable: true, dataIndex: "CI" },
        { header: "Expedido", width: 70, sortable: true, dataIndex: "EXPEDIDO" },
        { header: "Fecha <br>Nacimiento", width: 70, sortable: true, dataIndex: "FECHA_NAC", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
        { header: "Direccion", width: 200, sortable: true, dataIndex: "DOMICILIO" },
        { header: "Telefonos", width: 100, sortable: true, dataIndex: "TELEFONO" },
        { header: "Celular", width: 100, sortable: true, dataIndex: "CELULAR" },
        { header: "Estado<br>Civil", width: 70, sortable: true, dataIndex: "ESTADO_CIVIL" }
        ];


    },
    renderImagen: function (val, metaData, record) {
        //  alert(record.data.ID)
        if (record.data.ID_IMG == 0) {
            //            return '<img src="../Content/Iconos/no-imagen.jpg" />';
            return null;
        }
        else {
            return '<img src="' + Constantes.URLIMAGEN + 'id=' + val + '&tamano=150"/>';
        }
    }
});