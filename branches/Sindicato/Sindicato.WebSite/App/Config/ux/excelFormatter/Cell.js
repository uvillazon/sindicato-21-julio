/**
 * @class Ext.ux.Exporter.ExcelFormatter.Cell
 * @extends Object
 * Represents a single cell in a worksheet
 */

Ext.define("App.Config.ux.excelFormatter.Cell", {
    constructor: function(config) {
        Ext.applyIf(config, {
          type: "String"
        });

        Ext.apply(this, config);

        App.Config.ux.excelFormatter.Cell.superclass.constructor.apply(this, arguments);
    },

    render: function() {
        return this.tpl.apply(this);
    },

    tpl: new Ext.XTemplate(
        '<ss:Cell ss:StyleID="{style}">',
          '<ss:Data ss:Type="{type}">{value}</ss:Data>',
        '</ss:Cell>'
    )
});