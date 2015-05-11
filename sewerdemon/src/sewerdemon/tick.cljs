(ns sewerdemon.tick
  (:require [cljs-uuid-utils.core :as uuid]))

(defonce tick-events
  (atom
   {:changed false
    :events []}))

(defn add-event [func entity-id]
  (swap! tick-events assoc :events
         (conj (:events @tick-events)
               {
                :callback func
                :entity-id entity-id
                :id (uuid/make-random-uuid)
                })))

;; Tick
(declare tock)

(defn tick [& args]
  (let [events (:events @tick-events)]
    (dotimes [i (count events)]
      (if (contains? (nth events i) :callback)
        (if (contains? (nth events i) :entity-id)
          ((:callback (nth events i)) (:entity-id (nth events i)))
          ((:callback (nth events i)))
          )
        nil)))
  (tock args))

;; This is where maintenance happens.
(defn tock [& args]
  (.requestAnimationFrame js/window tick args))
