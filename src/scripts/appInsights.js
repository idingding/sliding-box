module.exports = function () {
    var appInsights=window.appInsights||function(e){function t(e){i[e]=function(){var t=arguments;i.queue.push(function(){i[e].apply(i,t)})}}var n,a,i={config:e},r=document,c=window,s="script",o="AuthenticatedUserContext",p="start",u="stop",d="Track",g=d+"Event",h=d+"Page",f=r.createElement(s);f.src=e.url||"https://az416426.vo.msecnd.net/scripts/a/ai.0.js",r.getElementsByTagName(s)[0].parentNode.appendChild(f);try{i.cookie=r.cookie}catch(e){}for(i.queue=[],i.version="1.0",n=["Event","Exception","Metric","PageView","Trace","Dependency"];n.length;)t("track"+n.pop());return t("set"+o),t("clear"+o),t(p+g),t(u+g),t(p+h),t(u+h),t("flush"),e.disableExceptionTracking||(n="onerror",t("_"+n),a=c[n],c[n]=function(e,t,r,c,s){var o=a&&a(e,t,r,c,s);return!0!==o&&i["_"+n](e,t,r,c,s),o}),i}({
        instrumentationKey:"b98d4162-427f-4626-9742-50391ec88b8d"
    });window.appInsights=appInsights,appInsights.trackPageView();
}
