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
		_uploadData : function (oData) {
			// const oExternalizedData = this._externalizeData(oData)
			// const sUrl = '/sap/sports/fnd/appsvc/uploadTeamMembers/services/rest/uploadTeamMembers'
			// jQuery.ajax({
			// 	url: sUrl,
			// 	type: 'POST',
			// 	contentType: 'application/json; charset=UTF-8',
			// 	data: JSON.stringify(oExternalizedData)
			// }).done(this.runIfOwned(data => {
			// // show success message
			// 	const sSuccessMsg = this.i18nModel.getResourceBundle().getText('SUCCESS_MSG')
			// 	MessageBox.success(sSuccessMsg)
			// })).fail(function (jqXHR) {
			// 	sap.ui.getCore().getEventBus().publish('ProSports', 'Error', jqXHR)
			// })
			const that = this;
            
			let sActionName = "sapHubTrackerService.EntityContainer/createAppointment";
			let mParameters = {};
			let editFlow = this.base.getExtensionAPI().getEditFlow();
			editFlow.invokeAction(sActionName, mParameters)
				.then(function(oResponse) {
					that.base.getExtensionAPI().refresh();
					that._oDialog.then(function(oDialog){
						oDialog.close();
					});
					//MessageToast.show(that.getModel('i18n')._oResourceBundle.getText('createSuccessful'));
					// that.base.editFlow.getInternalRouting()
					// 	.navigateToRoute("AppointmentsDetailsPageDraft", {
					// 		appointment: oResponse.value
					// 	}, true);
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
