/*global YAHOO */
(function() {
    YAHOO.namespace('tagz.DomBuilder');
    var lang    = YAHOO.lang;
    var DB      = YAHOO.tagz.DomBuilder, Dom = YAHOO.util.Dom;
    var Element = YAHOO.util.Element;

    function processChild( child ) {
        if(lang.isNull(child) || lang.isUndefined(child)) {
            return null;
        } else if(lang.isArray(child)) {
            var r,fn=arguments.callee, l = [];
            for(var i=0;i<child.length;i++) {
                r = fn.call(this,child[i]);
                if(lang.isArray(r)) {
                    for(var j=0;j<r.length;j++) {
                        l.push(r[j]);
                    }
                } else {
                    l.push(r);
                }
            }
            return l;
        } else if(lang.isString(child)) {
            return document.createTextNode(child);
        } else if(lang.isFunction(child)) {
            return arguments.callee.call(this,child.call(this));
        } else if(child instanceof Element) {
            var el = child.get('element');
            if(el) {
                return el;
            }
        } else {
            return child;
        }
        return null;    // Fallback
    }

    function __replaceWord( w ) {
        return w.substr(1,2).toUpperCase();
    }

    function processStyleName( k ) {
        return k.replace(/\-\w/,__replaceWord);
    }

    function processAttr( k, v ) {
        if(k=='style'&&lang.isObject(v)) {
            var d = {};
            for(var sk in v) {
                if(lang.isValue(v[sk])) {
                    d[processStyleName(sk)] = v[sk];
                }
            }
            return d;
        } else if(!lang.isString(v) && lang.isValue(v)) {
            return v.toString();
        } else if(lang.isFunction(v)) {
            return arguments.callee.call(this,k,v());
        }
        return v;
    }
    function createDOM( tag, attrs /* children */ ) {
        var i,j, el = document.createElement(tag);
        var child, children = [], attr;
        if(lang.isObject(attrs)) {
            for(var k in attrs) {
                if(lang.hasOwnProperty(attrs,k)) {
                    attr = processAttr.call(this,k,attrs[k]);
                    if(k==='style' && lang.isObject(attr)) {
                        for(var sk in attr) {
                            if(lang.hasOwnProperty(attr,sk)) {
                                Dom.setStyle(el,sk,attr[sk]);
                            }
                        }
                    } else {
                        Dom.setAttribute(el,k,attr);
                    }
                }
            }
        }
        for(i=2;i<arguments.length;i++) {
            children.push(arguments[i]);
        }
        for(i=0;i<children.length;i++) {
            child = processChild.call(this,children[i]);
            if(!lang.isNull(child)) {
                if(lang.isArray(child)) {
                    for(j=0;j<child.length;j++) {
                        el.appendChild(child[j]);
                    }
                } else {
                    el.appendChild(child);
                }
            }
        }
        return el;
    }
    DB.createDOM = createDOM;

    var tag_cache = {};
    function makeTag( t ) {
        var tag_name = t.toUpperCase();
        if(tag_cache.hasOwnProperty(tag_name)) {
            return tag_cache[tag_name];
        }
        return YAHOO.tagz.Utils.partial(createDOM,null,t);
    }

    DB.makeTag  = makeTag;
    var tag, tags = [ 'a', 'button', 'br', 'canvas', 
        'dd', 'div', 'dl', 'dt', 'em', 'fieldset', 'form', 
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'img', 'input', 
        'label', 'legend', 'li', 'ol', 'optgroup', 'option', 'p', 'pre', 
        'select', 'span', 'strong', 'table', 'tbody', 'td', 'textarea', 
        'tfoot', 'th', 'thead', 'tr', 'tt', 'ul' ];
    for(var i=0,i_max=tags.length;i<i_max;i++) {
        tag = tags[i];
        DB[tag.toUpperCase()] = makeTag(tag);
    }
})();
