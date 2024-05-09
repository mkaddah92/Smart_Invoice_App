sap.ui.define([
	'sap/ui/core/mvc/ControllerExtension',
	'sap/ui/core/Fragment',
	'sap/m/MessageBox',
	'sap/m/MessageToast'
	],
	function (ControllerExtension,Fragment,MessageBox,MessageToast) {
	'use strict';

	return ControllerExtension.extend('SmartInvoiceApp.SmartInvoiceApp.ext.controller.ListReportExt', {
//https://github.tools.sap/sports/sports-one-ui/blob/06bdc44e3af17998d9fc924b44227bd4c82b89af/src/sap/sports/fnd/ui/uploadTeamMembers/view/Dialog.controller.js
		_uploadData : function (payload) {

			const that = this;
            let editFlow = this.base.getExtensionAPI().getEditFlow();

			let sActionName = "Smart_Invoice_AppService.EntityContainer/createInvoice";
			let mParameters = {
				parameterValues: [
					{ name: "file", value: btoa(payload) }
				],
				context: editFlow.getView().getBindingContext(),
				model: editFlow.getView().getModel(),
				label: 'Confirm',
				skipParameterDialog: true	
			};
			
			editFlow.invokeAction(sActionName, mParameters)
				.then(function(oResponse) {
					that.base.getExtensionAPI().refresh();
					that._oDialog.then(function(oDialog){
						oDialog.close();
					});
				})
		},
		onUploadInvoice: function(oEvent) {
			// this.errorlistModel.setData([])
			const fileUploader = oEvent.getSource()
			const oFiles = oEvent.getParameter('files')
			if (oFiles && oFiles.length > 0) {
				const oFile = oFiles[0]
				const reader = new FileReader()
				// read the file
				reader.onload = function (e) {
				const data = e.target.result
				// reset file uploader path
				fileUploader.clear()
				this._uploadData(data)
			}.bind(this)
				reader.readAsBinaryString(oFile)
			}
		},
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
