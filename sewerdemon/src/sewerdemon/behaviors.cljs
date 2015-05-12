(ns ^:figwheel-always sewerdemon.behaviors
    (:require [sewerdemon.events :as events]
              [sewerdemon.bounds :as bounds]
              [sewerdemon.entity :as entity]
              [goog.dom :as dom]
              [goog.style :as style]))

(def player-tick
  (fn [entity-id]
    (let [entity (entity/get-entity entity-id)
          size (style/getSize (dom/getElement "Player"))
          x-speed (:x-speed entity)
          y-speed (:y-speed entity)
          x (:x entity)
          y (:y entity)]

      (if (:invulnerable entity)
        (if (<= (:invuln-timer entity) 0)
          (
           (entity/update-entity entity-id :invulnerable false)
           (entity/update-entity entity-id :invuln-timer 0)
           )
          (entity/update-entity entity-id :invuln-timer (- (:invuln-timer entity) 1))
         ))

      (if (or
           (:up @events/key-state)
           (:left @events/key-state)
           (:down @events/key-state)
           (:right @events/key-state)
           )
        (entity/update-entity entity-id :walking true)
        (entity/update-entity entity-id :walking false))

      (if (and
           (:up @events/key-state)
           (not
            (or
             (bounds/entity-collides entity-id 0 (* y-speed -1))
             (bounds/entity-collides entity-id (.-width size) (* x-speed -1))
             )))
        (entity/update-entity entity-id :y (- y y-speed)))

      (if (and
           (:left @events/key-state)
           (not
            (or
             (bounds/entity-collides entity-id (* x-speed -1) 0)
             (bounds/entity-collides entity-id (* y-speed -1) (.-height size))
             )))
        ((entity/update-entity entity-id :x (- x x-speed))
         (entity/update-entity entity-id :direction -1)))

      (if (and
           (:down @events/key-state)
           (not
            (or
             (bounds/entity-collides entity-id 0 (+ (.-height size) (* y-speed 2)))
             (bounds/entity-collides entity-id (.-width size) (+ (.-height size) (* y-speed 2)))
             )))
        (entity/update-entity entity-id :y (+ y y-speed)))

      (if (and
           (:right @events/key-state)
           (not
            (or
             (bounds/entity-collides entity-id (+ (.-width size) x-speed) 0)
             (bounds/entity-collides entity-id (+ (.-width size) x-speed) (.-height size))
             )))
        ((entity/update-entity entity-id :x (+ x x-speed))
         (entity/update-entity entity-id :direction 1)
         )))))

(def projectile-tick
  (fn [entity-id]
    (let [entity (entity/get-entity entity-id)]
      (entity/update-entity entity-id :x (+ (:x entity) (:x-speed entity)))
      (entity/update-entity entity-id :y (+ (:y entity) (:y-speed entity))))))

(def projectile-collides
  (fn [entity collided]
    (if (and
         (:takes-damage collided)
         (not (:invulnerable collided)))
      ((entity/update-entity (:id collided) :invuln-timer 150)
       (entity/update-entity (:id collided) :invulnerable true))
      )))
