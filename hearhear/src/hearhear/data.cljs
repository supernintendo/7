(ns ^:figwheel-always hearhear.data
    (:import [goog.net XhrIo]))

(def root-url "http://content.guardianapis.com/search")
(def api-key "tpb65u2aqd68vpprkv6r3umh")

(defn fetch-string []
  (str root-url "?api-key=" api-key))

(defn fetch [callback]
  (.send goog.net.XhrIo (fetch-string) callback))

(defn fetched [response]
  (.log js/console (.getResponseJson (.-target response))))
