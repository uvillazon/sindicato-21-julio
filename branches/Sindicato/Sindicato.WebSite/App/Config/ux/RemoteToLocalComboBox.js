/**
This combo functions as a remote-local ExtJS combo hybrid.  It starts out
as a remote combo so that nothing is loaded until the trigger button is clicked
or the user starts typing in the combobox.  Once the data is loaded, it switches
to local mode so that no more queries are made to the server.  It therefore
assumes that all data is loaded on the first load request. It also shows the
loading UI when data is being loaded since it starts out as 'remote'.
*/
Ext.define("App.Config.ux.RemoteToLocalComboBox", {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.remotetolocalcombo',

    init: function (combo) {
        this.combo = combo;
        combo.queryMode = 'remote';
        this.callParent();

        combo.getStore().on('load', this.onComboStoreLoad, this);
    },

    onComboStoreLoad: function () {
        Ext.apply(this.combo, { queryMode: 'local' });
    }
});