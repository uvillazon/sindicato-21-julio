/**
* Proyecto: Sistema de Mantenimiento (SisMan)
* Requerimiento: 13
* Elaborado por: P. Sergio Alvarado G.
* Model para Material presupuestado
*/
Ext.define('App.store.OrdenesTrabajo.DetallePrincipalTrabajoDiario', {
    extend: 'Ext.data.Store',
    model: 'App.Model.OrdenesTrabajo.DetalleTrabajoDiario',
    //pageSize: 10,
    proxy: {
        type: 'ajax',
        api:{
            //create: 'Home/GuardarMaterial',
            read: Constantes.HOST + 'OrdenesTrabajo/ObtenerTrabajoDiarioDetalle',
            update: Constantes.HOST + 'OrdenesTrabajo/ModificarTrabajoDiarioDetalle',
            destroy: Constantes.HOST + 'OrdenesTrabajo/EliminarTrabajoDiarioDetalle'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        },
        writer: {
            type: 'json',
            allowSingle: false
        },

        afterRequest: function (request, success) {

            if (request.action == 'update') {
                this.updateCallback(request);
            }

            else if (request.action == 'destroy') {
                this.deleteCallback(request);
            }
        },

        updateCallback: function (request) {
            if (request.operation.success) {
                Ext.Msg.show(
                                {
                                    title: 'Felicitaciones!',
                                    msg: Ext.decode(request.operation.response.responseText).msg,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
            } else {
                Ext.Msg.show(
                                {
                                    title: 'Advertencia',
                                    msg: Ext.decode(request.operation.response.responseText).msg,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.WARNING
                                });
            }
        },

        deleteCallback: function (request)
        {
            /*var data = Ext.decode(request.operation.response.responseText);
            console.dir(request);*/
            if (request.operation.success) {
                Ext.Msg.show(
                                {
                                    title: 'Notificacion!',
                                    msg: Ext.decode(request.operation.response.responseText).msg,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
            } else {
                Ext.Msg.show(
                                {
                                    title: 'Advertencia',
                                    msg: Ext.decode(request.operation.response.responseText).msg,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.WARNING
                                });
            }
        }
    }
});