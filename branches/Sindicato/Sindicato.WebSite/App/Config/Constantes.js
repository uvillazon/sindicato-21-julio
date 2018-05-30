/**
 * @class App.Config.Constantes
 * @extends 
 * @autor Ubaldo Villazon
 * @date 23/07/2013
 *
 * Variables Globales Comunes 
 *
 **/
Ext.define("App.Config.Constantes", {
    alternateClassName: ["Constantes", "Lista"],
    singleton: true,
    /* Aqui Defino todas mis contanstantes */
    HOST: 'http://localhost:23532/',
//    HOST : 'http://200.58.79.49/Sistema/',
    //HOST                : 'http://elfpre02/SisMan/',
    REQUERIDO: '<span style="color:red;font-weight:bold" data-qtip="Requerido">*</span>',
    PIEPAGINA: '<font color="black"><h2  style="font-size:12px;height:14px">Copyright &copy;   ' + Ext.Date.format(new Date(), 'Y') + '  -  Version 2.0</h2></font>',
    ALTO: 660,
    MAXANCHO: 1024,
    MAXALTO: 660,
    ICONO_CREAR: 'application_form_add',
    ICONO_EDITAR: 'application_form_edit',
    ICONO_BAJA: 'application_form_delete',
    ICONO_VER: 'application_view_detail',
    ICONO_IMPRIMIR: 'printer',
    LiSTAS: null,
    URLLISTAS: 'Listas/ObtenerTodasLasListas',
    URLIMAGEN: "Imagenes/VerImagen?",
    CONFIG_PRECIO_VENTA_GAS: 3.74,
    CONFIG_PRECIO_VENTA_DIS: 3.72,
    CONFIG_PRECIO_COSTO_GAS: 3.52,
    CONFIG_PRECIO_COSTO_DIS: 3.54,
    CONFIG_CUENTA_VENTA: 1,
    CONFIG_DIAS_AUTOS_REEMPLAZO : 30,
    UnidadesRequeridas: function (unidad, requerido) {
        if (requerido) {
            return '<span style="color:red;font-weight:bold" data-qtip="Requerido">*</span><span style="color:blue" data-qtip="Requerido">[' + unidad + ']</span>';
        }
        else {
            return '<span style="color:blue" data-qtip="' + unidad + '">[' + unidad + ']</span>';
        }
    },
    CargarCssEstados: function (estado, tipo) {
        if (tipo == 'DESCUENTO') {
            if (estado == 'NUEVA') return 'SMNueva';
            else if (estado == 'RECH_INSP') return 'SMRech_Insp';
            else if (estado == 'APROBADO') return 'SMAprobada';
            else if (estado == 'ANULADO') return 'OTAsignada';
            else if (estado == 'APR_JF_MN') return 'SMApr_Jf_Mn';
            else if (estado == 'DEBITADO') return 'SMCon_Ot';
            else if (estado == 'CERRADA') return 'SMCerrada';
            return '';
        }
        else if (tipo == 'VENTAS') {
            if (estado == 'NUEVO') return 'OTNueva';
            else if (estado == 'ANULADO') return 'OTAsignada';
            else if (estado == 'APROBADO') return 'SMCon_Ot';
            else if (estado == 'CERRADO') return 'OTCerrada';
            //else if (estado == 'CON_OIT') return 'AmarilloFuerte';
        }
        else if (tipo == 'PRESTAMOS') {
            if (estado == 'MORA') return 'OTAsignada';
            else if (estado == 'CANCELADO') return 'SMCon_Ot';
            else if (estado == 'CON_PAGOS') return 'SMNueva';
            else if (estado == 'CERRADO') return 'OTCerrada';
            //else if (estado == 'CON_OIT') return 'AmarilloFuerte';
        }
        else if (tipo == 'PERMISOS') {
            if (estado == 'ANULADO') return 'OTAsignada';
          
            //else if (estado == 'CON_OIT') return 'AmarilloFuerte';
        }
        else {
            return '';
        }
    },
    Buscar: function (lista) {
        var idLista = 0;
        Ext.each(this.LiSTAS, function (item) {
            if (lista == item.LISTA) {
                idLista = item.ID_LISTA;
                return false;
            }
        });
        return idLista;
    },
    getUrlImagen: function (http) {
        if (http != null) {
            return 'http://localhost:50684/' + Constantes.URLIMAGEN;
        }
        else {
            return Constantes.HOST + '' + Constantes.URLIMAGEN;
        }
    },
    CargarTamano: function () {
        this.ALTO = document.documentElement.clientHeight - 110;
        this.MAXALTO = document.documentElement.clientHeight - 30;
        this.MAXANCHO = document.documentElement.clientWidth - 30;
        this.BTNANCHO = (document.documentElement.clientWidth - 100) / 6;
        this.BTNALTO = (document.documentElement.clientHeight - 100) / 6;
    },
    CargarPrecios: function (GAS, DIE) { 
        this.CONFIG_PRECIO_VENTA_GAS = GAS.PRECIO_VENTA;
        this.CONFIG_PRECIO_VENTA_DIS = DIE.PRECIO_VENTA;
        this.CONFIG_PRECIO_COSTO_GAS = GAS.PRECIO_COMPRA;
        this.CONFIG_PRECIO_COSTO_DIS = DIE.PRECIO_COMPRA;
    }
});