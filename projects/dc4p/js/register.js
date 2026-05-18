/* =========================================
   DC4P Aviation Edition Zoho Embed Script
   ========================================= */

(function() {
    try {
        var f = document.createElement("iframe");
        var ifrmSrc = 'https://forms.zohopublic.com/johndoeforms99/form/DataCultureForProfessionalsAviationEditionRegistra/formperma/dR95-WA_Hr0wQY1SC17SoLmEUuIFzpibANf-Wvd83ws?zf_rszfm=1';
        
        try {
            if (typeof ZFAdvLead != "undefined" && typeof zfutm_zfAdvLead != "undefined") {
                for (var prmIdx = 0; prmIdx < ZFAdvLead.utmPNameArr.length; prmIdx++) {
                    var utmPm = ZFAdvLead.utmPNameArr[prmIdx];
                    utmPm = (ZFAdvLead.isSameDomian && (ZFAdvLead.utmcustPNameArr.indexOf(utmPm) == -1)) ? "zf_" + utmPm : utmPm;
                    var utmVal = zfutm_zfAdvLead.zfautm_gC_enc(ZFAdvLead.utmPNameArr[prmIdx]);
                    if (typeof utmVal !== "undefined") {
                        if (utmVal != "") {
                            if (ifrmSrc.indexOf('?') > 0) {
                                ifrmSrc = ifrmSrc + '&' + utmPm + '=' + utmVal;
                            } else {
                                ifrmSrc = ifrmSrc + '?' + utmPm + '=' + utmVal;
                            }
                        }
                    }
                }
            }
            if (typeof ZFLead !== "undefined" && typeof zfutm_zfLead !== "undefined") {
                for (var prmIdx = 0; prmIdx < ZFLead.utmPNameArr.length; prmIdx++) {
                    var utmPm = ZFLead.utmPNameArr[prmIdx];
                    var utmVal = zfutm_zfLead.zfutm_gC_enc(ZFLead.utmPNameArr[prmIdx]);
                    if (typeof utmVal !== "undefined") {
                        if (utmVal != "") {
                            if (ifrmSrc.indexOf('?') > 0) {
                                ifrmSrc = ifrmSrc + '&' + utmPm + '=' + utmVal; //No I18N
                            } else {
                                ifrmSrc = ifrmSrc + '?' + utmPm + '=' + utmVal; //No I18N
                            }
                        }
                    }
                }
            }
            if (!((new RegExp("[?&]referrername=")).test(ifrmSrc))) {
                var rfr = window.location.href;
                try {
                    rfr = window.self !== window.top ?
                        window.top.location.href :
                        (/^https?:\/\/[\w.-]+\.[a-zA-Z]{2,}/i.test(rfr) ? rfr : "");
                } catch (e) {}
                
                if (rfr && rfr !== "") {
                    if (rfr.length > 1800) {
                        var queryIndex = rfr.indexOf('?');
                        if (queryIndex > -1) {
                            rfr = rfr.substring(0, queryIndex);
                        }
                        if (rfr.length > 1800) {
                            rfr = rfr.substring(0, 1800);
                        }
                    }
                    ifrmSrc += ((ifrmSrc.indexOf('?') > 0) ? '&' : '?') + 'referrername=' + encodeURIComponent(rfr);
                }
            }
        } catch (e) {}

        f.src = ifrmSrc;
        f.style.border = "none";
        f.style.height = "3916px";
        f.style.width = "100%"; // Occupies full card width beautifully
        f.style.transition = "all 0.5s ease";
        f.setAttribute("aria-label", 'Data Culture For Professionals – Aviation Edition Registration');
        
        // Hide custom loader once the iframe has finished loading
        f.onload = function() {
            var loader = document.getElementById("form-loader");
            if (loader) {
                loader.classList.add("hidden");
                setTimeout(function() {
                    loader.style.display = "none";
                }, 500);
            }
        };
        
        var d = document.getElementById("zf_div_dR95-WA_Hr0wQY1SC17SoLmEUuIFzpibANf-Wvd83ws");
        if (d) {
            d.appendChild(f);
        }
        
        // Listen for message events from Zoho iframe to dynamically adjust height
        window.addEventListener('message', function(event) {
            var evntData = event.data;
            if (evntData && evntData.constructor == String) {
                var zf_ifrm_data = evntData.split("|");
                if (zf_ifrm_data.length == 2 || zf_ifrm_data.length == 3) {
                    var zf_perma = zf_ifrm_data[0];
                    var zf_ifrm_ht_nw = (parseInt(zf_ifrm_data[1], 10) + 15) + "px";
                    var iframe = document.getElementById("zf_div_dR95-WA_Hr0wQY1SC17SoLmEUuIFzpibANf-Wvd83ws").getElementsByTagName("iframe")[0];
                    if (iframe && (iframe.src).indexOf('formperma') > 0 && (iframe.src).indexOf(zf_perma) > 0) {
                        var prevIframeHeight = iframe.style.height;
                        var zf_tout = false;
                        if (zf_ifrm_data.length == 3) {
                            iframe.scrollIntoView();
                            zf_tout = true;
                        }

                        if (prevIframeHeight != zf_ifrm_ht_nw) {
                            if (zf_tout) {
                                setTimeout(function() {
                                    iframe.style.height = zf_ifrm_ht_nw;
                                }, 500);
                            } else {
                                iframe.style.height = zf_ifrm_ht_nw;
                            }
                        }
                    }
                }
            }
        }, false);
    } catch (e) {}
})();
