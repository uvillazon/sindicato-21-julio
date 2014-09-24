Ext.define('App.Controller.Main', {
    extend: 'Ext.app.Controller',
    refs: [{
        ref: 'botonTrabajoEjecutado',
        selector: '#btn_TrabajoEjecutado'
    }],

    init: function () {
        var me = this;
        me.control({
            '#btn_TrabajoEjecutado': {
                click: me.openModule
            },

            'toolbar[itemId=mainmenu] menuitem[text="Trabajos Ejecutados Contratista"]': {
                click: me.openModuleFromMenu
            }
        });

    },

    openModule: function (button) {

        var me = this;
        var grid = button.up('grid');

        if (grid.getSelectionModel().getSelection()[0]) {
            var admin = button.up('window');
            admin.hide(); /*Oculto la ventana AdminOT*/

            maintab = Ext.ComponentQuery.query('#maintab')[0];
            Ext.Msg.wait('Procesando...');
            Ext.require(button.controller, function () {
                Ext.Msg.hide();
                var controller = me.application.controllers.get(button.controller);
                if (!controller) {
                    controller = Ext.create(button.controller, {
                        id: button.controller,
                        application: me.application
                    });

                    controller.container = me.createContainer(button);
                    maintab.add(controller.container);
                    controller.addContent();
                    me.application.controllers.add(controller);
                    controller.init(me.application);
                    controller.onLaunch(me.application);
                    controller.setValoresOrdenTrabajo(grid);
                }
                else {
                    if (controller.container.isDestroyed) {
                        controller.container = me.createContainer(button);
                        maintab.add(controller.container);
                        controller.addContent();
                        controller.setValoresOrdenTrabajo(grid);
                    }
                }
                maintab.show();
                maintab.setActiveTab(controller.container);
            });
        }
    },

    openModuleFromMenu: function (menuoption) {
        var me = this;
        maintab = Ext.ComponentQuery.query('#maintab')[0];
        Ext.Msg.wait('Procesando...');
        Ext.require(menuoption.datos.estilo, function () {
            Ext.Msg.hide();
            var controller = me.application.controllers.get(menuoption.datos.estilo);
            if (!controller) {
                controller = Ext.create(menuoption.datos.estilo, {
                    id: menuoption.datos.estilo,
                    application: me.application
                });

                controller.container = me.createContainer(menuoption);
                maintab.add(controller.container);
                controller.addContent();
                me.application.controllers.add(controller);
                controller.init(me.application);
                controller.onLaunch(me.application);
            }
            else {
                if (controller.container.isDestroyed) {
                    controller.container = me.createContainer(menuoption);
                    maintab.add(controller.container);
                    controller.addContent();
                }
            }
            maintab.show();
            maintab.setActiveTab(controller.container);
        });
    },

    createContainer: function (menuoption) {
        return Ext.widget({
            xtype: 'container',
            title: menuoption.text,
            renderTo: Ext.getBody(),
            closable: false,
            icon: Constantes.HOST + 'Content/images/worker.png',
            layout: 'fit'
        });
    },

    testMenu: function () {
        alert('opcion de menu');
    }
});