(ns ^:figwheel-always hearhear.words
    (:require [om.core :as om :include-macros true]
              [om.dom :as dom :include-macros true]
              [hearhear.word :as word]))

(defonce words-state (atom
                      {:words [
                               (word/new-word "nine"),
                               (word/new-word "two")
                               (word/new-word "five")
                               ]
                       }))

;; Represents a single word in the word cloud.
(defn word-view [instance owner]
  (reify
    om/IRender
    (render [this]
      (dom/div #js {:className "word"} (:word instance)))
    om/IDidMount
    (did-mount [this]
      (set! (.-count (.-dataset (om/get-node owner))) (:count instance)))
    om/IDidUpdate
    (did-update [this prev-props prev-state] (.log js/console "did-update"))))

;; Represents all words in the word cloud.
(defn draw [data owner]
  (reify
    om/IRender
    (render [this]
      dom/div nil
      (apply dom/div #js {:className "wordcloud"}
             (om/build-all word-view (:words data))))))
