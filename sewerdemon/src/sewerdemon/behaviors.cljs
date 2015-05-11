(ns ^:figwheel-always sewerdemon.behaviors
    (:require [sewerdemon.events :as events]
              [sewerdemon.bounds :as bounds]
              [sewerdemon.entity :as entity]
              [goog.dom :as dom]
              [goog.style :as style]))

(def player-tick
  (fn [entity-id]
    (let [size (style/getSize (dom/getElement "Player"))
          speed (entity/get-from-entity entity-id :speed)
          x (entity/get-from-entity entity-id :x)
          y (entity/get-from-entity entity-id :y)]

      (if (and
           (:up @events/key-state)
           (not
            (or
             (bounds/entity-collides entity-id 0 (* speed -1))
             (bounds/entity-collides entity-id (.-width size) (* speed -1))
             )))
        (entity/update-entity entity-id :y (- y speed)))

      (if (and
           (:left @events/key-state)
           (not
            (or
             (bounds/entity-collides entity-id (* speed -1) 0)
             (bounds/entity-collides entity-id (* speed -1) (.-height size))
             )))
        (entity/update-entity entity-id :x (- x speed)))

      (if (and
           (:down @events/key-state)
           (not
            (or
             (bounds/entity-collides entity-id 0 (+ (.-height size) (* speed 2)))
             (bounds/entity-collides entity-id (.-width size) (+ (.-height size) (* speed 2)))
             )))
        (entity/update-entity entity-id :y (+ y speed)))

      (if (and
           (:right @events/key-state)
           (not
            (or
             (bounds/entity-collides entity-id (+ (.-width size) speed) 0)
             (bounds/entity-collides entity-id (+ (.-width size) speed) (.-height size))
             )))
        (entity/update-entity entity-id :x (+ x speed))))))

(def projectile-tick (fn [entity-id]
                       (let [x (entity/get-from-entity entity-id :x)
                             y (entity/get-from-entity entity-id :y)
                             x-speed (entity/get-from-entity entity-id :x-speed)
                             y-speed (entity/get-from-entity entity-id :y-speed)]

                         (entity/update-entity entity-id :x (+ x x-speed))
                         (entity/update-entity entity-id :y (+ y y-speed)))))

(def projectile-collides (fn [] (print "collides")))
