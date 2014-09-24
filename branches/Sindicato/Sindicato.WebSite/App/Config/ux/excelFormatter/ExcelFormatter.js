/**
 * @class Ext.ux.Exporter.ExcelFormatter
 * @extends Ext.ux.Exporter.Formatter
 * Specialised Format class for outputting .xls files
 */
Ext.define("App.Config.ux.excelFormatter.ExcelFormatter", {
    extend: "App.Config.ux.Formatter",
    uses: [
        "App.Config.ux.excelFormatter.Cell",
        "App.Config.ux.excelFormatter.Style",
        "App.Config.ux.excelFormatter.Worksheet",
        "App.Config.ux.excelFormatter.Workbook"
    ],
    contentType: 'data:application/vnd.ms-excel;base64,',
    extension: "xls",

    format: function(store, config) {
      var workbook = new App.Config.ux.excelFormatter.Workbook(config);
      workbook.addWorksheet(store, config || {});
      return workbook.render();
    }
});