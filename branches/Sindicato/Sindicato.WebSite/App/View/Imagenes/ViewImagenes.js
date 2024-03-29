﻿/**
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
    tamano : 200,
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
                   (!Ext.isIE6 ? '<img src="' + me.direccion + 'id={ID_IMG}&tamano='+me.tamano+'" />' :
                   '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + me.direccion + 'id={ID_IMG}&tamano='+me.tamano+'\')"></div>'),
                   '</div>',
                   '<span>{DESCRIPCION}</span>',
               '</div>',
           '</tpl>'
       // '</div>'
        ];
        //if (verReporte 1 null) {
        me.on('selectionchange', me.onIconSelect, this);
        //}
        this.callParent(arguments);
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
            var win = Ext.create("App.Config.Abstract.Window", {
                height: 550,
                width: 800,
                destruirWin: true
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
    }
});