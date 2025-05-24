"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var animate_js_1 = require("../../internal/animate.js");
var closeActiveElement_js_1 = require("../../internal/closeActiveElement.js");
var class_map_js_1 = require("lit/directives/class-map.js");
var animation_registry_js_1 = require("../../utilities/animation-registry.js");
var slot_js_1 = require("../../internal/slot.js");
var lit_1 = require("lit");
var localize_js_1 = require("../../utilities/localize.js");
var decorators_js_1 = require("lit/decorators.js");
var event_js_1 = require("../../internal/event.js");
var watch_js_1 = require("../../internal/watch.js");
var component_styles_js_1 = require("../../styles/component.styles.js");
var shoelace_element_js_1 = require("../../internal/shoelace-element.js");
var icon_button_component_js_1 = require("../icon-button/icon-button.component.js");
var alert_styles_js_1 = require("./alert.styles.js");
/**
 * @summary Alerts are used to display important messages inline or as toast notifications.
 * @documentation https://shoelace.style/components/alert
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon-button
 *
 * @slot - The alert's main content.
 * @slot icon - An icon to show in the alert. Works best with `<sl-icon>`.
 *
 * @event sl-show - Emitted when the alert opens.
 * @event sl-after-show - Emitted after the alert opens and all animations are complete.
 * @event sl-hide - Emitted when the alert closes.
 * @event sl-after-hide - Emitted after the alert closes and all animations are complete.
 *
 * @csspart base - The component's base wrapper.
 * @csspart icon - The container that wraps the optional icon.
 * @csspart message - The container that wraps the alert's main content.
 * @csspart close-button - The close button, an `<sl-icon-button>`.
 * @csspart close-button__base - The close button's exported `base` part.
 *
 * @animation alert.show - The animation to use when showing the alert.
 * @animation alert.hide - The animation to use when hiding the alert.
 */
var SlAlert = function () {
    var _a;
    var _classSuper = shoelace_element_js_1.default;
    var _instanceExtraInitializers = [];
    var _base_decorators;
    var _base_initializers = [];
    var _base_extraInitializers = [];
    var _countdownElement_decorators;
    var _countdownElement_initializers = [];
    var _countdownElement_extraInitializers = [];
    var _open_decorators;
    var _open_initializers = [];
    var _open_extraInitializers = [];
    var _closable_decorators;
    var _closable_initializers = [];
    var _closable_extraInitializers = [];
    var _variant_decorators;
    var _variant_initializers = [];
    var _variant_extraInitializers = [];
    var _duration_decorators;
    var _duration_initializers = [];
    var _duration_extraInitializers = [];
    var _countdown_decorators;
    var _countdown_initializers = [];
    var _countdown_extraInitializers = [];
    var _remainingTime_decorators;
    var _remainingTime_initializers = [];
    var _remainingTime_extraInitializers = [];
    var _handleOpenChange_decorators;
    var _handleDurationChange_decorators;
    return _a = /** @class */ (function (_super) {
            __extends(SlAlert, _super);
            function SlAlert() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.autoHideTimeout = __runInitializers(_this, _instanceExtraInitializers);
                _this.hasSlotController = new slot_js_1.HasSlotController(_this, 'icon', 'suffix');
                _this.localize = new localize_js_1.LocalizeController(_this);
                _this.base = __runInitializers(_this, _base_initializers, void 0);
                _this.countdownElement = (__runInitializers(_this, _base_extraInitializers), __runInitializers(_this, _countdownElement_initializers, void 0));
                /**
                 * Indicates whether or not the alert is open. You can toggle this attribute to show and hide the alert, or you can
                 * use the `show()` and `hide()` methods and this attribute will reflect the alert's open state.
                 */
                _this.open = (__runInitializers(_this, _countdownElement_extraInitializers), __runInitializers(_this, _open_initializers, false));
                /** Enables a close button that allows the user to dismiss the alert. */
                _this.closable = (__runInitializers(_this, _open_extraInitializers), __runInitializers(_this, _closable_initializers, false));
                /** The alert's theme variant. */
                _this.variant = (__runInitializers(_this, _closable_extraInitializers), __runInitializers(_this, _variant_initializers, 'primary'));
                /**
                 * The length of time, in milliseconds, the alert will show before closing itself. If the user interacts with
                 * the alert before it closes (e.g. moves the mouse over it), the timer will restart. Defaults to `Infinity`, meaning
                 * the alert will not close on its own.
                 */
                _this.duration = (__runInitializers(_this, _variant_extraInitializers), __runInitializers(_this, _duration_initializers, Infinity));
                /**
                 * Enables a countdown that indicates the remaining time the alert will be displayed.
                 * Typically used to indicate the remaining time before a whole app refresh.
                 */
                _this.countdown = (__runInitializers(_this, _duration_extraInitializers), __runInitializers(_this, _countdown_initializers, void 0));
                _this.remainingTime = (__runInitializers(_this, _countdown_extraInitializers), __runInitializers(_this, _remainingTime_initializers, _this.duration));
                __runInitializers(_this, _remainingTime_extraInitializers);
                return _this;
            }
            Object.defineProperty(SlAlert, "toastStack", {
                get: function () {
                    if (!this.currentToastStack) {
                        this.currentToastStack = Object.assign(document.createElement('div'), {
                            className: 'sl-toast-stack'
                        });
                    }
                    return this.currentToastStack;
                },
                enumerable: false,
                configurable: true
            });
            SlAlert.prototype.firstUpdated = function () {
                this.base.hidden = !this.open;
            };
            SlAlert.prototype.restartAutoHide = function () {
                var _this = this;
                this.handleCountdownChange();
                clearTimeout(this.autoHideTimeout);
                clearInterval(this.remainingTimeInterval);
                if (this.open && this.duration < Infinity) {
                    this.autoHideTimeout = window.setTimeout(function () { return _this.hide(); }, this.duration);
                    this.remainingTime = this.duration;
                    this.remainingTimeInterval = window.setInterval(function () {
                        _this.remainingTime -= 100;
                    }, 100);
                }
            };
            SlAlert.prototype.pauseAutoHide = function () {
                var _b;
                (_b = this.countdownAnimation) === null || _b === void 0 ? void 0 : _b.pause();
                clearTimeout(this.autoHideTimeout);
                clearInterval(this.remainingTimeInterval);
            };
            SlAlert.prototype.resumeAutoHide = function () {
                var _this = this;
                var _b;
                if (this.duration < Infinity) {
                    this.autoHideTimeout = window.setTimeout(function () { return _this.hide(); }, this.remainingTime);
                    this.remainingTimeInterval = window.setInterval(function () {
                        _this.remainingTime -= 100;
                    }, 100);
                    (_b = this.countdownAnimation) === null || _b === void 0 ? void 0 : _b.play();
                }
            };
            SlAlert.prototype.handleCountdownChange = function () {
                if (this.open && this.duration < Infinity && this.countdown) {
                    var countdownElement = this.countdownElement;
                    var start = '100%';
                    var end = '0';
                    this.countdownAnimation = countdownElement.animate([{ width: start }, { width: end }], {
                        duration: this.duration,
                        easing: 'linear'
                    });
                }
            };
            SlAlert.prototype.handleCloseClick = function () {
                this.hide();
            };
            SlAlert.prototype.handleOpenChange = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _b, keyframes, options, _c, keyframes, options;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                if (!this.open) return [3 /*break*/, 3];
                                // Show
                                this.emit('sl-show');
                                if (this.duration < Infinity) {
                                    this.restartAutoHide();
                                }
                                return [4 /*yield*/, (0, animate_js_1.stopAnimations)(this.base)];
                            case 1:
                                _d.sent();
                                this.base.hidden = false;
                                _b = (0, animation_registry_js_1.getAnimation)(this, 'alert.show', { dir: this.localize.dir() }), keyframes = _b.keyframes, options = _b.options;
                                return [4 /*yield*/, (0, animate_js_1.animateTo)(this.base, keyframes, options)];
                            case 2:
                                _d.sent();
                                this.emit('sl-after-show');
                                return [3 /*break*/, 6];
                            case 3:
                                // Hide
                                (0, closeActiveElement_js_1.blurActiveElement)(this);
                                this.emit('sl-hide');
                                clearTimeout(this.autoHideTimeout);
                                clearInterval(this.remainingTimeInterval);
                                return [4 /*yield*/, (0, animate_js_1.stopAnimations)(this.base)];
                            case 4:
                                _d.sent();
                                _c = (0, animation_registry_js_1.getAnimation)(this, 'alert.hide', { dir: this.localize.dir() }), keyframes = _c.keyframes, options = _c.options;
                                return [4 /*yield*/, (0, animate_js_1.animateTo)(this.base, keyframes, options)];
                            case 5:
                                _d.sent();
                                this.base.hidden = true;
                                this.emit('sl-after-hide');
                                _d.label = 6;
                            case 6: return [2 /*return*/];
                        }
                    });
                });
            };
            SlAlert.prototype.handleDurationChange = function () {
                this.restartAutoHide();
            };
            /** Shows the alert. */
            SlAlert.prototype.show = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        if (this.open) {
                            return [2 /*return*/, undefined];
                        }
                        this.open = true;
                        return [2 /*return*/, (0, event_js_1.waitForEvent)(this, 'sl-after-show')];
                    });
                });
            };
            /** Hides the alert */
            SlAlert.prototype.hide = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        if (!this.open) {
                            return [2 /*return*/, undefined];
                        }
                        this.open = false;
                        return [2 /*return*/, (0, event_js_1.waitForEvent)(this, 'sl-after-hide')];
                    });
                });
            };
            /**
             * Displays the alert as a toast notification. This will move the alert out of its position in the DOM and, when
             * dismissed, it will be removed from the DOM completely. By storing a reference to the alert, you can reuse it by
             * calling this method again. The returned promise will resolve after the alert is hidden.
             */
            SlAlert.prototype.toast = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_b) {
                        return [2 /*return*/, new Promise(function (resolve) {
                                _this.handleCountdownChange();
                                if (_a.toastStack.parentElement === null) {
                                    document.body.append(_a.toastStack);
                                }
                                _a.toastStack.appendChild(_this);
                                // Wait for the toast stack to render
                                requestAnimationFrame(function () {
                                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions -- force a reflow for the initial transition
                                    _this.clientWidth;
                                    _this.show();
                                });
                                _this.addEventListener('sl-after-hide', function () {
                                    _a.toastStack.removeChild(_this);
                                    resolve();
                                    // Remove the toast stack from the DOM when there are no more alerts
                                    if (_a.toastStack.querySelector('sl-alert') === null) {
                                        _a.toastStack.remove();
                                    }
                                }, { once: true });
                            })];
                    });
                });
            };
            SlAlert.prototype.render = function () {
                return (0, lit_1.html)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      <div\n        part=\"base\"\n        class=", "\n        role=\"alert\"\n        aria-hidden=", "\n        @mouseenter=", "\n        @mouseleave=", "\n      >\n        <div part=\"icon\" class=\"alert__icon\">\n          <slot name=\"icon\"></slot>\n        </div>\n\n        <div part=\"message\" class=\"alert__message\" aria-live=\"polite\">\n          <slot></slot>\n        </div>\n\n        ", "\n\n        <div role=\"timer\" class=\"alert__timer\">", "</div>\n\n        ", "\n      </div>\n    "], ["\n      <div\n        part=\"base\"\n        class=", "\n        role=\"alert\"\n        aria-hidden=", "\n        @mouseenter=", "\n        @mouseleave=", "\n      >\n        <div part=\"icon\" class=\"alert__icon\">\n          <slot name=\"icon\"></slot>\n        </div>\n\n        <div part=\"message\" class=\"alert__message\" aria-live=\"polite\">\n          <slot></slot>\n        </div>\n\n        ", "\n\n        <div role=\"timer\" class=\"alert__timer\">", "</div>\n\n        ", "\n      </div>\n    "])), (0, class_map_js_1.classMap)({
                    alert: true,
                    'alert--open': this.open,
                    'alert--closable': this.closable,
                    'alert--has-countdown': !!this.countdown,
                    'alert--has-icon': this.hasSlotController.test('icon'),
                    'alert--primary': this.variant === 'primary',
                    'alert--success': this.variant === 'success',
                    'alert--neutral': this.variant === 'neutral',
                    'alert--warning': this.variant === 'warning',
                    'alert--danger': this.variant === 'danger'
                }), this.open ? 'false' : 'true', this.pauseAutoHide, this.resumeAutoHide, this.closable
                    ? (0, lit_1.html)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n              <sl-icon-button\n                part=\"close-button\"\n                exportparts=\"base:close-button__base\"\n                class=\"alert__close-button\"\n                name=\"x-lg\"\n                library=\"system\"\n                label=", "\n                @click=", "\n              ></sl-icon-button>\n            "], ["\n              <sl-icon-button\n                part=\"close-button\"\n                exportparts=\"base:close-button__base\"\n                class=\"alert__close-button\"\n                name=\"x-lg\"\n                library=\"system\"\n                label=", "\n                @click=", "\n              ></sl-icon-button>\n            "])), this.localize.term('close'), this.handleCloseClick) : '', this.remainingTime, this.countdown
                    ? (0, lit_1.html)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n              <div\n                class=", "\n              >\n                <div class=\"alert__countdown-elapsed\"></div>\n              </div>\n            "], ["\n              <div\n                class=", "\n              >\n                <div class=\"alert__countdown-elapsed\"></div>\n              </div>\n            "])), (0, class_map_js_1.classMap)({
                        alert__countdown: true,
                        'alert__countdown--ltr': this.countdown === 'ltr'
                    })) : '');
            };
            return SlAlert;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _base_decorators = [(0, decorators_js_1.query)('[part~="base"]')];
            _countdownElement_decorators = [(0, decorators_js_1.query)('.alert__countdown-elapsed')];
            _open_decorators = [(0, decorators_js_1.property)({ type: Boolean, reflect: true })];
            _closable_decorators = [(0, decorators_js_1.property)({ type: Boolean, reflect: true })];
            _variant_decorators = [(0, decorators_js_1.property)({ reflect: true })];
            _duration_decorators = [(0, decorators_js_1.property)({ type: Number })];
            _countdown_decorators = [(0, decorators_js_1.property)({ type: String, reflect: true })];
            _remainingTime_decorators = [(0, decorators_js_1.state)()];
            _handleOpenChange_decorators = [(0, watch_js_1.watch)('open', { waitUntilFirstUpdate: true })];
            _handleDurationChange_decorators = [(0, watch_js_1.watch)('duration')];
            __esDecorate(_a, null, _handleOpenChange_decorators, { kind: "method", name: "handleOpenChange", static: false, private: false, access: { has: function (obj) { return "handleOpenChange" in obj; }, get: function (obj) { return obj.handleOpenChange; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _handleDurationChange_decorators, { kind: "method", name: "handleDurationChange", static: false, private: false, access: { has: function (obj) { return "handleDurationChange" in obj; }, get: function (obj) { return obj.handleDurationChange; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _base_decorators, { kind: "field", name: "base", static: false, private: false, access: { has: function (obj) { return "base" in obj; }, get: function (obj) { return obj.base; }, set: function (obj, value) { obj.base = value; } }, metadata: _metadata }, _base_initializers, _base_extraInitializers);
            __esDecorate(null, null, _countdownElement_decorators, { kind: "field", name: "countdownElement", static: false, private: false, access: { has: function (obj) { return "countdownElement" in obj; }, get: function (obj) { return obj.countdownElement; }, set: function (obj, value) { obj.countdownElement = value; } }, metadata: _metadata }, _countdownElement_initializers, _countdownElement_extraInitializers);
            __esDecorate(null, null, _open_decorators, { kind: "field", name: "open", static: false, private: false, access: { has: function (obj) { return "open" in obj; }, get: function (obj) { return obj.open; }, set: function (obj, value) { obj.open = value; } }, metadata: _metadata }, _open_initializers, _open_extraInitializers);
            __esDecorate(null, null, _closable_decorators, { kind: "field", name: "closable", static: false, private: false, access: { has: function (obj) { return "closable" in obj; }, get: function (obj) { return obj.closable; }, set: function (obj, value) { obj.closable = value; } }, metadata: _metadata }, _closable_initializers, _closable_extraInitializers);
            __esDecorate(null, null, _variant_decorators, { kind: "field", name: "variant", static: false, private: false, access: { has: function (obj) { return "variant" in obj; }, get: function (obj) { return obj.variant; }, set: function (obj, value) { obj.variant = value; } }, metadata: _metadata }, _variant_initializers, _variant_extraInitializers);
            __esDecorate(null, null, _duration_decorators, { kind: "field", name: "duration", static: false, private: false, access: { has: function (obj) { return "duration" in obj; }, get: function (obj) { return obj.duration; }, set: function (obj, value) { obj.duration = value; } }, metadata: _metadata }, _duration_initializers, _duration_extraInitializers);
            __esDecorate(null, null, _countdown_decorators, { kind: "field", name: "countdown", static: false, private: false, access: { has: function (obj) { return "countdown" in obj; }, get: function (obj) { return obj.countdown; }, set: function (obj, value) { obj.countdown = value; } }, metadata: _metadata }, _countdown_initializers, _countdown_extraInitializers);
            __esDecorate(null, null, _remainingTime_decorators, { kind: "field", name: "remainingTime", static: false, private: false, access: { has: function (obj) { return "remainingTime" in obj; }, get: function (obj) { return obj.remainingTime; }, set: function (obj, value) { obj.remainingTime = value; } }, metadata: _metadata }, _remainingTime_initializers, _remainingTime_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a.styles = [component_styles_js_1.default, alert_styles_js_1.default],
        _a.dependencies = { 'sl-icon-button': icon_button_component_js_1.default },
        _a;
}();
exports.default = SlAlert;
(0, animation_registry_js_1.setDefaultAnimation)('alert.show', {
    keyframes: [
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1 }
    ],
    options: { duration: 250, easing: 'ease' }
});
(0, animation_registry_js_1.setDefaultAnimation)('alert.hide', {
    keyframes: [
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 0.8 }
    ],
    options: { duration: 250, easing: 'ease' }
});
var templateObject_1, templateObject_2, templateObject_3;
