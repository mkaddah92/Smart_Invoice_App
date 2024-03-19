sap.ui.define([
	'sap/ui/core/mvc/ControllerExtension',
	'sap/ui/core/Fragment'
	],
	function (ControllerExtension,Fragment) {
	'use strict';

	return ControllerExtension.extend('SmartInvoiceApp.SmartInvoiceApp.ext.controller.ListReportExt', {
		onCreateInvoice: function(oEvent) {

            const that = this;
            //this.resetAppointmentModel();
 
            if (!this._oDialog) {
 
                this._oDialog = Fragment.load({
                    id:"idFragInvoiceCreate",
                    name:"SmartInvoiceApp.SmartInvoiceApp.ext.CreateInvoice",
                    controller: this
                });
 
                this._oDialog.then(function(oDialog){
                    that.base.getExtensionAPI().addDependent(oDialog);
                    oDialog.open();
                });
            }else{
                this._oDialog.then(function(oDialog){
                    oDialog.open();
                });
            }
        },
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf SmartInvoiceApp.SmartInvoiceApp.ext.controller.ListReportExt
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			}
		}
	});
});
