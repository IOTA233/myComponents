<script>
import { GetIPLocation, GetWeather } from '@/api/amap'
import { weatherImages } from '@/vendor/weather/icons'

export default {
  data() {
    return {
      locationCity: {},
      forecasts: [],
      weatherData: {},
      date: 0,
      fetchLoading: false,
    }
  },
  async created() {
    this.fetchLoading = true
    await this.fetchIPLocation().catch(() => {})
    await this.fetchWeather().catch(() => {})
    this.fetchLoading = false
  },
  methods: {
    // 根据IP获取定位信息
    fetchIPLocation() {
      return GetIPLocation().then((data) => {
        const { status, city, adcode } = data
        if (status === '1') {
          this.locationCity = {
            city,
            adcode,
          }
        }
      })
    },
    // 根据城市编码获取实况天气
    fetchWeather() {
      this.forecasts = []
      const adcode = this.locationCity.adcode
      if (!adcode || typeof adcode !== 'string') {
        this.$message.error({
          type: 'fail',
          content: this.$t('home.获取天气失败'),
        })
        return Promise.resolve()
      }
      return GetWeather(adcode, 'all').then((data) => {
        const { status, forecasts = [] } = data || {}
        if (status === '1') {
          this.forecasts = forecasts[0].casts.slice(0, 3) || []
          this.weatherData = this.forecasts[0]
          this.reporttime = forecasts[0].reporttime
        }
      })
    },
    getWeatherIcon(weather) {
      const code = weatherImages.get(weather) || '999'
      return `/assets/img/weather/${code}.png`
    },
    handleDateChange() {
      if (this.forecasts.length > this.date) {
        this.weatherData = this.forecasts[this.date]
      }
    },
  },
}
</script>

<template>
  <div class="weather home-card">
    <div class="home-card-header">
      <span class="home-card-header__name">{{ $t('home.天气情况') }}</span>
      <span class="weather-updatetime">
        <template v-if="forecasts.length > 0">
          <a-radio-group v-model="date" size="small" button-style="solid" @change="handleDateChange">
            <a-radio-button :value="0"> {{ $t('公共.今天') }} </a-radio-button>
            <a-radio-button :value="1"> {{ $t('公共.明天') }} </a-radio-button>
            <a-radio-button :value="2"> {{ $t('公共.后天') }} </a-radio-button>
          </a-radio-group>
        </template>
        <template v-else>{{ $t('公共.暂无数据') }}</template>
      </span>
    </div>
    <div class="home-card-body">
      <a-spin :spinning="fetchLoading">
        <div class="weather-body">
          <div class="weather-content">
            <img class="weather-day__icon" :src="getWeatherIcon(weatherData.dayweather)" alt="">
            <div class="weather-content-feature">
              <p>{{ $t('公共.白天') }}</p>
              <p>{{ weatherData.dayweather }}</p>
              <p>{{ weatherData.daytemp | appendSuffix('℃') }}</p>
            </div>
            <p class="weather-content-wind">
              <span>{{ $t('home.风力') }}{{ weatherData.daypower || 0 }}{{ $t('公共.级') }}</span>
              <span class="weather-content-wind__direction">
                {{ $t('home.风向') }}:{{ weatherData.daywind || $t('公共.无') }}{{ $t('home.风') }}
              </span>
            </p>
          </div>
          <div class="weather-content">
            <img class="weather-day__icon" :src="getWeatherIcon(weatherData.nightweather)" alt="">
            <div class="weather-content-feature">
              <p>{{ $t('公共.夜晚') }}</p>
              <p>{{ weatherData.nightweather }}</p>
              <p>{{ weatherData.nighttemp | appendSuffix('℃') }}</p>
            </div>
            <p class="weather-content-wind">
              <span>{{ $t('home.风力') }}{{ weatherData.nightpower || 0 }}{{ $t('公共.级') }}</span>
              <span class="weather-content-wind__direction">
                {{ $t('home.风向') }}:{{ weatherData.nightwind || $t('公共.无') }}{{ $t('home.风') }}
              </span>
            </p>
          </div>
        </div>
      </a-spin>
    </div>
  </div>
</template>

<style lang="less" scoped>
.weather {
  height: 166px;

  @media (max-width: 1600px) {
    height: 348px;
  }

  &-updatetime {
    float: right;
    font-size: 12px;
    font-family: DingTalk-JinBuTi, sans-serif;
    color: #7485a3;
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

    @media (max-width: 1600px) {
      flex-direction: column;

      &::after {
        top: 50%;
        right: 32px;
        bottom: auto;
        left: 32px;
        width: auto;
        height: 1px;
      }
    }
  }

  &-content {
    width: 50%;
    text-align: center;

    @media (max-width: 1600px) {
      padding-top: 40px;
      width: 100%;
    }

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

    @media (max-width: 1600px) {
      padding-top: 60px;
      width: 100%;
    }

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
</style>
