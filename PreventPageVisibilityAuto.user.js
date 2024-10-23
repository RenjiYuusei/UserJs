// ==UserScript==
// @name        Prevent Tab Inactivity Detection
// @name:vi     Ngăn Chặn Phát Hiện Tab Không Hoạt Động
// @namespace   PreventPageVisibilityAuto
// @match       *://*/*
// @run-at      document-start
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @grant       GM_registerMenuCommand
// @version     1.2
// @author      Yuusei
// @description Prevents websites from detecting when you switch tabs or minimize the window.
// @description:vi Ngăn chặn các trang web phát hiện khi bạn chuyển tab hoặc thu nhỏ cửa sổ.
// @downloadURL https://update.greasyfork.org/scripts/479726/PreventPageVisibilityAuto.user.js
// @updateURL https://update.greasyfork.org/scripts/479726/PreventPageVisibilityAuto.meta.js
// ==/UserScript==

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        name: 'PreventPageVisibilityAuto',
        defaultValue: 'none',
        prefix: 'autoinject_visibility_prevention',
        debug: false
    };

    // Event handling configuration
    const EVENTS_TO_BLOCK = [
        'visibilitychange',
        'webkitvisibilitychange',
        'mozvisibilitychange',
        'hasFocus',
        'blur',
        'focus',
        'mouseleave',
        'mouseout',  // Additional event
        'pagehide'   // Additional event
    ];

    // Property overrides configuration
    const PROPERTIES_TO_OVERRIDE = [
        { obj: document, prop: 'visibilityState', value: 'visible' },
        { obj: document, prop: 'hidden', value: false },
        { obj: document, prop: 'mozHidden', value: false },
        { obj: document, prop: 'webkitHidden', value: false },
        { obj: document, prop: 'webkitVisibilityState', value: 'visible' }
    ];

    class VisibilityController {
        constructor() {
            this.injectedStatus = false;
            this.hostArray = this.loadHostArray();
            this.currentValue = this.loadCurrentValue();
        }

        // Utility functions
        log(...args) {
            if (CONFIG.debug) {
                console.log(`[${CONFIG.name}]`, ...args);
            }
        }

        loadHostArray() {
            try {
                return JSON.parse(GM_getValue(CONFIG.prefix, '[]'));
            } catch (err) {
                this.log('Error loading host array:', err);
                return [];
            }
        }

        loadCurrentValue() {
            return GM_getValue(`value_${CONFIG.name}_${document.domain}`, CONFIG.defaultValue);
        }

        saveHostArray() {
            GM_setValue(CONFIG.prefix, JSON.stringify(this.hostArray));
        }

        // Core functionality
        inject() {
            if (this.injectedStatus) {
                this.log('Already injected');
                return;
            }

            // Block events
            EVENTS_TO_BLOCK.forEach(eventName => {
                [document, window].forEach(target => {
                    target.addEventListener(eventName, this.eventBlocker.bind(this), true);
                });
            });

            // Override document properties
            PROPERTIES_TO_OVERRIDE.forEach(({ obj, prop, value }) => {
                try {
                    Object.defineProperty(obj, prop, { 
                        value,
                        configurable: true,
                        enumerable: true 
                    });
                } catch (err) {
                    this.log(`Failed to override ${prop}:`, err);
                }
            });

            // Override hasFocus
            document.hasFocus = () => true;
            document.onvisibilitychange = null;

            this.injectedStatus = true;
            this.log('Injection complete');
        }

        eventBlocker(event) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            return true;
        }

        // Host management
        addHost() {
            const hostname = location.hostname;
            if (!this.hostArray.includes(hostname)) {
                this.hostArray.push(hostname);
                this.saveHostArray();
                this.log(`Added ${hostname} to auto-inject list`);
                if (!this.injectedStatus) {
                    this.inject();
                }
            }
        }

        removeHost() {
            const hostname = location.hostname;
            const index = this.hostArray.indexOf(hostname);
            if (index > -1) {
                this.hostArray.splice(index, 1);
                this.saveHostArray();
                this.log(`Removed ${hostname} from auto-inject list`);
            }
        }

        // Value management
        setValue() {
            const newValue = window.prompt(
                `Enter ${CONFIG.name} value for ${document.domain}`,
                this.currentValue
            );

            if (newValue !== null) {
                const parsedValue = parseInt(newValue);
                if (!isNaN(parsedValue)) {
                    GM_setValue(`value_${CONFIG.name}_${document.domain}`, parsedValue);
                    this.currentValue = parsedValue;
                    this.log(`Value updated to: ${parsedValue}`);
                }
            }
        }

        adjustValue(delta) {
            if (typeof this.currentValue === 'number') {
                const newValue = this.currentValue + delta;
                GM_setValue(`value_${CONFIG.name}_${document.domain}`, newValue);
                this.currentValue = newValue;
                this.log(`Value adjusted to: ${newValue}`);
            }
        }

        // Initialize menu commands
        initializeMenuCommands() {
            try {
                if (typeof this.currentValue === 'number') {
                    GM_registerMenuCommand('Increase Value (+)', () => this.adjustValue(1));
                    GM_registerMenuCommand('Decrease Value (-)', () => this.adjustValue(-1));
                }

                GM_registerMenuCommand(`Set ${CONFIG.name} Value`, () => this.setValue());

                if (this.hostArray.includes(location.hostname)) {
                    this.inject();
                    GM_registerMenuCommand(`Stop Auto-Injecting on ${location.hostname}`, 
                        () => this.removeHost());
                } else {
                    GM_registerMenuCommand(`Inject ${CONFIG.name}`, () => this.inject());
                    GM_registerMenuCommand(`Auto-Inject on ${location.hostname}`, 
                        () => this.addHost());
                }
            } catch (err) {
                this.log('Error setting up menu commands:', err);
            }
        }
    }

    // Initialize and run
    try {
        const controller = new VisibilityController();
        controller.initializeMenuCommands();
    } catch (err) {
        console.error(`[${CONFIG.name}] Initialization error:`, err);
    }
})();