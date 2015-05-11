(ns ^:figwheel-always sewerdemon.core
    (:require [om.core :as om :include-macros true]
              [om.dom :as dom :include-macros true]
              [sewerdemon.blocks :as blocks]
              [sewerdemon.collisions :as collisions]
              [sewerdemon.grid :as grid]
              [sewerdemon.levels :as levels]
              [sewerdemon.entity :as entity]
              [sewerdemon.entities :as entities]
              [sewerdemon.events :as events]
              [sewerdemon.state :as state]
              [sewerdemon.tick :as tick]))

;; print in JavaScript console.
(enable-console-print!)
;; State atoms
(defonce game-state
  (atom
   {:initialized? false}))

;; Load a level into the game state :grid.
(defn load-level [level-keyword]
  (swap! grid/grid-state assoc :grid (levels/get-level level-keyword)))

;; Re render the game context.
(om/root
 grid/draw
 grid/grid-state
 {:target (. js/document (getElementById "game-grid"))})

(om/root
 entity/draw
 state/entities
 {:target (. js/document (getElementById "game-entities"))})

;; Only call this once.
(if-not (get @game-state :initialized?)
  (do
    (events/align-containers-on-window-resize)
    (events/capture-key-events)
    (entity/add-entity (entities/schema "player"))
    (entity/add-entity (entities/schema "projectile"))
    (tick/add-event collisions/detect-collisions "detect-collisions")
    (tick/tock)
    (swap! game-state assoc :initialized? true)
    (.log js/console "Game initialized.")))
