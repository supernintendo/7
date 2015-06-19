(ns ^:figwheel-always hearhear.data
    (:import [goog.net XhrIo]))

(def api-key "tpb65u2aqd68vpprkv6r3umh")

(defn fetch-string [url]
  (str url "?api-key=" api-key))

(defn fetch [url callback]
  (.send goog.net.XhrIo (fetch-string url) callback))

(defn store-content [response]
  (print response))

(defn parse-response [response]
  (.-response
   (.getResponseJson
    (.-target response))))

(defn pull-out-urls [response]
  (doseq [item (js->clj
                (.-results
                 (parse-response response)))]
    (fetch (get item "apiUrl") store-content)))
