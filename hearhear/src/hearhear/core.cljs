(ns ^:figwheel-always hearhear.core
    (:require [om.core :as om :include-macros true]
              [om.dom :as dom :include-macros true]
              [hearhear.data :as data]
              [hearhear.words :as words]))

(enable-console-print!)

;; Main state
(defonce app-state
  (atom
   {:initialized? false}))

(om/root
 words/draw
 words/words-state
 {:target (. js/document (getElementById "app"))})

(if-not (get @app-state :initialized?)
  (do
    (swap! app-state assoc :initialized? true)))

(data/fetch
 (str
  "http://content.guardianapis.com/search?"
  (data/param-string "api-key" data/api-key))
 data/pull-out-urls)
