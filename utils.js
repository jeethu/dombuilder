(function () {
    // The util functions
    YAHOO.namespace('tagz.Utils');
    var lang = YAHOO.lang;

    if(Array.prototype.forEach) {
        YAHOO.tagz.Utils.foreach = function(func,list,self) {
            return list.forEach(func,self);
        };
    } else {
        YAHOO.tagz.Utils.foreach = function(func,list, self){
            var l_len = list.length, i=0;
            if(self===undefined) {
                for(;i<l_len;i++) {
                    func(list[i]);
                }
            } else {
                for(;i<l_len;i++) {
                    func.call(self, list[i]);
                }
            }
        };
    }

    if(Array.prototype.map) {
        YAHOO.tagz.Utils.map = function (func,list, self ){
            return list.map(func,self);
        };
    } else {
        YAHOO.tagz.Utils.map = function (func,list, self ){
            var l_len = list.length, i=0, ret = [];
            if(self===undefined) {
                for(;i<l_len;i++) {
                    ret.push(func(list[i]));
                }
            } else {
                for(;i<l_len;i++) {
                    ret.push(func.call(self,list[i]));
                }
            }
            return ret;
        };
    }

    if(Array.prototype.filter) {
        YAHOO.tagz.Utils.filter = function(func,list, self) {
            return list.filter(func,self);
        };
    } else {
        YAHOO.tagz.Utils.filter = function(func,list, self) {
            var ret = [], rez=null, l_len=list.length, i=0;
            if(self===undefined) {
                for(;i<l_len;i++) {
                    rez = list[i];
                    if(func(rez)) {
                        ret.push(rez);
                    }
                }
            } else {
                for(;i<l_len;i++) {
                    rez = list[i];
                    if(func.call(self,rez)) {
                        ret.push(rez);
                    }
                }
            }
            return ret;
        };
    }

    if(Array.prototype.every) {
        YAHOO.tagz.Utils.all = function( func, list, self ) {
            return list.every(func,self);
        };
    } else {
        YAHOO.tagz.Utils.all = function( func, list, self ) {
            var l_len = list.length, i=0;
            for(;i<l_len;i++) {
                if(!func.call(self,l[i])) {
                    return false;
                }
            }
            return true;
        };
    }

    if(Array.prototype.some) {
        YAHOO.tagz.Utils.any = function( func, list, self ) {
            return list.some(func,self);
        };
    } else {
        YAHOO.tagz.Utils.any = function( func, list, self ) {
            var l_len = list.length, i=0;
            for(;i<l_len;i++) {
                if(func.call(self,l[i])) {
                    return true;
                }
            }
            return false;
        };
    }


    YAHOO.tagz.Utils.partial = function( func, this_obj /* ... */ ) {
        function closure() {
            var cl_args = args.slice();
            for(var i=0,i_max=arguments.length;i<i_max;i++) {
                cl_args.push(arguments[i]);
            }
            if(this_obj===null) {
                return func.apply(this,cl_args);
            } else {
                return func.apply(this_obj,cl_args);
            }
        }
        var args = [];
        this_obj = lang.isValue(this_obj) ? this_obj : null;
        for(var i=2,i_max=arguments.length;i<i_max;i++) {
            args.push(arguments[i]);
        }
        return closure;
    };

    YAHOO.tagz.Utils.urlencode = function( d ) {
        var l = [];
        for(var k in d) {
            if(d.hasOwnProperty(k)) {
                l.push(k+'='+encodeURIComponent(d[k]));
            }
        }
        return l.join('&');
    };

    YAHOO.tagz.Utils.urldecode = function( s ) {
        var l = s.split('&'),d = {}, kv, kv_len;
        for(var i=0,j=l.length;i<j;i++) {
            kv = l[i].split('=');
            kv_len = kv.length;
            if(kv_len>0) {
                if(kv_len>1) {
                    d[kv[0]] = decodeURIComponent(kv[1]);
                } else {
                    d[kv[0]] = null;
                }
            }
        }
        return d;
    };
})();
