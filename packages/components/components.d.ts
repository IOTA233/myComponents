
import CountTo from './src/countTo/index.vue'
import Locate from './src/locate/index.vue'
import Weather from './src/weather/index.vue'
import Satellite from './src/satellite/index.vue'

declare module 'vue' {
  export interface GlobalComponents {
    CountTo: typeof CountTo
    Locate: typeof Locate
    Weather: typeof Weather
    Satellite: typeof Satellite
  }
}