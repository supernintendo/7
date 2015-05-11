(ns ^:figwheel-always sewerdemon.blocks)

;; Transform the keyword defined in the level vector to the
;; associated class name of its DOM element.
(defn block-by-key [key]
  (case key
    :░ "floor"
    :▊ "wall"
    :⬚ "void"
    "void"))

(defn is-wall [key]
  (some #(= key %) [:▊]))
