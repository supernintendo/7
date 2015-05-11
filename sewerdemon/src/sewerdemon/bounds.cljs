(ns ^:figwheel-always sewerdemon.bounds
    (:require [goog.dom :as dom]
              [goog.style :as style]
              [sewerdemon.entity :as entity]
              [sewerdemon.state :as state]))

(defn add-bound [bounding-rect]
  (swap! state/bounds assoc :bounds
         (let [x-offset (.-x (style/getPageOffset (dom/getElement "game-grid")))
               y-offset (.-y (style/getPageOffset (dom/getElement "game-grid")))]
           (conj
            (:bounds @state/bounds)
            {
             :bottom (- (.-bottom bounding-rect) y-offset)
             :left (- (.-left bounding-rect) x-offset)
             :right (- (.-right bounding-rect) x-offset)
             :top (- (.-top bounding-rect) y-offset)
             }))))

(defn collides-with-bounds [x y]
  (some #(and
          (>= x (:left %))
          (>= y (:top %))
          (<= x (:right %))
          (<= y (:bottom %))) (:bounds @state/bounds)))

(defn entity-collides [entity-id x-offset y-offset]
  (let [x (+ (entity/get-from-entity entity-id :x) x-offset)
        y (+ (entity/get-from-entity entity-id :y) y-offset)]
    (collides-with-bounds x y)))