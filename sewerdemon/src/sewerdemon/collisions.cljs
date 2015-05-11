(ns ^:figwheel-always sewerdemon.collisions
    (:require [sewerdemon.state :as state]))

(defn detect-collisions []
  (doseq [entity (:entities @state/entities)]
    (if (some
            #(and
              (not= (:id entity) (:id %))
              (>= (:x entity) (:x %))
              (>= (:y entity) (:y %))
              (<= (+ (:x entity) (.-width (:size entity))) (+ (:x %) (.-width (:size %))))
              (<= (+ (:y entity) (.-height (:size entity))) (+ (:y %) (.-width (:size %))))
              ) (:entities @state/entities))
      ((get-in entity [:behaviors :collides])))))
