define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",

    "dojo/_base/lang",
    "PayjpWidget/lib/jquery-1.11.2"


], function (declare, _WidgetBase, lang, _jQuery) {
    "use strict";

    var $ = _jQuery.noConflict(true);

    return declare("PayjpWidget.widget.PayjpWidget", [ _WidgetBase ], {


        // Internal variables.
        _handles: null,
        _contextObj: null,

        constructor: function () {
            this._handles = [];
        },

        postCreate: function () {
            logger.debug(this.id + ".postCreate");
            this._insertPayjp();

        },

        update: function (obj, callback) {
            logger.debug(this.id + ".update");

            window.payjp_on_card_created = this._on_card_created;
            window.payjp_token_name = this.token;

            this._contextObj = obj;
            window._contextObj = obj;
            callback();
        },

        _insertPayjp: function () {
            logger.debug(this.id + "._insertPayjp");
            var a = document.createElement("script");
            var m = document.getElementById(this.id);
            a.charset = "UTF-8";
            a.type = "text/javascript";
            a.src = "https://checkout.pay.jp/";
            a.setAttribute("class", "payjp-button");
            a.setAttribute("data-key", this.key);
            a.setAttribute("data-text", this.text);
            a.setAttribute("data-submit-text", this.submittext);
            a.setAttribute("data-partial", "true");
            a.setAttribute("data-on-created", "payjp_on_card_created");
            m.parentNode.insertBefore(a, m);
        },

        _on_card_created: function (data) {
            logger.debug(this.id + "._on_card_created");
            logger.debug(window.payjp_token_name);
            logger.debug(data.id);
            window._contextObj.set(window.payjp_token_name, data.id);
        },

    });
});

require(["PayjpWidget/widget/PayjpWidget"]);
