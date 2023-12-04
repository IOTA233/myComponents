import {
  buildProps,
} from '@zhdgps/utils'
import type { ExtractPropTypes } from 'vue'
import type Locate from './locate.vue'

export const locateType = ['selsctor', 'picker', 'all']

export const locateProps = buildProps({
  type: {
    type: String,
    values: locateType,
    default: 'selector',
  },
  // 坐标，[经度, 纬度]
  coordinates: {
    type: Array,
    default: () => [],
  },
  cityCode: {
    type: Array,
    default: () => [],
  },
  cityName: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  canSwitchCountry: {
    type: Boolean,
    default: true,
  },
} as const)
export const locateEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}
export type LocateProps = ExtractPropTypes<typeof locateProps>
export type LocateEmits = typeof locateEmits
export type ButtonType = LocateProps['type']

export type LocateInstance = InstanceType<typeof Locate>
