// ==UserScript==
// @name              Công cụ tăng tốc tối ưu hóa web
// @namespace         https://github.com/syhyz1990/instantpage
// @version           1.4.4
// @author            Yuusei
// @description       Tự động tăng tốc các siêu liên kết trong trang web, giúp mở trang nhanh hơn. Thực tế cho thấy, tốc độ mở trang web đáp ứng điều kiện giảm hơn 50%.
// @license           AGPL
// @homepage          https://www.youxiaohou.com/tool/install-instantpage.html
// @requirehttps://unpkg.com/sweetalert2@10.16.6/dist/sweetalert2.min.js
// @resource          swalStyle https://unpkg.com/sweetalert2@10.16.6/dist/sweetalert2.min.css
// @match             *://*/*
// @noframes
// @run-at            document-idle
// @grant             GM_openInTab
// @grant             GM_setValue
// @grant             GM_getValue
// @grant             GM_registerMenuCommand
// @grant             GM_getResourceText
// @icon              data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48cGF0aCBkPSJNMCA3OWMwLTM1LjQgMjguNS02NCA2My45LTY0LjFzNjQuMSAyOC42IDY0LjEgNjRjMCA5LjQtMi4xIDE4LjQtNS43IDI2LjUtMSAyLjMtMi4zIDQuNi0zLjYgNi43LS40LjYtMSAxLTEuNyAxSDExYy0uNyAwLTEuMy0uNC0xLjctMS0xLjMtMi4yLTIuNS00LjQtMy42LTYuN0MyLjEgOTcuNCAwIDg4LjQgMCA3OXptMjQuNC0zOS43Yy01LjIgNS4xLTkuMiAxMS4xLTEyIDE3LjgtMyA2LjktNC41IDE0LjItNC41IDIxLjhhNTUuODYgNTUuODYgMCAwIDAgNC40IDIxLjhjLjcgMS42IDEuNCAzLjIgMi4yIDQuN2g5OC44Yy44LTEuNSAxLjYtMy4xIDIuMi00LjdhNTUuODYgNTUuODYgMCAwIDAgNC40LTIxLjggNTUuODYgNTUuODYgMCAwIDAtNC40LTIxLjhjLTIuOC02LjctNi45LTEyLjctMTItMTcuOC01LjEtNS4yLTExLjEtOS4yLTE3LjgtMTJhNTUuODYgNTUuODYgMCAwIDAtMjEuOC00LjQgNTUuODYgNTUuODYgMCAwIDAtMjEuOCA0LjRjLTYuNiAyLjgtMTIuNiA0LjctMTcuNyAxMnoiIGZpbGw9IiM0NDQiLz48cGF0aCBkPSJNMTIuNCA1Ny4xYzIuOC02LjcgNi45LTEyLjcgMTItMTcuOCA1LjEtNS4yIDExLjEtOS4yIDE3LjgtMTJBNTUuODYgNTUuODYgMCAwIDEgNjQgMjIuOWE1NS44NiA1NS44NiAwIDAgMSAyMS44IDQuNGM2LjcgMi44IDEyLjcgNi45IDE3LjggMTIgNS4yIDUuMSA5LjIgMTEuMSAxMiAxNy44YTU1Ljg2IDU1Ljg2IDAgMCAxIDQuNCAyMS44IDU1Ljg2IDU1Ljg2IDAgMCAxLTQuNCAyMS44Yy0uNyAxLjYtMS40IDMuMi0yLjIgNC43SDE0LjZjLS44LTEuNS0xLjYtMy4xLTIuMi00LjdBNTUuODYgNTUuODYgMCAwIDEgOCA3OC49Yy0uMS03LjYgMS40LTE0LjkgNC40LTIxLjh6IiBmaWxsPSIjNjQ5OTUwIi8+PHBhdGggZD0iTTc3LjUgNjAuOUM2OCA4MS4yIDY0LjkgODQuNiA2NC42IDg1Yy0xLjUgMS41LTMuNSAyLjMtNS42IDIuM3MtNC4xLS44LTUuNi0yLjNhNy45MSA3LjkxIDAgMCAxIDAtMTEuMmMuMy0uNCAzLjgtMy40IDI0LjEtMTIuOXptMC04Yy0xLjEgMC0yLjMuMi0zLjQuOEM2My4yIDU4LjggNTEgNjQuOSA0Ny44IDY4LjFjLTYuMiA2LjItNi4yIDE2LjMgMCAyMi41IDMuMSAzLjEgNy4yIDQuNyAxMS4yIDQuN3M4LjEtMS42IDExLjItNC43YzMuMi0zLjIgOS4zLTE1LjQgMTQuNC0yNi4zIDIuNi01LjYtMS43LTExLjQtNy4xLTExLjR6TTYzLjkgMjkuOGMtMjcuMiAwLTQ5LjUgMjIuNi00OS4xIDQ9LjggMCAzLjYuNSA3LjIgMS4zIDEwLjYuNCAxLjggMiAzLjEgMy45IDMuMSAyLjYgMCA0LjQtMi40IDMuOS00LjktLjctMy0xLjEtNi4yLTEuMS05LjNBNDIuMDQgNDIuMDQgMCAwIDEgMjYgNjNjMi01IDUtOS40IDguOC0xMy4yUzQzIDQzLjEgNDcuOSA0MWE0Mi4wNCA0Mi4wNCAwIDAgMSAzMi4yIDBjNC45IDIuMSA5LjMgNS4xIDEzLjEgOC45Qzk3IDUzLjYgOTkuOSA1OCAxMDIgNjNhNDIuMDQgNDIuMDQgMCAwIDEgMy4yIDE2LjFjMCAzLjItLjQgNi4zLTEuMSA5LjMtLjYgMi41IDEuMyA0LjkgMy45IDQuOSAxLjggMCAzLjUtMS4zIDMuOS0zLjEuOC0zLjYgMS4zLTcuMyAxLjMtMTEuMSAwLTI3LjMtMjIuMS00OS4zLTQ5LjMtNDkuM3oiIGZpbGw9IiM0NDQiLz48L3N2Zz4=
// ==/UserScript==

(function () {
    'use strict';

    let util = {
        // Lấy giá trị từ bộ nhớ lưu trữ của Greasemonkey
        getValue(name) {
            return GM_getValue(name);
        },

        // Lưu giá trị vào bộ nhớ lưu trữ của Greasemonkey
        setValue(name, value) {
            GM_setValue(name, value);
        },

        // Kiểm tra xem chuỗi có chứa bất kỳ phần tử nào trong mảng không (không phân biệt hoa thường)
        include(str, arr) {
            str = str.replace(/[-_]/ig, ''); // Loại bỏ dấu gạch ngang và gạch dưới
            for (let i = 0, l = arr.length; i < l; i++) {
                let val = arr[i];
                if (val !== '' && str.toLowerCase().indexOf(val.toLowerCase()) > -1) {
                    return true;
                }
            }
            return false;
        },

        // Thêm style vào trang web
        addStyle(id, tag, css) {
            tag = tag || 'style';
            let doc = document, styleDom = doc.getElementById(id);
            if (styleDom) return;
            let style = doc.createElement(tag);
            style.rel = 'stylesheet';
            style.id = id;
            tag === 'style' ? style.innerHTML = css : style.href = css;
            doc.head.appendChild(style);
        },

        // Biểu thức chính quy để kiểm tra URL của các cửa hàng ứng dụng
        reg: {
            chrome: /^https?:\/\/chrome.google.com\/webstore\/.+?\/([a-z]{32})(?=[\/#?]|$)/,
            chromeNew: /^https?:\/\/chromewebstore.google.com\/.+?\/([a-z]{32})(?=[\/#?]|$)/,
            edge: /^https?:\/\/microsoftedge.microsoft.com\/addons\/.+?\/([a-z]{32})(?=[\/#?]|$)/,
            firefox: /^https?:\/\/(reviewers\.)?(addons\.mozilla\.org|addons(?:-dev)?\.allizom\.org)\/.*?(?:addon|review)\/([^/<>"'?#]+)/,
            microsoft: /^https?:\/\/(?:apps|www).microsoft.com\/(?:store|p)\/.+?\/([a-zA-Z\d]{10,})(?=[\/#?]|$)/,
        }
    };

    let main = {
        // Khởi tạo các giá trị mặc định
        initValue() {
            let value = [{
                name: 'setting_success_times', // Số lần tăng tốc thành công
                value: 0
            }, {
                name: 'allow_external_links', // Cho phép tăng tốc liên kết ngoài
                value: true
            }, {
                name: 'allow_query_links', // Cho phép tăng tốc liên kết có tham số
                value: true
            }, {
                name: 'enable_store_link', // Cho phép tăng tốc liên kết cửa hàng ứng dụng
                value: true
            }, {
                name: 'enable_target_self', // Mở liên kết trong cùng tab
                value: false
            }, {
                name: 'enable_animation', // Hiệu ứng hoạt hình
                value: false
            }, {
                name: 'delay_on_hover', // Thời gian chờ trước khi tăng tốc (mili giây)
                value: 65
            }, {
                name: 'exclude_list', // Danh sách miền bị loại trừ
                value: ''
            }, {
                name: 'exclude_keyword', // Danh sách từ khóa bị loại trừ
                value: 'login\nlogout\nregister\nsignin\nsignup\nsignout\npay\ncreate\nedit\ndownload\ndel\nreset\nsubmit\ndoubleclick\ngoogleads\nexit'
            }];

            value.forEach((v) => {
                util.getValue(v.name) === undefined && util.setValue(v.name, v.value);
            });
        },

        // Đăng ký lệnh menu
        registerMenuCommand() {
            GM_registerMenuCommand('🚀 Đã tăng tốc：' + util.getValue('setting_success_times') + ' lần', () => {
                Swal.fire({
                    showCancelButton: true,
                    title: 'Bạn có chắc chắn muốn đặt lại số lần tăng tốc không?',
                    icon: 'warning',
                    confirmButtonText: 'Xác nhận',
                    cancelButtonText: 'Hủy',
                    customClass: {
                        popup: 'instant-popup',
                    },
                }).then((res) => {
                    if (res.isConfirmed) {
                        util.setValue('setting_success_times', 0);
                        history.go(0); // Tải lại trang
                    }
                });
            });
            GM_registerMenuCommand('⚙️ Cài đặt', () => {
                let dom = `<div style="font-size: 1em;">
                              <label class="instant-setting-label">Tăng tốc liên kết ngoài<input type="checkbox" id="S-External" ${util.getValue('allow_external_links') ? 'checked' : ''} class="instant-setting-checkbox"></label>
                              <label class="instant-setting-label"><span>Tăng tốc liên kết có tham số <a href="https://www.youxiaohou.com/tool/install-instantpage.html#%E9%85%8D%E7%BD%AE%E8%AF%B4%E6%98%8E">Xem thêm</a></span><input type="checkbox" id="S-Query" ${util.getValue('allow_query_links') ? 'checked' : ''} 
                              class="instant-setting-checkbox"></label>
                              <label class="instant-setting-label">Tăng tốc liên kết cửa hàng tiện ích/ứng dụng<input type="checkbox" id="S-Store" ${util.getValue('enable_store_link') ? 'checked' : ''} class="instant-setting-checkbox"></label>
                              <label class="instant-setting-label">Mở liên kết trong cùng tab<input type="checkbox" id="S-Target" ${util.getValue('enable_target_self') ? 'checked' : ''} class="instant-setting-checkbox"></label>
                              <label class="instant-setting-label">Hiệu ứng hoạt hình<input type="checkbox" id="S-Animate" ${util.getValue('enable_animation') ? 'checked' : ''} 
                              class="instant-setting-checkbox"></label>
                              <label class="instant-setting-label">Thời gian chờ trước khi tăng tốc (mili giây)<input type="number" min="65" id="S-Delay" value="${util.getValue('delay_on_hover')}" 
                              class="instant-setting-input"></label>
                              <label class="instant-setting-label-col">Loại trừ các website sau <textarea placeholder="Tên miền sẽ không được tăng tốc, mỗi dòng một tên miền, ví dụ: www.baidu.com" id="S-Exclude" class="instant-setting-textarea">${util.getValue('exclude_list')}</textarea></label>
                              <label class="instant-setting-label-col">Loại trừ các từ khóa sau <textarea placeholder="Liên kết chứa từ khóa này sẽ không được tăng tốc, mỗi dòng một từ khóa, ví dụ: logout" id="S-Exclude-Word" class="instant-setting-textarea">${util.getValue('exclude_keyword')}</textarea></label>
                            </div>`;
                Swal.fire({
                    title: 'Cấu hình trình tăng tốc',
                    html: dom,
                    showCloseButton: true,
                    confirmButtonText: 'Lưu',
                    footer: '<div style="text-align: center;font-size: 1em;">Xem <a href="https://www.youxiaohou.com/tool/install-instantpage.html" target="_blank">hướng dẫn sử dụng</a>, Trình hỗ trợ này là mã nguồn mở và miễn phí, được phát triển bởi <a href="https://www.youxiaohou.com">油小猴</a></div>',
                    customClass: {
                        popup: 'instant-popup',
                    },
                }).then((res) => {
                    if (res.isConfirmed) {
                        history.go(0); // Tải lại trang
                    }
                });

                // Thêm sự kiện thay đổi cho các phần tử input
                document.getElementById('S-External').addEventListener('change', (e) => {
                    util.setValue('allow_external_links', e.currentTarget.checked);
                });
                document.getElementById('S-Query').addEventListener('change', (e) => {
                    util.setValue('allow_query_links', e.currentTarget.checked);
                });
                document.getElementById('S-Store').addEventListener('change', (e) => {
                    util.setValue('enable_store_link', e.currentTarget.checked);
                });
                document.getElementById('S-Target').addEventListener('change', (e) => {
                    util.setValue('enable_target_self', e.currentTarget.checked);
                });
                document.getElementById('S-Animate').addEventListener('change', (e) => {
                    util.setValue('enable_animation', e.currentTarget.checked);
                });
                document.getElementById('S-Delay').addEventListener('change', (e) => {
                    util.setValue('delay_on_hover', e.currentTarget.value);
                });
                document.getElementById('S-Exclude').addEventListener('change', (e) => {
                    util.setValue('exclude_list', e.currentTarget.value);
                });
                document.getElementById('S-Exclude-Word').addEventListener('change', (e) => {
                    util.setValue('exclude_keyword', e.currentTarget.value);
                });
            });
        },

        // Kiểm tra xem trang web có nằm trong danh sách loại trừ không
        inExcludeList() {
            let exclude = util.getValue('exclude_list').split('\n');
            let host = location.host;
            return exclude.includes(host);
        },

        // Mã chính để tăng tốc trang web
        instantPage() {
            // Ngăn chặn thực thi nhiều lần
            if (window.instantLoaded) return;
            let mouseoverTimer;
            let lastTouchTimestamp;
            const prefetches = new Set();
            const prefetchElement = document.createElement('link');
            // Kiểm tra hỗ trợ của trình duyệt
            const isSupported = prefetchElement.relList && prefetchElement.relList.supports && prefetchElement.relList.supports('prefetch')
                && window.IntersectionObserver && 'isIntersecting' in IntersectionObserverEntry.prototype;
            const isOnline = () => window.navigator.onLine; // Kiểm tra kết nối mạng
            const allowQueryString = 'instantAllowQueryString' in document.body.dataset || util.getValue('allow_query_links'); // Cho phép tăng tốc liên kết có tham số
            const allowExternalLinks = 'instantAllowExternalLinks' in document.body.dataset || util.getValue('allow_external_links'); // Cho phép tăng tốc liên kết ngoài
            const useWhitelist = 'instantWhitelist' in document.body.dataset; // Sử dụng danh sách trắng
            const mousedownShortcut = 'instantMousedownShortcut' in document.body.dataset; // Sử dụng chuột trái để tăng tốc
            const DELAY_TO_NOT_BE_CONSIDERED_A_TOUCH_INITIATED_ACTION = 1111; // Thời gian chờ để phân biệt giữa thao tác chạm và chuột
            const enableAnimation = util.getValue('enable_animation'); // Bật hiệu ứng hoạt hình
            const enableTargetSelf = util.getValue('enable_target_self'); // Mở liên kết trong cùng tab
            const enableStoreLink = util.getValue('enable_store_link'); // Bật tăng tốc liên kết cửa hàng ứng dụng
            window.instantLoaded = true; // Đánh dấu đã tải
            const excludeKeyword = util.getValue('exclude_keyword').split('\n'); // Danh sách từ khóa bị loại trừ

            let delayOnHover = util.getValue('delay_on_hover'); // Thời gian chờ trước khi tăng tốc
            let useMousedown = false; // Sử dụng chuột trái để tăng tốc
            let useMousedownOnly = false; // Chỉ sử dụng chuột trái để tăng tốc
            let useViewport = false; // Sử dụng viewport để tăng tốc

            // Cấu hình tăng tốc tùy chỉnh
            if ('instantIntensity' in document.body.dataset) {
                const intensity = document.body.dataset.instantIntensity;

                if (intensity.substr(0, 'mousedown'.length) === 'mousedown') {
                    useMousedown = true;
                    if (intensity === 'mousedown-only') {
                        useMousedownOnly = true;
                    }
                } else if (intensity.substr(0, 'viewport'.length) === 'viewport') {
                    if (!(navigator.connection && (navigator.connection.saveData || (navigator.connection.effectiveType && navigator.connection.effectiveType.includes('2g'))))) {
                        if (intensity === "viewport") {
                            if (document.documentElement.clientWidth * document.documentElement.clientHeight < 450000) {
                                useViewport = true;
                            }
                        } else if (intensity === "viewport-all") {
                            useViewport = true;
                        }
                    }
                } else {
                    const milliseconds = parseInt(intensity);
                    if (!Number.isNaN(milliseconds)) {
                        delayOnHover = milliseconds;
                    }
                }
            }

            // Kiểm tra hỗ trợ và thêm event listeners
            if (isSupported) {
                const eventListenersOptions = {
                    capture: true,
                    passive: true,
                };

                if (!useMousedownOnly) {
                    document.addEventListener('touchstart', touchstartListener, eventListenersOptions);
                }

                if (!useMousedown) {
                    document.addEventListener('mouseover', mouseoverListener, eventListenersOptions);
                } else if (!mousedownShortcut) {
                    document.addEventListener('mousedown', mousedownListener, eventListenersOptions);
                }

                if (mousedownShortcut) {
                    document.addEventListener('mousedown', mousedownShortcutListener, eventListenersOptions);
                }


                if (useViewport) {
                    let triggeringFunction;
                    if (window.requestIdleCallback) {
                        triggeringFunction = (callback) => {
                            requestIdleCallback(callback, {
                                timeout: 1500,
                            });
                        };
                    } else {
                        triggeringFunction = (callback) => {
                            callback();
                        };
                    }

                    triggeringFunction(() => {
                        const intersectionObserver = new IntersectionObserver((entries) => {
                            entries.forEach((entry) => {
                                if (entry.isIntersecting) {
                                    const linkElement = entry.target;
                                    intersectionObserver.unobserve(linkElement);
                                    preload(linkElement);
                                }
                            });
                        });

                        document.querySelectorAll('a').forEach((linkElement) => {
                            if (isPreloadable(linkElement)) {
                                intersectionObserver.observe(linkElement);
                            }
                        });
                    });
                }
            }

            // Các hàm xử lý sự kiện
            function touchstartListener(event) {
                lastTouchTimestamp = performance.now();
                const linkElement = event.target.closest('a');
                if (!isPreloadable(linkElement)) {
                    return;
                }
                preload(linkElement);
            }

            function mouseoverListener(event) {
                if (performance.now() - lastTouchTimestamp < DELAY_TO_NOT_BE_CONSIDERED_A_TOUCH_INITIATED_ACTION) {
                    return;
                }
                if (!('closest' in event.target)) {
                    return;
                }
                const linkElement = event.target.closest('a');
                if (!isPreloadable(linkElement)) {
                    return;
                }
                linkElement.addEventListener('mouseout', mouseoutListener, {passive: true});
                mouseoverTimer = setTimeout(() => {
                    preload(linkElement);
                    mouseoverTimer = undefined;
                }, delayOnHover);
            }

            function mousedownListener(event) {
                const linkElement = event.target.closest('a');
                if (!isPreloadable(linkElement)) {
                    return;
                }
                preload(linkElement);
            }

            function mouseoutListener(event) {
                if (event.relatedTarget && event.target.closest('a') === event.relatedTarget.closest('a')) {
                    return;
                }
                if (mouseoverTimer) {
                    clearTimeout(mouseoverTimer);
                    mouseoverTimer = undefined;
                }
            }

            function mousedownShortcutListener(event) {
                if (performance.now() - lastTouchTimestamp < DELAY_TO_NOT_BE_CONSIDERED_A_TOUCH_INITIATED_ACTION) {
                    return;
                }
                const linkElement = event.target.closest('a');
                if (event.which > 1 || event.metaKey || event.ctrlKey) {
                    return;
                }
                if (!linkElement) {
                    return;
                }
                linkElement.addEventListener('click', function (event) {
                    if (event.detail === 1337) {
                        return;
                    }
                    event.preventDefault();
                }, {capture: true, passive: false, once: true});
                const customEvent = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    detail: 1337
                });
                linkElement.dispatchEvent(customEvent);
            }

            // Kiểm tra xem liên kết có thể tăng tốc được không
            function isPreloadable(linkElement) {
                if (!linkElement || !linkElement.href) {
                    return false;
                }

                if (util.include(linkElement.href, excludeKeyword)) {
                    if (!util.reg.chrome.test(linkElement.href) &&
                        !util.reg.chromeNew.test(linkElement.href) &&
                        !util.reg.edge.test(linkElement.href) &&
                        !util.reg.edge.test(linkElement.href) &&
                        !util.reg.microsoft.test(linkElement.href)) {
                        return false;
                    }
                }

                if (useWhitelist && !('instant' in linkElement.dataset)) {
                    return false;
                }

                if (!allowExternalLinks && linkElement.origin !== location.origin && !('instant' in linkElement.dataset)) {
                    return false;
                }

                if (!['http:', 'https:'].includes(linkElement.protocol)) {
                    return false;
                }

                if (linkElement.protocol === 'http:' && location.protocol === 'https:') {
                    if (linkElement.href.indexOf('http://www.baidu.com/link?url') === 0) {
                        linkElement.href = linkElement.href.replace('http', 'https');
                    } else {
                        return false;
                    }
                }
                // Không tăng tốc file tải xuống
                if (/\.[a-zA-Z0-9]{0,5}$/i.test(linkElement.href)) {
                    // Loại trừ tên miền, phần mở rộng website
                    if (!/(com|cn|top|ltd|net|tech|shop|vip|xyz|wang|cloud|online|site|love|art|xin|store|fun|cc|website|press|space|beer|luxe|video|ren|group|fit|yoga|org|pro|ink|biz|info|design|link|work|mobi|kim|pub|name|tv|co|asia|red|live|wiki|gov|life|world|run|show|city|gold|today|plus|cool|icu|company|chat|zone|fans|law|host|center|club|email|fund|social|team|guru|htm|html|php|asp|jsp)$/i.test(linkElement.href)) {
                        return false;
                    }
                }

                if (!allowQueryString && linkElement.search && !('instant' in linkElement.dataset)) {
                    return false;
                }

                if (linkElement.hash && linkElement.pathname + linkElement.search === location.pathname + location.search) {
                    return false;
                }

                if (linkElement.dataset.filename || linkElement.dataset.noInstant) {
                    return false;
                }

                return true;
            }

            // Hàm tăng tốc
            function preload(linkElement) {
                let url = linkElement.href;

                if (!isOnline()) {
                    return;
                }

                if (prefetches.has(url)) {
                    return;
                }

                // Thay đổi URL của các cửa hàng ứng dụng
                if (enableStoreLink) {
                    if (util.reg.chrome.test(url)) {
                        linkElement.href = url.replace("chrome.google.com", "chrome.crxsoso.com");
                    }
                    if (util.reg.chromeNew.test(url)) {
                        linkElement.href = url.replace("chromewebstore.google.com", "chrome.crxsoso.com/webstore");
                    }
                    if (util.reg.edge.test(url)) {
                        linkElement.href = url.replace("microsoftedge.microsoft.com", "microsoftedge.crxsoso.com");
                    }
                    if (util.reg.firefox.test(url)) {
                        linkElement.href = url.replace("addons.mozilla.org", "addons.crxsoso.com");
                    }
                    if (util.reg.microsoft.test(url)) {
                        linkElement.href = url.replace(/(www|apps)\.microsoft\.com/, "apps.crxsoso.com");
                    }
                }

                const prefetcher = document.createElement('link');
                prefetcher.rel = 'prefetch';
                prefetcher.href = url;
                document.head.appendChild(prefetcher);

                prefetches.add(url);

                if (enableAnimation) {
                    linkElement.classList.add("link-instanted");
                }
                if (enableTargetSelf) {
                    linkElement.target = '_self';
                }

                util.setValue('setting_success_times', util.getValue('setting_success_times') + 1);
            }
        },

        // Thêm style cho plugin
        addPluginStyle() {
            let style = `
                .instant-popup { font-size: 14px !important; }
                .instant-setting-label { display: flex;align-items: center;justify-content: space-between;padding-top: 15px; }
                .instant-setting-label-col { display: flex;align-items: flex-start;;padding-top: 15px;flex-direction:column }
                .instant-setting-checkbox { width: 16px;height: 16px; }
                .instant-setting-textarea { width: 100%; margin: 14px 0 0; height: 60px; resize: none; border: 1px solid #bbb; box-sizing: border-box; padding: 5px 10px; border-radius: 5px; color: #666; line-height: 1.2; }
                .instant-setting-input { border: 1px solid #bbb; box-sizing: border-box; padding: 5px 10px; border-radius: 5px; width: 100px}
                 @keyframes instantAnminate { from { opacity: 1; } 50% { opacity: 0.4 } to { opacity: 0.9; }}
                .link-instanted { animation: instantAnminate 0.6s 1; animation-fill-mode:forwards }
                .link-instanted * { animation: instantAnminate 0.6s 1; animation-fill-mode:forwards }
            `;

            if (document.head) {
                util.addStyle('swal-pub-style', 'style', GM_getResourceText('swalStyle'));
                util.addStyle('instant-style', 'style', style);
            }

            const headObserver = new MutationObserver(() => {
                util.addStyle('swal-pub-style', 'style', GM_getResourceText('swalStyle'));
                util.addStyle('instant-style', 'style', style);
            });
            headObserver.observe(document.head, {childList: true, subtree: true});
        },

        // Hàm khởi tạo
        init() {
            this.initValue();
            this.addPluginStyle();
            this.registerMenuCommand();
            if (this.inExcludeList()) return;
            this.instantPage();
        }
    };
    main.init();
})();