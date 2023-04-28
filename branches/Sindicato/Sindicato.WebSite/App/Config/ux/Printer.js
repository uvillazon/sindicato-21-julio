/**
* @class Ext.ux.grid.Printer
* @author Ed Spencer (edward@domine.co.uk)
* Helper class to easily print the contents of a grid. Will open a new window with a table where the first row
* contains the headings from your column model, and with a row for each item in your grid's store. When formatted
* with appropriate CSS it should look very similar to a default grid. If renderers are specified in your column
* model, they will be used in creating the table. Override headerTpl and bodyTpl to change how the markup is generated
* 
* Usage:
* 
* 1 - Add Ext.Require Before the Grid code
* Ext.require([
*   'Ext.ux.grid.GridPrinter',
* ]);
* 
* 2 - Declare the Grid 
* var grid = Ext.create('Ext.grid.Panel', {
*   columns: //some column model,
*   store   : //some store
* });
* 
* 3 - Print!
* Ext.ux.grid.Printer.mainTitle = 'Your Title here'; //optional
* Ext.ux.grid.Printer.print(grid);
* 
* Original url: http://edspencer.net/2009/07/printing-grids-with-ext-js.html
* 
* Modified by Loiane Groner (me@loiane.com) - September 2011 - Ported to Ext JS 4
* http://loianegroner.com (English)
* http://loiane.com (Portuguese)
* 
* Modified by Bruno Sales - August 2012
* 
* Modified by Paulo Goncalves - March 2012
* 
* Modified by Beto Lima - March 2012
* 
* Modified by Beto Lima - April 2012
*
* Modified by Paulo Goncalves - May 2012
* 
* Modified by Nielsen Teixeira - 2012-05-02
*
* Modified by Joshua Bradley - 2012-06-01
* 
* Modified by Loiane Groner - 2012-09-08
* 
* Modified by Loiane Groner - 2012-09-24
*
* Modified by Loiane Groner - 2012-10-17
* FelipeBR contribution: Fixed: support for column name that cotains numbers
* Fixed: added support for template columns
*
*/
Ext.define("App.Config.ux.Printer", {
    requires: 'Ext.XTemplate',
    parametros: '',
    statics: {
        /**
         * Prints the passed grid. Reflects on the grid's column model to build a table, and fills it using the store
         * @param {Ext.grid.Panel} grid The grid to print
         */
        printLoad: function (grid, store2) {
            var columns = [];
            grid.title = Ext.isEmpty(grid.title) ? 'Detalles' : grid.title;
            //account for grouped columns
            Ext.each(grid.columns, function (c) {
                if (c.items.length > 0) {
                    columns = columns.concat(c.items.items);
                } else {
                    columns.push(c);
                }
            });
            var data = [];
            console.log("______________________________________________75");
            console.log(store2);
            store2.data.each(function (item, row) {
                //grid.store.data.each(function (item, row) {
                var convertedData = {};

                //apply renderers from column model
                for (var key in item.data) {
                    var value = item.data[key];
                    // console.log(key+"=================================>>>><<<<<<<<<<<<<<<");
                    Ext.each(columns, function (column, col) {
                        // console.log(column);
                        // console.log(key + "</===>");
                        if (column && column.dataIndex == key && column.xtype == 'gridcolumn') {
                            // console.log("dataindex");
                            // console.log(column.xtype);
                            /*
                             * TODO: add the meta to template
                             */
                            var meta = { item: '', tdAttr: '', style: '' };
                             //console.log(key);
                             //console.log(value);
                             //console.log(column.format);
                             //console.log(Ext.isDate(value));
                             value = column.renderer ? column.renderer.call(grid, value, meta, item, row, col, grid.store, grid.view) : value;

                            //value = Ext.isDate(value) ? Ext.Date.format(value, column.format) : column.renderer ? column.renderer.call(grid, value, meta, item, row, col, grid.store, grid.view) : value;
                             //console.log(value);
                             //console.log('===================================>>>>>>>>>>>>>>>>>>');

                            var varName = Ext.String.createVarName(column.dataIndex);
                            convertedData[varName] = value;

                        } else if (column && column.dataIndex == key && column.xtype === 'datecolumn') {
                            // console  .log("datecolumn");
                            value = Ext.isDate(value) ? Ext.Date.format(value, column.format) : column.renderer ? column.renderer.call(grid, value, meta, item, row, col, grid.store, grid.view) : value;

                            // console.log(value);
                            var varName = Ext.String.createVarName(column.dataIndex);
                            // console.log(varName);
                            convertedData[varName] = value;

                        } else if (column && column.dataIndex == key && column.xtype === 'rownumberer') {
                            // console.log("rownumberer");

                            var varName = Ext.String.createVarName(column.id);
                            convertedData[varName] = (row + 1);

                        } else if (column && column.dataIndex == key && column.xtype === 'templatecolumn') {
                            // console.log("templatecolumn");

                            value = column.tpl ? column.tpl.apply(item.data) : value;

                            var varName = Ext.String.createVarName(column.id);
                            convertedData[varName] = value;

                        }
                    }, this);
                }

                data.push(convertedData);
            });

            //remove columns that do not contains dataIndex or dataIndex is empty. for example: columns filter or columns button
            var clearColumns = [];
            Ext.each(columns, function (column) {
                if ((column) && (!Ext.isEmpty(column.dataIndex) && !column.hidden)) {
                    clearColumns.push(column);
                } else if (column && column.xtype === 'rownumberer') {
                    column.text = 'Nro';
                    clearColumns.push(column);
                } else if (column && column.xtype === 'templatecolumn') {
                    clearColumns.push(column);
                }

            });
            columns = clearColumns;

            //get Styles file relative location, if not supplied
            if (this.stylesheetPath === null) {
                var scriptPath = Ext.Loader.getPath('App.Config.ux.Printer');
                console.log(scriptPath);
                this.stylesheetPath = scriptPath.substring(0, scriptPath.indexOf('Printer.js')) + '../../../Content/print.css';
                console.log(this.stylesheetPath);
            }

            //use the headerTpl and bodyTpl markups to create the main XTemplate below
            var headings = Ext.create('Ext.XTemplate', this.headerTpl).apply(columns);
            var body = Ext.create('Ext.XTemplate', this.bodyTpl).apply(columns);

            var pluginsBody = '',
                pluginsBodyMarkup = [];

            //add relevant plugins
            // Ext.each(grid.plugins, function (p) {
            //     if (p.ptype == 'rowexpander') {
            //         pluginsBody += p.rowBodyTpl.join('');
            //     }
            // });

            if (pluginsBody != '') {
                pluginsBodyMarkup = [
                    '<tr class="{[xindex % 2 === 0 ? "even" : "odd"]}"><td colspan="' + columns.length + '">',
                    pluginsBody,
                    '</td></tr>'
                ];
            }

            var idtemporal = grid.title.replace(/ /g, "-");
            // console.log(nuevaCadena);

            //Here because inline styles using CSS, the browser did not show the correct formatting of the data the first time that loaded
            var htmlMarkup = [
                '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
                '<html class="' + Ext.baseCSSPrefix + 'ux-grid-printer">',
                '<head>',
                '<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />',
                '<link href="' + this.stylesheetPath + '" rel="stylesheet" type="text/css" />',
                '<script type="text/javascript" src="lib/jquery/jquery.min.js"></script>',
                '<script type="text/javascript" src="lib/js-xlsx/xlsx.core.min.js"></script>',
                '<script type="text/javascript" src="lib/blobjs/Blob.min.js"></script>',
                '<script type="text/javascript" src="lib/fileSaver/FileSaver.min.js"></script>',
                // '<script type="text/javascript" src="lib/tableexport/dist/js/tableexport.min.js"></script>',
                '<script type="text/javascript" src="lib/tableexport/dist/js/tableexport.js"></script>',
                '<script type="text/javascript" src="lib/pdfmake.js/pdfmake.min.js"></script>',
                '<script type="text/javascript" src="lib/pdfmake.js/vfs_fonts.js"></script>',
                '<script type="text/javascript" src="lib/html2canvas/html2canvas.min.js"></script>',
                '<script type="text/javascript" src="lib/html2pdf/html2pdf.js"></script>',
                '<script type="text/javascript" src="lib/js-pdf/jspdf.min.js"></script>',
                '<title>' + grid.title + '</title>',
                '</head>',
                '<body class="' + Ext.baseCSSPrefix + 'ux-grid-printer-body">',
                '<div id="botones" class="' + Ext.baseCSSPrefix + 'ux-grid-printer-noprint ' + Ext.baseCSSPrefix + 'ux-grid-printer-links">',
                '<a class="' + Ext.baseCSSPrefix + 'ux-grid-printer-linkprint" href="javascript:void(0);" onclick="window.print();">' + this.printLinkText + '</a>',
                '<a class="' + Ext.baseCSSPrefix + 'ux-grid-printer-linkclose" href="javascript:void(0);" onclick="window.close();">' + this.closeLinkText + '</a>',
                '</div>',
                '<h1 aling="center">' + grid.title + '</h1>',
                '<div id="exportthis">',
                // '<div>' + this.title + '</div>',
                '<table id="' + idtemporal + '">',
                '<tr>',
                headings,
                '</tr>',
                '<tpl for=".">',
                '<tr class="{[xindex % 2 === 0 ? "even" : "odd"]}">',
                body,
                '</tr>',
                pluginsBodyMarkup.join(''),
                '</tpl>',
                '</table>',
                '</div>',
                '<script>var HeaderTable = document.getElementById("' + idtemporal + '"); $(HeaderTable).tableExport({headers: false , formats: ["xlsx", "xls", "csv", "txt"]});</script>',
                // '<script>var HeaderTable = document.getElementById("botones"); $(HeaderTable).tableExport({headers: false , formats: ["xlsx", "xls", "csv", "txt"]});</script>',
                '</body>',
                '</html>'
            ];

            var html = Ext.create('Ext.XTemplate', htmlMarkup).apply(data);

            //open up a new printing window, write to it, print it and close
            var win = window.open('', 'printgrid');
            if (win == null || typeof (win) == 'undefined') {
                return alert('Por favor deshabilita el bloqueador de ventanas emergentes y vuelve a hacer clic en "Exportar/Imprimir".');
            }
            //document must be open and closed
            win.document.open();
            win.document.write(html);
            win.document.close();

            if (this.printAutomatically) {
                win.print();
            }

            //Another way to set the closing of the main
            if (this.closeAutomaticallyAfterPrint) {
                if (Ext.isIE) {
                    window.close();
                } else {
                    win.close();
                }
            }
        },
        print: function (grid) {
            console.log(grid.store.proxy);
            var store2 = new Ext.data.Store({
                proxy: grid.store.proxy,
                reader: grid.store.reader,
                sortInfo: grid.store.sortInfo,
                model: grid.store.model,
                // sorters : grid.store.sorters
            });
            store2.proxy.timeout = 120000;
            // var progrees = Ext.ComponentQuery.query('#progressPrincipal')[0];
            store2.on('beforeload', function (s, a, c) {
                grid.getEl().mask();
            });
            var me = this;
            store2.load({ limit: grid.store.getTotalCount(), start: 0, page: 1 });
            store2.on('load', function (store, records, options) {
                grid.getEl().unmask();
                me.printLoad(grid, store2);
            });

        },

        /**
         * @property stylesheetPath
         * @type String
         * The path at which the print stylesheet can be found (defaults to 'ux/grid/gridPrinterCss/print.css')
         */
        stylesheetPath: null,

        /**
         * @property printAutomatically
         * @type Boolean
         * True to open the print dialog automatically and close the window after printing. False to simply open the print version
         * of the grid (defaults to false)
         */
        printAutomatically: false,

        /**
         * @property closeAutomaticallyAfterPrint
         * @type Boolean
         * True to close the window automatically after printing.
         * (defaults to false)
         */
        closeAutomaticallyAfterPrint: false,

        /**
         * @property mainTitle
         * @type String
         * Title to be used on top of the table
         * (defaults to empty)
         */
        mainTitle: '',


        filtros: '',


        /**
         * Text show on print link
         * @type String
         */
        printLinkText: 'Print',

        /**
         * Text show on close link
         * @type String
         */
        closeLinkText: 'Close',

        /**
         * @property headerTpl
         * @type {Object/Array} values
         * The markup used to create the headings row. By default this just uses <th> elements, override to provide your own
         */
        headerTpl: [
            '<tpl for=".">',
            '<th>{text}</th>',
            '</tpl>'
        ],

        /**
         * @property bodyTpl
         * @type {Object/Array} values
         * The XTemplate used to create each row. This is used inside the 'print' function to build another XTemplate, to which the data
         * are then applied (see the escaped dataIndex attribute here - this ends up as "{dataIndex}")
         */
        bodyTpl: [
            '<tpl for=".">',
            '<tpl if="values.dataIndex">',
            '<td>{{[Ext.String.createVarName(values.dataIndex)]}}</td>',
            '<tpl else>',
            '<td>{{[Ext.String.createVarName(values.id)]}}</td>',
            '</tpl>',
            '</tpl>'
        ]
    }
});
