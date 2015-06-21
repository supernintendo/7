(ns ^:figwheel-always hearhear.data
    (:require [hearhear.filters :as filters])
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

(defn split-by-whitespace [content]
  (clojure.string/split content #"\s"))

(defn store-content [response]
  (print
   (remove filters/is-a-common-word?
           (split-by-whitespace
            (filters/strip-punctuation
             (filters/strip-html-tags
              (.-body
               (.-fields
                (.-content
                 (parse-response
                  response))))))))))

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
