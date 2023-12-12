<script  lang="ts" setup>
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import { Feature, Map, View } from 'ol'
import MousePosition from 'ol/control/MousePosition'
import { createStringXY } from 'ol/coordinate'
import type { Geometry } from 'ol/geom'
import { Point } from 'ol/geom'
import { Tile, Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource, XYZ } from 'ol/source'
import { Icon, Style } from 'ol/style'

import type { GeoCode } from '@zhdgps/constants'
import { tiandituKey } from '@zhdgps/constants'
import { GetGeocode, GetReGeocode, gcj02towgs84, wgs84togcj02 } from '@zhdgps/utils'

import pcaOptions from '@zhdgps/assets/json/province-city-area.json'
import markerIcon from '@zhdgps/assets/img/inspect/marker.png'
import { ElMessage } from 'element-plus'
import { random } from 'lodash-unified'

defineOptions({
  name: 'PickCoordinate',
})
const props = defineProps({
  coordinates: {
    type: Array<number>,
    default: () => [],
  },
  // 是否根据坐标查询地理信息
  useGeoCode: {
    type: Boolean,
    default: true,
  },
})
const emits = defineEmits(['pickChange'])

const CENTER = [106.398962, 33.499772]
const ZOOM = 5

const keyword = ref('')
const map = ref()
const pickCoordinate = ref<number[]>([])
let geoCode: GeoCode = {}
let markerFeature: Feature<Geometry>
let markerLayer: VectorLayer<VectorSource<Feature<Geometry>>>
let mapInstance: Map
const mapId = random(8).toString()
const coordinateFormat = createStringXY(6)

const showCoordinate = computed(() =>
  pickCoordinate.value.length > 0 ? coordinateFormat(pickCoordinate.value).toString() : '',
)

watch(showCoordinate, () => {
  handleChange()
})
onMounted(() => {
  keyword.value = ''
  geoCode = {}
  // 首次打开坐标拾取
  setTimeout(() => {
    setupMap()
  }, 300)
})
onBeforeMount(() => destroyMap())

function setupMap() {
  const baseLayer = new Tile({
    source: new XYZ({
      url: getTdtUrl('img'),
    }),
  })
  const labelLayer = new Tile({
    source: new XYZ({
      url: getTdtUrl('cia'),
    }),
  })
  const mousePosition = new MousePosition({
    target: 'location',
    projection: 'EPSG:4326',
    coordinateFormat,
  })

  const hasCoordinates = props.coordinates.length > 0
  const center = hasCoordinates ? props.coordinates : CENTER
  mapInstance = new Map({
    target: mapId, // 绑定的dom元素
    layers: [baseLayer, labelLayer],
    controls: [mousePosition],
    view: new View({
      center,
      projection: 'EPSG:4326',
      extent: [-180, -90, 180, 90],
      zoom: hasCoordinates ? 14 : ZOOM, // 默认缩放等级
    }),
  })
  addMarkerLayer(hasCoordinates)

  mapInstance.on('singleclick', (e: { coordinate: number[] }) => {
    geoCode = {}
    updateMarker(e.coordinate)
  })
}
/**
 * 获取天地图底图
 * @param {string} lyr 图层名称
 * @returns {string}
 */
function getTdtUrl(lyr: string): string {
  return `https://t{0-7}.tianditu.gov.cn/${lyr}_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=${lyr}&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tiandituKey}`
}
/**
 * 添加标注图层
 * @param {boolean} hasCoordinates 是否有初始化坐标
 */
function addMarkerLayer(hasCoordinates: boolean) {
  markerFeature = new Feature()
  markerLayer = new VectorLayer({
    source: new VectorSource({
      features: [markerFeature],
    }),
    style: () => {
      return new Style({
        image: new Icon({
          anchor: [0.5, 0.96],
          scale: 0.5,
          src: markerIcon,
          size: [64, 64],
          crossOrigin: 'Anonymous',
        }),
      })
    },
  })

  mapInstance.addLayer(markerLayer)

  if (hasCoordinates) {
    updateMarker(props.coordinates)
  }
}
/**
 * 更新标注点坐标
 * @param {Array} coordinate 新的坐标点
 * @param {boolean} isFit 是否缩放到坐标点
 */
function updateMarker(coordinate: Array<number>, isFit: boolean = false) {
  pickCoordinate.value = coordinate
  markerFeature.set('geometry', new Point(coordinate))

  if (isFit && markerLayer) {
    const source = markerLayer.getSource()
    if (source) {
      mapInstance.getView().fit(source.getExtent(), {
        padding: [25, 50, 25, 50],
        maxZoom: 14,
      })
    }
  }
}
/**
 * 查询地理编码
 * @summary 通过关键字查询相关位置的坐标
 */
function handleSearch() {
  if (!keyword.value) {
    ElMessage({
      message: '请输入关键词',
      type: 'warning',
    })
    return
  }
  GetGeocode(keyword.value).then((res) => {
    const { status, geocodes } = res
    if (status === '1' && geocodes[0]) {
      geoCode = geocodes[0]
      if (geoCode.location) {
        const gcj02Coordinate = geoCode.location.split(',').map(Number)
        // 需要把gcj02转成wgs84
        const [lat, long] = gcj02Coordinate
        pickCoordinate.value = gcj02towgs84(lat, long)
        updateMarker(pickCoordinate.value, true)
      }
    } else {
      ElMessage({
        message: '未找到相关地址',
        type: 'warning',
      })
    }
  })
}
async function handleChange() {
  if (showCoordinate.value === props.coordinates.join(', ')) {
    return
  }
  const wgs84Coordinate = showCoordinate.value.split(',').map(Number)

  let geo = { } as any
  if (props.useGeoCode && showCoordinate.value && !geoCode.adcode) {
    geo = await fetchReGeoCode(wgs84Coordinate).catch(() => {})
  } else if (geoCode.adcode) {
    const { adcode, formatted_address: formattedAddress } = geoCode
    const adcodeTree = deal(pcaOptions, (node: any) => node.value === adcode)
    geo = { address: formattedAddress, ...flatMap(adcodeTree) }
  }
  emits('pickChange', {
    address: geo.address || '',
    district: geo.district || [],
    districtCode: geo.districtCode || [],
    coordinate: wgs84Coordinate,
  })
  console.log({
    address: geo.address || '',
    district: geo.district || [],
    districtCode: geo.districtCode || [],
    coordinate: wgs84Coordinate,
  })
}
/**
 * 逆地理编码
 * @summary 查询坐标点的地理信息
 * @param {Array} wgs84Coordinate GPS坐标
 */
async function fetchReGeoCode(wgs84Coordinate: Array<any>) {
  // 调用高德api需要使用gcj02坐标系
  const [lon, lat] = wgs84Coordinate
  const gcj02Coordinate = wgs84togcj02(lon, lat)
  const res = await GetReGeocode(gcj02Coordinate.join(','))
  const { status, regeocode } = res
  if (status === '1') {
    const { addressComponent, formatted_address: formattedAddress } = regeocode

    if (typeof formattedAddress !== 'string') {
      return { address: '', district: [], districtCode: '' }
    }

    const adcodeTree = deal(pcaOptions, (node: any) => node.value === addressComponent.adcode)

    return { address: formattedAddress, ...flatMap(adcodeTree) }
  }
}
/**
 * 获取扁平化的地区编码
 * @param {Array} tree 源数据 [{value,label,children:[]}]
 * @param {Array} district 地区 ['广东省', '广州市', '番禺区']
 * @param {Array} districtCode 地区编码 ['44', '4401', '440113']
 * @returns {object} { district, districtCode }
 */
function flatMap(tree: Array<any> = [], district: Array<any> = [], districtCode: Array<any> = []): object {
  tree.forEach(({ value, label, children }) => {
    district.push(label)
    districtCode.push(value)

    if (children) {
      flatMap(children, district, districtCode)
    }
  })

  return { district, districtCode }
}
/**
 * 递归过滤节点，但保留原树结构，即符合条件节点的父路径上所有节点不管是否符合条件都保留
 * @param {any[]} nodes 要过滤的节点
 * @param {Function} predicate node => boolean 过滤条件，符合条件的节点保留
 * @return {Array} 过滤后的根节点数组
 */
function deal(nodes: any[], predicate: Function): Array<any> | undefined {
  // 如果已经没有节点了，结束递归
  if (!(nodes && nodes.length)) {
    return
  }

  const newChildren = []
  nodes = JSON.parse(JSON.stringify(nodes))
  for (const node of nodes) {
    const subs = deal(node.children, predicate)

    // 以下两个条件任何一个成立，当前节点都应该加入到新子节点集中
    // 1. 子孙节点中存在符合条件的，即 subs 数组中有值
    // 2. 自己本身符合条件
    if ((subs && subs.length) || predicate(node)) {
      node.children = subs
      newChildren.push(node)
    }
  }
  return newChildren.length ? newChildren : void 0
}
function destroyMap() {
  if (!mapInstance) {
    return
  }

  const controls = mapInstance.getControls().getArray()
  const layers = mapInstance.getLayers().getArray()
  for (let i = controls.length - 1; i >= 0; i--) {
    mapInstance.removeControl(controls[i])
  }
  for (let i = layers.length - 1; i >= 0; i--) {
    if ((layers[i] as any).getSource) {
      const sources = (layers[i] as any).getSource()
      if (sources && sources.clear) {
        sources.clear()
      }
    }

    mapInstance.removeLayer(layers[i])
  }
}
</script>

<template>
  <div class="picker">
    <div class="picker-header">
      <el-space class="picker-header-left">
        <el-input
          v-model="keyword"
          class="picker-header-search"
          placeholder="请输入关键字进行搜索"
          @keyup.enter="handleSearch"
        />
        <el-button type="primary" @click="handleSearch">
          搜索
        </el-button>
      </el-space>
      <div v-show="showCoordinate" class="picker-header-right picker-header__result">
        坐标：{{ showCoordinate }}
      </div>
    </div>
    <div :id="mapId" ref="map" class="map">
      <div id="location" class="map-location" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.picker {
  &__icon {
    cursor: pointer;
  }

  &-header {
    margin-bottom: 8px;

    &-search {
      width: 220px;
    }

    &__result {
      float: right;
      font-size: 16px;
    }
  }
}

.map {
  position: relative;
  height: calc(80vh - 120px);

  &-location {
    position: absolute;
    right: 0;
    bottom: 40px;
    z-index: 666;
    font-size: 20px;
    white-space: nowrap;
    color: #fff;
    text-shadow: 0 0 4px #000;
  }
}
</style>
