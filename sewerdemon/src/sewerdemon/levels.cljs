(ns ^:figwheel-always sewerdemon.levels)

(defn get-level [level-keyword]
  (case level-keyword
    :level-one [
                [:⬚ :⬚ :▊ :▊ :▊ :⬚ :⬚ :▊ :▊ :▊ :▊ :▊],
                [:⬚ :▊ :▊ :░ :▊ :▊ :▊ :░ :░ :░ :▊],
                [:▊ :▊ :░ :░ :░ :░ :░ :░ :░ :░ :▊],
                [:▊ :░ :░ :░ :░ :░ :░ :░ :░ :░ :▊],
                [:▊ :░ :░ :░ :░ :░ :░ :░ :░ :░ :░ :▊],
                [:▊ :░ :░ :░ :░ :░ :░ :░ :░ :░ :░ :▊],
                [:▊ :░ :░ :░ :░ :░ :░ :░ :░ :░ :▊],
                [:▊ :░ :░ :░ :░ :░ :░ :░ :░ :░ :░ :▊ :▊],
                [:▊ :░ :░ :░ :░ :░ :░ :░ :░ :░ :░ :░ :░],
                [:▊ :▊ :░ :░ :▊ :▊ :░ :░ :▊ :░ :░ :░ :░],
                [:⬚ :▊ :▊ :▊ :▊ :▊ :▊ :▊ :▊ :▊ :▊ :▊ :▊]]
    ))
