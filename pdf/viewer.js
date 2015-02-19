function Viewer(c, r)
{

    function D(a)
    {
        var f = R.options,
            b,
            c = !1,
            d;
        for (d = 0; d < f.length; d += 1)
            b = f[d]; b.value !== a ? b.selected = !1 : c = b.selected = !0;
        return c;
    }

    function E(a, f, c)
    {
        a !== b.getZoomLevel() && (b.setZoomLevel(a),
        c = document.createEvent("UIEvents"),
        c.initUIEvent("scalechange", !1, !1, window, 0),
        c.scale = a,
        c.resetAutoSettings = f,
        window.dispatchEvent(c));
    }

    function F()
    {
        var a;
        if (c.onScroll) c.onScroll();
        c.getPageInView && (a = c.getPageInView()) && (m = a, document.getElementById("pageNumber").value = a);
    }

    function G(a)
    {
        window.clearTimeout(H);
        H = window.setTimeout(function ()
        {
            F();
        }, a);
    }

    function e(a, b, g)
    {
        var e, h;
        if (e = "custom" === a ? parseFloat(document.getElementById("customScaleOption").textContent) /
            100 : parseFloat(a)) E(e, !0, g);
        else
        {
            e = d.clientWidth - t;
            h = d.clientHeight - t;
            switch (a)
            {
                case "page-actual":
                    E(1, b, g);
                    break;
                case "page-width":
                    c.fitToWidth(e);
                    break;
                case "page-height":
                    c.fitToHeight(h);
                    break;
                case "page-fit":
                    c.fitToPage(e, h);
                    break;
                case "auto":
                    c.isSlideshow() ? c.fitToPage(e + t, h + t) : c.fitSmart(e);
            }
            D(a);
        }
        G(300);
    }

    function S(a)
    {
        var b;
        return -1 !== ["auto", "page-actual", "page-width"].indexOf(a) ? a : (b = parseFloat(a)) && I <= b && b <= J ? a : T;
    }

    function u()
    {
        n = !n;
        k && !n && b.togglePresentationMode();
    }

    function x()
    {
        v && (y.className =
            "viewer-touched", window.clearTimeout(K), K = window.setTimeout(function ()
            {
                y.className = "";
            }, 5E3));
    }

    function z()
    {
        l.classList.add("viewer-touched");
        p.classList.add("viewer-touched");
        window.clearTimeout(L);
        L = window.setTimeout(function ()
        {
            A();
        }, 5E3);
    }

    function A()
    {
        l.classList.remove("viewer-touched");
        p.classList.remove("viewer-touched");
    }

    function B()
    {
        l.classList.contains("viewer-touched") ? A() : z();
    }

    function M(a)
    {
        blanked.style.display = "block";
        blanked.style.backgroundColor = a;
        A();
    }

    var b = this,
        t = 40,
        I = 0.25,
        J = 4,
        T = "auto",
        k = !1,
        n = !1,
        N = !1,
        v = !1,
        C,
        g = document.getElementById("viewer"),
        d = document.getElementById("canvasContainer"),
        y = document.getElementById("overlayNavigator"),
        l = document.getElementById("titlebar"),
        p = document.getElementById("toolbarContainer"),
        U = document.getElementById("toolbarMiddleContainer"),
        R = document.getElementById("scaleSelect"),
        w = document.getElementById("dialogOverlay"),
        s,
        q = [],
        m,
        H,
        K,
        L;
    this.initialize = function ()
    {
        var a;
        a =
            S(r.zoom);
        C = r.documentUrl;
        document.title = r.title;
        var f = document.getElementById("documentName");
        f.innerHTML = "";
        f.appendChild(f.ownerDocument.createTextNode(r.title));
        c.onLoad = function ()
        {
            (v = c.isSlideshow()) ? (d.classList.add("slideshow")) : (U.style.visibility = "visible", c.getPageInView);
            N = !0;
            q = c.getPages();
            document.getElementById("numPages").innerHTML = "of " + q.length;
            b.showPage(1);
            e(a);
            d.onscroll = F;
            debugger; G();
        };
        debugger;
        c.initialize(d, C);
    };
    this.showPage = function (a)
    {
        0 >= a ? a = 1 : a > q.length && (a = q.length);
        c.showPage(a);
        m = a;
        document.getElementById("pageNumber").value = m;
    };
    this.showNextPage = function ()
    {
        b.showPage(m + 1);
    };
    this.showPreviousPage = function ()
    {
        b.showPage(m - 1);
    };
    this.download = function ()
    {
        var a = C.split("#")[0];
        window.open(a + "#viewer.action=download", "_parent");
    };
    this.toggleFullScreen = function ()
    {
        n ? document.exitFullscreen ? document.exitFullscreen() : document.cancelFullScreen ? document.cancelFullScreen() :
            document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen() : g.requestFullscreen ? g.requestFullscreen() : g.mozRequestFullScreen ? g.mozRequestFullScreen() : g.webkitRequestFullscreen ? g.webkitRequestFullscreen() : g.webkitRequestFullScreen ? g.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : g.msRequestFullscreen && g.msRequestFullscreen();
    };
    this.togglePresentationMode = function ()
    {
        var a = document.getElementById("overlayCloseButton");
        k ? ("block" === blanked.style.display && (blanked.style.display = "none", B()), l.style.display = p.style.display = "block", a.style.display = "none", d.classList.remove("presentationMode"), d.onmouseup = function () { }, d.oncontextmenu = function () { }, d.onmousedown = function () { }, e("auto"), v = c.isSlideshow()) : (l.style.display = p.style.display = "none", a.style.display = "block", d.classList.add("presentationMode"), v = !0, d.onmousedown = function (a)
        {
            a.preventDefault();
        },
            d.oncontextmenu = function (a)
            {
                a.preventDefault();
            }, d.onmouseup = function (a)
            {
                a.preventDefault();
                1 === a.which ? b.showNextPage() : b.showPreviousPage();
            }, e("page-fit"));
        k = !k;
    };

    this.forceRendering = function(currentlyVisiblePages) {
        var visiblePages = currentlyVisiblePages || c.getPages();
       debugger;
        var pageView = renderingQueue.renderingQueue.getHighestPriority(visiblePages,
            this.pages,
            this.scroll.down);
        if (pageView) {
            renderingQueue._ensurePdfPageLoaded(pageView).then(function ()
            {
                renderingQueue.renderingQueue.renderView(pageView);
            }.bind(this));
            return true;
        }
        return false;
        //return true;
    };


    this.beforePrint = function pdfViewSetupBeforePrint()
    {
        //if (!this.supportsPrinting)
        //{
        //    var printMessage = mozL10n.get('printing_not_supported', null,
        //        'Warning: Printing is not fully supported by this browser.');
        //    this.error(printMessage);
        //    return;
        //}

        var alertNotReady = false;
        var i, ii;
        if (!this.pagesCount)
        {
            alertNotReady = true;
        } else
        {
            for (i = 0, ii = c.getPages().length; i < ii; ++i)
            {
                if (!this.pdfViewer.getPageView(i).pdfPage)
                {
                    alertNotReady = true;
                    break;
                }
            }
        }
        //if (alertNotReady)
        //{
        //    var notReadyMessage = mozL10n.get('printing_not_ready', null,
        //        'Warning: The PDF is not fully loaded for printing.');
        //    window.alert(notReadyMessage);
        //    return;
        //}

        this.printing = true;
        this.forceRendering();

        var body = document.querySelector('body');
        body.setAttribute('data-mozPrintCallback', true);
        for (i = 0, ii = this.pagesCount; i < ii; ++i)
        {
            this.pdfViewer.getPageView(i).beforePrint();
        }

    };

    this.afterPrint = function pdfViewSetupAfterPrint()
    {
        var div = document.getElementById('printContainer');
        while (div.hasChildNodes())
        {
            div.removeChild(div.lastChild);
        }

        this.printing = false;
        this.forceRendering();
    };


    this.getZoomLevel = function ()
    {
        return c.getZoomLevel();
    };
    this.setZoomLevel = function (a)
    {
        c.setZoomLevel(a);
    };
    this.zoomOut = function ()
    {
        var a = (b.getZoomLevel() / 1.1).toFixed(2),
            a = Math.max(I, a);
        e(a, !0);
    };
    this.zoomIn = function ()
    {
        var a = (1.1 * b.getZoomLevel()).toFixed(2),
            a = Math.min(J, a);
        e(a, !0);
    };
    (function ()
    {
        c && (b.initialize(),
        document.exitFullscreen ||
        document.cancelFullScreen ||
        document.mozCancelFullScreen ||
        document.webkitExitFullscreen ||
        document.webkitCancelFullScreen ||
        document.msExitFullscreen ||
        (document.getElementById("fullscreen").style.visibility = "hidden",
            document.getElementById("presentation").style.visibility = "hidden"),
            document.getElementById("overlayCloseButton").addEventListener("click", b.toggleFullScreen),
            document.getElementById("fullscreen").addEventListener("click", b.toggleFullScreen),
            document.getElementById("presentation").addEventListener("click", function ()
            {
                n || b.toggleFullScreen();
                b.togglePresentationMode();
            }),
        document.addEventListener("fullscreenchange", u),
        document.addEventListener("webkitfullscreenchange", u),
        document.addEventListener("mozfullscreenchange", u),
        document.addEventListener("mozfullscreenchange", u),
        document.addEventListener("MSFullscreenChange", u),
        document.getElementById("download").addEventListener("click", function ()
        {
            b.download();
        }),
        document.getElementById("zoomOut").addEventListener("click", function ()
        {
            b.zoomOut();
        }),
          document.getElementById("print").addEventListener("click", function ()
          {
              b.beforePrint();
          }),
        document.getElementById("zoomIn").addEventListener("click", function ()
        {
            b.zoomIn();
        }),
        document.getElementById("previous").addEventListener("click", function ()
        {
            b.showPreviousPage();
        }),
        document.getElementById("next").addEventListener("click", function ()
        {
            b.showNextPage();
        }),
        document.getElementById("previousPage").addEventListener("click", function ()
        {
            b.showPreviousPage();
        }),
        document.getElementById("nextPage").addEventListener("click", function ()
        {
            b.showNextPage();
        }),
        document.getElementById("pageNumber").addEventListener("change", function ()
        {
            b.showPage(this.value);
        }),
        document.getElementById("scaleSelect").addEventListener("change", function ()
        {
            e(this.value);
        }),
        d.addEventListener("click", x),
        y.addEventListener("click", x),
        d.addEventListener("click", B),
        l.addEventListener("click", z),
        p.addEventListener("click", z),
        window.addEventListener("scalechange", function (a)
        {
            var b = document.getElementById("customScaleOption"),
                c = D(String(a.scale));
            b.selected = !1;
            c || (b.textContent = Math.round(1E4 * a.scale) / 100 + "%", b.selected = !0);
        }, !0),

        window.addEventListener('beforeprint', function beforePrint(evt)
        {
            b.beforePrint();
        }),
        window.addEventListener('afterprint', function afterPrint(evt)
        {
            b.afterPrint();
        }),
        window.addEventListener("resize", function (a)
        {
            N && (document.getElementById("pageWidthOption").selected || document.getElementById("pageAutoOption").selected) &&
                e(document.getElementById("scaleSelect").value);
            x();
        }),
        window.addEventListener("keydown", function (a)
        {
            var c = a.keyCode;
            a = a.shiftKey;
            if ("block" === blanked.style.display)
                switch (c)
                {
                    case 16:
                    case 17:
                    case 18:
                    case 91:
                    case 93:
                    case 224:
                    case 225:
                        break;
                    default:
                        blanked.style.display = "none", B();
                }
            else
                switch (c)
                {
                    case 8:
                    case 33:
                    case 37:
                    case 38:
                    case 80:
                        b.showPreviousPage();
                        break;
                    case 13:
                    case 34:
                    case 39:
                    case 40:
                    case 78:
                        b.showNextPage();
                        break;
                    case 32:
                        a ? b.showPreviousPage() : b.showNextPage();
                        break;
                    case 66:
                    case 190:
                        k && M("#000");
                        break;
                    case 87:
                    case 188:
                        k && M("#FFF");
                        break;
                    case 36:
                        b.showPage(0);
                        break;
                    case 35:
                        b.showPage(q.length);
                }
        }));
    })();
};



(function mozPrintCallbackPolyfillClosure()
{
    if ('mozPrintCallback' in document.createElement('canvas'))
    {
        return;
    }
    // Cause positive result on feature-detection:
    HTMLCanvasElement.prototype.mozPrintCallback = undefined;

    var canvases;   // During print task: non-live NodeList of <canvas> elements
    var index;      // Index of <canvas> element that is being processed

    var print = window.print;
    window.print = function print()
    {
        if (canvases)
        {
            console.warn('Ignored window.print() because of a pending print job.');
            return;
        }
        try
        {
            dispatchEvent('beforeprint');
        } finally
        {
            canvases = document.querySelectorAll('canvas');
            index = -1;
            next();
        }
    };

    function dispatchEvent(eventType)
    {
        var event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventType, false, false, 'custom');
        window.dispatchEvent(event);
    }

    function next()
    {
        if (!canvases)
        {
            return; // Print task cancelled by user (state reset in abort())
        }

        renderProgress();
        if (++index < canvases.length)
        {
            var canvas = canvases[index];
            if (typeof canvas.mozPrintCallback === 'function')
            {
                canvas.mozPrintCallback({
                    context: canvas.getContext('2d'),
                    abort: abort,
                    done: next
                });
            } else
            {
                next();
            }
        } else
        {
            renderProgress();
            print.call(window);
            setTimeout(abort, 20); // Tidy-up
        }
    }

    function abort()
    {
        if (canvases)
        {
            canvases = null;
            renderProgress();
            dispatchEvent('afterprint');
        }
    }

    function renderProgress()
    {
        var progressContainer = document.getElementById('mozPrintCallback-shim');
        if (canvases)
        {
            var progress = Math.round(100 * index / canvases.length);
            var progressBar = progressContainer.querySelector('progress');
            var progressPerc = progressContainer.querySelector('.relative-progress');
            progressBar.value = progress;
            progressPerc.textContent = progress + '%';
            progressContainer.removeAttribute('hidden');
            progressContainer.onclick = abort;
        } else
        {
            progressContainer.setAttribute('hidden', '');
        }
    }

    var hasAttachEvent = !!document.attachEvent;

    window.addEventListener('keydown', function (event)
    {
        // Intercept Cmd/Ctrl + P in all browsers.
        // Also intercept Cmd/Ctrl + Shift + P in Chrome and Opera
        if (event.keyCode === 80/*P*/ && (event.ctrlKey || event.metaKey) &&
            !event.altKey && (!event.shiftKey || window.chrome || window.opera))
        {
            window.print();
            if (hasAttachEvent)
            {
                // Only attachEvent can cancel Ctrl + P dialog in IE <=10
                // attachEvent is gone in IE11, so the dialog will re-appear in IE11.
                return;
            }
            event.preventDefault();
            if (event.stopImmediatePropagation)
            {
                event.stopImmediatePropagation();
            } else
            {
                event.stopPropagation();
            }
            return;
        }
        if (event.keyCode === 27 && canvases)
        { // Esc
            abort();
        }
    }, true);
    if (hasAttachEvent)
    {
        document.attachEvent('onkeydown', function (event)
        {
            event = event || window.event;
            if (event.keyCode === 80/*P*/ && event.ctrlKey)
            {
                event.keyCode = 0;
                return false;
            }
        });
    }

    if ('onbeforeprint' in window)
    {
        // Do not propagate before/afterprint events when they are not triggered
        // from within this polyfill. (FF/IE).
        var stopPropagationIfNeeded = function (event)
        {
            if (event.detail !== 'custom' && event.stopImmediatePropagation)
            {
                event.stopImmediatePropagation();
            }
        };
        window.addEventListener('beforeprint', stopPropagationIfNeeded, false);
        window.addEventListener('afterprint', stopPropagationIfNeeded, false);
    }
})();



(function mozPrintCallbackPolyfillClosure()
{
    if ('mozPrintCallback' in document.createElement('canvas'))
    {
        return;
    }
    // Cause positive result on feature-detection:
    HTMLCanvasElement.prototype.mozPrintCallback = undefined;

    var canvases;   // During print task: non-live NodeList of <canvas> elements
    var index;      // Index of <canvas> element that is being processed

    var print = window.print;
    window.print = function print()
    {
        if (canvases)
        {
            console.warn('Ignored window.print() because of a pending print job.');
            return;
        }
        try
        {
            dispatchEvent('beforeprint');
        } finally
        {
            canvases = document.querySelectorAll('canvas');
            index = -1;
            next();
        }
    };

    function dispatchEvent(eventType)
    {
        var event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventType, false, false, 'custom');
        window.dispatchEvent(event);
    }

    function next()
    {
        if (!canvases)
        {
            return; // Print task cancelled by user (state reset in abort())
        }

        renderProgress();
        if (++index < canvases.length)
        {
            var canvas = canvases[index];
            if (typeof canvas.mozPrintCallback === 'function')
            {
                canvas.mozPrintCallback({
                    context: canvas.getContext('2d'),
                    abort: abort,
                    done: next
                });
            } else
            {
                next();
            }
        } else
        {
            renderProgress();
            print.call(window);
            setTimeout(abort, 20); // Tidy-up
        }
    }

    function abort()
    {
        if (canvases)
        {
            canvases = null;
            renderProgress();
            dispatchEvent('afterprint');
        }
    }

    function renderProgress()
    {
        var progressContainer = document.getElementById('mozPrintCallback-shim');
        if (canvases)
        {
            var progress = Math.round(100 * index / canvases.length);
            var progressBar = progressContainer.querySelector('progress');
            var progressPerc = progressContainer.querySelector('.relative-progress');
            progressBar.value = progress;
            progressPerc.textContent = progress + '%';
            progressContainer.removeAttribute('hidden');
            progressContainer.onclick = abort;
        } else
        {
            progressContainer.setAttribute('hidden', '');
        }
    }

    var hasAttachEvent = !!document.attachEvent;

    window.addEventListener('keydown', function (event)
    {
        // Intercept Cmd/Ctrl + P in all browsers.
        // Also intercept Cmd/Ctrl + Shift + P in Chrome and Opera
        if (event.keyCode === 80/*P*/ && (event.ctrlKey || event.metaKey) &&
            !event.altKey && (!event.shiftKey || window.chrome || window.opera))
        {
            window.print();
            if (hasAttachEvent)
            {
                // Only attachEvent can cancel Ctrl + P dialog in IE <=10
                // attachEvent is gone in IE11, so the dialog will re-appear in IE11.
                return;
            }
            event.preventDefault();
            if (event.stopImmediatePropagation)
            {
                event.stopImmediatePropagation();
            } else
            {
                event.stopPropagation();
            }
            return;
        }
        if (event.keyCode === 27 && canvases)
        { // Esc
            abort();
        }
    }, true);
    if (hasAttachEvent)
    {
        document.attachEvent('onkeydown', function (event)
        {
            event = event || window.event;
            if (event.keyCode === 80/*P*/ && event.ctrlKey)
            {
                event.keyCode = 0;
                return false;
            }
        });
    }

    if ('onbeforeprint' in window)
    {
        // Do not propagate before/afterprint events when they are not triggered
        // from within this polyfill. (FF/IE).
        var stopPropagationIfNeeded = function (event)
        {
            if (event.detail !== 'custom' && event.stopImmediatePropagation)
            {
                event.stopImmediatePropagation();
            }
        };
        window.addEventListener('beforeprint', stopPropagationIfNeeded, false);
        window.addEventListener('afterprint', stopPropagationIfNeeded, false);
    }
})();
