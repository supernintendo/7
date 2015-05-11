(ns sewerdemon.monsters)

(defn get-monster [monster-keyword]
  (case monster-keyword
    ;; Easy monsters
    :rat {}
    :snake {}
    :slime {}

    ;; Medium monsters
    :ratman {}
    :lizardman {}

    ;; Hard monsters
    :headless-one {}
    ))
