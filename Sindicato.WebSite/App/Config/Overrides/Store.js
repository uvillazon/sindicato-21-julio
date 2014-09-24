Ext.override(Ext.data.Store, {
    pageSize: 25,
    setExtraParams: function (params) {
        this.proxy.extraParams = this.proxy.extraParams || {};
        for (var x in params) {
            this.proxy.extraParams[x] = params[x];
        }
        this.proxy.applyEncoding(this.proxy.extraParams);
    },
    setExtraParam: function (name, value) {
        this.proxy.extraParams = this.proxy.extraParams || {};
        if (value != null) {
            this.proxy.extraParams[name] = Ext.util.Format.uppercase(value);
        }
        else {
            this.proxy.extraParams[name] = value;
        }
        this.proxy.applyEncoding(this.proxy.extraParams);
    },
    limpiarParametros : function(){
        this.proxy.extraParams =  {};
        //for (var x in this.proxy.extraParams) {
        //    this.proxy.extraParams[x] = params[x];
        //}
        this.proxy.applyEncoding(this.proxy.extraParams);
    },
    setExtraParamDate: function (name, value) {
        this.proxy.extraParams = this.proxy.extraParams || {};
        
        this.proxy.extraParams[name] = value;
        this.proxy.applyEncoding(this.proxy.extraParams);
    },
    existeRecord: function (name, value) {
        var data = this.data.items,
            dLen = data.length,
            record, d;

        for (d = 0; d < dLen; d++) {
            if (data[d].get(name) == value) {
                return true;
            }

        }
        return false;
    },
    countRegistros: function (name, value) {
        var count = 0;
        var data = this.data.items,
            dLen = data.length,
            record, d;

        for (d = 0; d < dLen; d++) {
            if (data[d].get(name) == value) {
                count++;
            }

        }
        return count;
    }
});

Ext.override(Ext.data.proxy.Ajax, {

    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation, callback, scope);

        if (operation.allowWrite()) {
            request = writer.write(request);
        }

        Ext.apply(request, {
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false // explicitly set it to false, ServerProxy handles caching
        });

        Ext.Ajax.request(request);
        //Bleext.Ajax.request(request);

        return request;
    }
});

Ext.override(Ext.grid.Panel, {

    iconCls: 'application_view_list',

});
Ext.override(Ext.form.field.Number , {
    selectOnFocus: true
});
Ext.override(Ext.window.MessageBox, {
    alert: function (cfg, msg, fn, scope) {
        var icono = null;
        if (cfg == 'Exito') {
            icono = this.INFO;
        }
        else if (cfg == 'Aviso') {
            icono = this.WARNING;
        }
        else {
            icono = this.ERROR;
        }
        if (Ext.isString(cfg)) {
            cfg = {
                title: cfg,
                msg: msg,
                buttons: this.OK,
                icon: icono,
                fn: fn,
                scope: scope,
                minWidth: this.minWidth
            };
        }
        return this.show(cfg);
    }
});

Ext.override(Ext.form.ComboBox, {
    getSelectedIndex: function() {
        var v = this.getValue();
        var r = this.findRecord(this.valueField || this.displayField, v);
        return(this.store.indexOf(r));
    },

    getSelectedRecord: function() {
        var v = this.getValue();
        var r = this.findRecord(this.valueField || this.displayField, v);
        return(r);
    }
});
