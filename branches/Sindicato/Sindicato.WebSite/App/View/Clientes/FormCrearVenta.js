Ext.define("App.View.Ventas.FormCrearVenta", {
    extend: "App.Config.Abstract.Form",
//    title: "Datos de Orden de Trabajo",
    cargarStores: true,
    columns: 2,
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        me.cargarEventos();
        this.callParent(arguments);
    },
    
    CargarComponentes: function () {
        var me = this;
        me.gridVenta = Ext.create("App.View.Ventas.Grids", {
                    opcion: 'GridVentas',
                    colspan: 2,
                    width: 400,
                    height : 200
                });
        me.toolbarVenta = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_GuardarCambios', 'Guardar Cambios', 'disk', me.EventosVenta, me.toolbarVenta, this);
        me.gridVenta.addDocked(me.toolbarVenta, 1);
        me.formSubTotales = Ext.create("App.View.Ventas.Forms", {
            opcion: 'formSubTotales',
            botones: false,
            width: 350,
            colspan: 2
        });
        Funciones.BloquearFormularioReadOnly(me.formSubTotales);
        me.gridVentaCredito = Ext.create("App.View.Ventas.Grids", {
            opcion: 'GridVentasCredito',
            colspan: 2,
            width: 400,
            height : 200
        });
        me.formResumen = Ext.create("App.View.Ventas.Forms", {
            opcion: 'formResumen',
            botones: false,
            columns: 3,
            width: 350,
            colspan: 2
        });
        Funciones.BloquearFormularioReadOnly(me.formResumen);
        me.store_turno = Ext.create('App.Store.Listas.StoreLista');
        me.store_turno.setExtraParam('ID_LISTA', Lista.Buscar('TURNO'));
        me.cbx_turno = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Turno",
            name: "TURNO",
            displayField: 'VALOR',
//            valueField: 'CODIGO',
            store: me.store_turno,
            //afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_nombres  = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombres",
            name: "NOMBRES",
            width: 350,

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
        });
      
            me.items=  [me.gridVenta, me.formSubTotales, me.gridVentaCredito, me.formResumen];
            me.tbar= [me.date_fecha, me.cbx_turno, me.txt_nombres]


    },
    cargarEventos : function(){
        var me = this;
        me.cbx_turno.on('select',function(cmb,record){
            if(me.date_fecha.getValue() != null){
                me.gridVenta.getStore().setExtraParamDate('FECHA',me.date_fecha.getValue());
                 me.gridVenta.getStore().setExtraParam('TURNO',cmb.getValue());
                 me.gridVenta.getStore().load();
//                me.gridVenta().getStore().setExtraParams({
//                    FECHA :  me.date_fecha.getValue()
//                });
            }
            else{
                Ext.Msg.alert("Seleccione Fecha primero");
            }
        });
    },
    EventosVenta : function(btn){
   
    }
});
