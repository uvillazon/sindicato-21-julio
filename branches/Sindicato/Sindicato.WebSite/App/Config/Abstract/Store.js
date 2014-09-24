/**
 * @class App.Config.Abstract.Store
 * @extends Ext.data.Store
 * requires 
 * @autor Ubaldo Villazon
 * @date 07/11/2013
 *
 * Description
 *
 *
 **/

Ext.define("App.Config.Abstract.Store", {
    extend: "Ext.data.Store",
    remoteSort: true,
    autoLoad: false,
    sortProperty: '',
    sortDirection: 'DESC',
    pageSize : 50,
    constructor: function (options) {
        var me = this;

        Ext.apply(me, options || {});
        me.proxy = {
            type: 'jsonp',
            url: Constantes.HOST + "" + me.url,
            reader: {
                type: "json",
                root: "Rows",
                successProperty: "success",
                totalProperty: "Total"
            },
            simpleSortMode: true
            
        };
        me.sorters = [{
            property: me.sortProperty,
            direction: me.sortDirection
        }];
        me.callParent(arguments);
    }
});