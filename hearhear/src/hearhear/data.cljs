(ns ^:figwheel-always hearhear.data
    (:import [goog.net XhrIo]))

(def api-key "tpb65u2aqd68vpprkv6r3umh")

(defn param-string [key value]
  (str "&" key "=" value))

(defn fetch [url callback]
  (.send goog.net.XhrIo url callback))

(defn parse-response [response]
  (.-response
   (.getResponseJson
    (.-target response))))

(defn strip-html-tags [content]
  (clojure.string/replace content #"<[^>]*>" ""))

(defn store-content [response]
  (.log js/console
        (strip-html-tags
         (.-body
          (.-fields
           (.-content
            (parse-response
             response)))))))

(defn pull-out-urls [response]
  (doseq [item (js->clj
                (.-results
                 (parse-response response)))]
    (fetch
     (str
      (get item "apiUrl")
      "?"
      (param-string "api-key" api-key)
      (param-string "show-fields" "body")) store-content)))
