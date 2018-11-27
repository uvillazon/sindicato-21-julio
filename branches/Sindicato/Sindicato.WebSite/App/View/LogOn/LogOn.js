/* File Created: August 4, 2013 */
Ext.onReady(function () {
    Ext.QuickTips.init();

    // Create a variable to hold our EXT Form Panel. 
    // Assign various config options as seen.	 
    var login = new Ext.FormPanel({
        labelWidth: 80,
        url: 'login.asp',
        frame: true,
        layout: {
            type: 'table',
            columns: 2
        },
        title: 'Ingrese su usuario y contraseña',
        defaultType: 'textfield',
        monitorValid: true,
        // Specific attributes for the text fields for username / password. 
        // The "name" attribute defines the name of variables sent to the server.
        items: [
            {
                xtype: 'image',
                rowspan: 3,
                src:  '/Content/images/toyota.png'
            },
            {
            itemId: 'loginField',
            fieldLabel: 'Usuario',
            name: 'loginUsername',
            allowBlank: false
        }, {
            fieldLabel: 'Contraseña',
            name: 'loginPassword',
            inputType: 'password',
            allowBlank: false
        }],

        // All the magic happens after the user clicks the button     
        buttons: [{
            text: 'Login',
            formBind: true,
            // Function that fires when user clicks the button 
            handler: submit
        }], listeners: {
            afterRender: function (thisForm, options) {
                this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
                    enter: submit,
                    scope: this
                });
            }
        }
    });


    // This just creates a window to wrap the login form. 
    // The login object is passed to the items collection.       
    var win = new Ext.Window({
        layout: 'fit',
        width: 550,
        height: 250,
        closable: false,
        resizable: false,
        plain: true,
        border: false,
        items: [login]
    });
    win.show();
    login.down('#loginField').focus(false, 200);

    function submit() {
        login.getForm().submit({
            method: 'POST',
            url: 'LogOn',
            waitTitle: 'Conectando',
            waitMsg: 'Verificando credenciales...',

            // Functions that fire (success or failure) when the server responds. 
            // The one that executes is determined by the 
            // response that comes from login.asp as seen below. The server would 
            // actually respond with valid JSON, 
            // something like: response.write "{ success: true}" or 
            // response.write "{ success: false, errors: { reason: 'Login failed. Try again.' }}" 
            // depending on the logic contained within your server script.
            // If a success occurs, the user is notified with an alert messagebox, 
            // and when they click "OK", they are redirected to whatever page
            // you define as redirect. 

            success: function () {
                //Ext.Msg.alert('Status', 'Login Successful!', function (btn, text) {
                //    if (btn == 'ok') {
                //var redirect = 'http://elfpre02/SisMan/';
                var redirect = '/';
                window.location = redirect;
                win.hide();
                //    }
                //});
            },

            // Failure function, see comment above re: success and failure. 
            // You can see here, if login fails, it throws a messagebox
            // at the user telling him / her as much.  

            failure: function (form, action) {
                var razon = action.result;
                Ext.Msg.alert('Error en el acceso!', razon.msg);
                login.getForm().reset();
            }
        });
    }
});