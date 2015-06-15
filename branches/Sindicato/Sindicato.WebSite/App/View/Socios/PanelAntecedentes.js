Ext.define("App.View.Socios.PanelAntecedentes", {
    extend: "Ext.panel.Panel",
    title: "Antecedentes",
    mostrarAcciones: true,
    botones: false,
    esSocio: true,
    layout: {
        type: 'vbox',       // Arrange child items vertically
        align: 'stretch',    // Each takes up full width
        padding: 5
    },
    icono: '',
    esSocio: true,
    initComponent: function () {

        //        this.initConfig(config);
        this.initConfig();
        this.callParent(arguments);
        //        return this;
    },
    initConfig: function () {
        var me = this;
        me.grupo = Funciones.CrearGrupoBoton("6", "opciones de Registro");
        me.grupo.setVisible(me.mostrarAcciones);
        Funciones.CrearMenu('btn_crearAntecedentes', 'Crear<br>Antecedente', Constantes.ICONO_CREAR, me.EventosForm, me.grupo, this);
        Funciones.CrearMenu('btn_editarAntecedentes', 'Editar<br>Antecedente', Constantes.ICONO_EDITAR, me.EventosForm, me.grupo, this, null, true);
        Funciones.CrearMenu('btn_eliminarAntecedentes', 'Eliminar<br>Antecedente', Constantes.ICONO_BAJA, me.EventosForm, me.grupo, this, null, true);
        
        me.grid = Ext.create("App.View.Socios.Grids", {
            opcion: 'GridAntecedentes',
            height: 200,
            //fbarmenuArray: ['btn_editarFamiliar', 'btn_eliminarFamiliar']
        });
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatosAntecedente, this);
        me.form = Ext.create("App.View.Socios.Forms", {
            title: 'Datos Antecedente',
            columns: 2,
            opcion: 'FormAntecedente',
            botones: false,
            conHtml : false
        });
       
        me.form.BloquearFormulario();
        me.items = [
            me.grupo,
            me.grid,
            me.form //,
            //me.formImagen
        ];
    },
    CargarDatosAntecedente: function (sel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.antecedente = disabled ? null : selections[0];
        Funciones.DisabledButton("btn_editarAntecedentes", me, disabled);
        Funciones.DisabledButton("btn_eliminarAntecedentes", me, disabled);
        if (!disabled) {
            me.form.loadFormulario("Otros", "ObtenerAntecedentePorId", { ID_ANTECEDENTE: selections[0].get('ID_ANTECEDENTE') });
            //me.formImagen.CargarImagen(selections[0].get('ID_ANTECEDENTE'));
            //me.form.formImagen.CargarImagen(selections[0].get('ID_AUTO'));
        }
        else {
            me.form.getForm().reset();
            //me.formImagen.CargarImagen(0);
            //me.form.formImagen.CargarImagen(0);
        }

    },
    CargarDatos: function (socio) {
        var me = this;
        me.socio = socio;
        if (me.esSocio) {
            me.grid.getStore().setExtraParams({ ID_SOCIO: socio.get('ID_SOCIO') });
        }
        else {
            me.grid.getStore().setExtraParams({ ID_CHOFER: socio.get('ID_CHOFER') });
        }
        me.grid.getStore().load();

    },
    EventosForm: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_crearAntecedentes":
                me.FormAntecedente(null);
                break;
            case "btn_editarAntecedentes":
                me.FormAntecedente(me.antecedente);
                break;
            case "btn_eliminarAntecedentes":
                //me.CrearImagen();
                Funciones.AjaxRequestGrid("Otros", "EliminarAntecedente", me.grid, "Esta seguro de Eliminar el Antecedente?", { ID_ANTECEDENTE: me.antecedente.get('ID_ANTECEDENTE') }, me.grid, null);
                break;

            default:
                break;
        }
    },
    FormAntecedente: function (record) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Socios.Forms", {
            title: 'Datos Antecedentes',
            columns: 2,
            opcion: 'FormAntecedente',
            botones: false,
            conHtml : false
        });
        if (record != null) {
            form.getForm().loadRecord(record);
        }   
        win.add(form);
        win.show();
        if (me.esSocio) {
            form.txt_id_socio.setValue(me.socio.get('ID_SOCIO'));
            //console.dir(me.socio);
            //var params = { ID_SOCIO123: me.socio.get('ID_SOCIO') };
        }
        else {
            form.txt_id_chofer.setValue(me.socio.get('ID_CHOFER'));
            //var params = {
            //    ID_CHOFER: me.socio.get('ID_CHOFER')
            //};
        }
        win.btn_guardar.on('click', function () {
            //console.dir(params);
            Funciones.AjaxRequestWin("Otros", "GuardarAntecedente", win, form, me.grid, "Esta Seguro de Guardar", null, win);
        });

    }
});