<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { weatherImages } from '@zhdgps/constants'
import { GetIPLocation, GetWeather } from '@zhdgps/utils'
import { ElMessage } from 'element-plus'

const props = defineProps({
  size: {
    type: String,
    values: ['large', 'small'],
    default: 'large',
  },
})

const locationCity = ref<any>({})
const forecasts = ref<any[]>([])
const weatherData = ref<any>({})
const date = ref(0)
const fetchLoading = ref(false)
const dayIcon = ref('')
const nightIcon = ref('')
let scrollIntervalId: any = null
let animateTimeoutId: any = null
const weatherAnimate = ref(false)

onMounted(async () => {
  fetchLoading.value = true
  await fetchIPLocation().catch(() => {})
  await fetchWeather().catch(() => {})
  fetchLoading.value = false
})
watch(weatherData, async () => {
  const nightCode = weatherImages.get(weatherData.value.nightweather) || '999'
  const dayCode = weatherImages.get(weatherData.value.nightweather) || '999'
  const nightModule = await import(`../../../assets/img/weather/${nightCode}.png`)
  const dayModule = await import(`../../../assets/img/weather/${dayCode}.png`)
  dayIcon.value = dayModule.default
  nightIcon.value = nightModule.default
})
// 根据IP获取定位信息
function fetchIPLocation() {
  return GetIPLocation().then((data) => {
    const { status, city, adcode } = data
    if (status === '1') {
      locationCity.value = {
        city,
        adcode,
      }
    }
  })
}
// 根据城市编码获取实况天气
function fetchWeather() {
  forecasts.value = []
  const adcode = locationCity.value.adcode
  if (!adcode || typeof adcode !== 'string') {
    ElMessage({
      message: '获取天气失败',
      type: 'error',
    })
    return Promise.resolve()
  }
  return GetWeather(adcode, 'all').then((data) => {
    const { status, forecasts: forecastList = [] } = data || {}
    if (status === '1') {
      forecasts.value = forecastList[0].casts.slice(0, 3).map((item: any, index: number) => {
        return {
          ...item,
          cnDay: getDate(index),
        }
      }) || []
      console.log(forecasts.value)
      weatherData.value = forecasts.value[0]
      console.log(weatherData.value)

      if (props.size === 'small' && forecasts.value.length > 0) {
        startScrollWeather()
      }
    }
  })
}

function handleDateChange() {
  if (forecasts.value.length > date.value) {
    weatherData.value = forecasts.value[date.value]
  }
}
function appendSuffix(value: string, suffix: string) {
  return value == null || value === '' ? '' : value + (suffix || '')
}

function startScrollWeather() {
  stopScrollWeather()
  scrollIntervalId = setInterval(() => {
    weatherAnimate.value = true

    animateTimeoutId = setTimeout(() => {
      forecasts.value.push(forecasts.value.shift() || {})
      weatherAnimate.value = false
    }, 300)
  }, 3000)
}
function stopScrollWeather() {
  clearInterval(scrollIntervalId)
  clearTimeout(animateTimeoutId)
}

function getDate(index: number) {
  switch (index) {
    case 0:
      return '今天'
    case 1:
      return '明天'
    case 2:
      return '后天'
    default:
      break
  }
}
</script>

<template>
  <div
    v-if="size === 'small'"
    class="header-right-weather"
    @mouseenter="stopScrollWeather"
    @mouseleave="startScrollWeather"
  >
    <div class="header-right-weather-list" :class="{ 'header-right-weather-list--animate': weatherAnimate }">
      <div v-for="{ dayweather, daytemp, week, cnDay } in forecasts" :key="week" class="header-right-weather-item">
        <p class="header-right-weather__time">
          <img class="header-right-weather__icon" :src="dayIcon" alt="weather">
          <span>{{ cnDay }}</span>
        </p>
        <p class="header-right-weather-content">
          <span v-if="daytemp != null" class="header-right-weather__temp">{{ daytemp }}℃</span>
          <span class="header-right-weather__name">{{ dayweather }}</span>
        </p>
      </div>
    </div>
  </div>
  <div v-else class="weather home-card">
    <div class="home-card-header">
      <span class="home-card-header__name">天气情况</span>
      <span class="weather-updatetime">
        <template v-if="forecasts.length > 0">
          <el-radio-group v-model="date" size="small" @change="handleDateChange">
            <el-radio-button :label="0"> 今天 </el-radio-button>
            <el-radio-button :label="1"> 明天 </el-radio-button>
            <el-radio-button :label="2"> 后天 </el-radio-button>
          </el-radio-group>
        </template>
        <template v-else>暂无数据</template>
      </span>
    </div>
    <div class="home-card-body">
      <div v-loading="fetchLoading" class="weather-body">
        <div class="weather-content">
          <img class="weather-day__icon" :src="dayIcon" alt="">
          <div class="weather-content-feature">
            <p>白天</p>
            <p>{{ weatherData.dayweather }}</p>
            <p>{{ appendSuffix(weatherData.daytemp, '℃') }}</p>
          </div>
          <p class="weather-content-wind">
            <span>风力{{ weatherData.daypower || 0 }}级</span>
            <span class="weather-content-wind__direction">
              风向:{{ weatherData.daywind || '无' }}风
            </span>
          </p>
        </div>
        <div class="weather-content">
          <img class="weather-day__icon" :src="nightIcon" alt="">
          <div class="weather-content-feature">
            <p>夜晚</p>
            <p>{{ weatherData.nightweather }}</p>
            <p>{{ appendSuffix(weatherData.nighttemp, '℃') }}</p>
          </div>
          <p class="weather-content-wind">
            <span>风力{{ weatherData.nightpower || 0 }}级</span>
            <span class="weather-content-wind__direction">
              风向:{{ weatherData.nightwind || '无' }}风
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
    vertical-align: middle;
    display: inline-block !important;
  }
.weather {
  height: 166px;

  // @media (max-width: 1600px) {
  //   height: 348px;
  // }

  &-updatetime {
    float: right;
    font-size: 12px;
    font-family: DingTalk-JinBuTi, sans-serif;
    color: #7485a3;
    ::v-deep .el-radio-group {
      font-size: unset;
    }
  }

  &-body {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;

    &::after {
      position: absolute;
      top: 22px;
      bottom: 22px;
      left: 50%;
      width: 1px;
      background: #eeeeee;
      content: '';
    }

    // @media (max-width: 1600px) {
    //   flex-direction: column;

    //   &::after {
    //     top: 50%;
    //     right: 32px;
    //     bottom: auto;
    //     left: 32px;
    //     width: auto;
    //     height: 1px;
    //   }
    // }
  }

  &-content {
    width: 50%;
    text-align: center;

    // @media (max-width: 1600px) {
    //   padding-top: 40px;
    //   width: 100%;
    // }

    &__icon,
    &-feature {
      display: inline-block;
      vertical-align: middle;
    }

    &__icon {
      margin-right: 24px;
      width: 56px;
      height: 56px;
    }

    &-feature,
    &-wind {
      font-size: 14px;
      color: #4b4b4b;
    }

    &-feature {
      margin-left: 16px;
    }

    &-wind {
      padding-top: 10px;

      &__direction {
        margin-left: 16px;
        color: #8e8e8e;
      }
    }
  }

  &-night {
    width: 50%;
    text-align: center;

    // @media (max-width: 1600px) {
    //   padding-top: 60px;
    //   width: 100%;
    // }

    &__name {
      margin-left: 3px;
    }

    &__value {
      font-size: 40px;
      font-family: DingTalk-Sans, sans-serif;
      color: #3ab8ff;
    }
  }
}

.home-card {
      overflow: hidden;
      border-radius: 8px;
      background: #ffffff;

      $header-height: 40px;

      &-header {
        padding: 0 16px;
        height: $header-height;
        background: #f7faff;
        line-height: $header-height;

        &__name {
          font-size: 18px;
          font-family: 'PingFang SC-Medium', 'PingFang SC', sans-serif;
          font-weight: 500;
          color: #7485a3;
        }
      }

      &-body {
        height: calc(100% - $header-height);
      }
    }

.header-right-weather {
  overflow: hidden;
  height: 58px;
  font-size: 18px;
  font-family: DingTalk-JinBuTi, sans-serif;
  text-align: center;

  &-list {
    margin-top: 0;

    &--animate {
      margin-top: -58px;
      transition: margin-top 0.3s;
    }
  }

  &-item {
    height: 58px;
  }

  &__temp {
    margin-right: 8px;
    font-family: DingTalk-Sans, sans-serif;
  }

  &__icon {
    margin-right: 4px;
    height: 28px;
  }

  &__time {
    text-align: center;
  }
}
</style>
