sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
    'sap/ui/Device',
    "sap/ui/model/json/JSONModel",
	"sap/ui/webc/main/Toast",
    "sap/ui/core/Element",
    "sap/ui/core/mvc/Controller",
    "sap/ui/layout/HorizontalLayout",
    "sap/ui/layout/VerticalLayout",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Label",
    "sap/m/library",
    "sap/m/Text",
    "sap/m/TextArea",
    'sap/ui/Device'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Device,JSONModel, Toast) {
        "use strict";

        return Controller.extend("configapp.controller.config", {
            //onInit: function () {

            //},
            onAvatarPressed: function () {
                MessageToast.show("Avatar pressed!");
            },

            onLogoPressed: function () {
                MessageToast.show("Logo pressed!");
            },

/*             _handleMediaChange: function () {
                var rangeName = Device.media.getCurrentRange("StdExt").name;

                switch (rangeName) {
                    // Shell Desktop
                    case "LargeDesktop":
                        this.byId("configuration").setVisible(true);
                        this.byId("spacer").setVisible(true);
                        MessageToast.show("Screen width is corresponding to Large Desktop");
                        break;

                    // Tablet - Landscape
                    case "Desktop":
                        this.byId("configuration").setVisible(true);
                        this.byId("spacer").setVisible(true);
                        MessageToast.show("Screen width is corresponding to Desktop");
                        break;

                    default:
                        break;
                }
            }, */

            onInit: function () {
                /* Device.media.attachHandler(this._handleMediaChange, this);
                this._handleMediaChange(); */

                var oModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/mock/products.json"));
                this.getView().setModel(oModel);

            },

            onExit: function () {
                Device.media.detachHandler(this._handleMediaChange, this);
            },
            onSegmentedButtonPress: function (oEvent) {
                var sSelectedKey = oEvent.getParameter("id");
                var oView = this.getView();
                console.log(sSelectedKey);

                // Get references to your input fields
                var oInput1 = oView.byId("name1");
                var oInput2 = oView.byId("name2");
                var oInput3 = oView.byId("name3");
                var oInput4 = oView.byId("name4");
                /* [oInput1, oInput2, oInput3, oInput4].forEach(function(input) {
                    input.setVisible(false);
                }); */
                
                // Show the input based on the selected key
                if (sSelectedKey == "__xmlview0--option1") {
                    oInput1.setVisible(true);
                    oInput2.setVisible(false);
                    oInput3.setVisible(false);
                    oInput4.setVisible(false);
                } else if (sSelectedKey == "__xmlview0--option2") {
                    oInput2.setVisible(true);
                    oInput4.setVisible(true);
                    oInput1.setVisible(false);
                    oInput3.setVisible(false);
                } else if (sSelectedKey == "__xmlview0--option3") {
                    oInput2.setVisible(true);
                    oInput3.setVisible(true);
                    oInput4.setVisible(true);
                    oInput1.setVisible(false);
                }
            },onPhoneSelectChange: function(oEvent) {
                var sSelectedKey = oEvent.getParameter("selectedItem").getKey();
                var oView = this.getView();
                
                console.log(sSelectedKey);

                // Get references to your input fields
                var oInput1 = oView.byId("phone1");
                var oInput2 = oView.byId("phone2");
                
                // Hide all inputs first
                oInput1.setVisible(false);
                oInput2.setVisible(false);
            
                // Show the input based on the selected key
                if (sSelectedKey === "Phone1") {
                    oInput1.setVisible(true);
                    oInput2.setVisible(false);
                } else if (sSelectedKey === "Phone2") {
                    oInput2.setVisible(true);
                    oInput1.setVisible(true);
                }
            },

            onSegmentedButtonPress2: function (oEvent) {
                var sSelectedKey2 = oEvent.getParameter("id");
                var oView = this.getView();
                console.log(sSelectedKey2);
            
                // Get references to your input fields
                var oInput1 = oView.byId("Date1"); // Date and Time
                var oInput2 = oView.byId("Date2"); // DateTime
            
                // Show the input based on the selected key
                if (sSelectedKey2 === "__xmlview0--option_2") {
                    oInput2.setVisible(false);
                    oInput1.setVisible(true);
                } else if (sSelectedKey2 === "__xmlview0--option_1") {
                    oInput1.setVisible(false);
                    oInput2.setVisible(true);
                }
            },

            handleUploadComplete: function(oEvent) {
                var sResponse = oEvent.getParameter("response"),
                    iHttpStatusCode = parseInt(/\d{3}/.exec(sResponse)[0]),
                    sMessage;
    
                if (sResponse) {
                    sMessage = iHttpStatusCode === 200 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
                    MessageToast.show(sMessage);
                }
            },
    
            handleUploadPress: function() {
                var oFileUploader = this.byId("fileUploader");
                if (!oFileUploader.getValue()) {
                    MessageToast.show("Choose a file first");
                    return;
                }
                console.log(oFileUploader.getMetadata());
                console.log()
                oFileUploader.checkFileReadable().then(function() {
                    oFileUploader.upload();
                }, function(error) {
                    MessageToast.show("The file cannot be read. It may have changed.");
                }).then(function() {
                    oFileUploader.clear();
                });
            },
            
    
            handleTypeMissmatch: function(oEvent) {
                var aFileTypes = oEvent.getSource().getFileType();
                aFileTypes.map(function(sType) {
                    return "*." + sType;
                });
                MessageToast.show("The file type *." + oEvent.getParameter("fileType") +
                                        " is not supported. Choose one of the following types: " +
                                        aFileTypes.join(", "));
            },
    
            handleValueChange: function(oEvent) {
                MessageToast.show("Press 'Upload File' to upload file '" +
                                        oEvent.getParameter("newValue") + "'");
                                    
            }

        });
    });
