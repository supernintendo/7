(ns ^:figwheel-always sewerdemon.entity
    (:require [cljs-uuid-utils.core :as uuid]
              [goog.style :as style]
              [om.core :as om :include-macros true]
              [om.dom :as dom :include-macros true]
              [sewerdemon.state :as state]
              [sewerdemon.tick :as tick]))

;; State management

(defn add-entity [entity]
  (let [behavior (get-in entity [:behaviors :tick])
        id (uuid/make-random-uuid)]
    (swap! state/entities assoc :entities
           (conj
            (:entities @state/entities)
            (assoc entity :id id)))
    (tick/add-event behavior id)))

(defn get-entity [entity-id]
  (if-let
      [matches (filter
                (fn [entity] (= entity-id (:id entity)))
                (:entities @state/entities))]
    (first matches)))

(defn get-from-entity [entity-id key]
  (if-let
      [matches (filter
                (fn [entity] (= entity-id (:id entity)))
                (:entities @state/entities))]
    (key (first matches))))

(defn update-entity [entity-id key value]
  (if-let
      [matches (filter
                (fn [entity] (= entity-id (:id entity)))
                (:entities @state/entities))]
    (swap! state/entities assoc :entities
           (conj
            (filter (fn [entity] (not= entity-id (:id entity))) (:entities @state/entities))
            (assoc (first matches) key value)))))

;; Helper functions

(defn css-transform-string-chunk [acc key value]
  (if (= key :scaleX)
    (str acc (name key) "(" (* value -1) ") ")
    (str acc (name key) "(" value "px) ")
    ))

(defn css-transform-string [properties]
  (reduce-kv css-transform-string-chunk "" properties))

(defn entity-view [entity owner]
  (reify
    om/IRender
    (render [this]
      (dom/div #js
               {
                :id (:name entity)
                :className (:className entity)
                } ""))
    om/IDidMount
    (did-mount [this]
      (update-entity (:id entity) :node (om/get-node owner))
      (update-entity (:id entity) :size (style/getSize (om/get-node owner))))
    om/IDidUpdate
    (did-update [this prev-props prev-state]
      (set! (.-transform (.-style (om/get-node owner)))
            (css-transform-string
             {:translateX (:x entity)
              :translateY (:y entity)
              :scaleX (:direction entity)
              }))
      (set! (.-invulnerable (.-dataset (om/get-node owner))) (:invulnerable entity))
      (set! (.-walking (.-dataset (om/get-node owner))) (:walking entity))
      )))

;; Om

(defn draw [data owner]
  (reify
    om/IRender
    (render [this]
      dom/div nil
      (apply dom/div #js {:className "entity"}
             (om/build-all entity-view (:entities data))))))
