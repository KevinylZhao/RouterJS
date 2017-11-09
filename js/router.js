/**
 * Created by kevinylzhao on 2017/10/22.
 * 路由配置组件
 * 方法：
 @method add(_hash, callback)  # 配置路由信息，参数分别是路由hash、回调函数
 @method bindHashChange(callback)  # 监听hash路由变化，回调函数的参数为change后的hash
 * 实例化方法：
 var router = Router.init();
 router.add("page1", function() {
    //do something;
 });
 */
function Router() {
    this.hash = window.location.hash.substring(1);
}
Router.prototype = {
    // 设置路由
    add: function(_hash, callback) {
        var _this = this;
        _checkRouter(_this.hash);
        _this.bindHashChange(function(__hash) {
            _checkRouter(__hash);
        });

        function _checkRouter(__hash) {
            if(_hash == __hash) {
                if(typeof callback == 'function') {
                    callback();
                }
            }
        }
    },
    // hashChange事件监听
    bindHashChange: function (callback) {
        var _this = this;
        if ('onhashchange' in window) {
            _this.addEvent(window, 'hashchange', function () {
                _this.hash = window.location.hash.substring(1);
                if (typeof callback == 'function') {
                    callback(_this.hash);
                }
            });
        } else {
            setInterval(function () {
                var ischanged = _this.hash != window.location.hash.substring(1);
                if (ischanged) {
                    _this.hash = window.location.hash.substring(1);
                    if (typeof callback == 'function') {
                        callback(_this.hash);
                    }
                }
            }, 150);
        }
    },
    // 事件绑定函数兼容
    addEvent: function(el, eventType, callback) {
        if(el.addEventListener) {
            return el.addEventListener(eventType, callback, false);
        }else if(el.attachEvent) {
            return el.attachEvent(eventType, callback);
        }else {
            return el['on' + eventType] = callback;
        }
    }
};
// 实例化
Router.init = function() {
    var router = new Router();
    return router;
};