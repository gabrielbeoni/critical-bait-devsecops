/* Critical Bait — aplica estilos dinâmicos via CSSOM, sem atributo style inline.
   Os valores vêm dos templates locais da aplicação, não de HTML arbitrário. */
(function(){
  "use strict";
  function setStyles(element, declarations){
    if (!element || typeof declarations !== "string") return;
    declarations.split(";").forEach(function(declaration){
      var index=declaration.indexOf(":");
      if(index<1)return;
      var property=declaration.slice(0,index).trim();
      var value=declaration.slice(index+1).trim();
      if(property && value) element.style.setProperty(property,value);
    });
  }
  function apply(root){
    if(root.nodeType!==1)return;
    if(root.hasAttribute("data-cb-style")){
      setStyles(root,root.getAttribute("data-cb-style"));
      root.removeAttribute("data-cb-style");
    }
    root.querySelectorAll("[data-cb-style]").forEach(function(el){
      setStyles(el,el.getAttribute("data-cb-style"));
      el.removeAttribute("data-cb-style");
    });
  }
  window.CB=window.CB||{};
  window.CB.setStyles=setStyles;
  function start(){
    apply(document.documentElement);
    new MutationObserver(function(records){
      records.forEach(function(record){
        if(record.type==="attributes")apply(record.target);
        record.addedNodes.forEach(apply);
      });
    }).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["data-cb-style"]});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});
  else start();
})();
