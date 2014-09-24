Ext.define('App.store.OrdenesTrabajo.DetalleTrabajoDiario', {
    extend: 'Ext.data.Store',
    requires: 'App.Model.OrdenesTrabajo.DetalleTrabajoDiario',
    model: 'App.Model.OrdenesTrabajo.DetalleTrabajoDiario',
    proxy: {
        type: 'ajax',
        api: {
            create: Constantes.HOST + 'OrdenesTrabajo/GuardarDetalleTrabajoDiario',
            //read: 'Home/MaterialPresupuestado',
            update: Constantes.HOST + 'OrdenesTrabajo/ActualizarDetalleTrabajoDiario',
            destroy: Constantes.HOST + 'OrdenesTrabajo/EliminarDetalleTrabajoDiario'
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
            if (request.action == 'read') {
                this.readCallback(request);
            }

            else if (request.action == 'create') {
                this.createCallback(request);
            }

            else if (request.action == 'update') {
                this.updateCallback(request);
            }

            else if (request.action == 'destroy') {
                this.deleteCallback(request);
            }
        },

       //Despues de crear un registro

        createCallback: function (request) {

            if (!request.operation.success) {
                console.dir(request);
                Ext.Msg.show(
                                {
                                    title: 'Advertencia',
                                    msg: /*Ext.decode(request.operation.response.responseText).msg*/'Ha ocurrido un error al intentar guardar los datos. </br> Por favor, comunique de este error al Administrador del Sistema',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.WARNING
                                });
            } else {
                Ext.Msg.show(
                       {
                           title: 'Felicidades!',
                           msg: Ext.decode(request.operation.response.responseText).msg,
                           buttons: Ext.Msg.OK,
                           icon: Ext.Msg.INFO
                       });


                var cbox = Ext.ComponentQuery.query('#trabajodiariomain form #comboboxot')[0];
                var tree = Ext.ComponentQuery.query('#elementosintervenidos')[0];
                tree.store.load({ params: { ID_OT: cbox.getValue() } });
            }
        },

        //Despues de Actualizar los datos del grid

        updateCallback: function (request) {
            if (!request.operation.success) {
                Ext.Msg.show(
                                {
                                    title: 'Warning',
                                    msg: 'Could not update Album. Please try again.',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.WARNING
                                });
            }
        },
    }

});