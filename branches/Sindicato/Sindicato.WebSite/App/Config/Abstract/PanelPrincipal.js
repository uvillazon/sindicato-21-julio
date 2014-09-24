Ext.define("App.Config.Abstract.PanelPrincipal", {
    extend: "Ext.panel.Panel",
    alias: "widget.PanelPrincipal",
    width: '100%',
    height: Constantes.ALTO,
    requires: ['App.Config.ux.Printer'],
    frame: true,
    layout: 'border',
    fixed: true,
    defaults: {
        split: true
    },
    controlador: '',
    accionCrear: '',
    accionBaja: '',
    accionCambioEstado: '',
    idTabla: '',
    tabla: '',
    tituloImpresion : 'Reporte',
    CargarDatos: function (grid, td, cellIndex, record, tr, owIndex, e, eOpts) {
        var me = this;
        me.formulario.CargarDatos(record);

    },
    ImprimirReporteGrid: function () {
        var me = this;
        // alert(me.tituloImpresion);
        App.Config.ux.Printer.filtros = me.tituloImpresion;
        App.Config.ux.Printer.print(me.grid);

    }, ImprimirReporteCustomGrid: function (grid) {
        var me = this;
        // alert(me.tituloImpresion);
        App.Config.ux.Printer.filtros = me.tituloImpresion;
        App.Config.ux.Printer.print(grid);

    },
    CargarPanelImagen : function( verReporte){
        var me = this;
      
        me.ViewImagen = Ext.create("App.View.Imagenes.ViewImagenes");
        if (verReporte == null) {
            me.ViewImagen.on('selectionchange', me.onIconSelect, this);
        }
        else { alert("Otro Evento");}
        me.panelImagen = Ext.create('Ext.panel.Panel', {
            bodyPadding: 5,
            height: 400,
            title: 'Visor de Imagenes',
            items: [me.ViewImagen]
        });
    },
    CargarImagen: function (btn) {
        var me = this;
        if (me.formulario.record != null) {
            me.formImagen = Ext.create("App.View.Imagenes.FormImagen", { opcion: 'FormImagen' });
            me.formImagen.MostrarWindowImagen(me.tabla, me.formulario.record.get(me.idTabla), me.ViewImagen.store);
        }
        else {
            Ext.MessageBox.alert('Error', "Seleccione un Registro");
        }
    },
    onIconSelect: function (dataview, selections) {
        var me = this;
        var selected = selections[0];

        if (selected) {
            var id = selected.get('ID_IMG');
            var slider = Ext.create('Ext.slider.Single', {
                value: 0,
                increment: 5,
                minValue: 0,
                maxValue: 100,
                fieldLabel: "Aumentar",
            });
            //var size = new Ext.slider.SingleSlider({ //step 1
            //    fieldLabel: "Size",
            //    width: 100, // el tamaño que tendrá el slider
            //    minValue: 20, // el valor mínimo que se obtendrá del slider
            //    maxValue: 120, //el valor máximo que obtendrá el slider
            //    value: 50, //valor inicial que tendrá el slider 
            //    //plugins: tip
            //});

            
            var win = Ext.create("App.Config.Abstract.Window", {
                height: 550,
                width: 800,
            });
            var wrappedImage = Ext.create('Ext.Img', {

                src: Constantes.getUrlImagen() + 'id=' + id + '&tamano=500',
                //autoScroll: true,
                
                //resizable: true,
                //hideMode: 'visibility',
            });
           
            win.addDocked(slider);
            win.add(wrappedImage);
           
            win.show();
            slider.on('changecomplete', function (sl, newValue, thumb, eOpts) {
                //alert(newValue);
                var h = 500 + (newValue * 10);
                wrappedImage.setSize(h,h);
                //wrappedImage.setWidth(newValue + "%")
                //wrappedImage.center(frame);
                //wrappedImage.src = Constantes.getUrlImagen(true) + 'id=' + id + '&tamano=' + h;
                wrappedImage.setSrc(Constantes.getUrlImagen(true) + 'id=' + id + '&tamano=' + h);
                alert(wrappedImage.getSize().width);
                //wrappedImage.setSrc('http://www.sencha.com/img/20110215-feat-perf.png');
                //wrappedImage.doAutoRender();
                //win.doLayout();
            });
            //me.panelInfo.loadRecord(selected);
            //this.down('infopanel').loadRecord(selected);
        }
    },
});
