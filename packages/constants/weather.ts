/**
 * @see https://icons.qweather.com
 * @see https://lbs.amap.com/api/webservice/guide/tools/weather-code/
 */
const icons = new Map([
  ['晴', '100'],
  ['多云', '101'],
  ['少云', '102'],
  ['晴间多云', '103'],
  ['阴', '104'],
  ['阵雨', '300'],
  ['强阵雨', '301'],
  ['雷阵雨', '302'],
  ['强雷阵雨', '303'],
  ['雷阵雨并伴有冰雹', '304'],
  ['小雨', '305'],
  ['中雨', '306'],
  ['大雨', '307'],
  ['极端降雨', '308'],
  ['毛毛雨/细雨', '309'],
  ['暴雨', '310'],
  ['大暴雨', '311'],
  ['特大暴雨', '312'],
  ['冻雨', '313'],
  ['小雨-中雨', '314'],
  ['中雨-大雨', '315'],
  ['大雨-暴雨', '316'],
  ['暴雨-大暴雨', '317'],
  ['大暴雨-特大暴雨', '318'],
  ['雨', '399'],
  ['小雪', '400'],
  ['中雪', '401'],
  ['大雪', '402'],
  ['暴雪', '403'],
  ['雨夹雪', '404'],
  ['雨雪天气', '405'],
  ['阵雨夹雪', '406'],
  ['小雪-中雪', '408'],
  ['中雪-大雪', '409'],
  ['大雪-暴雪', '410'],
  ['阵雪', '457'],
  ['雪', '499'],
  ['轻雾', '500'],
  ['雾', '501'],
  ['霾', '502'],
  ['扬沙', '503'],
  ['浮尘', '504'],
  ['沙尘暴', '507'],
  ['强沙尘暴', '508'],
  ['浓雾', '509'],
  ['强浓雾', '510'],
  ['中度霾', '511'],
  ['重度霾', '512'],
  ['严重霾', '513'],
  ['大雾', '514'],
  ['特强浓雾', '515'],
  ['热', '900'],
  ['冷', '901'],
  ['未知', '999'],
])

export const weatherImages = new Map([
  ['晴', '100'],
  ['多云', '101'],
  ['少云', '101'],
  ['晴间多云', '103'],
  ['阴', '104'],
  ['阵雨', '300'],
  ['强阵雨', '300'],
  ['雷阵雨', '302'],
  ['强雷阵雨', '302'],
  ['雷阵雨并伴有冰雹', '302'],
  ['小雨', '305'],
  ['中雨', '306'],
  ['大雨', '306'],
  ['极端降雨', '306'],
  ['毛毛雨/细雨', '305'],
  ['暴雨', '310'],
  ['大暴雨', '311'],
  ['特大暴雨', '312'],
  ['冻雨', '313'],
  ['小雨-中雨', '305'],
  ['中雨-大雨', '306'],
  ['大雨-暴雨', '310'],
  ['暴雨-大暴雨', '311'],
  ['大暴雨-特大暴雨', '312'],
  ['雨', '305'],
  ['小雪', '400'],
  ['中雪', '401'],
  ['大雪', '402'],
  ['暴雪', '403'],
  ['雨夹雪', '400'],
  ['雨雪天气', '400'],
  ['阵雨夹雪', '400'],
  ['小雪-中雪', '401'],
  ['中雪-大雪', '402'],
  ['大雪-暴雪', '403'],
  ['阵雪', '400'],
  ['雪', '400'],
  ['轻雾', '502'],
  ['雾', '502'],
  ['霾', '502'],
  ['扬沙', '507'],
  ['浮尘', '507'],
  ['沙尘暴', '507'],
  ['强沙尘暴', '507'],
  ['浓雾', '502'],
  ['强浓雾', '502'],
  ['中度霾', '502'],
  ['重度霾', '502'],
  ['严重霾', '502'],
  ['大雾', '502'],
  ['特强浓雾', '502'],
  ['热', '999'],
  ['冷', '999'],
  ['未知', '999'],
])

export default icons
