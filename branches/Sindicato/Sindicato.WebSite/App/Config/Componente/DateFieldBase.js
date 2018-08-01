﻿Ext.define("App.Config.Componente.DateFieldBase", {
    extend: "Ext.form.DateField",
    alias: ['widget.DateFieldBase', 'widget.dateBase'],
    renderer: Ext.util.Format.dateRenderer('d/m/Y'),
    //format: 'm/d/Y h:m:s',
    margin: '0 0 0 10',
    opcion: '',
    titulo: '',
    mensaje: '',
    maximo:'',
    initComponent: function () {

        var me = this;
        if (this.opcion == '') {
            this.value = new Date();
        }
        this.minValue = new Date('01/01/1900'); //fecha de la creacion de elfec
        if (this.maximo == '') {
            this.maxValue = new Date();
        }
        //this.maxValue = new Date();


        if (me.titulo != '') {
            me.on('render', function (obj) {
                obj.tip = Ext.create('Ext.tip.ToolTip', {
                    target: me.getEl(),
                    title: me.titulo,
                    html: me.mensaje
                });
            });
        }



        this.callParent(arguments);

    },
    //emptyText: 'Seleccione...',
    disabledCls: 'DisabledClase',
    readOnlyCls: 'DisabledClaseReadOnly',
    width: 240,
    labelWidth: 110
});
