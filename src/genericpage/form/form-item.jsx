import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { isNotEmpty, noop } from '@/nice-router/nice-router-util'
import classNames from 'classnames'
import isObject from 'lodash/isObject'
import FlexField from '../field/flex-field'
import ItemLabel from './item-label'
import ItemWrapper from './item-wrapper'
import './styles.scss'

export default class FormItem extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    field: {},
    errors: [],
    onChange: noop,
  }

  handleChange = (value, event) => {
    console.log('event', event)
    const { field, onChange } = this.props
    const { id } = field
    let fieldValue = value
    if (value && isObject(value.target)) {
      fieldValue = value.target.value
    }
    onChange(id, fieldValue)
  }

  handleClear = () => {
    const {
      field: { id },
      onChange,
    } = this.props
    onChange(id, null)
  }

  render() {
    const { field, value, errors, showRequired, bordered } = this.props
    const { label, rules, clear, tips, showTail } = field

    const layout = field.layout || this.props.layout || ''
    const hasError = isNotEmpty(errors)

    const rootClass = classNames('form-item', {
      'form-item-error': hasError,
      [`form-item-${layout}`]: true,
    })
    return (
      <ItemWrapper
        clear={clear}
        value={value}
        errors={errors}
        bordered={bordered}
        showTail={showTail}
        onClear={this.handleClear}
      >
        <View className={rootClass}>
          <ItemLabel tips={tips} rules={rules} layout={layout} showRequired={showRequired}>
            {label}
          </ItemLabel>
          <View className='form-item-flex-field'>
            <FlexField field={field} value={value} onChange={this.handleChange} />
          </View>
        </View>
      </ItemWrapper>
    )
  }
}
