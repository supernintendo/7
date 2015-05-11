(ns sewerdemon.events
  (:require [goog.dom :as dom]
            [goog.events :as events]
            [goog.style :as style]))

(defonce key-state
  (atom
   {
    :up false
    :down false
    :left false
    :right false}))

(defn set-key-state [key state]
  (swap! key-state assoc (keyword key) state))

(defn get-key-from-charcode [charcode]
  (case charcode
    37 "left"
    65 "left"
    39 "right"
    68 "right"
    40 "down"
    83 "down"
    38 "up"
    87 "up"
    nil
    ))

;; Align level and entities containers.
(defn align-containers []
  (let [el (dom/getElement "game-entities")
        grid (dom/getElement "game-grid")
        position (style/getPageOffset grid)
        size (style/getTransformedSize grid)]

    (style/setPageOffset el (.-x position) (.-y position))
    (style/setWidth el (.-width size))
    (style/setHeight el (.-height size))))

(defn align-containers-on-window-resize []
  (let [w (dom/getWindow)]
    (events/listen w (.-RESIZE events/EventType) align-containers)
    (align-containers)))

(defn capture-key-event [e]
  (case (.-type e)
    "keyup" (set-key-state (get-key-from-charcode (.-keyCode e)) false)
    "keydown" (set-key-state (get-key-from-charcode (.-keyCode e)) true)))

(defn capture-key-events []
  (let [w (dom/getWindow)]
    (events/listen w (.-KEYUP events/EventType) capture-key-event)
    (events/listen w (.-KEYDOWN events/EventType) capture-key-event)))
