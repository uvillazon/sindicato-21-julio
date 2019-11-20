Ext.define("App.View.Sgaf.Controller.GridImportarFacturaController", {
    extend: "Deft.mvc.ViewController",
    control: {
        view: {
            boxready: "loadInitialData",
            cellclick: "onCellClick",
            viewready: "onViewReady",


        },
        btn_validar: {
            click: 'onBtnValidar'
        },
        btn_procesar: {
            click: 'onBtnProcesar'
        },
        btn_limpiar: {
            click: 'onBtnLimpiar'
        },
        btn_select_error: {
            click: 'onBtnSelectError'
        },
        btn_eliminar_seleccionado: {
            click: 'onBtnEliminarSeleccionados'
        }

    },
    gRow: -1,
    init: function () {
        return this.callParent(arguments);
    },
    onBtnEliminarSeleccionados: function () {
        var me = this;
        me.getView().getStore().remove(me.getView().getSelectionModel().getSelection());
        //alert("1");
        me.getView().getView().refresh();
    },
    getSelectRecordError: function () {
        var me = this;
        records = [];
        me.getView().getStore().each(function (record) {
            if (record.get('ID_STATUS') === 2) {
                records.push(record);
            }
        });
        return records;
    },
    onBtnSelectError: function () {
        var me = this;
        me.getView().getSelectionModel().select(me.getSelectRecordError());
        
    },
    actualizarStore: function (data) {
        var me = this;
        Ext.each(data, function (res) {
            var index = me.getView().getStore().find('ID', res.ID);
            var record = me.getView().getStore().getAt(index);
            record.set('ID_STATUS', res.ID_STATUS);
            record.set('RESULTADO', res.RESULTADO);
        });
    },
    onBtnValidar: function () {
        var me = this;
        var recs = me.convertirJson();
        me.getView().setLoading(true);
        me.getRequest("Sgaf", "VerificarSgaf", "POST", { detalles: recs }).then({
            success: function (res) {
                Ext.Msg.alert("Exito", res.msg, function () {
                    me.actualizarStore(res.data);
                });

            },
            failure: function (errorMessage) {
                Ext.Msg.alert("Error", errorMessage);
            }
        }).always(function () {
            return me.getView().setLoading(false);
        });

    },
    onBtnProcesar: function () {
        var me = this;
        records = me.getSelectRecordError();
        if (records.length > 0) {
            return Ext.Msg.alert("Error", "solo se envia registros validos");
        }
        var recs = me.convertirJson();
        me.getView().setLoading(true);
        me.getRequest("Sgaf", "procesarSgaf", "POST", { detalles: recs }).then({
            success: function (res) {
                Ext.Msg.alert("Exito", res.msg, function () {
                    me.onBtnLimpiar();
                });

            },
            failure: function (errorMessage) {
                Ext.Msg.alert("Error", errorMessage);
            }
        }).always(function () {
            return me.getView().setLoading(false);
        });
    },
    onBtnLimpiar: function () {
        console.log("limpiar");
        var me = this;
        me.getView().getStore().removeAll();
        me.getView().store.add(Ext.create('App.View.Sgaf.Model.Sgaf', {}));
    },
    loadInitialData: function () {
        var me = this;
        me.getView().store.add(Ext.create('App.View.Sgaf.Model.Sgaf', {}));
        console.log("loadInitialData");
    },
    onCellClick: function (grid, td, cellIndex, record, tr, rowIndex) {
        var me = this;
        me.gRow = rowIndex;
    },
    onViewReady: function (grid) {
        var me = this;
        var map = new Ext.KeyMap(grid.getEl(),
              [{
                  key: "c",
                  ctrl: true,
                  fn: function (keyCode, e) {

                      var recs = grid.getSelectionModel().getSelection();

                      if (recs && recs.length != 0) {

                          var clipText = grid.getCsvDataFromRecs(recs);

                          var ta = document.createElement('textarea');

                          ta.id = 'cliparea';
                          ta.style.position = 'absolute';
                          ta.style.left = '-1000px';
                          ta.style.top = '-1000px';
                          ta.value = clipText;
                          document.body.appendChild(ta);
                          document.designMode = 'off';

                          ta.focus();
                          ta.select();

                          setTimeout(function () {

                              document.body.removeChild(ta);

                          }, 100);
                      }
                  }
              },
              {

                  key: "v",
                  ctrl: true,
                  fn: function () {
                      var ta = document.createElement('textarea');
                      ta.id = 'cliparea';
                      ta.style.position = 'absolute';
                      ta.style.left = '-1000px';
                      ta.style.top = '-1000px';
                      ta.value = '';
                      document.body.appendChild(ta);
                      document.designMode = 'off';

                      setTimeout(function () {

                          //Ext.getCmp('grid-pnl').getRecsFromCsv(grid, ta);
                          me.getRecsFromCsv(grid, ta);

                      }, 100);

                      ta.focus();
                      ta.select();
                  }
              }]);
    },

    getCsvDataFromRecs: function (records) {
        var clipText = '';
        //var currRow = countryStore.find('id', records[0].data.id);
        //for (var i = 0; i < records.length; i++) {
        //    var index = countryStore.find('id', records[i].data.id);
        //    var r = index;
        //    var rec = records[i];
        //    var cv = this.initialConfig.columns;
        //    for (var j = 0; j < cv.length; j++) {
        //        var val = rec.data[cv[j].dataIndex];
        //        if (r === currRow) {
        //            clipText = clipText.concat(val, "\t");
        //        } else {
        //            currRow = r;
        //            clipText = clipText.concat("\n", val, "\t");
        //        }
        //    }

        //}
        console.log("getCsvDataFromRecs Control C copiar");

        return clipText;

    },
    getRecsFromCsv: function (grid, ta) {
        var me = this;
        document.body.removeChild(ta);
        var del = '';
        if (ta.value.indexOf("\r\n")) {
            del = "\r\n";
        } else if (ta.value.indexOf("\n")) {
            del = "\n"
        }
        var rows = ta.value.split("\n");

        for (var i = 0; i < rows.length; i++) {
            var cols = rows[i].split("\t");
            var columns = grid.columns;
            if (cols.length > columns.length)
                cols = cols.slice(0, columns.length - 1)
            if (me.gRow === -1) {
                Ext.Msg.alert('Error', 'seleccionar una selda y  pegar ');
                return;
            }
            var cfg = {};
            var tmpRec = me.getView().store.getAt(me.gRow);
            var existing = false;
            if (tmpRec) {
                cfg = tmpRec.data;
                existing = true;
            }
            var l = cols.length;
            if (cols.length > columns.length)
                l = columns.length;
            for (var j = 0; j < l; j++) {
                if (cols[j] === "") {
                    return;
                }
                cfg[columns[j + 1].dataIndex] = cols[j];
            }
            me.getView().storeInitialCount++;
            cfg['id'] = me.getView().storeInitialCount;
            var tmpRow = me.gRow;
            grid.getSelectionModel().clearSelections(true);
            var tmpRec = Ext.create('App.View.Sgaf.Model.Sgaf', cfg);
            if (existing)
                me.getView().store.removeAt(tmpRow);
            me.getView().store.insert(tmpRow, tmpRec);
            me.gRow = ++tmpRow;
        }
        if (me.gRow === me.getView().store.getCount()) {
            var RowRec = Ext.create('App.View.Sgaf.Model.Sgaf', {});
            me.getView().store.add(RowRec);
        }
        me.gRow = 0;
    },
    convertirJson: function () {
        var me = this;
        var modified = me.getView().getStore().getModifiedRecords();
        var recordsToSend = [];
        if (!Ext.isEmpty(modified)) {
            Ext.each(modified, function (record) { //step 2
                recordsToSend.push(Ext.apply(record.data));
            });
            recordsToSend = Ext.JSON.encode(recordsToSend);
            return recordsToSend;
        }
        else {
            return false;
        }

    },

    getRequest: function (controlador, accion, method, params) {
        var method = method === null ? 'POST' : method;
        var deferred = Ext.create('Deft.promise.Deferred');
        Ext.Ajax.request({
            url: Constantes.HOST + '' + controlador + '/' + accion + '',
            params: params,
            method: method,
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    deferred.resolve(res);
                }
                else {
                    deferred.reject(res.msg);
                }
            },
            failure: function (response, options) {
                deferred.reject(response);
            }
        });
        return deferred.promise;
    },
});
