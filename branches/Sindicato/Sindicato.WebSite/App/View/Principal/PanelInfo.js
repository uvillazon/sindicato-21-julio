Ext.define("App.View.Principal.PanelInfo", {
    extend: "Ext.TabPanel",
    //    title:'DIAGRAMAS TRANSICION ESTADOS',
    defaults: {
        bodyStyle: 'padding:2px'
    },
    activeTab: 0,
    data: '',

    initComponent: function () {

        var me = this;

        this.items = [
        {
            title: 'SOLICITUDES DE MANTENIMIENTO',
            html: '<IMG SRC="Content/Iconos/DiagrEstados_SM.JPG" width="500" height="450">'
        }, {
            title: 'ORDENES DE TRABAJO',
            html: '<IMG SRC="Content/Iconos/DiagrEstados_OT.JPG" width="500" height="450">'
        }
        ];
        this.callParent(arguments);

    }
});