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
    function (Controller, MessageToast, Device, JSONModel, Toast, Dialog, Button, mobileLibrary,Text,TextArea) {
        "use strict";
        // shortcut for sap.m.ButtonType
        var ButtonType = mobileLibrary.ButtonType;

        // shortcut for sap.m.DialogType
        var DialogType = mobileLibrary.DialogType;

        var nameKey = "fullname";

        var phone = "1phone";


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

          /*   onInit: function () {
                /* Device.media.attachHandler(this._handleMediaChange, this);
                this._handleMediaChange(); 

                var oModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/mock/products.json"));
                this.getView().setModel(oModel);

            }, */

            /* onExit: function () {
                Device.media.detachHandler(this._handleMediaChange, this);
            } 
            ,*/
            onSegmentedButtonPress: function (oEvent) {
                var sSelectedKey = oEvent.getParameter("id");
                var oView = this.getView();
                console.log(sSelectedKey);

                // Get references to your input fields
                var name1 = oView.byId("name1");
                var name2 = oView.byId("name2");
                var name3 = oView.byId("name3");
                var name4 = oView.byId("name4");
                /* [name1, name2, name3, name4].forEach(function(input) {
                    input.setVisible(false);
                }); */

                // Show the input based on the selected key
                if (sSelectedKey == "__xmlview0--option1") {
                    name1.setVisible(true);
                    name2.setVisible(false);
                    name3.setVisible(false);
                    name4.setVisible(false);
                    nameKey = "fullname";
                } else if (sSelectedKey == "__xmlview0--option2") {
                    name2.setVisible(true);
                    name4.setVisible(true);
                    name1.setVisible(false);
                    name3.setVisible(false);
                    nameKey = "doublename";
                } else if (sSelectedKey == "__xmlview0--option3") {
                    name2.setVisible(true);
                    name3.setVisible(true);
                    name4.setVisible(true);
                    name1.setVisible(false);
                    nameKey = "triplename";
                }
                console.log(nameKey);
            }, 
            onPhoneSelectChange: function (oEvent) {
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
                    phone="1phone";
                } else if (sSelectedKey === "Phone2") {
                    oInput2.setVisible(true);
                    oInput1.setVisible(true);
                    phone="2phones";

                }
                console.log(phone);
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

            handleUploadComplete: function (oEvent) {
                var sResponse = oEvent.getParameter("response"),
                    iHttpStatusCode = parseInt(/\d{3}/.exec(sResponse)[0]),
                    sMessage;

                if (sResponse) {
                    sMessage = iHttpStatusCode === 200 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
                    MessageToast.show(sMessage);
                }
            },

            handleUploadPress: function () {
                var oFileUploader = this.byId("fileUploader");
                if (!oFileUploader.getValue()) {
                    MessageToast.show("Choose a file first");
                    return;
                }
                console.log(oFileUploader.getMetadata());
                console.log()
                oFileUploader.checkFileReadable().then(function () {
                    oFileUploader.upload();
                }, function (error) {
                    MessageToast.show("The file cannot be read. It may have changed.");
                }).then(function () {
                    oFileUploader.clear();
                });
            },
            
            handleTypeMissmatch: function (oEvent) {
                var aFileTypes = oEvent.getSource().getFileType();
                aFileTypes.map(function (sType) {
                    return "*." + sType;
                });
                MessageToast.show("The file type *." + oEvent.getParameter("fileType") +
                    " is not supported. Choose one of the following types: " +
                    aFileTypes.join(", "));
            },

            handleValueChange: function (oEvent) {
                MessageToast.show("Press 'Upload File' to upload file '" +
                    oEvent.getParameter("newValue") + "'");

            },
            SubmitButton: function () {
                //for popup 
                /* if (!this.oApproveDialog) {
                    this.oApproveDialog = new Dialog({
                        type: DialogType.Message,
                        title: "Confirm",
                        content: new Text({ text: "Do you want to submit this order?" }),
                        beginButton: new Button({
                            type: ButtonType.Emphasized,
                            text: "Submit",
                            press: function () {
                                MessageToast.show("Submit pressed!");
                                this.oApproveDialog.close();
                            }.bind(this)
                        }),
                        endButton: new Button({
                            text: "Cancel",
                            press: function () {
                                this.oApproveDialog.close();
                            }.bind(this)
                        })
                    });
                }

                this.oApproveDialog.open();
 */
                //for generating Json payload
                // Get the input values
                 var sAppName = this.getView().byId("appname").getValue();
                var sFullName = this.getView().byId("1").getValue();
                var sFirstName = this.getView().byId("2").getValue();
                var sMiddleName = this.getView().byId("3").getValue();
                var sLastName = this.getView().byId("4").getValue();
                var sEmail = this.getView().byId("5").getValue();
                var phone_1 = this.getView().byId("ph1").getValue();
                var phone_2 = this.getView().byId("ph2").getValue();
                var address = this.getView().byId("address").getValue();
                var country = this.getView().byId("country").getValue();
                var country_code = this.getView().byId("country_code").getValue();
                var zip = this.getView().byId("zip").getValue();
                // Construct JSON object
                 var oData = {
                    "Application": {
                        "AppName": sAppName
                    },
                    "Customer": {
                        "name" : nameKey,
                        "FullName": sFullName,
                        "FirstName": sFirstName,
                        "MiddleName": sMiddleName,
                        "LastName": sLastName,
                        "Email": sEmail,
                        "phone" : phone,
                        "phone1": phone_1,
                        "phone2": phone_2,
                        "address": address,
                        "country": country,
                        "country_code": country_code,
                        "zip": zip
                    }
                }; 
                // Convert JSON object to string
                 var sJSON = JSON.stringify(oData);
                console.log(sJSON);
                var destinationName = "yourCPI_Destination";
                fetch("https://848efe0ctrial-trial.integrationsuitetrial-apim.us10.hana.ondemand.com/848efe0ctrial/configapp", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: sJSON,
                })
                    .then(function (response) {
                        if (!response.ok) {
                            // Handle errors
                            console.error("Error sending data to CPI:", response.statusText);
                            return;
                        }
                        // Handle successful response (e.g., show success message)
                        console.log("Data sent to CPI successfully!");
                    }) 
                // Send data to SAP CPI
                /* jQuery.ajax({
                    url: 'https://848efe0ctrial-trial.integrationsuitetrial-apim.us10.hana.ondemand.com/848efe0ctrial/configapp', // Replace this with your SAP CPI endpoint
                    type: 'POST',
                    contentType: 'application/json',
                    data: sJSON,
                    success: function (response) {
                        // Handle success
                        console.log('Data sent successfully');
                    },
                    error: function (xhr, status, error) {
                        // Handle error
                        console.error('Error sending data:', error);
                    }
                }); */


            }

        });
    });
