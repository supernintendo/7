(ns ^:figwheel-always sewerdemon.entities
    (:require [sewerdemon.behaviors :as behaviors]))

;; Schema

(defn positional [x y]
  {:x x :y y})

(defn moves [x-speed y-speed]
  {:x-speed x-speed :y-speed y-speed})

(defn takes-damage [max-hp]
  {
   :hit-points max-hp
   :max-hit-points max-hp
   :invulnerable false
   :invuln-timer 0
   :takes-damage true
   })

(defn schema [key]
  (case key
    "player"
    (merge {:name "Player"}
           (positional 200 200)
           (moves 4 2)
           (takes-damage 10)
           {:behaviors {
                        :collides nil
                        :tick #'behaviors/player-tick
                        }
            }
           {:direction 1})

    "projectile"
    (merge {:className "projectile"}
           (positional 100 20)
           (moves 2 2)
           {:direction 1}
           {:behaviors {
                        :collides #'behaviors/projectile-collides
                        :tick #'behaviors/projectile-tick
                        }
            })
    ))
