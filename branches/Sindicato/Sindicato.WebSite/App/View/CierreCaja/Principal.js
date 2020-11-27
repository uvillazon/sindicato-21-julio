Ext.define("App.View.CierreCaja.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

      


        me.grid = Ext.create('App.View.CierreCaja.GridCierres', {
            region: 'west',
            width: '50%'

        });
        me.btn_crear = Funciones.CrearMenu('btn_crear', 'Generar Cierre de Cajas', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this);
        //me.btn_eliminar = Funciones.CrearMenu('btn_eliminar', 'Anular Cierre', Constantes.ICONO_BAJA, me.EventosPrincipal, null, this, null, true);
        //me.btn_traspaso = Funciones.CrearMenu('btn_traspaso', 'Trasferencia de Fondos', Constantes.ICONO_EDITAR, me.EventosPrincipal, null, this, null, true);
        me.grid.AgregarBtnToolbar([me.btn_crear]);
        //me.formulario = Ext.create("App.Config.Abstract.FormPanel");

        me.form = Ext.create("App.View.CierreCaja.FormCierre", {
            region: 'center',
            width: '50%',
            columns: 2,
            modoConsulta: true,

        });
        me.form.BloquearFormulario(null,'btn');
      
        //        me.grid.bar.add(me.toolbar);
        me.items = [me.grid, me.form];
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatos, this);

    },
    CargarDatos: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.record = disabled ? null : selections[0];
        if (!disabled) {
            me.form.getForm().loadRecord(selections[0]);
            me.form.gridDetalle.getStore().setExtraParams({ ID_CIERRE: me.record.get('ID_CIERRE') });
            me.form.gridDetalle.getStore().load();
            //me.form.CargarDatos(selections[0]);

        }
        else {
            me.form.getForm().reset();
            me.form.gridDetalle.getStore().removeAll();
          
        }
    },
   
    EventosPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_crear":
                me.FormCrearCierre();
                break;
            case "btn_traspaso":
                me.FormTrasferir;
                break;
            //case "btn_eliminar":
            //    Funciones.AjaxRequestGrid("Socios", "EliminarRetiroSocio", me.grid, "Esta seguro de Eliminar el Retiro?", { ID_RETIRO: me.record.get('ID_RETIRO') }, me.grid, null);
            //    break;
            //case "btn_Kardex":
            //    me.VentanaKardex();
            //    break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    FormTrasferir : function(){

    },
    FormCrearCierre: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true , showBtn3 : false});
        var form = Ext.create("App.View.CierreCaja.FormCierre", {
            columns: 2,
            botones: false
        });
        form.ObtenerUltimoRegistro();
        //form.getForm().loadRecord(me.socio);
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            //console.dir(params);
            if (form.isValid()) {
                Funciones.AjaxRequestWin("Cierres", "GuardarCierreCaja", win, form, me.grid, "Esta Seguro de Guardar", { detalles: form.convertirJson() }, win);
            }
            else {
                Ext.Msg.alert("Error", "Falta Completar Algun Datos. Revisar Formulario.");
            }
        });

    }

});