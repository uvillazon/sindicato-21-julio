Ext.define("App.View.Postes.GridPostes", {
    extend: "App.Config.Abstract.Grid",
    title: 'Postes Registrados',
    criterios: true,
    textBusqueda: 'Postes',
    imprimir: true,
    width: 550, 
    height: 350,
    equipo: 'Postes',
    win: null,
    formulario : null,
    initComponent: function () {
        var me = this;
        me.store = Ext.create("App.Store.Postes.Postes");
        me.CargarComponentes();
        me.columns = [
        { xtype: "rownumberer", width: 45, sortable: false },
        { header: "Codigo<br>Poste", width: 90, sortable: true, dataIndex: 'COD_POSTE' },
        { header: "Sistema", width: 90, sortable: true, dataIndex: 'AREA_UBIC' },
        { header: "Ubicacion", width: 90, sortable: true, dataIndex: 'UBICACION' },
        { header: "Codigo<br>Tipo", width: 90, sortable: true, dataIndex: 'COD_TIPO' },
        { header: "Descrp. Tipo", width: 90, sortable: true, dataIndex: 'DESC_TIPO' },
        { header: 'Fecha<br>Operacion', dataIndex: 'FECHA_OPER', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y') }
        ];
        me.on('celldblclick', me.DevolverDatosPoste, this);
        this.callParent(arguments);
    },
    DevolverDatosPoste: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        if (me.win != null) {
            me.win.hide();
            me.record = record;
            me.formulario.CargarPoste(record);
        } else {

        }
    }
});