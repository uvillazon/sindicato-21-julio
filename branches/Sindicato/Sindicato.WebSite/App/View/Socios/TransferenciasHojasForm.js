Ext.define("App.View.Socios.TransferenciasHojasForm", {
    extend: "App.Config.Abstract.Form",
    columns: 2,
    record: '',
    title: 'Datos de Transferencias de Hojas',
    Eventos: true,
    modoConsulta: false,
    paramsStore: {},
    controller: 'App.Controller.Socios.TransferenciasHojasFormController',
    initComponent: function () {
        var me = this;
        me.store_to_socio = Ext.create('App.Store.Socios.Socios');
        me.store_from_socio = Ext.create('App.Store.Socios.Socios');
        me.items = [
            {
                xtype: 'TextFieldBase',
                fieldLabel: "Nro. Transferencia",
                name: "ID_TRANSF",
                readOnly: true
            },
            {
                xtype: 'DateFieldBase',
                fieldLabel: "Fecha",
                name: "FECHA_REG",
                readOnly: true,
                value: new Date()
            },
            {
                xtype: 'comboboxAuto',
                fieldLabel: "Transferir De",
                itemId: 'cbxToSocio',
                name: "TO_SOCIO_MOVIL",
                displayField: 'NRO_MOVIL',
                valueField: 'ID_SOCIO_MOVIL',
                store: me.store_to_socio,
                afterLabelTextTpl: Constantes.REQUERIDO,
                allowBlank: false,
                textoTpl: function () { return "Nro Movil :{NRO_MOVIL} - {NOMBRE} {APELLIDO_PATERNO} {APELLIDO_MATERNO}" }
            },
            {
                xtype: 'TextFieldBase',
                fieldLabel: "Nro. Movil",
                name: "NRO_MOVIL",
                afterLabelTextTpl: Constantes.REQUERIDO,
                allowBlank: false,
                readOnly: true,
            },
            {
                xtype: 'TextFieldBase',
                fieldLabel: "Socio",
                name: "SOCIO",
                colspan: 2,
                width: 480,
                afterLabelTextTpl: Constantes.REQUERIDO,
                allowBlank: false,
                readOnly: true,
            },
             {
                 xtype: 'TextFieldBase',
                 fieldLabel: "Cantidad Hojas",
                 name: "CANTIDAD",
                 afterLabelTextTpl: Constantes.REQUERIDO,
                 allowBlank: false,
                 readOnly: true,
             },
              {
                  xtype: 'TextFieldBase',
                  fieldLabel: "Importe Total",
                  name: "IMPORTE_TOTAL",
                  afterLabelTextTpl: Constantes.REQUERIDO,
                  allowBlank: false,
                  readOnly: true,
              },
              {
                  xtype: 'TextFieldBase',
                  fieldLabel: "Importe Ahorro",
                  name: "IMPORTE_AHORRRO",
                  afterLabelTextTpl: Constantes.REQUERIDO,
                  allowBlank: false,
                  colspan: 2,
                  readOnly: true,
              },
              {
                  xtype: 'comboboxAuto',
                  fieldLabel: "Transferir A",
                  name: "FROM_SOCIO_MOVIL",
                  itemId: 'cbxFromSocio',
                  width: 480,
                  colspan: 2,
                  displayField: 'NRO_MOVIL',
                  valueField: 'ID_SOCIO_MOVIL',
                  store: me.store_from_socio,
                  afterLabelTextTpl: Constantes.REQUERIDO,
                  allowBlank: false,
                  textoTpl: function () { return "Nro Movil :{NRO_MOVIL} - {NOMBRE} {APELLIDO_PATERNO} {APELLIDO_MATERNO}" }
              }, {
                  xtype: 'TextArea',
                  fieldLabel: "Observacion",
                  name: "OBSERVACION",
                  width: 480,
                  colspan: 2,
              },
              {
                  xtype: 'label',
                  html: 'NOTA:todas las hojas pasaran al movil seleccionado mas sus ahorros',
                  style: {
                      'font-weight': 'bold',
                      'font-size': '13px',
                      'textAlign': 'center',
                      'color': 'red'
                  },
                  width: 480,
                  colspan: 2
              }
        ];
        this.callParent(arguments);


    },
});
