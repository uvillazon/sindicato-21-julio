Ext.define("App.View.Ventas.FormCrearVenta", {
    extend: "App.Config.Abstract.Form",
//    title: "Datos de Orden de Trabajo",dsdsdsddsdsdsds
    cargarStores: true,
    columns: 2,
    editar : false,
    permiso : false,
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        me.cargarEventos();
        this.callParent(arguments);
    },
    CargarStoreFecha : function(fecha1){
        var me = this;
        var fecha = fecha1 == null? new Date() : fecha1;
        me.store_precio = Ext.create("App.Store.Ventas.Precios");
        me.store_precio.setExtraParams({FECHA : fecha});
        me.store_precio.load();
    },
    CargarFecha : function(store){
        var me = this;
//        alert("sadasd2");
        Ext.Ajax.request({
                    method : 'POST',
                    url: Constantes.HOST + 'Ventas/VerificarUltimoRegistro',
                    success: function(response){
                        var str = Ext.JSON.decode(response.responseText);
                        //                        alert(str.success + "FECHA : "+str.FECHA + "TURNO : "+str.TURNO);
                        if (str.success == 0){
                             var fecha = new Date();
                             me.cbx_turno.setReadOnly(false);
                             me.date_fecha.setReadOnly(false);
                             me.date_fecha.setValue(fecha);
                             me.permiso = true;
                        }
                        else{
                            me.cbx_turno.setValue(str.TURNO);
                            me.cbx_turno.setReadOnly(true);
                            me.date_fecha.setValue(str.FECHA);
                            me.date_fecha.setReadOnly(true);
                            me.gridVenta.getStore().setExtraParamDate('FECHA',me.date_fecha.getValue());
                            me.gridVenta.getStore().setExtraParam('TURNO',str.TURNO);
                            me.gridVenta.getStore().setExtraParam('EDITAR',false);
                            me.gridVenta.getStore().load();

                            me.gridVentaCredito.getStore().setExtraParamDate('FECHA',me.date_fecha.getValue());
                            me.gridVentaCredito.getStore().setExtraParam('TURNO',str.TURNO);

                            me.gridVentaConsumo.getStore().setExtraParamDate('FECHA',me.date_fecha.getValue());
                            me.gridVentaConsumo.getStore().setExtraParam('TURNO',str.TURNO);
                            me.permiso = true;
                            
                            
                        }
                    }
                });
//        alert(store.getId());
    },
    CargarEditarVenta : function(venta){
        var me = this;
        me.venta = venta;
        me.date_fecha.setValue(me.venta.get('FECHA'));
        me.date_fecha.setReadOnly(true);
//        me.date_fecha.setReadOnly(true);
    },
    CargarComponentes: function () {
        var me = this;
        me.fbar = [
          { xtype: 'button', text: 'Button 1' },
          { xtype: 'button', text: 'Button 2' }
        ];
        me.gridVenta = Ext.create("App.View.Ventas.Grids", {
                    opcion: 'GridVentasEditar',
                    title : 'MITTERS',
                    colspan: 2,
                    width: 400,
                    height : 250,
//                    rowspan : 2,
                });
        me.toolbarVenta = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_GuardarCambios', 'Guardar Cambios', 'disk', me.EventosVenta, me.toolbarVenta, this);
        me.gridVenta.addDocked(me.toolbarVenta, 1);
        me.formSubTotales = Ext.create("App.View.Ventas.Forms", {
            opcion: 'formSubTotales',
            botones: false,
//            width: 350,
            colspan: 2
        });
        Funciones.BloquearFormularioReadOnly(me.formSubTotales);
        me.gridVentaCredito = Ext.create("App.View.Ventas.Grids", {
            opcion: 'GridVentasCredito',
            colspan: 2,
            width: 400,
            height : 250
        });
        me.gridVentaConsumo = Ext.create("App.View.Ventas.Grids", {
            opcion: 'GridVentasConsumo',
            colspan: 2,
            width: 450,
            height : 250
        });

        
        me.toolbarCredito = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearCredito', 'Crear Credito', Constantes.ICONO_CREAR, me.EventosVenta, me.toolbarCredito, this);
        Funciones.CrearMenu('btn_EditarCredito', 'Editar', Constantes.ICONO_EDITAR, me.EventosVenta, me.toolbarCredito, this);
        Funciones.CrearMenu('btn_BajaCredito', 'Eliminar', Constantes.ICONO_BAJA, me.EventosVenta, me.toolbarCredito, this);
        me.gridVentaCredito.addDocked(me.toolbarCredito, 1);

        me.toolbarConsumo = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearConsumo', 'Crear Consumo', Constantes.ICONO_CREAR, me.EventosVenta, me.toolbarConsumo, this);
        Funciones.CrearMenu('btn_EditarConsumo', 'Editar', Constantes.ICONO_EDITAR, me.EventosVenta, me.toolbarConsumo, this);
        Funciones.CrearMenu('btn_BajaConsumo', 'Eliminar', Constantes.ICONO_BAJA, me.EventosVenta, me.toolbarConsumo, this);
        me.gridVentaConsumo.addDocked(me.toolbarConsumo, 1);
//        me.formResumen = Ext.create("App.View.Ventas.Forms", {
//            opcion: 'formResumen',
//            botones: false,
//            columns: 3,
//            width: 350,
//            colspan: 2
//        });
//        Funciones.BloquearFormularioReadOnly(me.formResumen);
        me.store_turno = Ext.create('App.Store.Listas.StoreLista');
        me.store_turno.setExtraParam('ID_LISTA', Lista.Buscar('TURNO'));
        me.cbx_turno = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Turno",
            name: "TURNO",
            displayField: 'VALOR',
//            valueField: 'CODIGO',
            store: me.store_turno,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_nombres  = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombres",
            name: "NOMBRES",
            width: 350,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
        });
      
            me.items=  [me.gridVenta, me.formSubTotales, /* me.formResumen,*/me.gridVentaCredito,me.gridVentaConsumo];
            me.tbar= [me.date_fecha, me.cbx_turno, me.txt_nombres]


    },
    cargarEventos : function(){
        var me = this;
        me.cbx_turno.on('select',function(cmb,record){
            if(me.date_fecha.getValue() != null){
                Ext.Ajax.request({
                    url: Constantes.HOST + 'Ventas/VerificarVentas',
                    params: {
                        FECHA: me.date_fecha.getValue(),
                        TURNO : cmb.getValue()
                    },
                    success: function(response){
                        var str = Ext.JSON.decode(response.responseText);
                        Constantes.CargarPrecios(str.GASOLINA , str.DIESEL );
                        me.txt_nombres.reset();
                        me.txt_nombres.setValue(str.Responsable);
                        me.gridVenta.getStore().setExtraParamDate('FECHA',me.date_fecha.getValue());
                        me.gridVenta.getStore().setExtraParam('TURNO',cmb.getValue());
                        me.gridVenta.getStore().setExtraParam('EDITAR',me.editar);
                        me.gridVenta.getStore().load();
//                        alert('entro');
                        me.gridVentaCredito.getStore().setExtraParamDate('FECHA',me.date_fecha.getValue());
                        me.gridVentaCredito.getStore().setExtraParam('TURNO',cmb.getValue());
                        me.gridVentaCredito.getStore().load();

                        me.gridVentaConsumo.getStore().setExtraParamDate('FECHA',me.date_fecha.getValue());
                        me.gridVentaConsumo.getStore().setExtraParam('TURNO',cmb.getValue());
                        me.gridVentaConsumo.getStore().load();
                        
                        if (me.editar){
                            if(str.success == true){
                                me.permiso = true;
                            }
                            else{
                                me.permiso = false;
                            }
                        }
                        else{
                            if(str.success == false){
                                me.permiso = true;
                            }
                            else{
                                me.permiso = false;
                            }
                        }
                    }
                });
                
            }
            else{
                Ext.Msg.alert("Seleccione Fecha primero");
            }
        });
        me.date_fecha.on('change',function(dat,newvalue,oldvalue){
            me.CargarStoreFecha(newvalue);
        });
        me.gridVenta.on('edit', function(editor, e){
            
            if (e.field == "SAL_LITTER"){
                if(e.value < e.record.get('ENT_LITTER')){
                    Ext.Msg.alert("Error","El valor de salida no puede ser Menor al de la entrada");
                    e.record.set('SAL_LITTER',e.record.get('ENT_LITTER'));
                }
                else{
                    e.record.set('TOTAL',e.value - e.record.get('ENT_LITTER') );
                    me.CargarTotales();
                }
            }
        });
        me.gridVenta.on('beforeedit', function(editor, e){
           if (!me.permiso){
                return false;
           }
        });
        me.gridVenta.getStore().on('load',function(str,records,success){
            if(!success){
                str.removeAll();
                Ext.Msg.alert("Error","No puede generar los pos ventas seguir el ciclo DIA TARDE y NOCHE por fecha");
            }else{
                me.CargarTotales();
            }
        });
        me.gridVentaCredito.getStore().on('load',function(str,records,success){
            if(!success){
                str.removeAll();
                Ext.Msg.alert("Error","Ocurrio algun Error Informar a TI.");
            }
            else{
                me.CargarTotalesCredito();
            }
        });
        me.gridVentaConsumo.getStore().on('load',function(str,records,success){
            if(!success){
                str.removeAll();
                Ext.Msg.alert("Error","Ocurrio algun Error Informar a TI.");
            }
            else{
                me.CargarTotalesCredito();
            }
        });
    },
    CargarTotalesCredito : function(){
        var me = this;
        var totalGasolina = 0;
        var totalDiesel = 0;
        me.gridVenta.getStore().each(function(record){
            if(record.get('CODIGO')== 'GASOLINA'){
                totalGasolina= totalGasolina +  record.get('TOTAL');
            }
            else if(record.get('CODIGO')== 'DIESEL'){
                totalDiesel= totalDiesel +  record.get('TOTAL');
            }
            else{
                alert('No existe Codigo falta Implementar');
            }

        });
        var totalGasolinaBs = totalGasolina* Constantes.CONFIG_PRECIO_VENTA_GAS;
        var totalDieselBs = totalDiesel * Constantes.CONFIG_PRECIO_VENTA_DIS;
        var totalGasolinaCreditoBs = 0;
        var totalDieselCreditoBs = 0;
        me.gridVentaCredito.getStore().each(function(record){
            if(record.get('COMBUSTIBLE')== 'GASOLINA'){
                totalGasolinaCreditoBs= totalGasolinaCreditoBs +  record.get('GASOLINA');
            }
            else if(record.get('COMBUSTIBLE')== 'DIESEL'){
                totalDieselCreditoBs= totalDieselCreditoBs +  record.get('DIESEL');
            }
            else{
                alert('No existe Codigo falta Implementar');
            }

        });
        var totalGasolinaConsumoBs = 0;
        var totalDieselConsumoBs = 0;
        me.gridVentaConsumo.getStore().each(function(record){
            if(record.get('COMBUSTIBLE')== 'GASOLINA'){
                totalGasolinaConsumoBs= totalGasolinaConsumoBs +  record.get('IMPORTE_BS');
            }
            else if(record.get('COMBUSTIBLE')== 'DIESEL'){
                totalDieselConsumoBs= totalDieselConsumoBs +  record.get('IMPORTE_BS');
            }
            else{
                alert('No existe Codigo falta Implementar');
            }

        });
        me.formSubTotales.txt_gasolina_consumo.setValue(totalGasolinaConsumoBs);
        me.formSubTotales.txt_diesel_consumo.setValue(totalDieselConsumoBs);
        me.formSubTotales.txt_total_consumo.setValue(totalGasolinaConsumoBs +totalDieselConsumoBs);

        me.formSubTotales.txt_gasolina01.setValue(totalGasolinaBs);
        me.formSubTotales.txt_diesel01.setValue(totalDieselBs);
        
        me.formSubTotales.txt_gasolina_credito.setValue(totalGasolinaCreditoBs);
        me.formSubTotales.txt_diesel_credito.setValue(totalDieselCreditoBs);
        me.formSubTotales.txt_gasolina_efectivo.setValue(totalGasolinaBs - (totalGasolinaCreditoBs + totalGasolinaConsumoBs ));
        me.formSubTotales.txt_diesel_efectivo.setValue(totalDieselBs - (totalDieselCreditoBs + totalDieselConsumoBs ));
        me.formSubTotales.txt_total_efectivo.setValue((totalDieselBs - (totalDieselCreditoBs + totalDieselConsumoBs )) + (totalGasolinaBs - (totalGasolinaCreditoBs + totalGasolinaConsumoBs )));
        me.formSubTotales.txt_total01.setValue(totalGasolinaBs + totalDieselBs);
        me.formSubTotales.txt_total_credito.setValue(totalDieselCreditoBs + totalGasolinaCreditoBs);

//        txt_total_efectivo

    },
    CargarTotalesConsumo : function(){
        var me = this;
      
        var totalGasolinaConsumoBs = 0;
        var totalDieselConsumoBs = 0;
        me.gridVentaConsumo.getStore().each(function(record){
            if(record.get('COMBUSTIBLE')== 'GASOLINA'){
                totalGasolinaConsumoBs= totalGasolinaConsumoBs +  record.get('IMPORTE_BS');
            }
            else if(record.get('COMBUSTIBLE')== 'DIESEL'){
                totalDieselConsumoBs= totalDieselConsumoBs +  record.get('IMPORTE_BS');
            }
            else{
                alert('No existe Codigo falta Implementar');
            }

        });
        me.formSubTotales.txt_gasolina_consumo.setValue(totalGasolinaConsumoBs);
        me.formSubTotales.txt_diesel_consumo.setValue(totalDieselConsumoBs);
        me.formSubTotales.txt_total_consumo.setValue(totalGasolinaConsumoBs +totalDieselConsumoBs);
        me.formSubTotales.txt_gasolina01.setValue(me.formSubTotales.txt_gasolina01.getValue() - totalGasolinaConsumoBs);
    },
    CargarTotales : function(){
        var me = this;
        var totalGasolina = 0;
        var totalDiesel = 0;
        var totalGasolinaBs = 0;
        var totalDieselBs = 0;
        me.gridVenta.getStore().each(function(record){
//            alert(record.get('TOTAL'));
            if(record.get('CODIGO')== 'GASOLINA'){
                totalGasolina= totalGasolina +  record.get('TOTAL');
                
            }
            else if(record.get('CODIGO')== 'DIESEL'){
                totalDiesel= totalDiesel +  record.get('TOTAL');
            }
            else{
                alert('No existe Codigo falta Implementar');
            }

        });

        me.formSubTotales.txt_diesel.setValue(totalDiesel);
        me.formSubTotales.txt_gasolina.setValue(totalGasolina);

        me.formSubTotales.txt_diesel_bs.setValue(totalDiesel * Constantes.CONFIG_PRECIO_VENTA_DIS);
        me.formSubTotales.txt_gasolina_bs.setValue(totalGasolina* Constantes.CONFIG_PRECIO_VENTA_GAS);

        me.formSubTotales.txt_diesel_bs_costo.setValue(totalDiesel * Constantes.CONFIG_PRECIO_COSTO_DIS);
        me.formSubTotales.txt_gasolina_bs_costo.setValue(totalGasolina* Constantes.CONFIG_PRECIO_COSTO_GAS);

        me.formSubTotales.txt_total.setValue(totalDiesel + totalGasolina);
        me.formSubTotales.txt_total_Bs.setValue(totalDiesel * Constantes.CONFIG_PRECIO_VENTA_DIS + totalGasolina* Constantes.CONFIG_PRECIO_VENTA_GAS);
        me.formSubTotales.txt_total_Bs_costo.setValue(totalDiesel * Constantes.CONFIG_PRECIO_COSTO_DIS + totalGasolina* Constantes.CONFIG_PRECIO_COSTO_GAS);

         me.formSubTotales.txt_utilidad.setValue((totalDiesel * Constantes.CONFIG_PRECIO_VENTA_DIS + totalGasolina* Constantes.CONFIG_PRECIO_VENTA_GAS) - (totalDiesel * Constantes.CONFIG_PRECIO_COSTO_DIS + totalGasolina* Constantes.CONFIG_PRECIO_COSTO_GAS) );
        

    },
    EventosVenta : function(btn){
        var me = this;
        if(btn.getItemId() == "btn_GuardarCambios"){
            if(me.isValid() == true){
//                alert("sadsadadsadsadad");
                    Funciones.AjaxRequestForm('Ventas', 'GuardarVentasDiarias', me, me, me.gridVenta, 'Esta Seguro de Guardar Las Ventas Diarias', {ventas : Funciones.convertirJson(me.gridVenta), EDITAR : me.editar}, null);
            }
            else{
                
                Ext.Msg.alert("Error","Falta Completar el formulario");
            }
        }
        else if(btn.getItemId() == 'btn_CrearCredito'){
            me.CrearVentaCredito();
        }
        else if (btn.getItemId() == "btn_EditarCredito"){
            var datos =  me.gridVentaCredito.getSelectionModel().getSelection()[0];
            if (datos != null){
                me.EditarVentaCredito(datos);
            }
            else{
                Ext.Msg.alert("Error","Seleccione una venta para Editar");
            }
        }
        else if (btn.getItemId() == "btn_BajaCredito"){
            var datos =  me.gridVentaCredito.getSelectionModel().getSelection()[0];
            if (datos != null){
                 Funciones.AjaxRequestGrid("Ventas", "EliminarVentaCredito", me, "Esta Seguro de Eliminar la Venta de Credito", {ID_VENTA : datos.get('ID_VENTA') }, me.gridVentaCredito,null);
            }
            else{
                Ext.Msg.alert("Error","Seleccione una venta para Editar");
            }
            
        }
        else if(btn.getItemId() == 'btn_CrearConsumo'){
            me.CrearConsumo();
        }
        else if (btn.getItemId() == "btn_EditarConsumo"){
            var datos =  me.gridVentaConsumo.getSelectionModel().getSelection()[0];
            if (datos != null){
                me.EditarVentaConsumo(datos);
            }
            else{
                Ext.Msg.alert("Error","Seleccione una venta para Editar");
            }
        }
        else if (btn.getItemId() == "btn_BajaConsumo"){
            var datos =  me.gridVentaConsumo.getSelectionModel().getSelection()[0];
            if (datos != null){
                 Funciones.AjaxRequestGrid("Ventas", "EliminarConsumo", me, "Esta Seguro de Eliminar el Consumo", {ID_CONSUMO : datos.get('ID_CONSUMO') }, me.gridVentaConsumo,null);
            }
            else{
                Ext.Msg.alert("Error","Seleccione una venta para Editar");
            }
            
        }
        else{
            Ext.Msg.alert("Error","No existe la opcion");
        }

    },
    CrearVentaCredito : function(){
        var me = this;
        if(me.isValid()){
            if (me.winVentaCredito == null) {
                    me.winVentaCredito = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Venta a Credito' });
                    me.formVentaCredito = Ext.create("App.View.Ventas.Forms", {
                        columns: 1,
    //                    title: 'Formulario de Registro de Otros Egresos ',
                        botones: false,
                        opcion : 'formVentaCredito'
                    });

                    me.winVentaCredito.add(me.formVentaCredito);
                    me.winVentaCredito.btn_guardar.on('click', me.GuardarVentaCredito, this);
                    me.winVentaCredito.show();
            } 
            else {
                me.formVentaCredito.getForm().reset();
                me.winVentaCredito.show();
            }
        }
        else{
            Ext.Msg.alert("Error","Seleccione la FECHA , TURNO y Escriba el Responsable");
        }
    },
    CrearConsumo : function(){
        var me = this;
        if(me.isValid()){
            var win =Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Consumo' });
            var formConsumo = Ext.create("App.View.Ventas.Forms", {
                columns: 1,
                botones: false,
                opcion : 'formConsumo'
            });
            win.add(formConsumo);
            win.btn_guardar.on('click', function(){
                Funciones.AjaxRequestWin("Ventas", "GuardarConsumo", win, formConsumo, me.gridVentaConsumo, "Esta Seguro de Guardar el CONSUMO...", { FECHA: me.date_fecha.getValue(), TURNO : me.cbx_turno.getValue(),RESPONSABLE : me.txt_nombres.getValue()}, win);
            });
            win.show();
            }
        else{
            Ext.Msg.alert("Error","Seleccione la FECHA , TURNO y Escriba el RESPONSABLE");
        }
    },
    EditarVentaCredito : function(datos){
        var me = this;
        var win =Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Editar Venta a Credito' });
        var formVentaCredito = Ext.create("App.View.Ventas.Forms", {
            columns: 1,
            botones: false,
            opcion : 'formEditarVentaCredito'
        });
        formVentaCredito.CargarDatos(datos);
        formVentaCredito.EventosFormEditarVentaCredito();
        win.add(formVentaCredito);
        win.btn_guardar.on('click', function(){
            Funciones.AjaxRequestWin("Ventas", "GuardarVentaCredito", win, formVentaCredito, me.gridVentaCredito, "Esta Seguro de Editar el CONSUMO.", /*{ FECHA: me.date_fecha.getValue(), TURNO : me.cbx_turno.getValue(),RESPONSABLE : me.txt_nombres.getValue()}*/null, win);
        });
        win.show();
    },
    EditarVentaConsumo : function(datos){
        var me = this;
        var win =Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Editar Consumo' });
        var formVentaConsumo = Ext.create("App.View.Ventas.Forms", {
            columns: 1,
            botones: false,
            opcion : 'formEditarVentaConsumo'
        });
        formVentaConsumo.CargarDatos(datos);
        formVentaConsumo.EventosFormEditarVentaCredito();
        win.add(formVentaConsumo);
        win.btn_guardar.on('click', function(){
            Funciones.AjaxRequestWin("Ventas", "GuardarConsumo", win, formVentaConsumo, me.gridVentaConsumo, "Esta Seguro de Editar el Consumo", /*{ FECHA: me.date_fecha.getValue(), TURNO : me.cbx_turno.getValue(),RESPONSABLE : me.txt_nombres.getValue()}*/null, win);
        });
        win.show();
    },
    GuardarVentaCredito : function(){
        var me = this;
        Funciones.AjaxRequestWin("Ventas", "GuardarVentaCredito", me.winVentaCredito, me.formVentaCredito, me.gridVentaCredito, "Esta Seguro de Guardar la venta de Credito", { FECHA: me.date_fecha.getValue(), TURNO : me.cbx_turno.getValue(),RESPONSABLE : me.txt_nombres.getValue()}, me.winVentaCredito)
    }
});
