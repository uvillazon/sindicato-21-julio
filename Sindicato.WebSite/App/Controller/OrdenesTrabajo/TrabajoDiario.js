Ext.define('App.controller.OrdenesTrabajo.TrabajoDiario', {
    extend: 'Ext.app.Controller',
    stores: [/*'SolicitudesMantenimiento.SolicitudesMantenimientoFiltrados',*/
             /*'OrdenesTrabajo.OrdenesTrabajoResponsable',*/
             'OrdenesTrabajo.PersonalTrabajoDiario',
             'OrdenesTrabajo.ElementosIntervenidos',
             'OrdenesTrabajo.DetallePrincipalTrabajoDiario',
             'SolicitudesMantenimiento.CodigosSolucion',
             'OrdenesTrabajo.MaterialesCodigoSolucion',
             'OrdenesTrabajo.DetalleTrabajoDiario',
             'Postes.Conductores',
             'Postes.Postes',
             'Postes.UnidadesConstructivas',
             'SolicitudesMantenimiento.CodigosMantenimiento'
             
    ],
    /* Los namespace de los archivos js deben tener en minuscula la palabra view o store. Ejem: Ext.define('App.view.OrdenesTrabajo.ReporteTrabajoDiario.PrincipalTrabajoDiario',{})
     o como alternativa utilizar la siguiente propiedad al definir la clase:: alternateClassName: 'App.view.OrdenesTrabajo.ReporteTrabajoDiario.FormCabecera' */
    views: [
            'OrdenesTrabajo.ReporteTrabajoDiario.PrincipalTrabajoDiario',
            'OrdenesTrabajo.ReporteTrabajoDiario.FormCabecera',
            'OrdenesTrabajo.ReporteTrabajoDiario.TreeElementosIntervenidos',
            'OrdenesTrabajo.ReporteTrabajoDiario.GridPrincipalDetalleTrabajoDiario',
            'OrdenesTrabajo.ReporteTrabajoDiario.ViewPersonalMovil',
            'OrdenesTrabajo.ReporteTrabajoDiario.GridCodigosSolucion',
            'OrdenesTrabajo.ReporteTrabajoDiario.GridMaterialesCodigoSolucion',
            'OrdenesTrabajo.ReporteTrabajoDiario.GridDetalleTrabajoDiario'
    ],
    refs: [{
                ref: 'treePostesConductores',
                 selector: '#trabajodiariomain #elementosintervenidos'
            },
            {
                ref: 'viewUsuarios',
                selector: '#trabajodiariomain #mosaicousuarios'
            },
            {
                ref: 'gridPrincipalDetalleTrabajoDiario',
                selector: '#trabajodiariomain #gprincipaldetalletrabajodiario',
            },
            {
                ref: 'comboSm',
                selector: '#trabajodiariomain #comboboxsm'
            },
            {
                ref: 'fieldIdCabecera',
                selector: '#trabajodiariomain form #idtd'
            },
            {
                ref: 'comboOt',
                selector: '#trabajodiariomain #comboboxot'
            },
            {
                ref: 'hideIdMovil',
                selector: '#trabajodiariomain #hideidmovil'
            },
            {
                ref: 'fieldMovil',
                selector: '#trabajodiariomain #fieldmovil'
            },
            {
                ref: 'hideIdResponsable',
                selector: '#trabajodiariomain #hideidresponsable'
            },
            {
                ref: 'fieldCapataz',
                selector: '#trabajodiariomain #fieldcapataz'
            },
            {
                ref: 'fechaEjecucion',
                selector: '#fejec'
            },
            {
                ref: 'horaInicio',
                selector: '#hini'
            },
            {
                ref: 'horaFin',
                selector: '#hfin'
            },
            {
                ref: 'comboConductor',
                selector: '#combo_conductor'
            },
            {
                ref: 'fieldFormacion',
                selector: '#fieldformacion'
            },
            {
                ref: 'comboPoste',
                selector: '#combo_poste'
            },
            {
                ref: 'comboUnidadConstructiva',
                selector: '#combo_uc'
            },
            {
                ref: 'fieldNivel',
                selector: '#fieldnivel'
            },
            {
                ref: 'comboCodigoMantenimiento',
                selector: '#combocodman'
            },
            {
                ref: 'gridCodigosSolucion',
                selector: '#gcodsol'
            },
            {
                ref: 'gridDetalleTrabajoDiario',
                selector: '#gdetalletrabajodiario'
            },
            {
                 ref: 'botonGuardar',
                 selector: 'window #btnGuardar'
            }
    ],

    init: function () {
        var me = this;
        me.control({

            '#maintab #trabajodiariomain #elementosintervenidos': {
                itemclick: me.mostrarDetallesTrabajoDiario
            },

            /*'#maintab #trabajodiariomain #gprincipaldetalletrabajodiario': {
                itemclick: me.reaccionar
            },*/

            '#maintab #trabajodiariomain #gprincipaldetalletrabajodiario button[action=save]': {
                click: me.modificarDetalleTrabajoDiario
            },

            '#maintab #trabajodiariomain #gprincipaldetalletrabajodiario button[action=add]': {
                click: me.nuevoRegistroTrabajoDiario
            },

            '#mosaicousuarios': {
                itemdblclick: me.seleccionarPersonal
            },

            '#maintab #trabajodiariomain trabajodiariocabecera #comboboxot': {
                select: me.datosOrdenTrabajo
            },

            'window #combo_conductor': {
                select: me.obtenerFormacion
            },

            'window #combo_poste': {
                select: me.obtenerUnidadesConstructivas
            },

            'window #combo_uc': {
                select: me.obtenerCodigosMantenimiento
            },

            'window #btnposte': {
                click: me.cargarVentanaPosteOT
            },

            'window #btnuc': {
                click: me.cargarVentanaUC
            },

            'window #combocodman': {
                select: me.obtenerCodigosSolucion
            },

            'window #gdetalletrabajodiario button[action=addMaterial]': {
                click: me.mostrarVentanaMateriales
            },

            '#maintab #trabajodiariomain trabajodiariocabecera #comboboxsm': {
                select: me.getOrdenesTrabajo
                //keyup: me.teclapresionada
            },

            'window button[action=save]': {
                click: me.guardarDetalleTrabajoDiario
            },

            'window button[action=add-items]': {
                click: me.addMateriales
            },

            'window grid': {
                addbuttonclick: me.agregarMaterialesTodos,
                deletebuttonclick: me.removerMaterialesCodigoSolucion
            },

            'window #gcodsol': {
                itemdblclick: me.mostrarMateriales
            },

            '#winAddUc': {
                hide: me.actualizarComboUc
            },

            '#winAddPoste': {
                hide: me.actualizarComboPoste
            }
        });
        //me.getOrdenesTrabajoDetallePrincipalTrabajoDiarioStore().load({ params: { ID_OT: this.getComboOt().getValue() } });
    },

    addContent: function () {
        this.container.add({
            xtype: 'trabajodiarioprincipal',
            itemId: 'trabajodiariomain'
        });
    },

    reaccionar: function (grid, record, item, index, event, options) {
        alert(record.get('FCH_HOR_INI'));
    },

    datosOrdenTrabajo: function (combo, record, index) {
        //var valor = combo.getValue(); /*Este devuelve el valor seleccionado que aparece en el combo.*/
        var valor = this.getComboOt().getValue(); /*Este devuelve el valor seleccionado que aparece en el combo.*/
        this.getFieldCapataz().setValue(record[0].get('CAPATAZ'));
        this.getFieldMovil().setValue(record[0].get('MOVIL'));
        this.getComboSm().setValue(record[0].get('ID_SOL_MAN'));
        //this.getPostesIntervenidosStore().load({ params: { ID_OT: valor, queryType: 'default' } });
    },

    teclapresionada: function (field, event, options) {
        if (event.getCharCode() === event.ENTER) {
            Ext.Msg.alert('Alert', field.getValue());
            this.getOrdenesTrabajoStore().load({ params: { idSolMan: field.getValue(), queryType: 'default' } });
        }
    },

    getOrdenesTrabajo: function (combo, record, index) {
        var valor = combo.getValue();
        var cb = this.getComboOt();
        cb.store.proxy.extraParams = { ID_SOL_MAN: valor };
        cb.store.load();
    },

    setValoresOrdenTrabajo: function (grid) {
        var me = this;
        var data = grid.getSelectionModel().getSelection()[0];
        this.getComboSm().setValue(data.get('ID_SOL_MAN')); /*verificar que la propiedad del combo forceSelection: false*/
        this.getComboOt().setValue(data.get('ID_OT'));
        this.getHideIdResponsable().setValue(data.get('ASIGNADO_A'));
        this.getFieldCapataz().setValue(data.get('NOMBRE_ASIGNADO'));
        this.getHideIdMovil().setValue(data.get('MOVIL_ASIG'));
        this.getFieldMovil().setValue(data.get('NOMBRE_MOVIL'));
        Ext.Ajax.request({
            url: Constantes.HOST + 'OrdenesTrabajo/ObtenerTrabajoDiarioCabecera',
            params: { ID_OT: data.get('ID_OT') },
            method: 'GET',
            success: function (response, options) {
                cabecera = Ext.decode(response.responseText);
                if (cabecera.data != null) {
                    me.getFechaEjecucion().setValue(cabecera.data.FECHA_EJE_INI);
                    me.getHoraInicio().setValue(cabecera.data.FCH_HOR_INI);
                    me.getHoraFin().setValue(cabecera.data.FCH_HOR_FIN);
                    me.getOrdenesTrabajoElementosIntervenidosStore().load({ params: { ID_OT: data.get('ID_OT') } });
                    me.getGridPrincipalDetalleTrabajoDiario().store.proxy.extraParams['ID_TD'] = cabecera.data.ID_TD;
                    me.getGridPrincipalDetalleTrabajoDiario().store.load();
                    me.getFieldIdCabecera().setValue(cabecera.data.ID_TD);
                    me.getOrdenesTrabajoPersonalTrabajoDiarioStore().load({ params: { ID_TD: cabecera.data.ID_TD,  EJECUTA: 'T' } });
                    me.getViewUsuarios().show();
                } else {
                    me.getViewUsuarios().hide();
                    me.getOrdenesTrabajoPersonalTrabajoDiarioStore().load({ params: { EJECUTA: 'T' } });
                    me.getOrdenesTrabajoElementosIntervenidosStore().load({ params: { ID_OT: data.get('ID_OT') } });
                }
            },
        });
    },

    mostrarDetallesTrabajoDiario: function (view, record, item, index, e) {
        var me = this;
        var g = this.getGridPrincipalDetalleTrabajoDiario();

        if (record.isLeaf()) {
            /*La funcion getGridMateriales() es posible gracias a la definicion en la propiedad refs: del controller (ver arriba)*/

            /*Ver initConfig del componente GridMateriales para recordar store.load()*/
            /* Otras 2 maneras de enviar parametros para cargar el store
             g.store.proxy.extraParams = { COD_UC : record.get('text') }; modo 1
             g.store.load({ extraparams: { parametro1: record.get('text'), ID_POSTE: record.get('idPoste'), queryType: 'default' } }); modo 2*/

            /*Enviando parametros para cargar el store*/
            //g.store.proxy.extraParams[record.get('elemento')] = record.get('text');
            g.store.proxy.extraParams['ID_POSTE'] = record.get('ID_POSTE');
            g.store.proxy.extraParams['ID_UC'] = record.get('ID_UC');
            g.store.proxy.extraParams['ID_CONDUCTOR'] = record.get('ID_CONDUCTOR');
            g.store.proxy.extraParams['ID_OT'] = this.getComboOt().getValue();
            g.store.load();
            if (record.get('elemento') == 'COD_UC') {
                g.columns[4].setVisible(false);
            } else {
                g.columns[4].setVisible(true);
            }
            //g.update();

            /*Limpiar los parametros enviados al metodo que carga el store*/
            g.store.proxy.extraParams['ID_UC'] = null;
            g.store.proxy.extraParams['ID_CONDUCTOR'] = null;
            g.store.proxy.extraParams['ID_POSTE'] = null;

        } else {
            g.columns[4].setVisible(false);
            g.store.proxy.extraParams['ID_OT'] = this.getComboOt().getValue();
            g.store.proxy.extraParams['ID_POSTE'] = record.get('ID_POSTE');
            g.store.load();
            //g.update();
            g.store.proxy.extraParams['ID_POSTE'] = null;
        }
    },

    nuevoRegistroTrabajoDiario: function () {
        var ot = this.getComboOt().getValue();
        var fechaejecucion = this.getFechaEjecucion();
        var horainicio = this.getHoraInicio();
        var horafin = this.getHoraFin();
        if (fechaejecucion.getValue() != null && horainicio.getValue() != null && horafin.getValue() != null) {

            var storePostes = this.getPostesPostesStore();
            storePostes.setExtraParam('ID_OT', this.getComboOt().getValue()); /* Utilizo setExtraParam para que se mantenga en cache el parametro del filtro y al hacer un refresh se mantenga los itmes filtrados*/
            var poste = Ext.create("App.Config.Componente.ComboAutoBase", {
                fieldLabel: 'POSTE:',
                emptyText: 'Escribir o elegir...',
                itemId: 'combo_poste',
                name: "COD_POSTE",
                labelAlign: 'right',
                displayField: 'COD_POSTE',
                valueField: 'ID_POSTE',
                queryMode: 'local',
                store: storePostes.load(),/*this.getPostesPostesStore().load({ params: { ID_OT: this.getComboOt().getValue() } })*/
                textoTpl: function () {
                    return '<div class="search-item" style="background-image:url({logo})"><div class="name">{COD_POSTE}</div><div class="desc">{DESC_TIPO}</div></div>';
                },
                forceSelection: true,
                width: 300,
                flex: 1,
                disabledCls: null,
                readOnlyCls: null,
            });
            /*Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'COD. POSTE:',
            name: 'COD_POSTE',
            itemId: 'comboposte',
            emptyText: 'Escribir o elegir...',
            labelAlign: 'right',
            displayField: 'COD_POSTE',
            valueField: 'ID_POSTE',
            queryMode: 'local',
            forceSelection: true,
            store: this.getPostesPostesStore().load({ params: { ID_OT: this.getComboOt().getValue()} }),
            listConfig: {
                loadingText: 'Buscando...',
                emptyText: 'No exiten coincidencias.',
                getInnerTpl: function () {
                    return '<div class="search-item" style="background-image:url({logo})"><div class="name">{COD_POSTE}</div><div class="desc">{DESC_TIPO}</div></div>';
                }
            },
            flex: 1,
        });*/
            var btnPoste = Ext.create('Ext.button.Button', {
                text: '',
                itemId: 'btnposte',
                scale: 'small',
                iconCls: 'wrench',
                margin: '0px 0px 0px 3px',
                flex: 1
            });

            var storeConductores = this.getPostesConductoresStore();
            storeConductores.setExtraParam('ID_OT', this.getComboOt().getValue());
            var conductor = Ext.create('App.Config.Componente.ComboAutoBase', {
                fieldLabel: 'CONDUCTOR:',
                name: 'COD_CONDUCTOR',
                itemId: 'combo_conductor',
                emptyText: 'Escribir o elegir...',
                labelAlign: 'right',
                displayField: 'COD_CONDUCTOR',
                valueField: 'ID_CONDUCTOR',
                queryMode: 'local',
                forceSelection: true,
                store: storeConductores.load(),/*this.getPostesConductoresStore().load({ params: { ID_OT: this.getComboOt().getValue()} })*/
                textoTpl: function () {
                    return '<div class="search-item" style="background-image:url({logo})"><div class="name">{COD_CONDUCTOR}</div><div class="desc">{DESC_TIPO}</div></div>';
                },
                flex: 1,
                width: 300,
                margin: '0px 0px 0px 0px',
                disabledCls: null,
                readOnlyCls: null,
            });

            var cabeceraFila = {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                padding: '20px 20px 10px 0px',
                defaults: {
                    labelStyle: 'font-weight:bold;',
                    labelWidth: 5
                },
                //items: [conductor, fieldhide, poste, btnPoste]
                items: [poste, btnPoste, conductor]
            };

            var uc = Ext.create('Ext.form.field.ComboBox', {
                fieldLabel: 'COD. UC.:',
                name: 'COD_UC',
                itemId: 'combo_uc',
                emptyText: 'Escribir o elegir...',
                labelAlign: 'right',
                displayField: 'COD_UC',
                valueField: 'ID_UC',
                queryMode: 'local',
                forceSelection: true,
                listConfig: {
                    loadingText: 'Buscando...',
                    emptyText: 'No exiten Unidades Constructivas',
                    getInnerTpl: function () {
                        return '<div class="search-item" style="background-image:url({logo})"><div class="name">{COD_UC} - {COD_REA}</div><div class="desc">{DESCRIPCION}</div></div>';
                    }
                },
                width: 290,
                margin: '0 0 0 10',
                disabled: true,
                flex: 1,
            });

            var btnUc= Ext.create('Ext.button.Button', {
                text: '',
                itemId: 'btnuc',
                scale: 'small',
                iconCls: 'wrench',
                margin: '0px 0px 0px 3px',
                flex: 1,
                disable: true,
            });

            var formacion = Ext.create('Ext.form.field.Text', {
                fieldLabel: 'FORMACION:',
                name: 'FORMACION',
                itemId: 'fieldformacion',
                width: 290,
                margin: '0px 0px 0px 10px',
                emptyText: 'Formacion del conductor...',
                labelAlign: 'right',
                displayField: 'FORMACION',
                disabled: true,
                readOnly: true,
                flex: 1,
            });

            var nivel = Ext.create('Ext.form.field.Number', {
                fieldLabel: 'NIVEL:',
                itemId: 'fieldnivel',
                name: 'NIVEL',
                margin: '0px 0px 0px 0px',
                width: 200,
                allowNegative: false,
                minValue: 0,
                allowBlank: false,
                labelAlign: 'right',
                flex: 1
            });

            var primeraFila = {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                padding: '0px 20px 10px 0px',
                defaults: {
                    labelStyle: 'font-weight:bold;',
                    labelWidth: 5
                },
                //items: [formacion, uc, btnUc, nivel]
                items: [uc, btnUc, formacion, nivel]
            };

            var codigoman = Ext.create('Ext.form.field.ComboBox', {
                fieldLabel: 'COD.MANT:',
                afterLabelTextTpl: Constantes.REQUERIDO,
                name: 'COD_MAN',
                itemId: 'combocodman',
                emptyText: 'Escribir o elegir...',
                labelAlign: 'right',
                displayField: 'COD_MAN',
                valueField: 'ID_COD_MAN',
                queryMode: 'local',
                forceSelection: true,
                listConfig: {
                    loadingText: 'Buscando...',
                    emptyText: 'No exiten Codigos de Mantenimiento.',
                    getInnerTpl: function () {
                        return '<div class="search-item" style="background-image:url({logo})"><div class="name">{COD_MAN}</div><div class="desc">{DESCRIP_MAN}</div></div>';
                    }
                },
                width: 290,
                disabled: true,
                flex: 1,
            });

            var codigosol = Ext.widget('gridcodigossolucion', {
                margin: '0 0 0 100',
                disabled: true,
                flex: 3,
            });

            var segundaFila = {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                padding: '0px 20px 10px 10px',
                defaults: {
                    labelStyle: 'font-weight:bold;',
                    labelWidth: 5
                },
                items: [codigoman, codigosol]
            };

            var materialsol = Ext.widget('griddetalletrabajodiario', {
                flex: 1,
            });

            var terceraFila = {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                padding: '0px 20px 10px 22px',
                defaults: {
                    labelStyle: 'font-weight:bold;',
                    labelWidth: 5
                },
                items: [materialsol],
            };

            var win = Ext.create('Ext.window.Window', {
                itemId: 'winnuevoregistro',
                title: 'Registrar detalle Trabajo Diario',
                resizable: false,
                modal: true,
                bodyStyle: 'background-color:#fff',
                icon: Constantes.HOST + 'Content/images/pencil.png',
                items: [
                    { xtype: cabeceraFila },
                    { xtype: primeraFila },
                    { xtype: segundaFila },
                    { xtype: terceraFila }
                ],

                buttons: [{
                    text: 'Guardar',
                    disabled: true,
                    itemId: 'btnGuardar',
                    action: 'save'
                }, {
                    text: 'Cancelar',
                    handler: function () { this.up('.window').close(); }
                }],
            });
            win.show();
        } else {
            Ext.MessageBox.show({
                title: 'Completar datos',
                msg: 'Por favor! complete primero los siguientes datos: <br /><b>Fecha Ejecucion, Hora Inicio y Hora Fin</b>',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        }
    },

    obtenerFormacion: function (combo, records) {
        if (this.getFieldFormacion().isDisabled) {
            this.getFieldFormacion().enable();
            this.getComboPoste().setValue(null);
            this.getComboUnidadConstructiva().setValue(null);
            this.getComboUnidadConstructiva().disable();
        }
        if (this.getComboCodigoMantenimiento().isDisabled()) {
            this.getComboCodigoMantenimiento().enable();
        } else {
            this.getComboCodigoMantenimiento().setValue(null);
            this.getGridCodigosSolucion().store.removeAll();
            this.getGridCodigosSolucion().disable();
        }
        this.getFieldFormacion().setValue(records[0].get('FORMACION'));
        var cbcm = this.getComboCodigoMantenimiento();
        cbcm.store = this.getSolicitudesMantenimientoCodigosMantenimientoStore().load({ params: { ID_CONDUCTOR: combo.getValue()} });
    },

    obtenerUnidadesConstructivas: function (combo, record, index) {

        if (this.getComboUnidadConstructiva().isDisabled()) {
            this.getComboUnidadConstructiva().enable();
            this.getComboUnidadConstructiva().setValue(null);
            this.getComboConductor().setValue(null);
            this.getFieldFormacion().setValue(null);
            this.getFieldFormacion().disable();
            this.getComboCodigoMantenimiento().setValue(null);
            this.getGridCodigosSolucion().store.removeAll();
            this.getGridCodigosSolucion().disable();
        } else {
            this.getComboUnidadConstructiva().setValue(null);
            this.getComboCodigoMantenimiento().setValue(null);
            this.getGridCodigosSolucion().store.removeAll();
        }
        if (!this.getComboCodigoMantenimiento().isDisabled()) {
            this.getComboCodigoMantenimiento().disable()
        } else {
            this.getComboUnidadConstructiva().setValue(null);
            this.getComboCodigoMantenimiento().setValue(null);
            this.getGridCodigosSolucion().store.removeAll();
            this.getGridCodigosSolucion().disable();
        }
        var cbuc = this.getComboUnidadConstructiva();
        cbuc.store = this.getPostesUnidadesConstructivasStore().load({ params: { ID_POSTE: combo.getValue() } });
    },

    obtenerCodigosMantenimiento: function (combo, record, index) {
        if (this.getComboCodigoMantenimiento().isDisabled()) {
            this.getComboCodigoMantenimiento().enable();
            this.getGridCodigosSolucion().store.removeAll();
            this.getGridCodigosSolucion().disable();
        } else {
            this.getGridCodigosSolucion().store.removeAll();
            this.getGridCodigosSolucion().disable();
            this.getComboCodigoMantenimiento().store.removeAll();
            this.getComboCodigoMantenimiento().setValue(null);
        }
        var cbcm = this.getComboCodigoMantenimiento();
        cbcm.store = this.getSolicitudesMantenimientoCodigosMantenimientoStore().load({ params: { ID_UC: combo.getValue() } });
    },

    obtenerCodigosSolucion: function (combo, record, index) {
        var grid = this.getGridCodigosSolucion();
        if (grid.isDisabled()) {
            grid.enable();
        }
       grid.store.proxy.extraParams = { ID_COD_MAN: combo.getValue() };
       grid.store.load();
    },

    agregarMaterialesTodos: function (grid, rowIndex, colIndex) {
        var me = this;
        if (me.getComboPoste().getValue() != null && me.getFieldNivel().getValue() || me.getComboConductor().getValue() != null) {
            var selectionModel = grid.getSelectionModel(), record;
            selectionModel.select(rowIndex);
            record = selectionModel.getSelection()[0];
            var idcodigo = record.get('ID_COD_SOL');
            var codigo = record.get('COD_SOL');
            var gridDetalle = this.getGridDetalleTrabajoDiario();
            var store = Ext.create('App.store.OrdenesTrabajo.MaterialesCodigoSolucion');
            store.load({
                scope: this,
                params: { ID_COD_SOL: idcodigo },
                callback: function (records, operation, success) {
                    if (operation.resultSet.count > 0) {
                        for (var i = 0; i < operation.resultSet.count; i++) {
                            if (!me.buscarExiste(records[i].get('IDPRODUCTO'), gridDetalle.store)) {
                                var det = Ext.create('App.Model.OrdenesTrabajo.DetalleTrabajoDiario', {
                                    ID_POSTE: me.getComboPoste().getValue(),
                                    ID_CONDUCTOR: me.getComboConductor().getValue(),
                                    ID_UC: me.getComboUnidadConstructiva().getValue(),
                                    COD_UC: me.getComboUnidadConstructiva().getRawValue(),
                                    ID_COD_MAN: me.getComboCodigoMantenimiento().getValue(),
                                    COD_MAN: me.getComboCodigoMantenimiento().getRawValue(),
                                    ID_COD_SOL: idcodigo,
                                    COD_SOL: codigo,
                                    IDPRODUCTO: records[i].get('IDPRODUCTO'),
                                    COD_PROD: records[i].get('COD_ALTERNATIVO'),
                                    DESC_PROD: records[i].get('DESCRIPCION'),
                                    UNID_PROD: records[i].get('IDUNIDAD'),
                                    CANT_EJE: 1,
                                    FECHA_EJE_INI: me.getFechaEjecucion().getValue(),
                                    FCH_HOR_INI: me.sumarFechas(me.getFechaEjecucion().getValue(), Ext.Date.format(me.getHoraInicio().getValue(), 'H:i')),
                                    FCH_HOR_FIN: me.sumarFechas(me.getFechaEjecucion().getValue(), Ext.Date.format(me.getHoraFin().getValue(), 'H:i')),
                                    ID_RESP: me.getHideIdResponsable().getValue(),
                                    ID_MOVIL: me.getHideIdMovil().getValue(),
                                    NIVEL: me.getFieldNivel().getValue(),
                                    OBSERV: records[i].get('OBSERV'),
                                    ID_OT: me.getComboOt().getValue()
                                });
                                gridDetalle.store.add(det);
                            }
                        }
                        if (this.getBotonGuardar().isDisabled() && gridDetalle.store.count() > 0) {
                            this.getBotonGuardar().enable();
                        }
                    } else {
                        var det = Ext.create('App.Model.OrdenesTrabajo.DetalleTrabajoDiario', {
                            ID_POSTE: me.getComboPoste().getValue(),
                            ID_CONDUCTOR: me.getComboConductor().getValue(),
                            ID_UC: me.getComboUnidadConstructiva().getValue(),
                            COD_UC: me.getComboUnidadConstructiva().getRawValue(),
                            ID_COD_MAN: me.getComboCodigoMantenimiento().getValue(),
                            COD_MAN: me.getComboCodigoMantenimiento().getRawValue(),
                            ID_COD_SOL: idcodigo,
                            COD_SOL: codigo,
                            IDPRODUCTO: '',
                            COD_PROD: '',
                            DESC_PROD: 'ESTE CODIGO DE SOLUCION NO REQUIERE MATERIALES',
                            UNID_PROD: '',
                            CANT_PRE: 0,
                            CANT_EJE: 0,
                            FECHA_EJE_INI: me.getFechaEjecucion().getValue(),
                            FCH_HOR_INI: me.sumarFechas(me.getFechaEjecucion().getValue(), Ext.Date.format(me.getHoraInicio().getValue(), 'H:i')),
                            FCH_HOR_FIN: me.sumarFechas(me.getFechaEjecucion().getValue(), Ext.Date.format(me.getHoraFin().getValue(), 'H:i')),
                            ID_RESP: me.getHideIdResponsable().getValue(),
                            ID_MOVIL: me.getHideIdMovil().getValue(),
                            NIVEL: me.getFieldNivel().getValue(),
                            OBSERV: '',
                            ID_OT: me.getComboOt().getValue()
                        });
                        if (!me.buscarExiste(det.get('DESC_PROD'), gridDetalle.store, idcodigo, me.getComboCodigoMantenimiento().getValue())) {
                            gridDetalle.store.add(det); //seteo un codigo de solucion sin materiales para poder habilitar el boton de guardar en la condicion debajo
                        }
                    }
                    if (this.getBotonGuardar().isDisabled() && gridDetalle.store.count() > 0) {
                        this.getBotonGuardar().enable();
                    }
                }
            });
        } else {
            var falta = me.getComboPoste().getValue() == null ? "POSTE" : "NIVEL";
            Ext.Msg.show({
                title: 'Falta completar datos importantes',
                msg: 'Por favor, verifique los siguientes campos: </br> <b>' + falta + '</b>',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },

    mostrarMateriales: function (grid, rowIndex, colIndex) {
        var me = this;
        if (me.getComboPoste().getValue() != null && me.getFieldNivel().getValue() || me.getComboConductor().getValue() != null) {
            var selectionModel = grid.getSelectionModel(), record;
            selectionModel.select(rowIndex);
            record = selectionModel.getSelection()[0];
            var idcodigo = record.get('ID_COD_SOL');
            var codigo = record.get('COD_SOL');
            var gridMatSol = Ext.widget('gridmaterialescodigosolucion');
            //gridMatSol.store.load({ params: { ID_COD_SOL: idcodigo } });
            var store = Ext.create('App.store.OrdenesTrabajo.MaterialesCodigoSolucion');
            store.load({
                scope: this,
                params: { ID_COD_SOL: idcodigo },
                callback: function (records, operation, success) {
                    // the operation object
                    // contains all of the details of the load operation
                    for (var i = 0; i < operation.resultSet.count; i++) {
                        var det = Ext.create('App.model.OrdenesTrabajo.MaterialesCodigoSolucion', {
                            ID_COD_SOL: idcodigo,
                            COD_SOL: codigo,
                            IDPRODUCTO: records[i].get('IDPRODUCTO'),
                            COD_ALTERNATIVO: records[i].get('COD_ALTERNATIVO'),
                            COD_PROD: records[i].get('COD_PROD'),
                            IDUNIDAD: records[i].get('IDUNIDAD'),
                            DESCRIPCION: records[i].get('DESCRIPCION'),
                        });
                        if (!me.buscarExiste(records[i].get('IDPRODUCTO'), gridMatSol.store, idcodigo, me.getComboCodigoMantenimiento().getValue())) {
                            gridMatSol.store.add(det);
                        }
                    }
                    if (operation.resultSet.count == 0) {
                        var det = Ext.create('App.model.OrdenesTrabajo.MaterialesCodigoSolucion', {
                            ID_COD_SOL: idcodigo,
                            COD_SOL: codigo,
                            IDPRODUCTO: '',
                            COD_ALTERNATIVO: '',
                            COD_PROD: '',
                            IDUNIDAD: '',
                            DESCRIPCION: 'ESTE CODIGO DE SOLUCION NO REQUIERE MATERIALES',
                        });
                        gridMatSol.store.add(det);
                    }
                }
            });

            var winMateriales = Ext.widget('window', {
                layout: 'fit',
                title: 'Materiales que utiliza el Codigo de Solucion: ' + record.get('COD_SOL'),
                modal: true,
                width: 650,
                resizable: false,
                items: [{
                    xtype: gridMatSol
                }],
                buttons: [{
                    text: 'Aceptar',
                    action: 'add-items'
                }, {
                    text: 'Cancelar',
                    handler: function () { this.up('.window').close(); }
                }],
            });
            winMateriales.show();
        } else {
            var falta = me.getComboPoste().getValue() == null ? "POSTE" : "NIVEL";
            Ext.Msg.show({
                title: 'Falta completar datos importantes',
                msg: 'Por favor, verifique los siguientes campos: </br> <b>' + falta + '</b>',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },

    addMateriales: function (button) {
        var me = this;
        var gridsol = me.getGridCodigosSolucion();
        record = gridsol.getSelectionModel().getSelection()[0];
        var idcodigo = record.get('ID_COD_SOL');
        var codigo = record.get('COD_SOL');
        var win = button.up('window');
        var grid = win.down('grid');
        var grid2 = this.getGridDetalleTrabajoDiario();
        var store2 = grid.getStore();
        store2.each(function (record, index) {
            if (!me.buscarExiste(record.get('IDPRODUCTO'), grid2.store)) {
                var det = Ext.create('App.Model.OrdenesTrabajo.DetalleTrabajoDiario', {
                    ID_POSTE: me.getComboPoste().getValue(),
                    ID_CONDUCTOR: me.getComboConductor().getValue(),
                    ID_UC: me.getComboUnidadConstructiva().getValue(),
                    COD_UC: me.getComboUnidadConstructiva().getRawValue(),
                    ID_COD_MAN: me.getComboCodigoMantenimiento().getValue(),
                    COD_MAN: me.getComboCodigoMantenimiento().getRawValue(),
                    ID_COD_SOL: idcodigo,
                    COD_SOL: codigo,
                    IDPRODUCTO: record.get('IDPRODUCTO'),
                    COD_PROD: record.get('COD_ALTERNATIVO'),
                    DESC_PROD: record.get('DESCRIPCION'),
                    UNID_PROD: record.get('IDUNIDAD'),
                    CANT_PRE: 0,
                    CANT_EJE: 1,
                    FECHA_EJE_INI: me.getFechaEjecucion().getValue(),
                    FCH_HOR_INI: me.sumarFechas(me.getFechaEjecucion().getValue(), Ext.Date.format(me.getHoraInicio().getValue(), 'H:i')),
                    FCH_HOR_FIN: me.sumarFechas(me.getFechaEjecucion().getValue(), Ext.Date.format(me.getHoraFin().getValue(), 'H:i')),
                    ID_RESP: me.getHideIdResponsable().getValue(),
                    ID_MOVIL: me.getHideIdMovil().getValue(),
                    NIVEL: me.getFieldNivel().getValue(),
                    OBSERV: record.get('OBSERV'),
                    ID_OT: me.getComboOt().getValue()
                });
                grid2.store.add(det);
            }
        });
        if (this.getBotonGuardar().isDisabled()) {
            this.getBotonGuardar().enable();
        }

        win.close();
    },

    removerMaterialesCodigoSolucion: function (grid, rowIndex, colIndex) {
        var selectionModel = grid.getSelectionModel(), record;
        selectionModel.select(rowIndex);
        record = selectionModel.getSelection()[0];
        var codigo = record.get('COD_SOL');

        var grid2 = this.getGridDetalleTrabajoDiario(); //Agarramos la referencia del grid detalle trabajo diario
        var store2 = grid2.getStore();

        var store3 = Ext.create('App.store.OrdenesTrabajo.DetalleTrabajoDiario'); //creamos un  store temporal
        grid2.getStore().each(function (rec, index) {
            /*La funcion store.remove(rec) me dio problemas porque se perdia el indice del registro, 
            por esta razon decidi almacenar en un store los items que no cumplen con una condicion,
            para luego sobrescribir el store del grid temporal*/
            if (rec.get('COD_SOL') != codigo) {
                store3.add(store2.getAt(index));
            }
        });
        grid2.store.removeAll();
        store3.each(function (record, index) {
            grid2.store.add(record);
        });
        if (store2.count() < 1) {
            this.getBotonGuardar().disable();
        } else {
            this.getBotonGuardar().enable()
        }
        /* grid.getStore().removeAt(rowIndex);*/
    },

    mostrarVentanaMateriales: function () {
        var me = this;
        if (me.getComboCodigoMantenimiento().getValue()) {
            var gridMateriales = Ext.create('App.View.Postes.GridMateriales', { title: null, iconCls: null, opcion: 'GridMateriales', imagenes: false });
            var winMateriales = Ext.widget('window', {
                itemId: 'winmaterialeserp',
                layout: 'fit',
                iconCls: 'application_view_list',
                title: 'Lista de Materiales',
                modal: true,
                width: 600,
                resizable: false,
                items: [{
                    xtype: gridMateriales
                }],
                buttons: [{
                    text: 'Aceptar',
                    handler: function () {
                        var win = this.up('window');
                        var grid = win.down('grid');
                        if (grid.getSelectionModel().getSelection()[0]) {
                            var records = grid.getSelectionModel().getSelection()[0];
                            var gridDetalle = me.getGridDetalleTrabajoDiario();
                            gridDetalle.store.add(Ext.create('App.Model.OrdenesTrabajo.DetalleTrabajoDiario', {
                                ID_POSTE: me.getComboPoste().getValue(),
                                ID_CONDUCTOR: me.getComboConductor().getValue(),
                                ID_UC: me.getComboUnidadConstructiva().getValue(),
                                COD_UC: me.getComboUnidadConstructiva().getRawValue(),
                                ID_COD_MAN: me.getComboCodigoMantenimiento().getValue(),
                                COD_MAN: me.getComboCodigoMantenimiento().getRawValue(),
                                ID_COD_SOL: 0,
                                COD_SOL: '',
                                IDPRODUCTO: records.get('IDPRODUCTO'),
                                COD_PROD: records.get('COD_ALTERNATIVO'),
                                DESC_PROD: records.get('DESCRIPCION'),
                                UNID_PROD: records.get('IDUNIDAD'),
                                CANT_EJE: 1,
                                NIVEL: me.getFieldNivel().getValue(),
                                OBSERV: '',
                                ID_OT: me.getComboOt().getValue()
                            }));
                            win.close();
                            if (me.getBotonGuardar().isDisabled() && gridDetalle.store.count() > 0) {
                                me.getBotonGuardar().enable();
                            }
                        } else {
                            Ext.Msg.alert("Error", "Primero seleccione 1 Material del Grid")
                        }
                    }
                }, {
                    text: 'Cancelar',
                    handler: function () { this.up('window').close(); }
                }],
            });
            winMateriales.show();
        } else {
            Ext.Msg.alert("Error", "Seleccione primero los siguientes datos: <b></br></br>Poste o Conductor </br>Unidad Constructiva </br>Codigo Mantenimiento</b>")
        }
    },

    guardarDetalleTrabajoDiario: function (button) {
        var me = this;
        var win = button.up('window');
        var grid = win.down('griddetalletrabajodiario');
        var store = grid.getStore();
        /*var first = store.first();
        var validarDatos = Ext.create('App.Model.OrdenesTrabajo.DetalleTrabajoDiario'); Revisar la implementacion de la validacion del modelo
        validarDatos = store.first();
        if (validarDatos.isValid()) {*/
            if (store.count() > 0) {
                Ext.Msg.confirm('Confirmar', '¿Esta usted seguro de guardar los datos?', function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: Constantes.HOST + 'OrdenesTrabajo/GuardarCabeceraTrabajoDiario',
                            params: { ID_TD: me.getFieldIdCabecera().getValue(), ID_OT: me.getComboOt().getValue(), FECHA_EJE_INI: me.getFechaEjecucion().getValue(), FECHA_EJE_FIN: me.getFechaEjecucion().getValue() },
                            success: function (response, options) {
                                store.each(function (record) {
                                    record.setDirty();
                                });

                                store.sync();
                                win.close();
                                me.getViewUsuarios().show();
                                /*El load del treepanel se realiza en el metodo afterCallback del store que carga el arbol, porque 
                                cuando se hacia desde aca, no siempre se cargaba actualizado ya que el callback podia demorar.
                                me.getOrdenesTrabajoElementosIntervenidosStore().load({ params: { ID_OT: me.getComboOt().getValue() } });
                                me.getTreePostesConductores().store.load({ params: { ID_OT: me.getComboOt().getValue() } });
                                me.getOrdenesTrabajoDetallePrincipalTrabajoDiarioStore().load({ params: { ID_OT: me.getComboOt().getValue() } });*/
                            },
                        });
                    }
                });
            } else {
                Ext.Msg.show({
                    title: 'No existen registros',
                    msg: 'Usted debe seleccionar por lo menos <br/> un codigo de solucion para guardar',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            //}
                this.getBotonGuardar().disable();
            }/* else {
            var errors = validarDatos.validate();
            errors.each(function (error) {
                message = error.field, error.message + '<br/>';
            });
            Ext.Msg.show({
                title: 'Falta completar datos importantes',
                msg: 'Por favor, verifique los siguientes campos: <br>' + message,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }*/
    },

    modificarDetalleTrabajoDiario: function () {
        var me = this;

        Ext.Msg.confirm('Confirmar', '¿Esta usted seguro de guardar los cambios?', function (btn) {
            if (btn == 'yes') {
                /*var formatterHoraInicio = Ext.Date.format(me.getHoraInicio().getValue(), 'H:i');
                var formatterHoraFin = Ext.Date.format(me.getHoraFin().getValue(), 'H:i');
                Ext.Ajax.request({
                    url: Constantes.HOST + 'OrdenesTrabajo/GuardarCabeceraTrabajoDiario',
                    params: { ID_TD: me.getFieldIdCabecera().getValue(), ID_OT: me.getComboOt().getValue(), FECHA_EJE: me.getFechaEjecucion().getValue(), FCH_HORA_INI: formatterHoraInicio, FCH_HORA_FIN: formatterHoraFin },
                    success: function (response, options) {
                        Ext.Msg.show({
                            title: 'Felicidades!',
                            msg: Ext.decode(response.responseText).respuestaSP.msg,
                            width: 300,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        });
                    },
                });*/
                var g = me.getGridPrincipalDetalleTrabajoDiario();
                g.store.sync();
            } else {
                Ext.Msg.show({
                    title: 'Sugerencia',
                    msg: 'Seleccione nuevamente el elemento afectado, para refrescar los datos',
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
        });
    },

    seleccionarPersonal: function (view, record, item, index, event, options) {

        if (record.get('active')) { /* true si el usuario esta seleccionado */
            Ext.Ajax.request({
                url: Constantes.HOST + 'OrdenesTrabajo/EliminarPersonalMovil',
                params: { ID_OT: this.getComboOt().getValue(), ID_MOVIL: this.getFieldMovil().getValue(), ID_RESP: record.get('ID_RESP') },
                success: function (response) {
                    Ext.fly(item).removeCls('active');
                    Ext.fly(item).addCls('inactive');
                },
                failure: function (response) {
                }
            });
        } else {
            Ext.Ajax.request({
                url: Constantes.HOST + 'OrdenesTrabajo/GuardarPersonalMovil',
                params: { ID_TD: 1, ID_OT: this.getComboOt().getValue(), ID_MOVIL: this.getFieldMovil().getValue(), ID_RESP: record.get('ID_RESP')/*, estado: record.data.active*/ },
                success: function (response) {
                    Ext.fly(item).removeCls('inactive');
                    Ext.fly(item).addCls('active');
                },
                failure: function (response) {
                }
            });
        }
        //some server side call
        record.data.active = !record.data.active;
    },

    sleep: function (milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds){
            break;
            }
        }
    },

    buscarExiste: function (item, store, codsol, codman) {
        for (var i = 0; i < store.getCount(); i++) {
            var comparar = store.getAt(i).data.IDPRODUCTO;
            if (item == comparar || item == store.getAt(i).data.DESC_PROD && store.getAt(i).data.ID_COD_SOL == codsol && store.getAt(i).data.ID_COD_MAN == codman) {
                return true;
            }
        }
    },

    cargarVentanaUC: function (){
        var comboPoste = this.getComboPoste();
        /*var v = comboPoste.getValue();
        var record = comboPoste.findRecord(comboPoste.valueField || comboPoste.displayField, v);*/
        var record = comboPoste.getSelectedRecord();
        var me = this;
        if (comboPoste.getValue() != null) {
            if (me.winPoste == null) {
                me.winPoste = Ext.create("App.Config.Abstract.Window", { itemId: 'winAddUc'});
                me.formConfigPuesto = Ext.create("App.View.Postes.Forms", { opcion: 'FormConfiguracionPoste' });
                me.formConfigPuesto.loadRecord(record);
                me.formConfigPuesto.grid.getStore().setExtraParams({ ID_POSTE: comboPoste.getValue() });
                me.formConfigPuesto.grid.getStore().load();
                me.winPoste.add(me.formConfigPuesto);
                me.winPoste.show();
            }
            else {
                me.formConfigPuesto.getForm().reset();
                me.formConfigPuesto.loadRecord(record);
                me.formConfigPuesto.grid.getStore().setExtraParams({ ID_POSTE: comboPoste.getValue() });
                me.formConfigPuesto.grid.getStore().load();
                me.winPoste.show();
            }
        }
        else {
            Ext.Msg.alert("Error", "Seleccione Primero un Poste para Configurar UC con Postes")
        }
    },

    cargarVentanaPosteOT: function () {
        var comboOt = this.getComboOt();
        var store = Ext.create('App.Store.OrdenesTrabajo.OrdenesTrabajo');
        var record = Ext.create('App.Model.OrdenesTrabajo.OrdenesTrabajo', { ID_OT : comboOt.getValue() });
        store.load({
            scope: this,
            params: { ID_OT: comboOt.getValue() },
            callback: function (records, operation, success) {
                if (operation.resultSet.count > 0) {
                    record = store.first();
                }
            }
        });
        var me = this;
        if (me.winPosteOT == null) {
            console.log(record.get('ID_OT'));
            me.winPosteOT = Ext.create("App.Config.Abstract.Window", { itemId: 'winAddPoste' });
            me.formConfigPuestoOT = Ext.create("App.View.Postes.Forms", { opcion: 'FormConfiguracionPosteOT' });
            me.formConfigPuestoOT.loadRecord(record);
            me.formConfigPuestoOT.grid.getStore().setExtraParams({ ID_OT: comboOt.getValue() });
            me.formConfigPuestoOT.grid.getStore().load();
            me.winPosteOT.add(me.formConfigPuestoOT);
            me.winPosteOT.show();
        }
        else {
            me.formConfigPuestoOT.getForm().reset();
            me.formConfigPuestoOT.loadRecord(record);
            me.formConfigPuestoOT.grid.getStore().setExtraParams({ ID_OT: comboOt.getValue() });
            me.formConfigPuestoOT.grid.getStore().load();
            me.winPosteOT.show();
        }
    },

    actualizarComboPoste: function () {
        var comboPoste = this.getComboPoste();
        comboPoste.setValue(null);
        comboPoste.store.load({ params: { ID_OT: this.getComboOt().getValue() } });
    },

    actualizarComboUc: function () {
        var comboUc = this.getComboUnidadConstructiva();
        comboUc.setValue(null);
        comboUc.store.load({ params: { ID_POSTE: this.getComboPoste().getValue() } });
    },

    sumarFechas: function (fecha, tiempo) {
        var nuevafecha = new Date(fecha.getFullYear() + '/' + (fecha.getMonth() + 1) + '/' + (fecha.getDay() + 1) + ' ' + tiempo);
        return nuevafecha;
    }

});