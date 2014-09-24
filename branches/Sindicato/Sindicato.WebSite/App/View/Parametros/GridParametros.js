Ext.define("App.View.Parametros.GridParametros", {
    extend: "App.Config.Abstract.Grid",
//    title: 'Socios Registrados',

    //    stateId: 'MNGridResponsables',
    criterios: true,
    imprimir: true,
    busqueda: true,
    textBusqueda: 'Parametro',
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
        me.store = Ext.create("App.Store.Parametros.Parametros");
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo", width: 100, sortable: true, dataIndex: "CODIGO" },
            { header: "Nombre", width: 150, sortable: true, dataIndex: "NOMBRE" },
            { header: "Tipo", width: 100, sortable: true, dataIndex: "TIPO" },
            { header: "Linea", width: 100, sortable: true, dataIndex: "NRO_LINEA" },
            { header: "Monto (Bs.)", width: 100, sortable: true, dataIndex: "MONTO" },
            { header: "Fecha<br>Inicio", width: 70, sortable: true, dataIndex: "FECHA_INICIO", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Fecha <br>Fin", width: 70, sortable: true, dataIndex: "FECHA_FIN", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Estado", width: 100, sortable: true, dataIndex: "ESTADO" }
        ];

       
    },
    renderImagen: function (val, metaData, record) {
        //  alert(record.data.ID)
        if (record.data.ID_SOCIO == 0) {
            return '<img src="../Content/Iconos/no-imagen.jpg" />';
        }
        else {
            return '<img src="' + Constantes.URLIMAGEN + 'id=' + val + '&tamano=150&TABLA=SD_CHOFERES"/>';
        }
    }
});