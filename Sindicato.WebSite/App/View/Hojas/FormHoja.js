Ext.define("App.View.Hojas.FormHoja", {
    extend: "App.Config.Abstract.Form",
    columns: 2,
    title : 'Datos de Venta de Hojas de Control',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        me.cargarEventos();
        this.callParent(arguments);
    },
    cargarEventos : function(){
        var me = this;
        me.num_cantidad.on('change',function(num,newvalue,oldvalue){
            if(newvalue != null){
                    var sum = newvalue * me.num_precio.getValue() ;
                    me.num_total.setValue(sum);
//                    date_ini

                    me.date_fin.setValue(Ext.Date.add(me.date_ini.getValue(), Ext.Date.DAY, newvalue));
            }
        });
        me.date_ini.on('change',function(dat,newvalue){
            if(newvalue != null && me.num_cantidad.getValue()  != null){
                    me.date_fin.setValue(Ext.Date.add(newvalue, Ext.Date.DAY, me.num_cantidad.getValue()));
            }
        });
        me.cbx_socio.on('select', function(cbx,rec){
            me.gridHojas.getStore().setExtraParams({ID_MOVIL : rec[0].get('ID_MOVIL')});
            me.gridHojas.getStore().load();
            me.txt_nombre.setValue(rec[0].get('NOMBRE'));
            me.txt_apellido.setValue(rec[0].get('APELLIDO_PATERNO') + " "+rec[0].get('APELLIDO_MATERNO'));
        });

        
    },
    CargarComponentes: function () {
        var me = this;
        me.txt_id_caja = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_CAJA",
            hidden: true,
            value : Constantes.Usuario.ID_CAJA
        });
        me.txt_id_parada = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_PARADA",
            hidden: true,
            value : Constantes.Usuario.ID_PARADA
        });
        me.store_mes = Ext.create('App.Store.Listas.StoreLista');
        me.store_mes.setExtraParam('ID_LISTA', Lista.Buscar('MES'));
        me.cbx_mes = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Mes",
            name: "MES",
//            labelWidth: 50,
//            width: 150,
            displayField: 'VALOR',
            valueField: 'CODIGO',
            store: me.store_mes,
            //afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
         var fecha_actual = new Date();
        me.store_mes.on('load', function () {
            var meses = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
            me.cbx_mes.setValue(meses[fecha_actual.getMonth()].toString());
        });
         me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Venta",
            name: "FECHA_COMPRA",
//            readOnly : true,
            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.date_ini = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Uso ini",
            name: "FECHA_USO",
            maximo : 'sin maximo',
//            readOnly : true,
//            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
         me.date_fin = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Uso Fin",
            name: "FECHA_USO_FIN",
             opcion : 'sin fecha',
             maximo : 'sin maximo',
//            readOnly : true,
//            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_parada = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Parada",
            name: "PARADA",
            readOnly : true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            value : Constantes.Usuario.Parada
        });
         me.txt_caja = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Caja",
            name: "CAJA",
            readOnly : true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            value : Constantes.Usuario.Caja
        });
        me.store_socio = Ext.create('App.Store.Socios.Socios');

        me.cbx_socio = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Bucar Nro Movil",
            name: "ID_MOVIL",
            colspan: 3,
            width: 480,
            displayField: 'NRO_MOVIL',
            //            valueField : 'ID_SOCIO',
            store: me.store_socio,
            textoTpl: function () { return "Nro Movil :{NRO_MOVIL} - {NOMBRE} {APELLIDO_PATERNO} {APELLIDO_MATERNO}" }
        });
       
       me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombre",
            name: "NOMBRE",
            readOnly : true,
        });
        me.txt_apellido = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Apellido",
            name: "APELLIDO_PATERNO",
            readOnly : true,
            
        });
        me.num_cantidad = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Cantidad",
            name: "CANTIDAD",
            allowDecimals: true,
            maxValue: 999999999,
//            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
         me.num_precio = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Precio",
            name: "MONTO",
            value : 25,
            readOnly : true
        });
        me.num_total = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Total",
            name: "TOTAL",
            value : 25,
            readOnly : true
        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            width: 480,
            maxLength: 500,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.gridHojas = Ext.create("App.View.Hojas.Grids",{
            opcion : "GridHojasMovil" , 
            colspan : 2,
            width : 480,
            height : 250    
        });
        me.items = [
            me.txt_id_caja,
            me.txt_id_parada,
            me.date_fecha,
            me.txt_parada,
            me.txt_caja,
            me.cbx_socio,
            me.txt_nombre,
            me.txt_apellido,
            me.cbx_mes,
            me.num_cantidad,
            me.date_ini,
            me.date_fin,
            me.num_precio,
            me.num_total,
            me.txt_observacion,
            me.gridHojas
        ];
       
      

    }
});
