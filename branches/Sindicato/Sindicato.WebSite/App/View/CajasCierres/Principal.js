Ext.define("App.View.CajasCierres.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

      


        me.grid = Ext.create('App.View.CajasCierres.GridCierres', {
            region: 'center',
            width: '60%',
            fbarmenuArray: ["btn_reporte", "btn_reporte_cooperativa"]

        });
        me.btn_crear = Funciones.CrearMenu('btn_crear', 'Generar<br>Cierre Parcial', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this);
        me.btn_reporte = Funciones.CrearMenu('btn_reporte', 'Reporte<br>Cierre', "report", me.EventosPrincipal, null, this,null,true);
        me.btn_reporteCooperativa = Funciones.CrearMenu('btn_reporte_cooperativa', 'Reporte<br>Cooperativa', "report", me.EventosPrincipal, null, this,null,true);
        //me.btn_eliminar = Funciones.CrearMenu('btn_eliminar', 'Anular Cierre', Constantes.ICONO_BAJA, me.EventosPrincipal, null, this, null, true);
        //me.btn_traspaso = Funciones.CrearMenu('btn_traspaso', 'Trasferencia de Fondos', Constantes.ICONO_EDITAR, me.EventosPrincipal, null, this, null, true);
        me.grid.AgregarBtnToolbar([me.btn_crear, me.btn_reporte, me.btn_reporteCooperativa]);
        //me.formulario = Ext.create("App.Config.Abstract.FormPanel");


        me.gridDetalle = Ext.create("App.View.CajasCierres.GridDetalles", {
            region: 'east',
            width: '40%',

        });
      
        //        me.grid.bar.add(me.toolbar);
        me.items = [me.grid, me.gridDetalle];
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatos, this);

    },
    CargarDatos: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.record = disabled ? null : selections[0];
        if (!disabled) {
           me.gridDetalle.getStore().setExtraParams({ ID_CIERRE: me.record.get('ID_CIERRE') });
            me.gridDetalle.getStore().load();

        }
        else {
            me.gridDetalle.getStore().setExtraParams({ ID_CIERRE: -1 });
            me.gridDetalle.getStore().load();

          
        }
    },
   
    EventosPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_crear":
                me.FormCrearCierre();
                break;
            case "btn_reporte":
                me.verReporte();
                break;
            case "btn_reporte_cooperativa":
                me.verReporteCooperativa();
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
    verReporte: function () {
        var me = this;
        var fecha = me.record.get('FECHA_INI');
        var fechaFormateada = Ext.Date.format(fecha, 'Y-m-d');
        var fechaFin = me.record.get('FECHA_FIN');
        var fechaFormateadaFin = Ext.Date.format(fechaFin, 'Y-m-d');
        console.log(me.record.get('ID_CAJA'));
      
        me.generarReporte("ReporteCierreParcialDetalle", 'FECHA_INI=' + fechaFormateada + '&FECHA_FIN=' + fechaFormateadaFin + '&ID_CAJA=' + me.record.get('ID_CAJA') + '&ID_CIERRE=' + me.record.get('ID_CIERRE'));
    },
    verReporteCooperativa: function () {
        var me = this;
        var fecha = me.record.get('FECHA_INI');
        var fechaFormateada = Ext.Date.format(fecha, 'Y-m-d');
        var fechaFin = me.record.get('FECHA_FIN');
        var fechaFormateadaFin = Ext.Date.format(fechaFin, 'Y-m-d');
        console.log(me.record.get('ID_CAJA'));

        me.generarReporte("ReportePrestamosParcial", 'FECHA_INI=' + fechaFormateada + '&FECHA_FIN=' + fechaFormateadaFin + '&ID_CAJA=' + me.record.get('ID_CAJA') + '&ID_CIERRE=' + me.record.get('ID_CIERRE_ANTERIOR'));
    },
    generarReporte: function (reporte, params) {
        fn.VerImpresion(reporte, params);
    },
   
    FormCrearCierre: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true , showBtn3 : false});
        var form = Ext.create("App.View.CajasCierres.FormCierre", {
            columns: 2,
            botones: false
        });
    //    form.ObtenerUltimoRegistro();
        //form.getForm().loadRecord(me.socio);
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            //console.dir(params);
            if (form.isValid()) {
                Funciones.AjaxRequestWin("Cierres", "GuardarCajaCierre", win, form, me.grid, "Esta Seguro de Guardar", null, win);
            }
            else {
                Ext.Msg.alert("Error", "Falta Completar Algun Datos. Revisar Formulario.");
            }
        });

    }

});