<template>  
  <div>  
    <!--container-->  
    <div class="m-t-10">  
      <a class="mint-cell mint-field">  
        <div class="mint-cell-wrapper">  
          <div class="mint-cell-value">  
            <input v-model="address_detail" type="text" id="suggestId"  name="address_detail" class="mint-field-core text-right">  
            <button type="botton" @click="seach()">
              <i class="el-icon-search"></i>
            </button>
          </div>  
        </div>  
      </a>  
    </div>  
    <div id="allmap" style="width: 100%;height:600px;border: 1px solid gray;overflow:hidden;"></div>  
    <!--container end-->  
  </div>  
</template>  
  
<script>  

/**
 * @fileoverview 此类表示地图上的一个覆盖物，该覆盖物由文字和图标组成，从Overlay继承。
 * 主入口类是<a href="symbols/BMapLib.TextIconOverlay.html">TextIconOverlay</a>，
 * 基于Baidu Map API 1.2。
 *
 * @author Baidu Map Api Group
 * @version 1.2
 */


 /**
 * @namespace BMap的所有library类均放在BMapLib命名空间下
 */
var BMapLib = window.BMapLib = BMapLib || {};

(function () {

    /**
     * 声明baidu包
     */
    var T,
    baidu = T = baidu || {version: "1.3.8"};

    (function (){
        //提出guid，防止在与老版本Tangram混用时
        //在下一行错误的修改window[undefined]
        baidu.guid = "$BAIDU$";

        //Tangram可能被放在闭包中
        //一些页面级别唯一的属性，需要挂载在window[baidu.guid]上
        window[baidu.guid] = window[baidu.guid] || {};

        /**
        * @ignore
        * @namespace baidu.dom 操作dom的方法。
        */
        baidu.dom = baidu.dom || {};


        /**
         * 从文档中获取指定的DOM元素
         * @name baidu.dom.g
         * @function
         * @grammar baidu.dom.g(id)
         * @param {string|HTMLElement} id 元素的id或DOM元素
         * @shortcut g,T.G
         * @meta standard
         * @see baidu.dom.q
         *
         * @returns {HTMLElement|null} 获取的元素，查找不到时返回null,如果参数不合法，直接返回参数
         */
        baidu.dom.g = function (id) {
            if ('string' == typeof id || id instanceof String) {
                return document.getElementById(id);
            } else if (id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
                return id;
            }
            return null;
        };

        // 声明快捷方法
        baidu.g = baidu.G = baidu.dom.g;

        /**
         * 获取目标元素所属的document对象
         * @name baidu.dom.getDocument
         * @function
         * @grammar baidu.dom.getDocument(element)
         * @param {HTMLElement|string} element 目标元素或目标元素的id
         * @meta standard
         * @see baidu.dom.getWindow
         *
         * @returns {HTMLDocument} 目标元素所属的document对象
         */
        baidu.dom.getDocument = function (element) {
            element = baidu.dom.g(element);
            return element.nodeType == 9 ? element : element.ownerDocument || element.document;
        };

        /**
           * @ignore
         * @namespace baidu.lang 对语言层面的封装，包括类型判断、模块扩展、继承基类以及对象自定义事件的支持。
        */
        baidu.lang = baidu.lang || {};

        /**
         * 判断目标参数是否string类型或String对象
         * @name baidu.lang.isString
         * @function
         * @grammar baidu.lang.isString(source)
         * @param {Any} source 目标参数
         * @shortcut isString
         * @meta standard
         * @see baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isArray,baidu.lang.isElement,baidu.lang.isBoolean,baidu.lang.isDate
         *
         * @returns {boolean} 类型判断结果
         */
        baidu.lang.isString = function (source) {
            return '[object String]' == Object.prototype.toString.call(source);
        };

        // 声明快捷方法
        baidu.isString = baidu.lang.isString;

        /**
         * 从文档中获取指定的DOM元素
         * **内部方法**
         *
         * @param {string|HTMLElement} id 元素的id或DOM元素
         * @meta standard
         * @return {HTMLElement} DOM元素，如果不存在，返回null，如果参数不合法，直接返回参数
         */
        baidu.dom._g = function (id) {
            if (baidu.lang.isString(id)) {
                return document.getElementById(id);
            }
            return id;
        };

        // 声明快捷方法
        baidu._g = baidu.dom._g;

        /**
         * @ignore
         * @namespace baidu.browser 判断浏览器类型和特性的属性。
         */
        baidu.browser = baidu.browser || {};

        if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
            //IE 8下，以documentMode为准
            //在百度模板中，可能会有$，防止冲突，将$1 写成 \x241
            /**
             * 判断是否为ie浏览器
             * @property ie ie版本号
             * @grammar baidu.browser.ie
             * @meta standard
             * @shortcut ie
             * @see baidu.browser.firefox,baidu.browser.safari,baidu.browser.opera,baidu.browser.chrome,baidu.browser.maxthon
             */
           baidu.browser.ie = baidu.ie = document.documentMode || + RegExp['\x241'];
        }

        /**
         * 获取目标元素的computed style值。如果元素的样式值不能被浏览器计算，则会返回空字符串（IE）
         *
         * @author berg
         * @name baidu.dom.getComputedStyle
         * @function
         * @grammar baidu.dom.getComputedStyle(element, key)
         * @param {HTMLElement|string} element 目标元素或目标元素的id
         * @param {string} key 要获取的样式名
         *
         * @see baidu.dom.getStyle
         *
         * @returns {string} 目标元素的computed style值
         */

        baidu.dom.getComputedStyle = function(element, key){
            element = baidu.dom._g(element);
            var doc = baidu.dom.getDocument(element),
                styles;
            if (doc.defaultView && doc.defaultView.getComputedStyle) {
                styles = doc.defaultView.getComputedStyle(element, null);
                if (styles) {
                    return styles[key] || styles.getPropertyValue(key);
                }
            }
            return '';
        };

        /**
         * 提供给setStyle与getStyle使用
         */
        baidu.dom._styleFixer = baidu.dom._styleFixer || {};

        /**
         * 提供给setStyle与getStyle使用
         */
        baidu.dom._styleFilter = baidu.dom._styleFilter || [];

        /**
         * 为获取和设置样式的过滤器
         * @private
         * @meta standard
         */
        baidu.dom._styleFilter.filter = function (key, value, method) {
            for (var i = 0, filters = baidu.dom._styleFilter, filter; filter = filters[i]; i++) {
                if (filter = filter[method]) {
                    value = filter(key, value);
                }
            }
            return value;
        };

        /**
           * @ignore
         * @namespace baidu.string 操作字符串的方法。
         */
        baidu.string = baidu.string || {};

        /**
         * 将目标字符串进行驼峰化处理
         * @name baidu.string.toCamelCase
         * @function
         * @grammar baidu.string.toCamelCase(source)
         * @param {string} source 目标字符串
         * @remark
         * 支持单词以“-_”分隔
         * @meta standard
         *
         * @returns {string} 驼峰化处理后的字符串
         */
        baidu.string.toCamelCase = function (source) {
            //提前判断，提高getStyle等的效率 thanks xianwei
            if (source.indexOf('-') < 0 && source.indexOf('_') < 0) {
                return source;
            }
            return source.replace(/[-_][^-_]/g, function (match) {
                return match.charAt(1).toUpperCase();
            });
        };

        /**
         * 获取目标元素的样式值
         * @name baidu.dom.getStyle
         * @function
         * @grammar baidu.dom.getStyle(element, key)
         * @param {HTMLElement|string} element 目标元素或目标元素的id
         * @param {string} key 要获取的样式名
         * @remark
         *
         * 为了精简代码，本模块默认不对任何浏览器返回值进行归一化处理（如使用getStyle时，不同浏览器下可能返回rgb颜色或hex颜色），也不会修复浏览器的bug和差异性（如设置IE的float属性叫styleFloat，firefox则是cssFloat）。<br />
         * baidu.dom._styleFixer和baidu.dom._styleFilter可以为本模块提供支持。<br />
         * 其中_styleFilter能对颜色和px进行归一化处理，_styleFixer能对display，float，opacity，textOverflow的浏览器兼容性bug进行处理。
         * @shortcut getStyle
         * @meta standard
         * @see baidu.dom.setStyle,baidu.dom.setStyles, baidu.dom.getComputedStyle
         *
         * @returns {string} 目标元素的样式值
         */
        baidu.dom.getStyle = function (element, key) {
            var dom = baidu.dom;

            element = dom.g(element);
            key = baidu.string.toCamelCase(key);
            //computed style, then cascaded style, then explicitly set style.
            var value = element.style[key] ||
                        (element.currentStyle ? element.currentStyle[key] : "") ||
                        dom.getComputedStyle(element, key);

            // 在取不到值的时候，用fixer进行修正
            if (!value) {
                var fixer = dom._styleFixer[key];
                if(fixer){
                    value = fixer.get ? fixer.get(element) : baidu.dom.getStyle(element, fixer);
                }
            }

            /* 检查结果过滤器 */
            if (fixer = dom._styleFilter) {
                value = fixer.filter(key, value, 'get');
            }

            return value;
        };

        // 声明快捷方法
        baidu.getStyle = baidu.dom.getStyle;


        if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
        /**
         * 判断是否为opera浏览器
         * @property opera opera版本号
         * @grammar baidu.browser.opera
         * @meta standard
         * @see baidu.browser.ie,baidu.browser.firefox,baidu.browser.safari,baidu.browser.chrome
         */
            baidu.browser.opera = + RegExp['\x241'];
        }

        /**
         * 判断是否为webkit内核
         * @property isWebkit
         * @grammar baidu.browser.isWebkit
         * @meta standard
         * @see baidu.browser.isGecko
         */
        baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);

        /**
         * 判断是否为gecko内核
         * @property isGecko
         * @grammar baidu.browser.isGecko
         * @meta standard
         * @see baidu.browser.isWebkit
         */
        baidu.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);

        /**
         * 判断是否严格标准的渲染模式
         * @property isStrict
         * @grammar baidu.browser.isStrict
         * @meta standard
         */
        baidu.browser.isStrict = document.compatMode == "CSS1Compat";

        /**
         * 获取目标元素相对于整个文档左上角的位置
         * @name baidu.dom.getPosition
         * @function
         * @grammar baidu.dom.getPosition(element)
         * @param {HTMLElement|string} element 目标元素或目标元素的id
         * @meta standard
         *
         * @returns {Object} 目标元素的位置，键值为top和left的Object。
         */
        baidu.dom.getPosition = function (element) {
            element = baidu.dom.g(element);
            var doc = baidu.dom.getDocument(element),
                browser = baidu.browser,
                getStyle = baidu.dom.getStyle,
            // Gecko 1.9版本以下用getBoxObjectFor计算位置
            // 但是某些情况下是有bug的
            // 对于这些有bug的情况
            // 使用递归查找的方式
                BUGGY_GECKO_BOX_OBJECT = browser.isGecko > 0 &&
                                         doc.getBoxObjectFor &&
                                         getStyle(element, 'position') == 'absolute' &&
                                         (element.style.top === '' || element.style.left === ''),
                pos = {"left":0,"top":0},
                viewport = (browser.ie && !browser.isStrict) ? doc.body : doc.documentElement,
                parent,
                box;

            if(element == viewport){
                return pos;
            }

            if(element.getBoundingClientRect){ // IE and Gecko 1.9+

                //当HTML或者BODY有border width时, 原生的getBoundingClientRect返回值是不符合预期的
                //考虑到通常情况下 HTML和BODY的border只会设成0px,所以忽略该问题.
                box = element.getBoundingClientRect();

                pos.left = Math.floor(box.left) + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
                pos.top  = Math.floor(box.top)  + Math.max(doc.documentElement.scrollTop,  doc.body.scrollTop);

                // IE会给HTML元素添加一个border，默认是medium（2px）
                // 但是在IE 6 7 的怪异模式下，可以被html { border: 0; } 这条css规则覆盖
                // 在IE7的标准模式下，border永远是2px，这个值通过clientLeft 和 clientTop取得
                // 但是。。。在IE 6 7的怪异模式，如果用户使用css覆盖了默认的medium
                // clientTop和clientLeft不会更新
                pos.left -= doc.documentElement.clientLeft;
                pos.top  -= doc.documentElement.clientTop;

                var htmlDom = doc.body,
                    // 在这里，不使用element.style.borderLeftWidth，只有computedStyle是可信的
                    htmlBorderLeftWidth = parseInt(getStyle(htmlDom, 'borderLeftWidth')),
                    htmlBorderTopWidth = parseInt(getStyle(htmlDom, 'borderTopWidth'));
                if(browser.ie && !browser.isStrict){
                    pos.left -= isNaN(htmlBorderLeftWidth) ? 2 : htmlBorderLeftWidth;
                    pos.top  -= isNaN(htmlBorderTopWidth) ? 2 : htmlBorderTopWidth;
                }
            } else {
                // safari/opera/firefox
                parent = element;

                do {
                    pos.left += parent.offsetLeft;
                    pos.top  += parent.offsetTop;

                    // safari里面，如果遍历到了一个fixed的元素，后面的offset都不准了
                    if (browser.isWebkit > 0 && getStyle(parent, 'position') == 'fixed') {
                        pos.left += doc.body.scrollLeft;
                        pos.top  += doc.body.scrollTop;
                        break;
                    }

                    parent = parent.offsetParent;
                } while (parent && parent != element);

                // 对body offsetTop的修正
                if(browser.opera > 0 || (browser.isWebkit > 0 && getStyle(element, 'position') == 'absolute')){
                    pos.top  -= doc.body.offsetTop;
                }

                // 计算除了body的scroll
                parent = element.offsetParent;
                while (parent && parent != doc.body) {
                    pos.left -= parent.scrollLeft;
                    // see https://bugs.opera.com/show_bug.cgi?id=249965
                    if (!browser.opera || parent.tagName != 'TR') {
                        pos.top -= parent.scrollTop;
                    }
                    parent = parent.offsetParent;
                }
            }

            return pos;
        };

        /**
         * @ignore
         * @namespace baidu.event 屏蔽浏览器差异性的事件封装。
         * @property target 	事件的触发元素
         * @property pageX 		鼠标事件的鼠标x坐标
         * @property pageY 		鼠标事件的鼠标y坐标
         * @property keyCode 	键盘事件的键值
         */
        baidu.event = baidu.event || {};

        /**
         * 事件监听器的存储表
         * @private
         * @meta standard
         */
        baidu.event._listeners = baidu.event._listeners || [];

        /**
         * 为目标元素添加事件监听器
         * @name baidu.event.on
         * @function
         * @grammar baidu.event.on(element, type, listener)
         * @param {HTMLElement|string|window} element 目标元素或目标元素id
         * @param {string} type 事件类型
         * @param {Function} listener 需要添加的监听器
         * @remark
         *
        1. 不支持跨浏览器的鼠标滚轮事件监听器添加<br>
        2. 改方法不为监听器灌入事件对象，以防止跨iframe事件挂载的事件对象获取失败

         * @shortcut on
         * @meta standard
         * @see baidu.event.un
         *
         * @returns {HTMLElement|window} 目标元素
         */
        baidu.event.on = function (element, type, listener) {
            type = type.replace(/^on/i, '');
            element = baidu.dom._g(element);

            var realListener = function (ev) {
                    // 1. 这里不支持EventArgument,  原因是跨frame的事件挂载
                    // 2. element是为了修正this
                    listener.call(element, ev);
                },
                lis = baidu.event._listeners,
                filter = baidu.event._eventFilter,
                afterFilter,
                realType = type;
            type = type.toLowerCase();
            // filter过滤
            if(filter && filter[type]){
                afterFilter = filter[type](element, type, realListener);
                realType = afterFilter.type;
                realListener = afterFilter.listener;
            }

            // 事件监听器挂载
            if (element.addEventListener) {
                element.addEventListener(realType, realListener, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + realType, realListener);
            }

            // 将监听器存储到数组中
            lis[lis.length] = [element, type, listener, realListener, realType];
            return element;
        };

        // 声明快捷方法
        baidu.on = baidu.event.on;

        /**
         * 返回一个当前页面的唯一标识字符串。
         * @name baidu.lang.guid
         * @function
         * @grammar baidu.lang.guid()
         * @version 1.1.1
         * @meta standard
         *
         * @returns {String} 当前页面的唯一标识字符串
         */

        (function(){
            //不直接使用window，可以提高3倍左右性能
            var guid = window[baidu.guid];

            baidu.lang.guid = function() {
                return "TANGRAM__" + (guid._counter ++).toString(36);
            };

            guid._counter = guid._counter || 1;
        })();

        /**
         * 所有类的实例的容器
         * key为每个实例的guid
         * @meta standard
         */

        window[baidu.guid]._instances = window[baidu.guid]._instances || {};

        /**
         * 判断目标参数是否为function或Function实例
         * @name baidu.lang.isFunction
         * @function
         * @grammar baidu.lang.isFunction(source)
         * @param {Any} source 目标参数
         * @version 1.2
         * @see baidu.lang.isString,baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isArray,baidu.lang.isElement,baidu.lang.isBoolean,baidu.lang.isDate
         * @meta standard
         * @returns {boolean} 类型判断结果
         */
        baidu.lang.isFunction = function (source) {
            // chrome下,'function' == typeof /a/ 为true.
            return '[object Function]' == Object.prototype.toString.call(source);
        };

        /**
         *
         * @ignore
         * @class  Tangram继承机制提供的一个基类，用户可以通过继承baidu.lang.Class来获取它的属性及方法。
         * @name 	baidu.lang.Class
         * @grammar baidu.lang.Class(guid)
         * @param 	{string}	guid	对象的唯一标识
         * @meta standard
         * @remark baidu.lang.Class和它的子类的实例均包含一个全局唯一的标识guid。guid是在构造函数中生成的，因此，继承自baidu.lang.Class的类应该直接或者间接调用它的构造函数。<br>baidu.lang.Class的构造函数中产生guid的方式可以保证guid的唯一性，及每个实例都有一个全局唯一的guid。
         * @meta standard
         * @see baidu.lang.inherits,baidu.lang.Event
         */
        baidu.lang.Class = function(guid) {
            this.guid = guid || baidu.lang.guid();
            window[baidu.guid]._instances[this.guid] = this;
        };
        window[baidu.guid]._instances = window[baidu.guid]._instances || {};

        /**
         * 释放对象所持有的资源，主要是自定义事件。
         * @name dispose
         * @grammar obj.dispose()
         */
        baidu.lang.Class.prototype.dispose = function(){
            delete window[baidu.guid]._instances[this.guid];

            for(var property in this){
                if (!baidu.lang.isFunction(this[property])) {
                    delete this[property];
                }
            }
            this.disposed = true;
        };

        /**
         * 重载了默认的toString方法，使得返回信息更加准确一些。
         * @return {string} 对象的String表示形式
         */
        baidu.lang.Class.prototype.toString = function(){
            return "[object " + (this._className || "Object" ) + "]";
        };

        /**
         * @ignore
         * @class   自定义的事件对象。
         * @name 	baidu.lang.Event
         * @grammar baidu.lang.Event(type[, target])
         * @param 	{string} type	 事件类型名称。为了方便区分事件和一个普通的方法，事件类型名称必须以"on"(小写)开头。
         * @param 	{Object} [target]触发事件的对象
         * @meta standard
         * @remark 引入该模块，会自动为Class引入3个事件扩展方法：addEventListener、removeEventListener和dispatchEvent。
         * @meta standard
         * @see baidu.lang.Class
         */
        baidu.lang.Event = function (type, target) {
            this.type = type;
            this.returnValue = true;
            this.target = target || null;
            this.currentTarget = null;
        };

        /**
         * 注册对象的事件监听器。引入baidu.lang.Event后，Class的子类实例才会获得该方法。
         * @grammar obj.addEventListener(type, handler[, key])
         * @param 	{string}   type         自定义事件的名称
         * @param 	{Function} handler      自定义事件被触发时应该调用的回调函数
         * @param 	{string}   [key]		为事件监听函数指定的名称，可在移除时使用。如果不提供，方法会默认为它生成一个全局唯一的key。
         * @remark 	事件类型区分大小写。如果自定义事件名称不是以小写"on"开头，该方法会给它加上"on"再进行判断，即"click"和"onclick"会被认为是同一种事件。
         */
        baidu.lang.Class.prototype.addEventListener = function (type, handler, key) {
            if (!baidu.lang.isFunction(handler)) {
                return;
            }

            !this.__listeners && (this.__listeners = {});

            var t = this.__listeners, id;
            if (typeof key == "string" && key) {
                if (/[^\w\-]/.test(key)) {
                    throw("nonstandard key:" + key);
                } else {
                    handler.hashCode = key;
                    id = key;
                }
            }
            type.indexOf("on") != 0 && (type = "on" + type);

            typeof t[type] != "object" && (t[type] = {});
            id = id || baidu.lang.guid();
            handler.hashCode = id;
            t[type][id] = handler;
        };

        /**
         * 移除对象的事件监听器。引入baidu.lang.Event后，Class的子类实例才会获得该方法。
         * @grammar obj.removeEventListener(type, handler)
         * @param {string}   type     事件类型
         * @param {Function|string} handler  要移除的事件监听函数或者监听函数的key
         * @remark 	如果第二个参数handler没有被绑定到对应的自定义事件中，什么也不做。
         */
        baidu.lang.Class.prototype.removeEventListener = function (type, handler) {
            if (typeof handler != "undefined") {
                if ( (baidu.lang.isFunction(handler) && ! (handler = handler.hashCode))
                    || (! baidu.lang.isString(handler))
                ){
                    return;
                }
            }

            !this.__listeners && (this.__listeners = {});

            type.indexOf("on") != 0 && (type = "on" + type);

            var t = this.__listeners;
            if (!t[type]) {
                return;
            }
            if (typeof handler != "undefined") {
                t[type][handler] && delete t[type][handler];
            } else {
                for(var guid in t[type]){
                    delete t[type][guid];
                }
            }
        };

        /**
         * 派发自定义事件，使得绑定到自定义事件上面的函数都会被执行。引入baidu.lang.Event后，Class的子类实例才会获得该方法。
         * @grammar obj.dispatchEvent(event, options)
         * @param {baidu.lang.Event|String} event 	Event对象，或事件名称(1.1.1起支持)
         * @param {Object} 					options 扩展参数,所含属性键值会扩展到Event对象上(1.2起支持)
         * @remark 处理会调用通过addEventListenr绑定的自定义事件回调函数之外，还会调用直接绑定到对象上面的自定义事件。例如：<br>
        myobj.onMyEvent = function(){}<br>
        myobj.addEventListener("onMyEvent", function(){});
         */
        baidu.lang.Class.prototype.dispatchEvent = function (event, options) {
            if (baidu.lang.isString(event)) {
                event = new baidu.lang.Event(event);
            }
            !this.__listeners && (this.__listeners = {});

            // 20100603 添加本方法的第二个参数，将 options extend到event中去传递
            options = options || {};
            for (var i in options) {
                event[i] = options[i];
            }

            var i, t = this.__listeners, p = event.type;
            event.target = event.target || this;
            event.currentTarget = this;

            p.indexOf("on") != 0 && (p = "on" + p);

            baidu.lang.isFunction(this[p]) && this[p].apply(this, arguments);

            if (typeof t[p] == "object") {
                for (i in t[p]) {
                    t[p][i].apply(this, arguments);
                }
            }
            return event.returnValue;
        };


        baidu.lang.inherits = function (subClass, superClass, className) {
            var key, proto,
                selfProps = subClass.prototype,
                clazz = new Function();

            clazz.prototype = superClass.prototype;
            proto = subClass.prototype = new clazz();
            for (key in selfProps) {
                proto[key] = selfProps[key];
            }
            subClass.prototype.constructor = subClass;
            subClass.superClass = superClass.prototype;

            // 类名标识，兼容Class的toString，基本没用
            if ("string" == typeof className) {
                proto._className = className;
            }
        };
        // 声明快捷方法
        baidu.inherits = baidu.lang.inherits;
    })();


    /**

     * 图片的路径

     * @private
     * @type {String}

     */
    var _IMAGE_PATH = './img/blue';

    /**

     * 图片的后缀名

      * @private
     * @type {String}

     */
    var _IMAGE_EXTENSION  = 'png';

    /**
     *@exports TextIconOverlay as BMapLib.TextIconOverlay
     */
    var TextIconOverlay =
        /**
        * TextIconOverlay
        * @class 此类表示地图上的一个覆盖物，该覆盖物由文字和图标组成，从Overlay继承。文字通常是数字（0-9）或字母（A-Z ），而文字与图标之间有一定的映射关系。
        *该覆盖物适用于以下类似的场景：需要在地图上添加一系列覆盖物，这些覆盖物之间用不同的图标和文字来区分，文字可能表示了该覆盖物的某一属性值，根据该文字和一定的映射关系，自动匹配相应颜色和大小的图标。
        *
        *@constructor
        *@param {Point} position 表示一个经纬度坐标位置。
        *@param {String} text 表示该覆盖物显示的文字信息。//秦改成obj形式吧
        *@param {Json Object} options 可选参数，可选项包括：<br />
        *"<b>styles</b>":{Array<IconStyle>} 一组图标风格。单个图表风格包括以下几个属性：<br />
        *   url	{String}	 图片的url地址。(必选)<br />
        *   size {Size}	图片的大小。（必选）<br />
        *   anchor {Size} 图标定位在地图上的位置相对于图标左上角的偏移值，默认偏移值为图标的中心位置。（可选）<br />
        *   offset {Size} 图片相对于可视区域的偏移值，此功能的作用等同于CSS中的background-position属性。（可选）<br />
        *   textSize {Number} 文字的大小。（可选，默认10）<br />
        *   textColor {String} 文字的颜色。（可选，默认black）<br />
        */
        BMapLib.TextIconOverlay = function(position, text, options){
            this._position = position;
            this._text = text;
            this._options = options || {};
            this._styles = this._options['styles'] || [];
            (!this._styles.length) && this._setupDefaultStyles();
        };

    T.lang.inherits(TextIconOverlay, BMap.Overlay, "TextIconOverlay");

    TextIconOverlay.prototype._setupDefaultStyles = function(){
        //var sizes = [53, 56, 66, 78, 92];
        // for(var i = 0, size; size = sizes[i]; i++){

        // }//for循环的简洁写法
        // 聚合的数据
        this._styles.push({
            url:_IMAGE_PATH + '.' + _IMAGE_EXTENSION,
            size: new BMap.Size(92, 92)
        });
        //单条数据

    };

    /**
    *继承Overlay的intialize方法，自定义覆盖物时必须。
    *@param {Map} map BMap.Map的实例化对象。
    *@return {HTMLElement} 返回覆盖物对应的HTML元素。
    */
    TextIconOverlay.prototype.initialize = function(map){
        this._map = map;

        this._domElement = document.createElement('div');
        this._updateCss();
        this._updateText();
        this._updatePosition();

        this._bind();

        this._map.getPanes().markerMouseTarget.appendChild(this._domElement);
        return this._domElement;
    };

    /**
    *继承Overlay的draw方法，自定义覆盖物时必须。
    *@return 无返回值。
    */
    TextIconOverlay.prototype.draw = function(){
        this._map && this._updatePosition();
    };

    /**
    *获取该覆盖物上的文字。
    *@return {String} 该覆盖物上的文字。
    */
    TextIconOverlay.prototype.getText = function(){
        return this._text;
    };

    /**
    *设置该覆盖物上的文字。
    *@param {String} text 要设置的文字，通常是字母A-Z或数字0-9。
    *@return 无返回值。
    */
    TextIconOverlay.prototype.setText = function(text){
        if(text && (!this._text || (this._text.value != text.value) || (this._text.name != text.name) || (this._text.span != text.span))){
            this._text = text;
            this._updateText();
            this._updateCss();
            this._updatePosition();
        }
    };

    /**
    *获取该覆盖物的位置。
    *@return {Point} 该覆盖物的经纬度坐标。
    */
    TextIconOverlay.prototype.getPosition = function () {
        return this._position;
    };

    /**
    *设置该覆盖物的位置。
    *@param {Point}  position 要设置的经纬度坐标。
    *@return 无返回值。
    */
    TextIconOverlay.prototype.setPosition = function (position) {
        if(position && (!this._position || !this._position.equals(position))){
            this._position = position;
            this._updatePosition();
        }
    };

    /**
    *由文字信息获取风格数组的对应索引值。
    *内部默认的对应函数为文字转换为数字除以10的结果，比如文字8返回索引0，文字25返回索引2.
    *如果需要自定义映射关系，请覆盖该函数。
    *@param {String} text  文字。
    *@param {Array<IconStyle>}  styles 一组图标风格。
    *@return {Number} 对应的索引值。
    *2017-2-17 09:03:58废除
    */
    // TextIconOverlay.prototype.getStyleByText = function(text, styles){
    //     var count = parseInt(text.value);
    //     var index = parseInt(count / 10);
    //     index = Math.max(0, index);
    //     index = Math.min(index, styles.length - 1);
    //     return styles[index];
    // }

    /**
    *更新相应的CSS。
    *@return 无返回值。
    */
    TextIconOverlay.prototype._updateCss = function(){
        //var style = this.getStyleByText(this._text, this._styles);
        var style = this._styles[0];
        this._domElement.style.cssText = this._buildCssText(style);
    };

    /**
    *更新覆盖物的显示文字。
    *@return 无返回值。
    */
    TextIconOverlay.prototype._updateText = function(){
        if (this._domElement) {
            this._domElement.innerHTML = '<p>'+this._text.name+'</p>'+'<p>'+this._text.value+this._text.span+'</p>';
        }
    };

    /**
    *调整覆盖物在地图上的位置更新覆盖物的显示文字。
    *@return 无返回值。
    */
    TextIconOverlay.prototype._updatePosition = function(){
        if (this._domElement && this._position) {
            var style = this._domElement.style;
            var pixelPosition= this._map.pointToOverlayPixel(this._position);
            pixelPosition.x -= Math.ceil(parseInt(style.width) / 2);
            pixelPosition.y -= Math.ceil(parseInt(style.height) / 2);
            style.left = pixelPosition.x + "px";
            style.top = pixelPosition.y + "px";
        }
    };

    /**
    * 为该覆盖物的HTML元素构建CSS
    * @param {IconStyle}  一个图标的风格。
    * @return {String} 构建完成的CSSTEXT。
    */
    TextIconOverlay.prototype._buildCssText = function(style) {
        //根据style来确定一些默认值
        var url = style['url'];
        var size = style['size'];
        var anchor = style['anchor'];
        var offset = style['offset'];
        var textColor = style['textColor'] || '#fff';
        var textSize = style['textSize'] || 10;

        var csstext = [];
        if (T.browser["ie"] < 7) {
            csstext.push('filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(' +
                'sizingMethod=scale,src="' + url + '");')
        } else {
            csstext.push('background-image:url(' + url + ');');
            var backgroundPosition = '0 0';
            (offset instanceof BMap.Size) && (backgroundPosition = offset.width + 'px' + ' ' + offset.height + 'px');
            csstext.push('background-position:' + backgroundPosition + ';');
        }

        if (size instanceof BMap.Size){
            if (anchor instanceof BMap.Size) {
                if (anchor.height > 0 && anchor.height < size.height) {
                      csstext.push('height:' + (size.height - anchor.height) + 'px; padding-top:' + anchor.height + 'px;');
                }
                if(anchor.width > 0 && anchor.width < size.width){
                    csstext.push('width:' + (size.width - anchor.width) + 'px; padding-left:' + anchor.width + 'px;');
                }
            } else {
                csstext.push('height:' + size.height + 'px; line-height:' + 20 + 'px;');
                csstext.push('width:' + size.width + 'px; text-align:center;');
            }
        }

        csstext.push('cursor:pointer; color:' + textColor + '; position:absolute; font-size:' +
            textSize + 'px; font-family:Arial,sans-serif; font-weight:bold');
        return csstext.join('');
    };


    /**

     * 当鼠标点击该覆盖物时会触发该事件

     * @name TextIconOverlay#click

     * @event

     * @param {Event Object} e 回调函数会返回event参数，包括以下返回值：

     * <br />"<b>type</b> : {String} 事件类型

     * <br />"<b>target</b>：{BMapLib.TextIconOverlay} 事件目标

     *

     */

    /**

     * 当鼠标进入该覆盖物区域时会触发该事件

     * @name TextIconOverlay#mouseover

     * @event
     * @param {Event Object} e 回调函数会返回event参数，包括以下返回值：

     * <br />"<b>type</b> : {String} 事件类型

     * <br />"<b>target</b>：{BMapLib.TextIconOverlay} 事件目标

     * <br />"<b>point</b> : {BMap.Point} 最新添加上的节点BMap.Point对象

     * <br />"<b>pixel</b>：{BMap.pixel} 最新添加上的节点BMap.Pixel对象

     *

     * @example <b>参考示例：</b><br />

     * myTextIconOverlay.addEventListener("mouseover", function(e) {  alert(e.point);  });

     */

    /**

     * 当鼠标离开该覆盖物区域时会触发该事件

     * @name TextIconOverlay#mouseout

     * @event

     * @param {Event Object} e 回调函数会返回event参数，包括以下返回值：

     * <br />"<b>type</b> : {String} 事件类型

     * <br />"<b>target</b>：{BMapLib.TextIconOverlay} 事件目标

     * <br />"<b>point</b> : {BMap.Point} 最新添加上的节点BMap.Point对象

     * <br />"<b>pixel</b>：{BMap.pixel} 最新添加上的节点BMap.Pixel对象

     *

     * @example <b>参考示例：</b><br />

     * myTextIconOverlay.addEventListener("mouseout", function(e) {  alert(e.point);  });

     */


    /**
    * 为该覆盖物绑定一系列事件
    * 当前支持click mouseover mouseout
    * @return 无返回值。
    */
    TextIconOverlay.prototype._bind = function(){
        if (!this._domElement){
            return;
        }

        var me = this;
        var map = this._map;

        var BaseEvent = T.lang.Event;
        function eventExtend(e, be){
            var elem = e.srcElement || e.target;
            var x = e.clientX || e.pageX;
            var y = e.clientY || e.pageY;
            if (e && be && x && y && elem){
                var offset = T.dom.getPosition(map.getContainer());
                be.pixel = new BMap.Pixel(x - offset.left, y - offset.top);
                be.point = map.pixelToPoint(be.pixel);
            }
            return be;
        }//给事件参数增加pixel和point两个值

        T.event.on(this._domElement,"mouseover", function(e){
            me.dispatchEvent(eventExtend(e, new BaseEvent("onmouseover")));
        });
        T.event.on(this._domElement,"mouseout", function(e){
            me.dispatchEvent(eventExtend(e, new BaseEvent("onmouseout")));
        });
        T.event.on(this._domElement,"click", function(e){
            me.dispatchEvent(eventExtend(e, new BaseEvent("onclick")));
        });
    };

})();
/**
 * @fileoverview MarkerClusterer标记聚合器用来解决加载大量点要素到地图上产生覆盖现象的问题，并提高性能。
 * 主入口类是<a href="symbols/BMapLib.MarkerClusterer.html">MarkerClusterer</a>，
 * 基于Baidu Map API 1.2。
 *
 * @author Baidu Map Api Group
 * @version 1.2
 */


/**
 * @namespace BMap的所有library类均放在BMapLib命名空间下
 */
var BMapLib = window.BMapLib = BMapLib || {};
(function(){

    /**
     * 获取一个扩展的视图范围，把上下左右都扩大一样的像素值。
     * @param {Map} map BMap.Map的实例化对象
     * @param {BMap.Bounds} bounds BMap.Bounds的实例化对象
     * @param {Number} gridSize 要扩大的像素值
     *
     * @return {BMap.Bounds} 返回扩大后的视图范围。
     */
    var getExtendedBounds = function(map, bounds, gridSize){
        bounds = cutBoundsInRange(bounds);
        var pixelNE = map.pointToPixel(bounds.getNorthEast());
        var pixelSW = map.pointToPixel(bounds.getSouthWest());
        pixelNE.x += gridSize;
        pixelNE.y -= gridSize;
        pixelSW.x -= gridSize;
        pixelSW.y += gridSize;
        var newNE = map.pixelToPoint(pixelNE);
        var newSW = map.pixelToPoint(pixelSW);
        return new BMap.Bounds(newSW, newNE);
    };

    /**
     * 按照百度地图支持的世界范围对bounds进行边界处理
     * @param {BMap.Bounds} bounds BMap.Bounds的实例化对象
     *
     * @return {BMap.Bounds} 返回不越界的视图范围
     */
    var cutBoundsInRange = function (bounds) {
        var maxX = getRange(bounds.getNorthEast().lng, -180, 180);
        var minX = getRange(bounds.getSouthWest().lng, -180, 180);
        var maxY = getRange(bounds.getNorthEast().lat, -74, 74);
        var minY = getRange(bounds.getSouthWest().lat, -74, 74);
        return new BMap.Bounds(new BMap.Point(minX, minY), new BMap.Point(maxX, maxY));
    };

    /**
     * 对单个值进行边界处理。
     * @param {Number} i 要处理的数值
     * @param {Number} min 下边界值
     * @param {Number} max 上边界值
     *
     * @return {Number} 返回不越界的数值
     */
    var getRange = function (i, mix, max) {
        mix && (i = Math.max(i, mix));
        max && (i = Math.min(i, max));
        return i;
    };

    /**
     * 判断给定的对象是否为数组
     * @param {Object} source 要测试的对象
     *
     * @return {Boolean} 如果是数组返回true，否则返回false
     */
    var isArray = function (source) {
        return '[object Array]' === Object.prototype.toString.call(source);
    };

    /**
     * 返回item在source中的索引位置
     * @param {Object} item 要测试的对象
     * @param {Array} source 数组
     *
     * @return {Number} 如果在数组内，返回索引，否则返回-1
     */
    var indexOf = function(item, source){
        var index = -1;
        if(isArray(source)){
            if (source.indexOf) {
                index = source.indexOf(item);
            } else {
                for (var i = 0, m; m = source[i]; i++) {
                    if (m === item) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    };

    /**
     *@exports MarkerClusterer as BMapLib.MarkerClusterer
     */
    var MarkerClusterer =
        /**
         * MarkerClusterer
         * @class 用来解决加载大量点要素到地图上产生覆盖现象的问题，并提高性能
         * @constructor
         * @param {Map} map 地图的一个实例。
         * @param {Json Object} options 可选参数，可选项包括：<br />
         *    markers {Array<Marker>} 要聚合的标记数组<br />
         *    girdSize {Number} 聚合计算时网格的像素大小，默认60<br />
         *    maxZoom {Number} 最大的聚合级别，大于该级别就不进行相应的聚合<br />
         *    minClusterSize {Number} 最小的聚合数量，小于该数量的不能成为一个聚合，默认为2<br />
         *    isAverangeCenter {Boolean} 聚合点的落脚位置是否是所有聚合在内点的平均值，默认为否，落脚在聚合内的第一个点<br />
         *    styles {Array<IconStyle>} 自定义聚合后的图标风格，请参考TextIconOverlay类<br />
         */
        BMapLib.MarkerClusterer = function(map, options){
            if (!map){
                return;
            }
            this._map = map;
            this._markers = [];//所有的点位
            this._clusters = [];//聚合的数组

            var opts = options || {};
            this._gridSize = opts["gridSize"] || 60;
            this._maxZoom = opts["maxZoom"] || 18;
            this._minClusterSize = opts["minClusterSize"] || 1;
            this._isAverageCenter = false;
            if (opts['isAverageCenter'] != undefined) {
                this._isAverageCenter = opts['isAverageCenter'];
            }
            this._styles = opts["styles"] || [];

            var that = this;
            this._map.addEventListener("zoomend",function(){
                that._redraw();
            });

            this._map.addEventListener("moveend",function(){
                 that._redraw();
            });

            var mkrs = opts["markers"];
            isArray(mkrs) && this.addMarkers(mkrs);
        };

    /**
     * 添加要聚合的标记数组。
     * @param {Array<Marker>} markers 要聚合的标记数组
     *
     * @return 无返回值。
     */
    MarkerClusterer.prototype.addMarkers = function(markers){
        for(var i = 0, len = markers.length; i <len ; i++){
            this._pushMarkerTo(markers[i]);
        }
        this._createClusters();
    };

    /**
     * 把一个标记添加到要聚合的标记数组中
     * @param {BMap.Marker} marker 要添加的标记
     *
     * @return 无返回值。
     */
    MarkerClusterer.prototype._pushMarkerTo = function(marker){
        var index = indexOf(marker, this._markers);
        if(index === -1){
            marker.isInCluster = false;
            this._markers.push(marker);//Marker拖放后enableDragging不做变化，忽略
        }
    };

    /**
     * 添加一个聚合的标记。
     * @param {BMap.Marker} marker 要聚合的单个标记。
     * @return 无返回值。
     */
    MarkerClusterer.prototype.addMarker = function(marker) {
        this._pushMarkerTo(marker);
        this._createClusters();
    };

    /**
     * 根据所给定的标记，创建聚合点
     * @return 无返回值
     */
    MarkerClusterer.prototype._createClusters = function(){
        var mapBounds = this._map.getBounds();
        var extendedBounds = getExtendedBounds(this._map, mapBounds, this._gridSize);
        for(var i = 0, marker; marker = this._markers[i]; i++){
            if(!marker.isInCluster && extendedBounds.containsPoint(marker.getPosition()) ){
                this._addToClosestCluster(marker);
            }
        }
    };

    /**
     * 根据标记的位置，把它添加到最近的聚合中
     * @param {BMap.Marker} marker 要进行聚合的单个标记
     *
     * @return 无返回值。
     */
    MarkerClusterer.prototype._addToClosestCluster = function (marker){
        var distance = 4000000;
        var clusterToAddTo = null;
        var position = marker.getPosition();
        for(var i = 0, cluster; cluster = this._clusters[i]; i++){
            var center = cluster.getCenter();
            if(center){
                var d = this._map.getDistance(center, marker.getPosition());
                if(d < distance){
                    distance = d;
                    clusterToAddTo = cluster;
                }
            }
        }
        if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)){
            clusterToAddTo.addMarker(marker);
        } else {
            //单个标记
            var cluster = new Cluster(this);
            cluster.addMarker(marker);
            this._clusters.push(cluster);
        }
    };

    /**
     * 清除上一次的聚合的结果
     * @return 无返回值。
     */
    MarkerClusterer.prototype._clearLastClusters = function(){
        for(var i = 0, cluster; cluster = this._clusters[i]; i++){
            cluster.remove();
        }
        this._clusters = [];//置空Cluster数组
        this._removeMarkersFromCluster();//把Marker的cluster标记设为false
    };

    /**
     * 清除某个聚合中的所有标记
     * @return 无返回值
     */
    MarkerClusterer.prototype._removeMarkersFromCluster = function(){
        for(var i = 0, marker; marker = this._markers[i]; i++){
            marker.isInCluster = false;
        }
    };

    /**
     * 把所有的标记从地图上清除
     * @return 无返回值
     */
    MarkerClusterer.prototype._removeMarkersFromMap = function(){
        for(var i = 0, marker; marker = this._markers[i]; i++){
            marker.isInCluster = false;
            this._map.removeOverlay(marker);
        }
    };

    /**
     * 删除单个标记
     * @param {BMap.Marker} marker 需要被删除的marker
     *
     * @return {Boolean} 删除成功返回true，否则返回false
     */
    MarkerClusterer.prototype._removeMarker = function(marker) {
        var index = indexOf(marker, this._markers);
        if (index === -1) {
            return false;
        }
        this._map.removeOverlay(marker);
        this._markers.splice(index, 1);
        return true;
    };

    /**
     * 删除单个标记
     * @param {BMap.Marker} marker 需要被删除的marker
     *
     * @return {Boolean} 删除成功返回true，否则返回false
     */
    MarkerClusterer.prototype.removeMarker = function(marker) {
        var success = this._removeMarker(marker);
        if (success) {
            this._clearLastClusters();
            this._createClusters();
        }
        return success;
    };

    /**
     * 删除一组标记
     * @param {Array<BMap.Marker>} markers 需要被删除的marker数组
     *
     * @return {Boolean} 删除成功返回true，否则返回false
     */
    MarkerClusterer.prototype.removeMarkers = function(markers) {
        var success = false;
        for (var i = 0; i < markers.length; i++) {
            var r = this._removeMarker(markers[i]);
            success = success || r;
        }

        if (success) {
            this._clearLastClusters();
            this._createClusters();
        }
        return success;
    };

    /**
     * 从地图上彻底清除所有的标记
     * @return 无返回值
     */
    MarkerClusterer.prototype.clearMarkers = function() {
        this._clearLastClusters();
        this._removeMarkersFromMap();
        this._markers = [];
    };

    /**
     * 重新生成，比如改变了属性等
     * @return 无返回值
     */
    MarkerClusterer.prototype._redraw = function () {
        this._clearLastClusters();
        //this._map.clearOverlays();
        this._createClusters();
    };

    /**
     * 获取网格大小
     * @return {Number} 网格大小
     */
    MarkerClusterer.prototype.getGridSize = function() {
        return this._gridSize;
    };

    /**
     * 设置网格大小
     * @param {Number} size 网格大小
     * @return 无返回值
     */
    MarkerClusterer.prototype.setGridSize = function(size) {
        this._gridSize = size;
        this._redraw();
    };

    /**
     * 获取聚合的最大缩放级别。
     * @return {Number} 聚合的最大缩放级别。
     */
    MarkerClusterer.prototype.getMaxZoom = function() {
        return this._maxZoom;
    };

    /**
     * 设置聚合的最大缩放级别
     * @param {Number} maxZoom 聚合的最大缩放级别
     * @return 无返回值
     */
    MarkerClusterer.prototype.setMaxZoom = function(maxZoom) {
        this._maxZoom = maxZoom;
        this._redraw();
    };

    /**
     * 获取聚合的样式风格集合
     * @return {Array<IconStyle>} 聚合的样式风格集合
     */
    MarkerClusterer.prototype.getStyles = function() {
        return this._styles;
    };

    /**
     * 设置聚合的样式风格集合
     * @param {Array<IconStyle>} styles 样式风格数组
     * @return 无返回值
     */
    MarkerClusterer.prototype.setStyles = function(styles) {
        this._styles = styles;
        this._redraw();
    };

    /**
     * 获取单个聚合的最小数量。
     * @return {Number} 单个聚合的最小数量。
     */
    MarkerClusterer.prototype.getMinClusterSize = function() {
        return this._minClusterSize;
    };

    /**
     * 设置单个聚合的最小数量。
     * @param {Number} size 单个聚合的最小数量。
     * @return 无返回值。
     */
    MarkerClusterer.prototype.setMinClusterSize = function(size) {
        this._minClusterSize = size;
        this._redraw();
    };

    /**
     * 获取单个聚合的落脚点是否是聚合内所有标记的平均中心。
     * @return {Boolean} true或false。
     */
    MarkerClusterer.prototype.isAverageCenter = function() {
        return this._isAverageCenter;
    };

    /**
     * 获取聚合的Map实例。
     * @return {Map} Map的示例。
     */
    MarkerClusterer.prototype.getMap = function() {
      return this._map;
    };

    /**
     * 获取所有的标记数组。
     * @return {Array<Marker>} 标记数组。
     */
    MarkerClusterer.prototype.getMarkers = function() {
        return this._markers;
    };

    /**
     * 获取聚合的总数量。
     * @return {Number} 聚合的总数量。
     */
    MarkerClusterer.prototype.getClustersCount = function() {
        var count = 0;
		for(var i = 0, cluster; cluster = this._clusters[i]; i++){
            cluster.isReal() && count++;
        }
		return count;
    };

    /**
     * @ignore
     * Cluster
     * @class 表示一个聚合对象，该聚合，包含有N个标记，这N个标记组成的范围，并有予以显示在Map上的TextIconOverlay等。
     * @constructor
     * @param {MarkerClusterer} markerClusterer 一个标记聚合器示例。
     */
    var n = 0
    function Cluster(markerClusterer){
        this._markerClusterer = markerClusterer;
        this._map = markerClusterer.getMap();
        this._minClusterSize = markerClusterer.getMinClusterSize();
        this._isAverageCenter = markerClusterer.isAverageCenter();
        this._center = null;//落脚位置
        this._markers = [];//这个Cluster中所包含的markers
        this._gridBounds = null;//以中心点为准，向四边扩大gridSize个像素的范围，也即网格范围
		this._isReal = false; //真的是个聚合
        this._styles = markerClusterer.getStyles();
        this._labels = [];
        this._clusterMarker = new BMapLib.TextIconOverlay(this._center, {name:'共找到',value : this._markers.length,span:n}, {"styles":this._markerClusterer.getStyles()});
        //this._map.addOverlay(this._clusterMarker);
    }

    /**
     * 向该聚合添加一个标记。
     * @param {Marker} marker 要添加的标记。
     * @return 无返回值。
     */
    Cluster.prototype.addMarker = function(marker){
        if(this.isMarkerInCluster(marker)){
            return false;
        }//也可用marker.isInCluster判断,外面判断OK，这里基本不会命中

        if (!this._center){
            this._center = marker.getPosition();
            this.updateGridBounds();//
        } else {
            if(this._isAverageCenter){
                var l = this._markers.length + 1;
                var lat = (this._center.lat * (l - 1) + marker.getPosition().lat) / l;
                var lng = (this._center.lng * (l - 1) + marker.getPosition().lng) / l;
                this._center = new BMap.Point(lng, lat);
                this.updateGridBounds();
            }//计算新的Center
        }

        marker.isInCluster = true;
        this._markers.push(marker);

        var len = this._markers.length;
        if(len < this._minClusterSize ){
            this._map.addOverlay(marker);
			//this.updateClusterMarker();
            return true;
        } else if (len === this._minClusterSize) {
            for (var i = 0; i < len; i++) {
                this._markers[i].getMap() && this._map.removeOverlay(this._markers[i]);
            }

        }
        this._map.addOverlay(this._clusterMarker);
		this._isReal = true;
        this.updateClusterMarker();
        return true;
    };

    /**
     * 判断一个标记是否在该聚合中。
     * @param {Marker} marker 要判断的标记。
     * @return {Boolean} true或false。
     */
    Cluster.prototype.isMarkerInCluster= function(marker){
        if (this._markers.indexOf) {
            return this._markers.indexOf(marker) != -1;
        } else {
            for (var i = 0, m; m = this._markers[i]; i++) {
                if (m === marker) {
                    return true;
                }
            }
        }
        return false;
    };

    /**
     * 判断一个标记是否在该聚合网格范围中。
     * @param {Marker} marker 要判断的标记。
     * @return {Boolean} true或false。
     */
    Cluster.prototype.isMarkerInClusterBounds = function(marker) {
        return this._gridBounds.containsPoint(marker.getPosition());
    };

	Cluster.prototype.isReal = function(marker) {
        return this._isReal;
    };

    /**
     * 更新该聚合的网格范围。
     * @return 无返回值。
     */
    Cluster.prototype.updateGridBounds = function() {
        var bounds = new BMap.Bounds(this._center, this._center);
        this._gridBounds = getExtendedBounds(this._map, bounds, this._markerClusterer.getGridSize());
    };

    /**
     * 对于单个点添加label
     */
    Cluster.prototype.addLabel = function (marker) {
        //获取marker的坐标
        var position = marker.getPosition();
        //创建label
        var label = new BMap.Label({position : position});
        label.setStyle({
            height : '25px',
            color : "#fff",
            backgroundColor : this._styles[0].backgroundColor,
            border : 'none',
            borderRadius : "4px",
            fontWeight : 'bold',
        });
		var data = marker.point.data
    var span = marker.point.span
    var name = marker.point.sname
        var content = '<span style="color:'+this._styles[0].backgroundColor+'"><i class="fa fa-map-marker"></i></span>'+'<p style="padding:0px 13px;text-align:center;margin-top:5px;"><a style="display:inline-block;margin-right:10px;color:#ffffff;" >' + name + '</a><a style="display:inline-block;margin-right:10px;color:#ffffff;" >'+"空位" + data + '</a><a style="color:#ffffff;">'+"已选" +  span + '</a></p>';
        label.setContent(content)
        label.setPosition(position);
        this._labels.push(label);
        this._map.addOverlay(label);
    }
    /**
     * 更新该聚合的显示样式，也即TextIconOverlay。
     * @return 无返回值。
     */
    Cluster.prototype.updateClusterMarker = function () {
        if (this._map.getZoom() > this._markerClusterer.getMaxZoom()) {
            this._clusterMarker && this._map.removeOverlay(this._clusterMarker);
            for (var i = 0, marker; marker = this._markers[i]; i++) {
                //this._map.addOverlay(marker);
                this.addLabel(marker);
            }
            return;
        }

        if (this._markers.length < this._minClusterSize) {
            this._clusterMarker.hide();
            return;
        }

        this._clusterMarker.setPosition(this._center);
		var n = 0
		for(var i = 0;i<this._markers.length;i++){
			n += this._markers[i].point.data
		}
		// console.log(n)
        this._clusterMarker.setText({name : '共找到' , value : this._markers.length,span:n });
		
		
		
        var thatMap = this._map;
        var thatBounds = this.getBounds();
        var center = this._center;
        this._clusterMarker.addEventListener("click", function(event){
            //这个方法容易造成晃动
            //thatMap.setViewport(thatBounds);
            //console.log(center);
            var zoom = thatMap.getZoom();
            zoom = zoom > 14 ? zoom : 14;
            thatMap.setZoom(zoom);
            thatMap.setCenter(center);
        });

    };

    /**
     * 删除该聚合。
     * @return 无返回值。
     */
    Cluster.prototype.remove = function(){
        for (var i = 0, m; m = this._labels[i]; i++) {
                this._map.removeOverlay(m);
        }//清除散的标记点

        this._map.removeOverlay(this._clusterMarker);
        this._markers.length = 0;
        delete this._markers;
    }

    /**
     * 获取该聚合所包含的所有标记的最小外接矩形的范围。
     * @return {BMap.Bounds} 计算出的范围。
     */
    Cluster.prototype.getBounds = function() {
        var bounds = new BMap.Bounds(this._center,this._center);
        for (var i = 0, marker; marker = this._markers[i]; i++) {
            bounds.extend(marker.getPosition());
        }
        return bounds;
    };

    /**
     * 获取该聚合的落脚点。
     * @return {BMap.Point} 该聚合的落脚点。
     */
    Cluster.prototype.getCenter = function() {
        return this._center;
    };

})();

export default {  
    
    props: ['getPClass','getPClass1'],
  data: () => ({  
    address_detail: null, // 详细地址  
    userlocation: {lng: '', lat: ''},
    
  }), 
  watch:{
        getPClass:{
            handler(val, oldVal){
                // console.log(val)
                // console.log(oldVal)
                this.getData()
            }
        },
        getPClass1:{
            handler(val, oldVal){
                console.log(val)
                console.log(oldVal)
                // this.getData()
            }
        },
    }, 
  created () {  
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子  
    this.loadMap()  
    // this.ready() // 如果在此处直接调用this.ready()方法，将无法加载地图  
  },  
  mounted () {  
    this.ready()  
  },  
  methods: {  
      
      
    loadMap: function () {  
      // setTimeout(this.ready, 0)  
    },  
    ready: function () {  
      var th = this
      var map = new BMap.Map('allmap')  
      var point = new BMap.Point(114.313818,30.58309) // 创建点坐标  
      map.centerAndZoom(point,5) 
      // var marker = new BMap.Marker(point);// 创建标注
    // map.addOverlay(marker);             // 将标注添加到地图中 
    // marker.enableDragging();
      map.enableScrollWheelZoom()    // 启用滚轮放大缩小，默认禁用  
      
    map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    var bs = map.getBounds();   //获取可视区域
    var bssw = bs.getSouthWest();   //可视区域左下角
    var bsne = bs.getNorthEast();   //可视区域右上角
    var topLat = bsne.lat;
    var bottomLat = bssw.lat;
    var leftLng = bssw.lng;
    var rightLng = bsne.lng;
    
    var jb = map.getZoom()
    var jbb
    if(jb<=7){
        jbb = 1
    }else if(jb>=8 && jb<=10){
        jbb = 2
    }else if(jb>=11 && jb<=13){
        jbb = 3
    }else if(jb>=14){
        jbb = 4
    }
    th.$emit("listentochild1",jbb)
    th.$emit("listentochild2",rightLng)
    th.$emit("listentochild3",topLat)
    th.$emit("listentochild4",leftLng)
    th.$emit("listentochild5",bottomLat)

     map.addEventListener("moving", getBoundary);
     map.addEventListener("resize", getBoundary);
     map.addEventListener("dblclick", getBoundary1);
    //  map.addEventListener("DOMMouseScroll", getBoundary);
     function getBoundary(){
     	var bs = map.getBounds();   //获取可视区域
	    var bssw = bs.getSouthWest();   //可视区域左下角
	    var bsne = bs.getNorthEast();   //可视区域右上角
	    var topLat = bsne.lat;
	    var bottomLat = bssw.lat;
	    var leftLng = bssw.lng;
	    var rightLng = bsne.lng;
	    
	    var jb = map.getZoom()
        var jbb
        if(jb<=7){
            jbb = 1
        }else if(jb>=8 && jb<=10){
            jbb = 2
        }else if(jb>=11 && jb<=13){
            jbb = 3
        }else if(jb>=14){
            jbb = 4
        }
        // console.log(jbb)
        // console.log( "x:"+ rightLng + ",y:"+topLat ) 
	    // console.log( "x:"+ leftLng + ",y:"+bottomLat ) 
        th.$emit("listentochild1",jbb)
        th.$emit("listentochild2",rightLng)
        th.$emit("listentochild3",topLat)
        th.$emit("listentochild4",leftLng)
        th.$emit("listentochild5",bottomLat)
     }

     function getBoundary1(){
     	var bs = map.getBounds();   //获取可视区域
	    var bssw = bs.getSouthWest();   //可视区域左下角
	    var bsne = bs.getNorthEast();   //可视区域右上角
	    var topLat = bsne.lat;
	    var bottomLat = bssw.lat;
	    var leftLng = bssw.lng;
	    var rightLng = bsne.lng;
	    n = n+1
	    var jb = map.getZoom()
        var jbb
        if(jb<=7){
            jbb = 1
        }else if(jb>=8 && jb<=10){
            jbb = 2
        }else if(jb>=11 && jb<=13){
            jbb = 3
        }else if(jb>=14){
            jbb = 4
        }
        // console.log(jbb)
        // console.log( "x:"+ rightLng + ",y:"+topLat ) 
	    // console.log( "x:"+ leftLng + ",y:"+bottomLat ) 
        th.$emit("listentochild1",jbb)
        th.$emit("listentochild2",rightLng)
        th.$emit("listentochild3",topLat)
        th.$emit("listentochild4",leftLng)
        th.$emit("listentochild5",bottomLat)
     }

    

	var scrollFunc=function(e){
        e=e || window.event;
         var jb = map.getZoom()
        var jbb
        if(jb<=7){
            jbb = 1
        }else if(jb>=8 && jb<=10){
            jbb = 2
        }else if(jb>=11 && jb<=13){
            jbb = 3
        }else if(jb>=14){
            jbb = 4
        }
        // console.log(jbb)
        // th.$emit("listentochild1",jbb)
     	var bs = map.getBounds();   //获取可视区域
	    var bssw = bs.getSouthWest();   //可视区域左下角
	    var bsne = bs.getNorthEast();   //可视区域右上角
	    var topLat = bsne.lat;
	    var bottomLat = bssw.lat;
	    var leftLng = bssw.lng;
        var rightLng = bsne.lng;
        if (event.delta < 0) {
             n--
        }else{
            n++
        }
	    // console.log( "x:"+ rightLng + ",y:"+topLat ) 
        // console.log( "x:"+ leftLng + ",y:"+bottomLat ) 
        th.$emit("listentochild1",jbb)
        th.$emit("listentochild2",rightLng)
        th.$emit("listentochild3",topLat)
        th.$emit("listentochild4",leftLng)
        th.$emit("listentochild5",bottomLat)
    }
    /*注册事件*/
    if(document.addEventListener){
        document.addEventListener('DOMMouseScroll',scrollFunc,false);
        document.addEventListener('DOMMouseScroll',getBoundary,false);
    }//W3C
    map.onmousewheel = document.onmousewheel=scrollFunc;//IE/Opera/Chrome

     var xy =  [
        // {'x':114.261238,'y':30.64144,'label':501,'span':151,'sname':'佛祖领社区'},
        // {'x':114.249165,'y':30.547435,'label':500,'span':150,'sname':'佛祖领社区'},
        // {'x':114.292284,'y':30.490689,'label':502,'span':152,'sname':'佛祖领社区'},
        // {'x':114.398643,'y':30.491685,'label':503,'span':153,'sname':'佛祖领社区'},
        // {'x':114.361849,'y':30.614591,'label':504,'span':154,'sname':'佛祖领社区'},
        // {'x':114.248015,'y':30.642931,'label':505,'span':155,'sname':'佛祖领社区'},
        // {'x':114.430839,'y':30.613099,'label':506,'span':156,'sname':'佛祖领社区'},
        // {'x':114.166952,'y':30.523546,'label':507,'span':157,'sname':'佛祖领社区'},
        // {'x':114.322754,'y':30.612602,'label':508,'span':157,'sname':'佛祖领社区'},
        // {'x':114.418765,'y':30.518568,'label':509,'span':158,'sname':'佛祖领社区'},
        // {'x':114.261813,'y':30.624039,'label':510,'span':160,'sname':'佛祖领社区'},
        // {'x':114.381396,'y':30.420457,'label':511,'span':161,'sname':'佛祖领社区'}
      ];
    //   console.log(xy)
      var xyhunan = [
        // {'x':113.020571,'y':28.199938,'label':501,'span':151,'sname':'佛祖领社区'},
        // {'x':113.089561,'y':28.186184,'label':500,'span':150,'sname':'佛祖领社区'},
        // {'x':112.881441,'y':28.30176,'label':502,'span':152,'sname':'佛祖领社区'},
        // {'x':113.225241,'y':28.192806,'label':503,'span':153,'sname':'佛祖领社区'},
        // {'x':113.06254,'y':28.242715,'label':504,'span':154,'sname':'佛祖领社区'},
        // {'x':112.899838,'y':28.191278,'label':505,'span':155,'sname':'佛祖领社区'},
        // {'x':113.014822,'y':28.072522,'label':506,'span':156,'sname':'佛祖领社区'},
        // {'x':113.010797,'y':28.039369,'label':507,'span':157,'sname':'佛祖领社区'},
        // {'x':112.946982,'y':28.261043,'label':508,'span':157,'sname':'佛祖领社区'},
        // {'x':113.010797,'y':28.177524,'label':509,'span':158,'sname':'佛祖领社区'},
        // {'x':113.109108,'y':28.272242,'label':510,'span':160,'sname':'佛祖领社区'},
        // {'x':112.954455,'y':28.235587,'label':511,'span':161,'sname':'佛祖领社区'}
      ];

      var xyjiangxi = [
        // {'x':115.927344,'y':28.667504,'label':501,'span':151,'sname':'佛祖领社区'},
        // {'x':115.808336,'y':28.664462,'label':500,'span':150,'sname':'佛祖领社区'},
        // {'x':116.026229,'y':28.686265,'label':502,'span':152,'sname':'佛祖领社区'},
        // {'x':115.767517,'y':28.616276,'label':503,'span':153,'sname':'佛祖领社区'},
        // {'x':115.74567,'y':28.736952,'label':504,'span':154,'sname':'佛祖领社区'},
        // {'x':115.98311,'y':28.679674,'label':505,'span':155,'sname':'佛祖领社区'},
        // {'x':115.841681,'y':28.768872,'label':506,'span':156,'sname':'佛祖领社区'},
        // {'x':115.925619,'y':28.610695,'label':507,'span':157,'sname':'佛祖领社区'},
        // {'x':115.718649,'y':28.786601,'label':508,'span':157,'sname':'佛祖领社区'},
        // {'x':115.697952,'y':28.580756,'label':509,'span':158,'sname':'佛祖领社区'},
        // {'x':115.952065,'y':28.539639,'label':510,'span':160,'sname':'佛祖领社区'},
        // {'x':116.006107,'y':28.622871,'label':511,'span':161,'sname':'佛祖领社区'}
      ];
      var markers = [];
      var markersa = [];
      var markersb = [];
      var markersc = [];
      var pta = null;
      var ptb = null;
      var ptc = null;
    //   for (var i in xy) {
    //     pta = new BMap.Point(xy[i].x , xy[i].y);
    //     pta.data = xy[i].communityCount
    //     pta.span = xy[i].chosenCount
    //     pta.sname = xy[i].areaName
    //     markersa.push(new BMap.Marker(pta));
    //     console.log(markersa)
    //   }
      for (var i in xyhunan) {
        ptb = new BMap.Point(xyhunan[i].x , xyhunan[i].y);
        ptb.data = xyhunan[i].label
        markersb.push(new BMap.Marker(ptb));
      }
      for (var i in xyjiangxi) {
        ptc = new BMap.Point(xyjiangxi[i].x , xyjiangxi[i].y);
        ptc.data = xyjiangxi[i].label
        markersc.push(new BMap.Marker(ptc));
      }
      //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
      var markerClusterera = new BMapLib.MarkerClusterer(map,
        {
          markers:markersa,
          girdSize : 100,
          styles : [{
                  url:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAYAAADj79JYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NUE4MEI3MzEwRkMxMUU2ODQ2MzkxRjQyRjUyNjJBNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NUE4MEI3NDEwRkMxMUU2ODQ2MzkxRjQyRjUyNjJBNyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk1QTgwQjcxMTBGQzExRTY4NDYzOTFGNDJGNTI2MkE3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk1QTgwQjcyMTBGQzExRTY4NDYzOTFGNDJGNTI2MkE3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+mesQ/QAABXFJREFUeNrsnUFIHFcYx59iCUUhW2LdQ6wsJrkoWCxobU2LpPSSi/SQUGtBD6EEQbDQW6H01kN7WBBKDjmYQyi10ODFHgqLNDFIhAqCXmpkEUtZUboFc5AW2v8fv1mmzbqdmZ15Mzv7/eB/cnXX33zMvDfz9nst+29cNQmjC7mM9CI9SDeSRTqRDNKBnJPXniDHSBk5RErIPrKH7CI7yEGUH/bi44e+Xt+WAMGU+RoyiAwg/cgFj7/7ouRl5EqVnx8hW8gmsoH8LAclNtpirOKrkhEkF9H78MC9LSFFZA15JDlIu/Ah5F3kGtIXw4HOSd5HtpEC8iOynjbhFHxdkknItaJP8iGyLCk0uvBR5D1kHGk3yYQF8IF8xiXkAbLaaMIvITclWdMYtIv4d5BFydNGEH4DmUSGTWPCAplFXkfuI98lVTgvRtPIlGuc3MiwYF6VYeqCjHASI3wMuSUXxzTBwvlIJmJ3kZUkCJ9Abp8x8UgLLKRXkDvIN3EKn5Hz3XmTflhQnyEvIV/bFv4CMidpMc0DC+tTGdHkkT9tCKfsT6SymxEW2Mfi7iu/0lsDvOFcE8t2MysuTJTCZ4K8SYqZ+/XNt2aiEj4hR7VFPf/r9DIL6RNhCx+Tod95dVz1Qnob0sfCEp6TSc0VdVtzyHgL0nNhCJ9O4QwyqsnRdL3CeSNqSl16ZgpVfiOocN5inTTpuBFlC7qahPRLQYTzXvawOvTNsLjzJXy01i8p/8tNVPmoH+F8LJZVb4HJikNPwnm1HVdndTOOKr/mRTifrLerr7ppF5c1hQ9Ve5ESmOuo8qFawrlIJ6OeQiMjTqsK79IZZTQzUFR5VzXhXOfXp35Cp0/cVhWuRMNzwjluHFEvkTGC00rWLZzrs3PqJTJy4rgifFCdRM6gW/iA+oicAUc4hyz96iNy+jk8pHCum7ugPiKHji9TeK+6sEYvhfeoB2v0UHi3erBGd6vRBw02yVJ4p3qwRieF6+1Ye2QovEM9WKODwnXdiT3OtaoDu1D4iWqwxgmFH6sHaxxTeFk9WKNM4YfqwRqHFF5SD9YoUfi+erDGPoXvqQdr7FH4rnqwxi6Fs9XckbqIHDreoXB2NttSH5GzdfHxwwNnar+pPiJn05nakw31ETkbbuHsWFlUJ5FRFMcV4Zz8rKmXyFjD+bvkFk4eqZfIqLj9r/BtdRM622cJ5/CwoH5Cp8DhYDXhhI1v9XZteJTFqTlLOLsML6un0FhGda/XEm5E+DN1VTfPqhVvNeE8jy+pr7pZQnUXvAgnD4w+mKiHkjg0XoWzf/aiegvMIqp71Y9wI8KfqDvfPKlVrLWEs1k5+2fruhXv0NV9VPfTIMIJm5XfU4+euQfZNRu8e1nqtqAzUG8zSnFl6hVeNKfNyn9Rp2dCN3dR3cUwhJMVc9qs/A91+xx0cgeyV7y82M/qWXaGn0f+VscV6GIesj13zfe7XJmd4fPquUIesn11yw+yPjwvld7szAcpviAd8tkRnp3h/zLNtyWBcxrJG4tbEjjSvzSnd8SaZdMN5wI5b2LYdMN9Tv/dpH9bGWfoF/u2Ms7o5TeTzo2T3JOaxGyc5IzTOeifNunZGoycyK2NBZOwrcGcGenn5nSdYiNvfufAu36J3vzOgR+Qq4wabXtHBz48aKjtHY180C+Qn0zyNzB14IirYTcwdViV8GFq0rbodSibFG3R677KM9+aeDehdpPqTagd1iUcYtnYZr3ahb2ptll34D/6vYQXVTZRZF8/tppjh7mwmp4dyaiJi+E35GIe62qENhM/FPCDhLCtHzvNsfkZ+3F1y0HplPN/h2ucz3HysZyHD+Vv8WuQ/GYevyy2E0cV1+IfAQYAFDMj5i9bfv8AAAAASUVORK5CYII=',
                  size: new BMap.Size(92, 92),
            backgroundColor : '#E64B4E'
          }],
        });
      markerClusterera.setMaxZoom(13);
      markerClusterera.setGridSize(100);

      var markerClustererb = new BMapLib.MarkerClusterer(map,
        {
          markers:markersb,
          girdSize : 100,
          styles : [{
                  url:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAYAAADj79JYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NUE4MEI3MzEwRkMxMUU2ODQ2MzkxRjQyRjUyNjJBNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NUE4MEI3NDEwRkMxMUU2ODQ2MzkxRjQyRjUyNjJBNyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk1QTgwQjcxMTBGQzExRTY4NDYzOTFGNDJGNTI2MkE3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk1QTgwQjcyMTBGQzExRTY4NDYzOTFGNDJGNTI2MkE3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+mesQ/QAABXFJREFUeNrsnUFIHFcYx59iCUUhW2LdQ6wsJrkoWCxobU2LpPSSi/SQUGtBD6EEQbDQW6H01kN7WBBKDjmYQyi10ODFHgqLNDFIhAqCXmpkEUtZUboFc5AW2v8fv1mmzbqdmZ15Mzv7/eB/cnXX33zMvDfz9nst+29cNQmjC7mM9CI9SDeSRTqRDNKBnJPXniDHSBk5RErIPrKH7CI7yEGUH/bi44e+Xt+WAMGU+RoyiAwg/cgFj7/7ouRl5EqVnx8hW8gmsoH8LAclNtpirOKrkhEkF9H78MC9LSFFZA15JDlIu/Ah5F3kGtIXw4HOSd5HtpEC8iOynjbhFHxdkknItaJP8iGyLCk0uvBR5D1kHGk3yYQF8IF8xiXkAbLaaMIvITclWdMYtIv4d5BFydNGEH4DmUSGTWPCAplFXkfuI98lVTgvRtPIlGuc3MiwYF6VYeqCjHASI3wMuSUXxzTBwvlIJmJ3kZUkCJ9Abp8x8UgLLKRXkDvIN3EKn5Hz3XmTflhQnyEvIV/bFv4CMidpMc0DC+tTGdHkkT9tCKfsT6SymxEW2Mfi7iu/0lsDvOFcE8t2MysuTJTCZ4K8SYqZ+/XNt2aiEj4hR7VFPf/r9DIL6RNhCx+Tod95dVz1Qnob0sfCEp6TSc0VdVtzyHgL0nNhCJ9O4QwyqsnRdL3CeSNqSl16ZgpVfiOocN5inTTpuBFlC7qahPRLQYTzXvawOvTNsLjzJXy01i8p/8tNVPmoH+F8LJZVb4HJikNPwnm1HVdndTOOKr/mRTifrLerr7ppF5c1hQ9Ve5ESmOuo8qFawrlIJ6OeQiMjTqsK79IZZTQzUFR5VzXhXOfXp35Cp0/cVhWuRMNzwjluHFEvkTGC00rWLZzrs3PqJTJy4rgifFCdRM6gW/iA+oicAUc4hyz96iNy+jk8pHCum7ugPiKHji9TeK+6sEYvhfeoB2v0UHi3erBGd6vRBw02yVJ4p3qwRieF6+1Ye2QovEM9WKODwnXdiT3OtaoDu1D4iWqwxgmFH6sHaxxTeFk9WKNM4YfqwRqHFF5SD9YoUfi+erDGPoXvqQdr7FH4rnqwxi6Fs9XckbqIHDreoXB2NttSH5GzdfHxwwNnar+pPiJn05nakw31ETkbbuHsWFlUJ5FRFMcV4Zz8rKmXyFjD+bvkFk4eqZfIqLj9r/BtdRM622cJ5/CwoH5Cp8DhYDXhhI1v9XZteJTFqTlLOLsML6un0FhGda/XEm5E+DN1VTfPqhVvNeE8jy+pr7pZQnUXvAgnD4w+mKiHkjg0XoWzf/aiegvMIqp71Y9wI8KfqDvfPKlVrLWEs1k5+2fruhXv0NV9VPfTIMIJm5XfU4+euQfZNRu8e1nqtqAzUG8zSnFl6hVeNKfNyn9Rp2dCN3dR3cUwhJMVc9qs/A91+xx0cgeyV7y82M/qWXaGn0f+VscV6GIesj13zfe7XJmd4fPquUIesn11yw+yPjwvld7szAcpviAd8tkRnp3h/zLNtyWBcxrJG4tbEjjSvzSnd8SaZdMN5wI5b2LYdMN9Tv/dpH9bGWfoF/u2Ms7o5TeTzo2T3JOaxGyc5IzTOeifNunZGoycyK2NBZOwrcGcGenn5nSdYiNvfufAu36J3vzOgR+Qq4wabXtHBz48aKjtHY180C+Qn0zyNzB14IirYTcwdViV8GFq0rbodSibFG3R677KM9+aeDehdpPqTagd1iUcYtnYZr3ahb2ptll34D/6vYQXVTZRZF8/tppjh7mwmp4dyaiJi+E35GIe62qENhM/FPCDhLCtHzvNsfkZ+3F1y0HplPN/h2ucz3HysZyHD+Vv8WuQ/GYevyy2E0cV1+IfAQYAFDMj5i9bfv8AAAAASUVORK5CYII=',
                  size: new BMap.Size(92, 92),
            backgroundColor : '#E64B4E'
          }],
        });
      markerClustererb.setMaxZoom(13);
      markerClustererb.setGridSize(100);

      var markerClustererc = new BMapLib.MarkerClusterer(map,
        {
          markers:markersc,
          girdSize : 100,
          styles : [{
                  url:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAYAAADj79JYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NUE4MEI3MzEwRkMxMUU2ODQ2MzkxRjQyRjUyNjJBNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NUE4MEI3NDEwRkMxMUU2ODQ2MzkxRjQyRjUyNjJBNyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk1QTgwQjcxMTBGQzExRTY4NDYzOTFGNDJGNTI2MkE3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk1QTgwQjcyMTBGQzExRTY4NDYzOTFGNDJGNTI2MkE3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+mesQ/QAABXFJREFUeNrsnUFIHFcYx59iCUUhW2LdQ6wsJrkoWCxobU2LpPSSi/SQUGtBD6EEQbDQW6H01kN7WBBKDjmYQyi10ODFHgqLNDFIhAqCXmpkEUtZUboFc5AW2v8fv1mmzbqdmZ15Mzv7/eB/cnXX33zMvDfz9nst+29cNQmjC7mM9CI9SDeSRTqRDNKBnJPXniDHSBk5RErIPrKH7CI7yEGUH/bi44e+Xt+WAMGU+RoyiAwg/cgFj7/7ouRl5EqVnx8hW8gmsoH8LAclNtpirOKrkhEkF9H78MC9LSFFZA15JDlIu/Ah5F3kGtIXw4HOSd5HtpEC8iOynjbhFHxdkknItaJP8iGyLCk0uvBR5D1kHGk3yYQF8IF8xiXkAbLaaMIvITclWdMYtIv4d5BFydNGEH4DmUSGTWPCAplFXkfuI98lVTgvRtPIlGuc3MiwYF6VYeqCjHASI3wMuSUXxzTBwvlIJmJ3kZUkCJ9Abp8x8UgLLKRXkDvIN3EKn5Hz3XmTflhQnyEvIV/bFv4CMidpMc0DC+tTGdHkkT9tCKfsT6SymxEW2Mfi7iu/0lsDvOFcE8t2MysuTJTCZ4K8SYqZ+/XNt2aiEj4hR7VFPf/r9DIL6RNhCx+Tod95dVz1Qnob0sfCEp6TSc0VdVtzyHgL0nNhCJ9O4QwyqsnRdL3CeSNqSl16ZgpVfiOocN5inTTpuBFlC7qahPRLQYTzXvawOvTNsLjzJXy01i8p/8tNVPmoH+F8LJZVb4HJikNPwnm1HVdndTOOKr/mRTifrLerr7ppF5c1hQ9Ve5ESmOuo8qFawrlIJ6OeQiMjTqsK79IZZTQzUFR5VzXhXOfXp35Cp0/cVhWuRMNzwjluHFEvkTGC00rWLZzrs3PqJTJy4rgifFCdRM6gW/iA+oicAUc4hyz96iNy+jk8pHCum7ugPiKHji9TeK+6sEYvhfeoB2v0UHi3erBGd6vRBw02yVJ4p3qwRieF6+1Ye2QovEM9WKODwnXdiT3OtaoDu1D4iWqwxgmFH6sHaxxTeFk9WKNM4YfqwRqHFF5SD9YoUfi+erDGPoXvqQdr7FH4rnqwxi6Fs9XckbqIHDreoXB2NttSH5GzdfHxwwNnar+pPiJn05nakw31ETkbbuHsWFlUJ5FRFMcV4Zz8rKmXyFjD+bvkFk4eqZfIqLj9r/BtdRM622cJ5/CwoH5Cp8DhYDXhhI1v9XZteJTFqTlLOLsML6un0FhGda/XEm5E+DN1VTfPqhVvNeE8jy+pr7pZQnUXvAgnD4w+mKiHkjg0XoWzf/aiegvMIqp71Y9wI8KfqDvfPKlVrLWEs1k5+2fruhXv0NV9VPfTIMIJm5XfU4+euQfZNRu8e1nqtqAzUG8zSnFl6hVeNKfNyn9Rp2dCN3dR3cUwhJMVc9qs/A91+xx0cgeyV7y82M/qWXaGn0f+VscV6GIesj13zfe7XJmd4fPquUIesn11yw+yPjwvld7szAcpviAd8tkRnp3h/zLNtyWBcxrJG4tbEjjSvzSnd8SaZdMN5wI5b2LYdMN9Tv/dpH9bGWfoF/u2Ms7o5TeTzo2T3JOaxGyc5IzTOeifNunZGoycyK2NBZOwrcGcGenn5nSdYiNvfufAu36J3vzOgR+Qq4wabXtHBz48aKjtHY180C+Qn0zyNzB14IirYTcwdViV8GFq0rbodSibFG3R677KM9+aeDehdpPqTagd1iUcYtnYZr3ahb2ptll34D/6vYQXVTZRZF8/tppjh7mwmp4dyaiJi+E35GIe62qENhM/FPCDhLCtHzvNsfkZ+3F1y0HplPN/h2ucz3HysZyHD+Vv8WuQ/GYevyy2E0cV1+IfAQYAFDMj5i9bfv8AAAAASUVORK5CYII=',
                  size: new BMap.Size(92, 92),
            backgroundColor : '#E64B4E'
          }],
        });
      markerClustererc.setMaxZoom(13);
      markerClustererc.setGridSize(100);

      map.enableContinuousZoom()    // 启用地图惯性拖拽，默认禁用  
      map.addControl(new BMap.NavigationControl())  // 添加默认缩放平移控件  
      map.addControl(new BMap.OverviewMapControl()) // 添加默认缩略地图控件  
      map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: 'BMAP_ANCHOR_BOTTOM_RIGHT' }))   // 右下角，打开  
      // 建立一个自动完成的对象  
      var ac = new BMap.Autocomplete({'input': 'suggestId', 'location': map})  
      var myValue  
      ac.addEventListener('onconfirm', function (e) {    // 鼠标点击下拉列表后的事件  
        var _value = e.item.value  
        
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business  
        this.address_detail = myValue  
        // alert(this.address_detail)  
        th.setPlace(this.address_detail)  
      })   
    },
    seach() {
      let myValue
      let _val = document.getElementById('suggestId').value
      if(!_val){
            this.$message({
                message: '请输入地址',
                type: 'warning'
            });
            return false
        }
      myValue = _val  
      this.address_detail = myValue
      this.setPlace(this.address_detail)
    },
    setPlace (myValue) { 
      var th = this
      var map = new BMap.Map('allmap')  
      map.clearOverlays()   // 清除地图上所有覆盖物  
      function myFun () {  
        th.userlocation = local.getResults().getPoi(0).point    // 获取第一个智能搜索的结果  
        map.centerAndZoom(th.userlocation, 19)  
        map.enableScrollWheelZoom()    // 启用滚轮放大缩小，默认禁用
        map.addOverlay(new BMap.Marker(th.userlocation))    // 添加标注  
        // alert(JSON.stringify(th.userlocation))  
      }  
      var local = new BMap.LocalSearch(map, { // 智能搜索  
        onSearchComplete: myFun  
      })  
      local.search(myValue)  
    },
    getData(){
    //     var th = this
    //     var index = 0;
    //     var n = 5;
    //     var myGeo = new BMap.Geocoder();
    //     var map = new BMap.Map('allmap')  
    //  map.addEventListener("moving", getBoundary);
    //  map.addEventListener("resize", getBoundary);
    //  map.addEventListener("dblclick", getBoundary1);
    //  function getBoundary(){
    //  	var bs = map.getBounds();   //获取可视区域
	//     var bssw = bs.getSouthWest();   //可视区域左下角
	//     var bsne = bs.getNorthEast();   //可视区域右上角
	//     var topLat = bsne.lat;
	//     var bottomLat = bssw.lat;
	//     var leftLng = bssw.lng;
	//     var rightLng = bsne.lng;
	    
	//     var jb = map.getZoom()
    //     var jbb
    //     if(jb<=7){
    //         jbb = 1
    //     }else if(jb>=8 && jb<=10){
    //         jbb = 2
    //     }else if(jb>=11 && jb<=13){
    //         jbb = 3
    //     }else if(jb>=14){
    //         jbb = 4
    //     }
    //     // console.log(jbb)
    //     // console.log( "x:"+ rightLng + ",y:"+topLat ) 
	//     // console.log( "x:"+ leftLng + ",y:"+bottomLat ) 
    //     th.$emit("listentochild1",jbb)
    //     th.$emit("listentochild2",rightLng)
    //     th.$emit("listentochild3",topLat)
    //     th.$emit("listentochild4",leftLng)
    //     th.$emit("listentochild5",bottomLat)
    //  }
    //  function getBoundary1(){
    //      n = n=1
    //  	var bs = map.getBounds();   //获取可视区域
	//     var bssw = bs.getSouthWest();   //可视区域左下角
	//     var bsne = bs.getNorthEast();   //可视区域右上角
	//     var topLat = bsne.lat;
	//     var bottomLat = bssw.lat;
	//     var leftLng = bssw.lng;
	//     var rightLng = bsne.lng;
	//     var jb = map.getZoom()
    //     var jbb
    //     if(jb<=7){
    //         jbb = 1
    //     }else if(jb>=8 && jb<=10){
    //         jbb = 2
    //     }else if(jb>=11 && jb<=13){
    //         jbb = 3
    //     }else if(jb>=14){
    //         jbb = 4
    //     }
    //     // console.log(jbb)
    //     // console.log( "x:"+ rightLng + ",y:"+topLat ) 
	//     // console.log( "x:"+ leftLng + ",y:"+bottomLat ) 
    //     th.$emit("listentochild1",jbb)
    //     th.$emit("listentochild2",rightLng)
    //     th.$emit("listentochild3",topLat)
    //     th.$emit("listentochild4",leftLng)
    //     th.$emit("listentochild5",bottomLat)
    //  }
    //     if(th.getPClass){
    //         var adds = [th.getPClass[0].areaName]
    //         // var adds = [
    //         //     "包河区金寨路1号（金寨路与望江西路交叉口）",
    //         //     "庐阳区凤台路209号（凤台路与蒙城北路交叉口）",
    //         //     "蜀山区金寨路217号(近安医附院公交车站)",
    //         //     "蜀山区梅山路10号(近安徽饭店) ",
    //         //     "蜀山区 长丰南路159号铜锣湾广场312室",
    //         //     "合肥市寿春路93号钱柜星乐町KTV（逍遥津公园对面）",
    //         //     "庐阳区长江中路177号",
    //         //     "新站区胜利路89"
    //         // ];
    //         // console.log(adds)
    //         console.log(th.getPClass)
    //         bdGEO()
    //         function bdGEO(){
    //             var add = adds[index];
    //             geocodeSearch(add);
    //             index++;
    //         }
    //         function geocodeSearch(add){
    //             if(index < adds.length){
    //                 setTimeout(window.bdGEO,400);
    //             } 
                
    //             myGeo.getPoint(add, function(point){
    //                 if (point) {
    //                     var address = new BMap.Point(point.lng, point.lat);
    //                     map.centerAndZoom(address, n);
    //                     map.enableScrollWheelZoom()    // 启用滚轮放大缩小，默认禁用  
    //                     addMarker(address,new BMap.Label(index+":"+add,{offset:new BMap.Size(20,-10)}),5);
    //                 }
    //             }, "合肥市");
    //         }
    //         function addMarker(point,label){
    //             var marker = new BMap.Marker(point);
    //             map.addOverlay(marker);
    //             marker.setLabel(label);
    //         }
    //     }
    }
    

  }  
}  
</script>  
  
<style>  
  /* 去掉地图左下角的百度LOGO */  
  .anchorBL {  
    display:none  
  }  
  .BMap_noprint{
    display:none  
  }
  .BMapLabel span{
    position: absolute;
    font-size: 30px;
    left:-13px;
    top:-15px;
  }
</style>  
