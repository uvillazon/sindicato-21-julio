Ext.define("App.View.Socios.GridSocios", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Socios',
    tamBusqueda: 50,
    title: 'Socios Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        if (me.opcion == "GridSocios") {
            me.CargarGridSocios();
        }
        else if (me.opcion == 'GridSociosKardex') {
            me.CargarGridSociosKardex();
        }
        else {
            alert("No selecciono ninguna opcion");
        }
        this.callParent(arguments);
    },
    CargarGridSociosKardex: function () {
        var me = this;
        me.store = Ext.create("App.Store.Socios.Socios");
        me.CargarComponentes();
        me.columns = [
          { xtype: "rownumberer", width: 30, sortable: false },
        { header: "Nro<br>Movil", width: 70, sortable: true, dataIndex: "NRO_MOVIL" },
        { header: "Tipo<br>Movil", width: 100, sortable: true, dataIndex: "TIPO_MOVIL" },
        { header: "Nombres", width: 200, sortable: true, dataIndex: "NOMBRE_SOCIO" },
        { header: "Descripcion", width: 150, sortable: true, dataIndex: "DESCRIPCION" },
        { header: "Observaciones", width: 150, sortable: true, dataIndex: "OBSERVACION" },
        { header: 'Fecha<br>Alta', dataIndex: 'FECHA_ALTA', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
        { header: 'Fecha<br>Baja', dataIndex: 'FECHA_BAJA', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
        { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },

        ];
    },
    CargarGridSocios: function () {
        var me = this;
        me.store = Ext.create("App.Store.Socios.Socios");
        me.CargarComponentes();
        me.columns = [
          { xtype: "rownumberer", width: 30, sortable: false },
        //        { header: " - ", width: 30, sortable: false, dataIndex: "ID_SOCIO", hidden: true },
        //{header: "Img", width: 155, sortable: true, dataIndex: 'ID_IMG', renderer: me.renderImagen },
        { header: "Nro<br>Movil", width: 70, sortable: true, dataIndex: "NRO_MOVIL" },
        { header: "Tipo<br>Movil", width: 100, sortable: true, dataIndex: "TIPO_MOVIL" },
        { header: "Fecha <br>Ingreso", width: 80, sortable: true, dataIndex: "FECHA_INGRESO", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
        { header: "Nombres", width: 200, sortable: true, dataIndex: "NOMBRE_SOCIO" },
        { header: "Licencia", width: 70, sortable: true, dataIndex: "LICENCIA" },
        { header: "Carnet<br>Identidad", width: 70, sortable: true, dataIndex: "CARNET" },
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