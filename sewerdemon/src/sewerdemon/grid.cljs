(ns ^:figwheel-always sewerdemon.grid
    (:require [om.core :as om :include-macros true]
              [om.dom :as dom :include-macros true]
              [sewerdemon.blocks :as blocks]
              [sewerdemon.bounds :as bounds]
              [sewerdemon.levels :as levels]))

(defonce grid-state
  (atom
   {:grid (levels/get-level :level-one)}))

;; Represents a cell.
(defn cell-view [cell owner]
  (reify
    om/IRender
    (render [this]
      (dom/div #js {:className (blocks/block-by-key cell)} ""))
    om/IDidMount
    (did-mount [this]
      (if (blocks/is-wall cell)
        (bounds/add-bound
         (.getBoundingClientRect (om/get-node owner)))))))

;; Represent a row.
(defn row-view [row owner]
  (reify
    om/IRender
    (render [this]
      (apply dom/div #js {:className "row"}
             (om/build-all cell-view row)))))

;; Represents the entire grid.
(defn draw [data owner]
  (reify
    om/IRender
    (render [this]
      (dom/div nil
               (apply dom/div nil
                      (om/build-all row-view (:grid data)))))))
