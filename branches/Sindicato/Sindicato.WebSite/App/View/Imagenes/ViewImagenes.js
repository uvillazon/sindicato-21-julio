/**
 * @class App.View.Postes.ViewPostes
 * @extends Ext.view.View
 * @author Ubaldo Villazon
 * 
 * Sub Clase basica para mostrar Imagenes de todos los equipos
 */
Ext.define('App.View.Imagenes.ViewImagenes', {
    extend: 'Ext.view.View',
    singleSelect: true,
    overItemCls: 'x-view-over',
    itemSelector: 'div.thumb-wrap',
    baseCls: 'img-chooser-view',
    height: 400,
    //width: 400,
    TABLA: '',
    ID_TABLA: 0,
    autoScroll: true,
    opcion: '',
    verReporte: null,
    tamano: 200,
    initComponent: function () {
        var me = this;
        me.store = Ext.create('App.Store.Imagenes.Imagenes');
        if (me.opcion == '') {
            me.store.setExtraParams({ TABLA: me.TABLA, ID_TABLA: me.ID_TABLA });
        }
        else if (me.opcion == 'Tablas') {
            //me.store.setExtraParams({ TABLA: me.TABLA, ID_TABLA: me.ID_TABLA });
        }
        me.direccion = Constantes.HOST + '' + Constantes.URLIMAGEN;
        me.tpl = [
       //'<div class="details">',
           '<tpl for=".">',
               '<div class="thumb-wrap">',
                   '<div class="thumb">',
                   (!Ext.isIE6 ? '<img src="' + me.direccion + 'id={ID_IMG}&tamano=' + me.tamano + '" />' :
                   '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + me.direccion + 'id={ID_IMG}&tamano=' + me.tamano + '\')"></div>'),
                   '</div>',
                   '<span>{DESCRIPCION}</span>',
               '</div>',
           '</tpl>'
       // '</div>'
        ];
        //if (verReporte 1 null) {
        me.on('selectionchange', me.onIconSelect, me);
        //}
        this.callParent(arguments);
    },
    onIconSelect: function (dataview, selections) {
        var me = this;
        console.log(me);
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
            var btn = Ext.create('Ext.Button', {
                iconCls: 'cross',
                tooltip: 'eliminar',
                text: 'Eliminar Imagen',
            });

            var win = Ext.create("App.Config.Abstract.Window", {
                height: 550,
                width: 800,
                destruirWin: true,
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top', // Toolbar en la parte superior
                    items: [
                         {
                             xtype: 'button',
                             text: 'Eliminar <br>Imagen ',
                             cls: 'btn-primary',
                             scale: 'large',
                             margin: '0 10 0 10',
                             iconCls: 'contenedor-de-basura',
                             colspan: 1,
                             width: 150,
                             height: 40,
                             //scope : me,
                             listeners: {
                                 click: function () {
                                     me.EliminarImagen(id, win)
                                 }
                             }
                         },
                         {
                             xtype: 'button',
                             text: 'Descargar <br>Imagen ',
                             cls: 'btn-primary',
                             scale: 'large',
                             margin: '0 10 0 10',
                             iconCls: 'adjunto-archivo',
                             colspan: 1,
                             width: 150,
                             height: 40,
                             listeners: {
                                 click: function () {
                                     me.DescargarImagen(id)
                                 }
                             }
                         },

                    ]
                }]

            });
            var wrappedImage = Ext.create('Ext.Img', {

                src: Constantes.getUrlImagen() + 'id=' + id + '&tamano=500',

            });


            win.addDocked(slider);
            win.add(wrappedImage);

            win.show();
            slider.on('changecomplete', function (sl, newValue, thumb, eOpts) {
                var h = 500 + (newValue * 10);
                wrappedImage.setSize(h, h);
                wrappedImage.setSrc(Constantes.getUrlImagen(true) + 'id=' + id + '&tamano=' + h);
                //alert(wrappedImage.getSize().width);

            });
        }
    },
    CargarImagen: function (ID_TABLA, TABLA) {
        var me = this;
        TABLA = TABLA == null ? me.TABLA : TABLA;
        ID_TABLA = ID_TABLA == null ? me.ID_TABLA : ID_TABLA;
        me.store.setExtraParams({ ID_TABLA: ID_TABLA, TABLA: TABLA });
        me.store.load();
    },
    EliminarImagen: function (id, win) {
        var me = this;
        Ext.MessageBox.confirm('Confirmacion?', 'Esta Seguro de Eliminar la Image', function (btn) {
            if (btn == 'yes') {
                win.close();
                fn.getRequest("Imagenes", "EliminarImagen", "POST", { ID_IMG: id }).then({
                    success: function (res) {
                        console(res);
                       
                        me.store.load();
                        me.refresh();
                        win.close();


                    },
                    failure: function (errorMessage) {
                        console.log(errorMessage);
                    }
                }).always(function () {
                    console.log('finalizo123');
                });

                //me.setLoading(true);
                //Ext.suspendLayouts();
                //fn.getRequest("Imagenes", "EliminarImagen", "POST", { ID_IMG: id }).then({
                //    success: function (res) {
                //        Ext.MessageBox.alert('Exito', res.msg, function () {
                //            var record = me.store.findRecord('ID_IMG', id);
                //            if (record) {
                //                me.store.remove(record); // Eliminar el registro del store
                //            }

                //            // Opcionalmente recargar el store
                //            // me.store.load();

                //            // Cerrar y destruir la ventana
                //            win.destroy();

                //            // Reanudar los diseños después de realizar todas las acciones
                //            Ext.resumeLayouts(true);


                //        });



                //    },
                //    failure: function (errorMessage) {
                //        Ext.Msg.alert("Error", errorMessage);
                //        Ext.resumeLayouts(true); // Reanudar en caso de error también
                //    }
                //}).always(function () {
                //     me.setLoading(false);
                //});
            }
        });




    },
    DescargarImagen: function (id) {
        console.log("DescargarImagen");
        console.log(id);

        var urlImagen = Constantes.getUrlImagen() + 'id=' + id + '&tamano=1000'; // URL de la imagen

        // Crear un enlace temporal para forzar la descarga
        var enlaceDescarga = document.createElement('a');
        enlaceDescarga.href = urlImagen;
        enlaceDescarga.download = 'imagen_descargada.jpg'; // Nombre del archivo descargado

        // Añadir el enlace al DOM, hacer clic en él y luego eliminarlo
        document.body.appendChild(enlaceDescarga);
        enlaceDescarga.click();
        document.body.removeChild(enlaceDescarga);

    }
});