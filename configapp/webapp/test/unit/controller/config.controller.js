/*global QUnit*/

sap.ui.define([
	"configapp/controller/config.controller"
], function (Controller) {
	"use strict";

	QUnit.module("config Controller");

	QUnit.test("I should test the config controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
