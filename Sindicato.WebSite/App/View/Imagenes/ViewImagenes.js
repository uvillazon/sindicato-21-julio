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
    autoScroll: true,
    opcion: '', 
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
                   (!Ext.isIE6 ? '<img src="' + me.direccion + 'id={ID_IMG}&tamano=200" />' :
                   '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + me.direccion + 'id={ID_IMG}&tamano=200\')"></div>'),
                   '</div>',
                   '<span>{DESCRIPCION}</span>',
               '</div>',
           '</tpl>'
       // '</div>'
        ];
        this.callParent(arguments);
    }
});