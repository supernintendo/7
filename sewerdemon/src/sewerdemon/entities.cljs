(ns ^:figwheel-always sewerdemon.entities
    (:require [sewerdemon.behaviors :as behaviors]))

;; Schema

(defn schema [key]
  (case key
    "player"
    {
     :behaviors
     {
      :collides nil
      :tick #'behaviors/player-tick
      }
     :name "Player"
     :speed 4
     :x 200
     :y 100
     }
    
    "projectile"
    {
     :behaviors
     {
      :collides #'behaviors/projectile-collides
      :tick #'behaviors/projectile-tick
      }
     :className "projectile"
     :x 100
     :y 20
     :x-speed 2
     :y-speed 2
     }
    ))
