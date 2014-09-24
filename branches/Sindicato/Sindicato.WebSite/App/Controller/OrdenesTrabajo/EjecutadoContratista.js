Ext.define('App.controller.OrdenesTrabajo.EjecutadoContratista', {
    extend: 'Ext.app.Controller',
    stores: [
        'Postes.Postes',
        'Postes.Conductores',
        'Postes.UnidadesConstructivas',
        'OrdenesTrabajo.OrdenesTrabajo',
        'OrdenesTrabajo.OrdenesTrabajoResponsable',
        'OrdenesTrabajo.ElementosIntervenidosContratista',
        'OrdenesTrabajo.UnidadesConstructivasIntervenidasContratista',
        'OrdenesTrabajo.MaterialesManoObraContratista',
        'OrdenesTrabajo.DetallesPresupuesto'

    ],

    views: [
          'OrdenesTrabajo.EjecutadoContratista.PrincipalEjecutadoContratista',
          'OrdenesTrabajo.EjecutadoContratista.FormCabecera',
          'OrdenesTrabajo.EjecutadoContratista.ViewElementosIntervenidos',
          'OrdenesTrabajo.EjecutadoContratista.ViewUnidadesConstructivas',
          'OrdenesTrabajo.EjecutadoContratista.GridMaterialesManoObra',
          'OrdenesTrabajo.EjecutadoContratista.FormOTsContratista',
          'OrdenesTrabajo.EjecutadoContratista.WindowNuevoRegistro'
    ],

    refs: [{
                ref: 'gridOTsContratista',
                selector: '#gridOTsContratista'
            },
            {
                ref: 'cabecera',
                selector: '#formcabeceraejecutadocontratista'
            },
            {
                ref: 'fechaEjecucion',
                selector: '#formcabeceraejecutadocontratista #fejecini'
            },
            {
                ref: 'distancia',
                selector: '#formcabeceraejecutadocontratista #fielddistancia'
            },
            {
                ref: 'hideIdCabecera',
                selector: '#formcabeceraejecutadocontratista #idte'
            },
            {
                ref: 'hideEstado',
                selector: '#formcabeceraejecutadocontratista #hestado'
            },
            {
                ref: 'idOt',
                selector: '#formcabeceraejecutadocontratista #comboboxot'
            },
            {
                ref: 'comboPoste',
                selector: 'window #comboposte'
            },
            {
                ref: 'comboUnidadConstructiva',
                selector: 'window #combouc'
            },
            {
                ref: 'comboConductor',
                selector: 'window #comboconductor'
            },
            {
                ref: 'fieldFormacion',
                selector: 'window #fieldformacion'
            },
            {
                ref: 'viewElementosIntervenidos',
                selector: 'ejecutadocontratistaprincipal panel #velementosintervenidos'
            },
            {
                ref: 'viewUnidadesConstructivas',
                selector: 'ejecutadocontratistaprincipal panel #vunidadesconstructivas'
            },
            {
                ref: 'gridMateriales',
                selector: 'ejecutadocontratistaprincipal panel #gridmateriales'
            },
            {
                ref: 'gridManoObra',
                selector: 'ejecutadocontratistaprincipal panel #gridmanoobra'
            },
    ],

    init: function () {
        var me = this;
        me.control({
            '#maintab ejecutadocontratistaprincipal panel #gridmateriales': {
                render: me.cargarOTsContratista
            }, 
            '#maintab ejecutadocontratistaprincipal panel button[action=add]': {
                click: me.nuevoRegistroEjecutadoContratista
            },
            '#maintab ejecutadocontratistaprincipal panel form grid': {
                itemclick: me.mostrarTrabajoEjecutado
            },
            '#maintab ejecutadocontratistaprincipal panel form textfield': {
                keyup: me.buscarOrdenTrabajoKeyEnter
            },
            '#maintab ejecutadocontratistaprincipal panel form button[text=Buscar]': {
                click: me.buscarOrdenTrabajo
            },
            '#velementosintervenidos': {
                itemclick: me.obtenerViewUnidadesConstructivas
            },
            '#vunidadesconstructivas': {
                itemclick: me.obtenerDetalleMaterialesManoObra
            },
            '#maintab ejecutadocontratistaprincipal panel form button[text=Nuevo]': {
                click: me.nuevoRegistroEjecutadoContratista
            },
            '#maintab ejecutadocontratistaprincipal panel form button[text=Editar]': {
                click: me.editarRegistro
            },
            '#maintab ejecutadocontratistaprincipal panel form button[text=Guardar]': {
                click: me.guardarCambiosRegistro
            },
            '#maintab ejecutadocontratistaprincipal panel form button[text=Aprobar]': {
                click: me.mostrarAprobarRechazar
            },
            '#maintab ejecutadocontratistaprincipal panel form button[text=Rechazar]': {
                click: me.mostrarAprobarRechazar
            },
            'window #comboposte': {
                select: me.obtenerComboUnidadesConstructivas
            },
            'window #comboconductor': {
                select: me.obtenerFormacionConductor
            },
            'window #combouc': {
                select: me.obtenerPresupuesto
            },
            'window button[action=save]': {
                click: me.guardarDetalleEjecutadoContratista
            },
            'grid button[action=addMaterial]': {
                click: me.btnAdicionarMaterial
            },
            'grid button[action=addManoObra]': {
                click: me.btnAdicionarManoObra
            },
            'window #btnuc': {
                click: me.cargarVentanaUC
            },
            '#winAddUc': {
                hide: me.actualizarComboUc
            },
        });

        //me.getGridOTsContratista().store.load({ params: { ESTADO: 'EN_EJEC', TIPO_OT: 'REPARACION_REEMPLAZO' } });
        me.getGridOTsContratista().store.setExtraParam('ESTADO', 'EN_EJEC');
        me.getGridOTsContratista().store.setExtraParam('TIPO_OT', 'REPARACION_REEMPLAZO');
        me.getGridOTsContratista().store.load();
    },

    addContent: function () {
        this.container.add({
            xtype: 'ejecutadocontratistaprincipal',
            itemId: 'ejecutadocontratistamain'
        });
    },

    cargarOTsContratista: function () {
        var me = this;
        me.getGridOTsContratista().store.setExtraParam('ESTADO', 'EN_EJEC');
        me.getGridOTsContratista().store.setExtraParam('TIPO_OT', 'REPARACION_REEMPLAZO');
        me.getGridOTsContratista().store.load();
        me.getViewElementosIntervenidos().store.removeAll();
        me.getViewUnidadesConstructivas().store.removeAll();
    },

    mostrarTrabajoEjecutado: function (grid, rowIndex, colIndex) {
        var me = this;
        var selectionModel = grid.getSelectionModel(), record;
        selectionModel.select(rowIndex);
        record = selectionModel.getSelection()[0];
        btnnuevo = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Nuevo]')[0];
        btneditar = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Editar]')[0];
        btnaprobar = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Aprobar]')[0];
        btnrechazar = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Rechazar]')[0];
        if (record.get('REPORTE_CONTRATISTA') != 'APROBADO') {
            btnnuevo.enable();
        } else {
            btnnuevo.disable();
            btneditar.disable();
        }
        if (record.get('REPORTE_CONTRATISTA') != 'NO_REPORTE') {
            btnaprobar.enable();
            btnrechazar.enable();
        } else {
            btnaprobar.disable();
            btnrechazar.disable();
        }
        me.obtenerCabeceraEjecutadoContratista(record);
        me.obtenerElementosIntervenidosContratista(record.get('ID_OT'));
        me.getViewUnidadesConstructivas().store.removeAll();
        Ext.ComponentQuery.query('#maintab ejecutadocontratistaprincipal panel #gridmateriales')[0].getStore().removeAll();
        Ext.ComponentQuery.query('#maintab ejecutadocontratistaprincipal panel #gridmanoobra')[0].getStore().removeAll();
    },

    buscarOrdenTrabajoKeyEnter: function (field, event, options) {
        var me = this;
        if (event.getCharCode() === event.ENTER) {
            grid = me.getGridOTsContratista();
            //grid.store.limpiarParametros();
            grid.store.load({ params: { ESTADO: 'EN_EJEC', Contiene: field.getValue() , start: 0, page: 1 } });
        }
    },

    buscarOrdenTrabajo: function (btn) {
        var me = this;
        var field = Ext.ComponentQuery.query('#maintab ejecutadocontratistaprincipal panel form textfield')[0];
        grid = me.getGridOTsContratista();
        grid.store.load({ params: { ESTADO: 'EN_EJEC', Contiene: field.getValue(), start: 0, page: 1 } });
    },

    obtenerCabeceraEjecutadoContratista: function (record) {
        var me = this;
        Ext.Ajax.request({
            url: Constantes.HOST + 'OrdenesTrabajo/ObtenerCabeceraEjecutadosContratista',
            params: { ID_OT: record.get('ID_OT') },
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if (data.data != null) {
                    data.data.INCR_EMER == 'SI' ? Ext.getCmp('checkboxemergencia').setValue(true) : Ext.getCmp('checkboxemergencia').setValue(false);
                    data.data.INCR_TERR == 'SI' ? Ext.getCmp('checkboxterreno').setValue(true) : Ext.getCmp('checkboxterreno').setValue(false);
                    me.getHideIdCabecera().setValue(data.data.ID_TE);
                    me.getHideEstado().setValue(data.data.ESTADO);
                    me.getFechaEjecucion().setValue(data.data.FECHA_EJE_INI);
                    me.getDistancia().setValue(data.data.DISTANCIA);
                    /* Setear solo de lectura cabecera */
                    me.readOnlyCabecera(true);
                    if (record.get('REPORTE_CONTRATISTA') != 'APROBADO') {
                        btneditar = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Editar]')[0];
                        btneditar.enable();
                    }
                } else {
                    Ext.getCmp('checkboxemergencia').setValue(false);
                    Ext.getCmp('checkboxterreno').setValue(false);
                    me.getFechaEjecucion().setValue(null);
                    me.getDistancia().setValue(null);
                    me.getViewUnidadesConstructivas().store.removeAll();
                    me.getGridMateriales().store.removeAll();
                    me.getGridManoObra().store.removeAll();
                    me.readOnlyCabecera(false);
                    btneditar = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Editar]')[0];
                    btneditar.disable();
                }
            }
        });
        var formcabecera = me.getCabecera();
        formcabecera.getForm().loadRecord(record);
    },

    obtenerElementosIntervenidosContratista: function (id) {
        var me = this;
        me.getOrdenesTrabajoElementosIntervenidosContratistaStore().load({ params: { ID_OT: id } });
    },

    obtenerViewUnidadesConstructivas: function (view, record, item, index, event, options) {
        var me = this;
        var gridmateriales = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel #gridmateriales')[0];
        var gridmanoobra = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel #gridmanoobra')[0];

        if (record.get('ID_POSTE')) {
            gridmateriales.store.load({ params: { ID_TE: record.get('ID_TE'), ID_POSTE: record.get('ID_POSTE'), TIPO_PROD: 'ITEM' } });
            gridmanoobra.store.load({ params: { ID_TE: record.get('ID_TE'), ID_POSTE: record.get('ID_POSTE'), TIPO_PROD: 'MO' } });

            me.ocultarColumnasGrid(gridmateriales, true, false, 'POSTE');
            me.ocultarColumnasGrid(gridmanoobra, true, false, 'POSTE'); 
            me.getOrdenesTrabajoUnidadesConstructivasIntervenidasContratistaStore().load({ params: { ID_TE: record.get('ID_TE'), ID_POSTE: record.get('ID_POSTE') } });
        } else {
            me.getOrdenesTrabajoUnidadesConstructivasIntervenidasContratistaStore().load({ params: { ID_TE: record.get('ID_TE'), ID_POSTE: record.get('ID_CONDUCTOR') } });
            gridmateriales.store.load({ params: { ID_TE: record.get('ID_TE'), ID_CONDUCTOR: record.get('ID_CONDUCTOR'), TIPO_PROD: 'ITEM' } });
            gridmanoobra.store.load({ params: { ID_TE: record.get('ID_TE'), ID_CONDUCTOR: record.get('ID_CONDUCTOR'), TIPO_PROD: 'MO' } });
            me.ocultarColumnasGrid(gridmateriales, true, false, 'CONDUCTOR');
            me.ocultarColumnasGrid(gridmanoobra, true, false, 'CONDUCTOR');
        }
    },

    obtenerDetalleMaterialesManoObra: function (view, record, item, index, event, options) {
        var me = this;
        var gridmateriales = me.getGridMateriales();
        gridmateriales.store.load({ params: { ID_TE: me.getHideIdCabecera().getValue(), ID_POSTE: record.get('ID_POSTE'), ID_UC: record.get('ID_UC'), TIPO_PROD: 'ITEM' } });

        var gridmanoobra = me.getGridManoObra();
        gridmanoobra.store.load({ params: { ID_TE: me.getHideIdCabecera().getValue(), ID_POSTE: record.get('ID_POSTE'), ID_UC: record.get('ID_UC'), TIPO_PROD: 'MO' } });
    },

    nuevoRegistroEjecutadoContratista: function (btn) {
        var me = this;
        var form = btn.up('form');
        var grid = me.getGridOTsContratista();
        if (grid.getSelectionModel().getSelection()[0] && me.validarCabecera(me.getFechaEjecucion().getValue(), me.getDistancia().getValue()) == 'Satisfactorio') {
            var record = grid.getSelectionModel().getSelection()[0];
            var ot = record.get('ID_OT');
            var win = Ext.widget('windownuevoregistro', { modal: true });
            var comboposte = Ext.ComponentQuery.query('window #comboposte')[0];
            var comboconductor = Ext.ComponentQuery.query('window #comboconductor')[0];
            comboposte.store.setExtraParam('ID_OT', ot);
            comboposte.store.load();
            comboconductor.store.setExtraParam('ID_OT', ot);
            comboconductor.store.load();
            win.show();
        } else {
            if (!grid.getSelectionModel().getSelection()[0]) {
                msg = '<b>Seleccione una Orden de Trabajo</b>';
            } else {
                msg = me.validarCabecera(me.getFechaEjecucion().getValue(), me.getDistancia().getValue());
            }
            Ext.MessageBox.show({
                title: 'Completar datos',
                msg: 'Por favor! complete primero los siguientes datos: <br />' + msg,
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        }
    },

    obtenerComboUnidadesConstructivas: function (combo, records) {
        var me = this;
        var record = combo.getSelectedRecord();
        var ot = me.getIdOt().getValue();
        var combouc = Ext.ComponentQuery.query('window #combouc')[0];
        if (combouc.isDisabled()) {
            combouc.enable();
            combouc.setValue(null);
            me.getComboConductor().setValue(null);
            me.getFieldFormacion().setValue(null);
            me.getFieldFormacion().disable();
        } else {
            combouc.setValue(null);
        }
        combouc.store = this.getPostesUnidadesConstructivasStore().load({ params: { ID_POSTE: record.get('ID_POSTE') } });
        /*Para cargar items de materiales y mano de obra, asociados solo a los postes y no a una unidad constructiva*/    
        var gridmateriales = Ext.ComponentQuery.query('window tabpanel #gridmaterialespresupuesto')[0];
        var gridmanoobra = Ext.ComponentQuery.query('window tabpanel #gridmanoobrapresupuesto')[0];

        var store = Ext.create('App.Store.OrdenesTrabajo.DetallesPresupuesto');
        store.load({
          scope: this,
          params: { ID_OT: record.get('ID_OT'), ID_POSTE: record.get('ID_POSTE'), TIPO_PROD: 'ITEM' },
          callback: function (records, operation, success) {
              if (operation.resultSet.count > 0) {
                  for (var i = 0; i < operation.resultSet.count; i++) {
                      if (records[i].get('ID_UC') == 0 && !me.buscarExiste(records[i].get('IDPRODUCTO'), gridmateriales.store)) {
                          var pre = Ext.create('App.Model.OrdenesTrabajo.DetalleEjecutadoContratista', {
                              ID_TE: me.getHideIdCabecera().getValue(),
                              ID_OT: ot,
                              ID_POSTE: record.get('ID_POSTE'),
                              COD_POSTE: record.get('COD_POSTE'),
                              ID_UC: records[i].get('ID_UC'),
                              CODIGO_UC: records[i].get('COD_UC'),
                              ID_CONDUCTOR: records[i].get('ID_CONDUCTOR'),
                              COD_CONDUCTOR: records[i].get('COD_CONDUCTOR'),
                              TIPO_PROD: records[i].get('TIPO_PROD'),
                              IDPRODUCTO: records[i].get('IDPRODUCTO'),
                              COD_PROD: records[i].get('COD_PROD'),
                              DESC_PROD: records[i].get('DESC_PROD'),
                              UNID_PROD: records[i].get('UNID_PROD'),
                              COSTO_UNIT: records[i].get('COSTO_UNIT'),
                              CANT_PRE: records[i].get('CANT_PRE'),
                              CANT_EJE: 0,
                          });
                          gridmateriales.store.add(pre);
                          var btn = Ext.ComponentQuery.query('window button[action=save]')[0];
                          if (gridmateriales.store.count() > 0) {
                              btn.enable();
                          } else {
                              btn.disable();
                          }
                      }
                  }
              }
          }
      });

      store.load({
          scope: this,
          params: { ID_OT: record.get('ID_OT'), ID_POSTE: record.get('ID_POSTE'), TIPO_PROD: 'MO' },
          callback: function (records, operation, success) {
              if (operation.resultSet.count > 0) {
                  for (var i = 0; i < operation.resultSet.count; i++) {
                      if (records[i].get('ID_UC') == 0 && !me.buscarExiste(records[i].get('IDPRODUCTO'), gridmanoobra.store)) {
                          var pre = Ext.create('App.Model.OrdenesTrabajo.DetalleEjecutadoContratista', {
                              ID_TE: me.getHideIdCabecera().getValue(),
                              ID_OT: ot,
                              ID_POSTE: record.get('ID_POSTE'),
                              COD_POSTE: record.get('COD_POSTE'),
                              ID_UC: records[i].get('ID_UC'),
                              CODIGO_UC: records[i].get('COD_UC'),
                              ID_CONDUCTOR: records[i].get('ID_CONDUCTOR'),
                              COD_CONDUCTOR: records[i].get('COD_CONDUCTOR'),
                              TIPO_PROD: records[i].get('TIPO_PROD'),
                              IDPRODUCTO: records[i].get('IDPRODUCTO'),
                              COD_PROD: records[i].get('COD_PROD'),
                              DESC_PROD: records[i].get('DESC_PROD'),
                              UNID_PROD: records[i].get('UNID_PROD'),
                              COSTO_UNIT: records[i].get('COSTO_UNIT'),
                              CANT_PRE: records[i].get('CANT_PRE'),
                              CANT_EJE: 0,
                          });
                          gridmanoobra.store.add(pre);
                          var btn = Ext.ComponentQuery.query('window button[action=save]')[0];
                          if (gridmanoobra.store.count() > 0) {
                              btn.enable();
                          } else {
                              btn.disable();
                          }
                      }
                  }
              }
          }
      });
    },

    obtenerFormacionConductor: function(combo, records){
        var me = this;
        if (me.getFieldFormacion().isDisabled) {
            me.getFieldFormacion().enable();
            me.getComboPoste().setValue(null);
            me.getComboUnidadConstructiva().setValue(null);
            me.getComboUnidadConstructiva().disable();
        }
        me.getFieldFormacion().setValue(records[0].get('FORMACION'));
        me.obtenerPresupuesto(combo, records);
    },

    obtenerPresupuesto: function (combo, records) {
        var me = this;
        var record = combo.getSelectedRecord();
        var ot = me.getIdOt().getValue();
        var gridmateriales = Ext.ComponentQuery.query('window #gridmaterialespresupuesto')[0];
        var gridmanoobra = Ext.ComponentQuery.query('window #gridmanoobrapresupuesto')[0];

        var store = Ext.create('App.Store.OrdenesTrabajo.DetallesPresupuesto');
        me.cargarGrid(store, ot, record.get('ID_POSTE'), record.get('ID_UC'), record.get('ID_CONDUCTOR'), 'ITEM', gridmateriales, record);
        me.cargarGrid(store, ot, record.get('ID_POSTE'), record.get('ID_UC'), record.get('ID_CONDUCTOR'), 'MO', gridmanoobra, record);
        var btn = Ext.ComponentQuery.query('window button[action=save]')[0];
        if (gridmateriales.store.count() > 0 || gridmanoobra.store.count() > 0) {
            btn.enable();
        } else {
            btn.disable();
        }
    },

    guardarDetalleEjecutadoContratista: function(btn) {
        var me = this;
        var win = btn.up('window');
        var gridmateriales = win.down('#gridmaterialespresupuesto');
        var gridmanoobra = win.down('#gridmanoobrapresupuesto');
        var storemateriales = gridmateriales.getStore();
        var storemanoobra = gridmanoobra.getStore();
        if (storemateriales.count() > 0 || storemanoobra.count() > 0) {
            me.sincronizarStoresGrids(gridmateriales, gridmanoobra);
            win.close();
        } else {
            Ext.Msg.show({
                title: 'No existen registros para grabar',
                msg: 'Usted debe seleccionar por lo menos <br/> un item de Material o Mano de Obra',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
            btn.disable();
        }
    },

    cargarGrid: function (store, ot, poste, uc, conductor, producto, grid, record) {
        var me = this;
        var btn = Ext.ComponentQuery.query('window button[action=save]')[0];
        store.load({
            params: { ID_OT: ot, ID_POSTE: poste, ID_UC: uc, ID_CONDUCTOR: conductor, TIPO_PROD: producto },
            callback: function (records, operation, success) {
                if (operation.resultSet.count > 0) {
                    for (var i = 0; i < operation.resultSet.count; i++) {
                        if (!me.buscarExiste(records[i].get('IDPRODUCTO'), grid.store)) {
                            var pre = Ext.create('App.Model.OrdenesTrabajo.DetalleEjecutadoContratista', {
                                ID_TE: me.getHideIdCabecera().getValue(),
                                ID_OT: ot,
                                ID_POSTE: poste,
                                COD_POSTE: record.get('COD_POSTE'),
                                ID_UC: uc,
                                CODIGO_UC: record.get('COD_UC'),
                                ID_CONDUCTOR: conductor,
                                COD_CONDUCTOR: record.get('COD_CONDUCTOR'),
                                TIPO_PROD: records[i].get('TIPO_PROD'),
                                IDPRODUCTO: records[i].get('IDPRODUCTO'),
                                COD_PROD: records[i].get('COD_PROD'),
                                DESC_PROD: records[i].get('DESC_PROD'),
                                UNID_PROD: records[i].get('UNID_PROD'),
                                COSTO_UNIT: records[i].get('COSTO_UNIT'),
                                CANT_PRE: records[i].get('CANT_PRE'),
                                CANT_EJE: 0,
                            });
                            grid.store.add(pre);
                        }
                        if (btn.isDisabled()) {
                            btn.enable();
                        }
                    }
                }
            }
        });
    },

    btnAdicionarMaterial: function (btn) {
        var me = this;
        var win = btn.up('window');
        var gridmateriales = btn.up('grid');

        if (win != null) {
            if (/*me.getComboUnidadConstructiva().getValue()*/me.getComboPoste().getValue() || me.getComboConductor().getValue()) {
                var record = me.getComboUnidadConstructiva().getValue() == null ? me.getComboPoste().getValue() == null ?  me.getComboConductor().getSelectedRecord() : me.getComboPoste().getSelectedRecord() : me.getComboUnidadConstructiva().getSelectedRecord();
                me.mostrarVentanaMaterialesManoObra('GridMateriales', 'Lista de Materiales ERP', gridmateriales, record);
            } else {
                Ext.Msg.alert("Error", "Seleccione primero los siguientes datos: <b></br></br>Poste o Conductor </br>Unidad Constructiva</b>")
            }
        } else {
            if (me.getViewUnidadesConstructivas().getSelectionModel().getSelection()[0] || me.getViewElementosIntervenidos().getSelectionModel().getSelection()[0]) {
                var record = me.getViewUnidadesConstructivas().getSelectionModel().getSelection()[0] != null ? me.getViewUnidadesConstructivas().getSelectionModel().getSelection()[0] : me.getViewElementosIntervenidos().getSelectionModel().getSelection()[0]
                me.mostrarVentanaMaterialesManoObra('GridMateriales', 'Lista de Materiales ERP', gridmateriales, record);
            } else {
                Ext.Msg.alert("Error", "Seleccione primero los siguientes datos: <b></br></br>Poste y/o Unidad Constructiva </br>o Conductor</b>")
            }
        }
    },

    btnAdicionarManoObra: function (btn) {
        var me = this;
        var win = btn.up('window');
        var gridmanoobra = btn.up('grid');
        if (win != null) {
            if (/*me.getComboUnidadConstructiva().getValue()*/me.getComboPoste().getValue() || me.getComboConductor().getValue()) {
                var record = me.getComboUnidadConstructiva().getValue() == null ? me.getComboPoste().getValue() == null ? me.getComboConductor().getSelectedRecord() : me.getComboPoste().getSelectedRecord() : me.getComboUnidadConstructiva().getSelectedRecord();
                //var record = me.getComboUnidadConstructiva().getValue() != null ? me.getComboUnidadConstructiva().getSelectedRecord() : me.getComboConductor().getSelectedRecord();
                me.mostrarVentanaMaterialesManoObra('GridManoObra', 'Lista de Mano de Obra ERP', gridmanoobra, record);
            } else {
                Ext.Msg.alert("Error", "Seleccione primero los siguientes datos: <b></br></br>Poste o Conductor </br>Unidad Constructiva</b>")
            }
        } else {
            if (me.getViewUnidadesConstructivas().getSelectionModel().getSelection()[0] || me.getViewElementosIntervenidos().getSelectionModel().getSelection()[0]) {
                var record = me.getViewUnidadesConstructivas().getSelectionModel().getSelection()[0] != null ? me.getViewUnidadesConstructivas().getSelectionModel().getSelection()[0] : me.getViewElementosIntervenidos().getSelectionModel().getSelection()[0]
                me.mostrarVentanaMaterialesManoObra('GridManoObra', 'Lista de Mano de Obra ERP', gridmanoobra, record);
            } else {
                Ext.Msg.alert("Error", "Seleccione primero los siguientes datos: <b></br></br>Poste y/o Unidad Constructiva </br>o Conductor</b>")
            }
        }
    },

    mostrarVentanaMaterialesManoObra: function (tipoproducto, title, gridtab, record) {
        var me = this;
            var gridMaterialesManoObra = Ext.create('App.View.Postes.GridMateriales', { title: null, iconCls: null, opcion: tipoproducto, imagenes: false });
            var winMaterialesManoObra = Ext.widget('window', {
                itemId: 'winproductoserp',
                layout: 'fit',
                iconCls: 'application_view_list',
                title: title,
                modal: true,
                width: 600,
                resizable: false,
                items: [{
                    xtype: gridMaterialesManoObra
                }],
                buttons: [{
                    text: 'Aceptar',
                    handler: function () {
                        var win = this.up('window');
                        var grid = win.down('grid');
                        if (grid.getSelectionModel().getSelection()[0]) {
                            var records = grid.getSelectionModel().getSelection()[0];
                            tipo = tipoproducto == 'GridMateriales' ? 'ITEM' : 'MO';
                            me.nuevoMaterialManoObra(record, records, gridtab, tipo);
                            var btn = Ext.ComponentQuery.query('window button[action=save]')[0];
                            if (btn != null && gridtab.store.count() > 0) {
                                btn.enable();
                            }
                            win.close();
                        } else {
                            Ext.Msg.alert("Error", "Primero seleccione 1 Material del Grid")
                        }
                    }
                }, {
                    text: 'Cancelar',
                    handler: function () { this.up('window').close(); }
                }],
            });
            winMaterialesManoObra.show();
    },

    nuevoMaterialManoObra: function (record, records, grid, tipo) {
        var me = this;
        var btn = Ext.ComponentQuery.query('window button[action=save]')[0];
        var model = Ext.create('App.Model.OrdenesTrabajo.DetalleEjecutadoContratista', {
            ID_TE: me.getHideIdCabecera().getValue(),
            ID_OT: me.getIdOt().getValue(),
            ID_POSTE: record.get('ID_POSTE'),
            COD_POSTE: record.get('COD_POSTE'),
            ID_UC: record.get('ID_UC'),
            CODIGO_UC: record.get('COD_UC'),
            ID_CONDUCTOR: record.get('ID_CONDUCTOR'),
            COD_CONDUCTOR: record.get('COD_CONDUCTOR'),
            TIPO_PROD: tipo,
            IDPRODUCTO: records.get('IDPRODUCTO'),
            COD_PROD: records.get('COD_ALTERNATIVO'),
            DESC_PROD: records.get('DESCRIPCION'),
            UNID_PROD: records.get('IDUNIDAD'),
            COSTO_UNIT: records.get('COSTO_UNIT'),
            CANT_PRE: records.get('CANT_PRE'),
            CANT_EJE: 0,
        });
        grid.store.add(model);
    },

    cargarVentanaUC: function () {
        var me = this;
        var comboPoste = me.getComboPoste();
        var record = comboPoste.getSelectedRecord();
        if (comboPoste.getValue() != null) {
            if (me.winPoste == null) {
                me.winPoste = Ext.create("App.Config.Abstract.Window", { itemId: 'winAddUc' });
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

    actualizarComboUc: function () {
        var me = this;
        var comboUc = me.getComboUnidadConstructiva();
        comboUc.setValue(null);
        comboUc.store.load({ params: { ID_POSTE: me.getComboPoste().getValue() } });
    },

    validarCabecera: function (fecha, distancia) {
        if (fecha != null && distancia != null) {
            return 'Satisfactorio'
        } else {
            var mensaje = fecha && distancia == null ? fecha == null ? '<b>Fecha Ejecucion</b>' : '<b>Distancia</b>' : '<b>Fecha Ejecucion </br>Distancia</b>';
            return mensaje
        }
    },

    buscarExiste: function (item, store) {
        for (var i = 0; i < store.getCount() ; i++) {
            var comparar = store.getAt(i).data.IDPRODUCTO;
            if (item == comparar) {
                return true;
            }
        }
    },

    ocultarColumnasGrid: function (grid, v, f, elemento) {
        if (elemento == 'POSTE') {
            grid.columns[0].setVisible(f);
            grid.columns[1].setVisible(v);
            grid.columns[2].setVisible(f);
        } else {
            grid.columns[0].setVisible(f);
            grid.columns[1].setVisible(f);
            grid.columns[2].setVisible(f);
        }
    },

    readOnlyCabecera: function (v) {
        var me = this;
        Ext.getCmp('checkboxemergencia').setReadOnly(v);
        Ext.getCmp('checkboxterreno').setReadOnly(v);
        me.getFechaEjecucion().setReadOnly(v);
        me.getDistancia().setReadOnly(v);
    },

    editarRegistro: function (btn) {
        var me = this;
        me.readOnlyCabecera(false);
        btnguardar = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Guardar]')[0];
        btnguardar.enable();
        btn.disable();
    },

    guardarCambiosRegistro: function (btnguardar) {
        var me = this;
        var gridmateriales = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel tabpanel #gridmateriales')[0];
        var gridmanoobra = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel tabpanel #gridmanoobra')[0];
        me.sincronizarStoresGrids(gridmateriales, gridmanoobra);
        me.readOnlyCabecera(false);
        btnguardar.disable();
        btneditar = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Editar]')[0];
        btneditar.enable();
    },

    sincronizarStoresGrids: function (gridmateriales, gridmanoobra) {
        var me = this;
        Ext.Msg.confirm('Confirmar', '¿Esta usted seguro de guardar los datos?', function (btn) {
            if (btn == 'yes') {
                var storemateriales = gridmateriales.getStore();
                var storemanoobra = gridmanoobra.getStore();
                gridots = Ext.ComponentQuery.query('#maintab ejecutadocontratistaprincipal panel form grid')[0];
                var record = gridots.getSelectionModel().getSelection()[0];
                Ext.Ajax.request({
                    url: Constantes.HOST + 'OrdenesTrabajo/GuardarCabeceraEjecutadoContratista',
                    params: {
                        ID_TE: me.getHideIdCabecera().getValue(),
                        ID_OT: record.get('ID_OT'),
                        FECHA_EJE_INI: me.getFechaEjecucion().getValue(),
                        FECHA_EJE_FIN: me.getFechaEjecucion().getValue(),
                        DISTANCIA: me.getDistancia().getValue(),
                        INCR_TERR: Ext.getCmp('checkboxterreno').getValue() == true ? Ext.getCmp('checkboxterreno').inputValue : Ext.getCmp('checkboxterreno').uncheckedValue,
                        INCR_EMER: Ext.getCmp('checkboxemergencia').getValue() == true ? Ext.getCmp('checkboxemergencia').inputValue : Ext.getCmp('checkboxemergencia').uncheckedValue
                    },
                    success: function (response, options) {
                        var data = Ext.decode(response.responseText);
                        if (data.success) {
                            gridmateriales.store.sync();
                            gridmanoobra.store.sync();
                            me.readOnlyCabecera(true);
                        } else {
                            Ext.Msg.show({
                                title: 'Se ha producido un error',
                                msg: data.msg,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                        /*storedetalle = Ext.create('App.store.OrdenesTrabajo.DetalleEjecutadoContratista');
                        storemateriales.each(function (record, index) {
                            storedetalle.add(record);
                        });

                        storemanoobra.each(function (record, index) {
                            storedetalle.add(record);
                        });

                        storedetalle.each(function (record, index) {
                            record.setDirty();
                        });
                        storedetalle.sync();*/
                    },

                    failure: function (response, options) {
                        console.dir(response);
                    }
                });
            }
        })
    },

    mostrarAprobarRechazar: function (btn) {
        var me = this;
        gridots = Ext.ComponentQuery.query('#maintab ejecutadocontratistaprincipal panel form grid')[0];
        if (gridots.getSelectionModel().getSelection()[0]) {

            var norequerido = btn.text == 'Aprobar' ? true : false;
            var form = Ext.widget('form', {
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                border: false,
                bodyPadding: 10,
                fieldDefaults: {
                    labelAlign: 'top',
                    labelWidth: 100,
                    labelStyle: 'font-weight:bold'
                },
                items: [{
                    xtype: 'textfield',
                    name: 'EST_ORIG',
                    value: me.getHideEstado().getValue(),
                    hidden: true
                },
                        {
                            xtype: 'textfield',
                            name: 'ID_TE',
                            value: me.getHideIdCabecera().getValue(),
                            hidden: true
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Motivo:',
                            name: 'OBSERV',
                            labelAlign: 'top',
                            flex: 1,
                            margins: '0',
                            allowBlank: norequerido
                        }],
                buttons: [{
                    text: 'Cancelar',
                    handler: function () {
                        this.up('form').getForm().reset();
                        this.up('window').close();
                    }
                }, {
                    text: btn.text,
                    handler: function () {
                        var form = this.up('form');
                        var record = form.getForm().getValues();
                        if (this.up('form').getForm().isValid()) {
                            Ext.Msg.confirm('Confirmar', '¿Esta usted seguro de ' + btn.text + ' el Reporte del Trabajo Ejecutado?', function (button) {
                                if (button == 'yes') {
                                    var estadodestino = btn.text == 'Aprobar' ? 'APROBADO' : 'RECHAZADO';
                                    Ext.Ajax.request({
                                        url: Constantes.HOST + 'OrdenesTrabajo/AprobarRechazarEjecutadoContratista',
                                        params: { ID_TE: record.ID_TE, OPERACION: btn.text, EST_ORIG: record.EST_ORIG, EST_DEST: estadodestino, OBSERV: record.OBSERV },
                                        success: function (response, options) {
                                            var data = Ext.decode(response.responseText);
                                            if (data.success) {
                                                Ext.MessageBox.show({
                                                    title: 'Felicidades',
                                                    msg: data.msg,
                                                    buttons: Ext.Msg.OK,
                                                    icon: Ext.Msg.INFO
                                                });
                                                /*actualizo el grid para mostrar el icono del reporte*/
                                                grid = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form grid')[0];
                                                grid.store.load();
                                            } else {
                                                Ext.MessageBox.show({
                                                    title: 'Advertencia',
                                                    msg: data.msg,
                                                    buttons: Ext.Msg.OK,
                                                    icon: Ext.Msg.WARNING
                                                });
                                            }
                                        }
                                    });

                                }
                            })
                            this.up('form').getForm().reset();
                            this.up('window').close();
                        } else {
                            Ext.MessageBox.alert('Faltan datos importantes', 'Por favor! ingrese el Motivo');
                        }
                    }
                }]
            });

            win = Ext.widget('window', {
                title: 'Descripcion',
                closeAction: 'hide',
                width: 300,
                height: 300,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: form
            });
            win.show();
        } else {
            Ext.MessageBox.alert('Error', 'Primero seleccione una Orden de Trabajo');
        }

    },

    controlarBotones: function (nuevo, editar, guardar) {
        btnnuevo = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Nuevo]')[0];
        btneditar = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Editar]')[0];
        btnguardar = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Guardar]')[0];

        btnnuevo.disable(nuevo);
        btneditar.disable(editar);
        btnguardar.disable(guardar);
    }

});