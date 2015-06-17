Ext.define("App.View.Ventas.Grids", {
    extend: "Ext.grid.Panel",
    margins: '0 2 0 0',
    loadMask: true,
    opcion: "",
    pieTitulo: '',
    btnEliminarRecord: false,
    initComponent: function () {
        var me = this;
        //me.store = Ext.create("App.Store.Listas.Listas");
        if (me.opcion == "GridVentas") {
            me.title = "Ventas";
            me.pieTitulo = "Ventas";
            me.CargarGridVentas();
        }
        else if (me.opcion == "GridVentasCredito") {
            me.title = "Ventas a Credito";
            me.pieTitulo = "Ventas a Credito";
            me.CargarGridVentasCredito();
        }
        else {
            alert("Defina el tipo primero");
        }
        
        this.callParent(arguments);
    },
    CargarGridVentas : function(){
        var me = this;
      me.store = Ext.create("App.Store.Ventas.DetallesVenta");
        me.columns = [
           { header: "Producto", width: 120, sortable: true, dataIndex: "PRODUCTO" },
           { header: "Entrada Lts.", width: 80, sortable: false, dataIndex: "ENT_LITTER" },
           { header: "Salida Lts.", width: 80, sortable: false, dataIndex: "SAL_LITTER" },
           { header: "Total", width: 80, sortable: false, dataIndex: "TOTAL" }
        ];

    },
    CargarGridVentasCredito : function(){
        var me = this;
//        me.store = Ext.create("App.Store.SolicitudesMantenimiento.CodigosSolucion");
        me.columns = [
           { header: "Empresa", width: 120, sortable: true, dataIndex: "COD_SOL" },
           { header: "Diesel", width: 100, sortable: true, dataIndex: "DESCRIP_SOL" },
           { header: "Gasolina", width: 100, sortable: true, dataIndex: "DESCRIP_SOL" }
        ];

    },
    CargarGridMaterialSolucionesEditar: function () {
        var me = this;
        //me.store = Ext.create("App.Store.Postes.Materiales");
        //me.selType = 'cellmodel';
        me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ];
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
           { header: "Codigo<br>Poste o Conductor", width: 70, sortable: false, dataIndex: "CODIGO" },
           { header: "Codigo<br>UC", width: 50, sortable: false, dataIndex: "COD_UC" },
           { header: "Tension", width: 40, sortable: false, dataIndex: "TENSION" },
           { header: "Codigo<br>Mant.", width: 60, sortable: false, dataIndex: "COD_MAN" },
           { header: "Cantidad<br>Cod. Mant", width: 50, sortable: false, dataIndex: "CANTIDAD" },
            { header: "Codigo<br>Solucion", width: 60, sortable: false, dataIndex: "COD_SOL" },
            { header: "Codigo<br>Material", width: 60, sortable: false, dataIndex: "COD_ALTERNATIVO" },
            { header: "Descricion", width: 150, sortable: false, dataIndex: "DESCRIPCION" },
            { header: "Unidad", width: 70, sortable: false, dataIndex: "UNIDAD" },
            {
                header: "Cantidad", width: 70, sortable: false, dataIndex: "CANT_PRE", editor: {
                    xtype: 'numberfield',
                    allowNegative: false,
                }
            },
            {
                xtype: 'actioncolumn',
                width: 27,
                align: 'center',
                items: [
                    {
                        iconCls : 'delete',
                        tooltip: 'Eliminar',
                        hidden : me.btnEliminarRecord,
                        handler: function (grid, rowIndex, colIndex) {
                            grid.getStore().removeAt(rowIndex);
                            //grid.getView().refresh();
                        }
                    }]
            }
           
        ];
    },
    CargarComponentesSolicitudesRechazadas: function () {
        var me = this;
        me.store = Ext.create("App.Store.SolicitudesMantenimiento.SolicitudesMantenimientoFiltrados");
        me.store.setExtraParams({ Estados: 'RECH_INSP' });
        me.store.load();
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro Solicitud", width: 70, sortable: true, dataIndex: "ID_SOL_MAN" },
            { header: "Unidad<br>Reporta", width: 70, sortable: true, dataIndex: "UNIDAD_REPORTA" },
            { header: "Tipo Documento", width: 70, sortable: true, dataIndex: "TIPO_DOCUMENTO" },
            { header: "Nro<br>Documento", width: 70, sortable: true, dataIndex: "NRO_DOCUMENTO" },
            { header: "Nombre<br>Afectado", width: 100, sortable: true, dataIndex: "NOMBRE_AFECTADO" },
            { header: "Sistema", width: 70, sortable: true, dataIndex: "AREA_UBIC" },
            { header: "Ubicacion", width: 100, sortable: true, dataIndex: "UBICACION" },
            { header: "Nus", width: 70, sortable: true, dataIndex: "NUS" },
            { header: "Poste", width: 70, sortable: true, dataIndex: "COD_POSTE" },
            { header: "Tipo Objeto", width: 70, sortable: true, dataIndex: "TIPO_OBJ" },
            { header: "Nombre quien<br>Reporta", width: 100, sortable: true, dataIndex: "REPORTA_NOMBRE" },
            { header: "Movil que Reporta", width: 70, sortable: true, dataIndex: "REPORTA_MOVIL" },
            { header: "Fecha Problema", width: 70, sortable: true, dataIndex: "FECHA_PROBL", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Hora Problema", width: 70, sortable: true, dataIndex: "HORA_PROBL" },
            { header: "Nro Reclamo", width: 70, sortable: true, dataIndex: "NRO_RECLAMO" },
            { header: "Observacion", width: 70, sortable: true, dataIndex: "OBSERVACION" },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },

        ];
    },
    CargarComponentesCodigoSoluciones: function () {
        var me = this;
        me.store = Ext.create("App.Store.SolicitudesMantenimiento.CodigosSolucion");
        me.columns = [
           { header: "Codigo<br>Solicitud", width: 120, sortable: true, dataIndex: "COD_SOL" },
           { header: "Descripcion", width: 330, sortable: true, dataIndex: "DESCRIP_SOL" }
        ];

    }

});

