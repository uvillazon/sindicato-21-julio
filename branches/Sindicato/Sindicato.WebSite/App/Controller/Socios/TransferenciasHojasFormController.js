Ext.define("App.Controller.Socios.TransferenciasHojasFormController", {
    extend: "Deft.mvc.ViewController",
    control: {
        view: {
            boxready: "loadInitialData",
        },
        cbxToSocio: {
            select : 'onSelectCbxToSocio'
        },
        cbxFromSocio: {
            select : 'onSelectCbxFromSocio'
        }

    },
    init: function () {
        return this.callParent(arguments);
    },
    onSelectCbxToSocio : function(cbx, rec){
        var me = this;
        me.getView().setLoading(true);
        fn.getRequest("Socios", "ObtenerResumenDeHojas", "POST", { ID_SOCIO_MOVIL: rec[0].get('ID_SOCIO_MOVIL')}).then({
            success: function (res) {
                fn.loadRecordCmp(me.getView(),res.data)
            },
            failure: function (errorMessage) {
                Ext.Msg.alert("Error", errorMessage, function () {
                    me.getView().reset();
                });
            }
        }).always(function () {
            return me.getView().setLoading(false);
        });
    },
    onSelectCbxFromSocio : function(cbx,rec){
        var me = this;
        me.getView().setLoading(true);
        fn.getRequest("Socios", "VerificarHojasDeSocio", "POST", { ID_SOCIO_MOVIL: rec[0].get('ID_SOCIO_MOVIL') }).then({
            success: function (res) {
                console.log(res);
            },
            failure: function (errorMessage) {
                Ext.Msg.alert("Error", errorMessage, function () {
                    cbx.reset();
                });
            }
        }).always(function () {
            return me.getView().setLoading(false);
        });
    },
    loadInitialData: function () {
        var me = this;
        console.log("loadInitialData");
    }
    
});
