
    (function() {
      var cdnOrigin = "https://cdn.shopify.com";
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills-legacy.DgHYkVzi.js","/cdn/shopifycloud/checkout-web/assets/c1/app-legacy.Cotmjsqm.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en-legacy.Dko4lozy.js","/cdn/shopifycloud/checkout-web/assets/c1/page-OnePage-legacy.Bo2mYA8R.js","/cdn/shopifycloud/checkout-web/assets/c1/LocalizationExtensionField-legacy.BVkc33kg.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayOptInDisclaimer-legacy.BdVLj002.js","/cdn/shopifycloud/checkout-web/assets/c1/MarketsProDisclaimer-legacy.CmrGBbUg.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblemsLineItemList-legacy.eAIXalI5.js","/cdn/shopifycloud/checkout-web/assets/c1/DeliveryMethodSelectorSection-legacy.DdTD7NR1.js","/cdn/shopifycloud/checkout-web/assets/c1/useEditorShopPayNavigation-legacy.B7-kcZf3.js","/cdn/shopifycloud/checkout-web/assets/c1/VaultedPayment-legacy.BnSQ5Bpe.js","/cdn/shopifycloud/checkout-web/assets/c1/Section-legacy.AXoQ9cs_.js","/cdn/shopifycloud/checkout-web/assets/c1/SeparatePaymentsNotice-legacy.CZWd0utI.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown-legacy.D0VmER7a.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal-legacy.DA2iqr-A.js","/cdn/shopifycloud/checkout-web/assets/c1/StackedMerchandisePreview-legacy.oE7Zianu.js","/cdn/shopifycloud/checkout-web/assets/c1/component-ShopPayVerificationSwitch-legacy.A_6oC2qn.js","/cdn/shopifycloud/checkout-web/assets/c1/useSubscribeMessenger-legacy.BuwrXcx9.js","/cdn/shopifycloud/checkout-web/assets/c1/index-legacy.ObpJWEhD.js","/cdn/shopifycloud/checkout-web/assets/c1/PayButtonSection-legacy.LIwgFH8w.js"];
      var styles = [];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0631/4157/6913/files/LOCALNEWSHUB_1__edited_x320.png?v=1701764040"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [cdnOrigin].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  