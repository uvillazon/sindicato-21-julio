Ext.define('App.store.OrdenesTrabajo.DetalleEjecutadoContratista', {
    extend: 'Ext.data.Store',
    requires: 'App.Model.OrdenesTrabajo.DetalleEjecutadoContratista',
    model: 'App.Model.OrdenesTrabajo.DetalleEjecutadoContratista',
    proxy: {
        type: 'ajax',
        api: {
            create: Constantes.HOST + 'OrdenesTrabajo/GuardarDetalleEjecutadoContratista',
            read: Constantes.HOST + 'OrdenesTrabajo/ObtenerDetalleEjecutadoContratista',
            update: Constantes.HOST + 'OrdenesTrabajo/ActualizarDetalleEjecutadoContratista',
            destroy: Constantes.HOST + 'OrdenesTrabajo/EliminarDetalleEjecutadoContratista'
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
                //this.readCallback(request);
            }

            if (request.action == 'create') {
                this.createCallback(request);
            }

            if (request.action == 'update') {
                this.updateCallback(request);
            }

            if (request.action == 'destroy') {
                this.deleteCallback(request);
            }
        },

        createCallback: function (request) {

            if (!request.operation.success) {
                Ext.Msg.show(
                                {
                                    title: 'Advertencia',
                                    msg: Ext.decode(request.operation.response.responseText).msg,
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
                var view = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel #velementosintervenidos')[0];
                view.store.load({ params: { ID_OT: request.operation.records[0].get('ID_OT') } });
            }
        },

        updateCallback: function (request) {
            if (!request.operation.success) {
                Ext.Msg.show(
                                {
                                    title: 'Advertencia',
                                    msg: Ext.decode(request.operation.response.responseText).msg,
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
            }
        },

        deleteCallback: function (request) {
            if (!request.operation.success) {
                Ext.Msg.show(
                                {
                                    title: 'Advertencia',
                                    msg: Ext.decode(request.operation.response.responseText).msg,
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
            }
        },
    }

});