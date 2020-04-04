import Vue from "vue"
import vuetimeline from "@growthbunker/vuetimeline"

Vue.use(vuetimeline)

Vue.mixin({
    methods: {
        setFallbackImageUrl(event) {
            console.log('Image failed to load, setting fallback.')
            event.target.src = 'https://via.placeholder.com/150'
        }
    }
})