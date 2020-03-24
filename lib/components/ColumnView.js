import React from 'react'
import { View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import Helper from '../tool/Help'

export default function ColumnView (props) {
  const { children, style, scroll, center, ...expandProps } = props
  const view = <View
    style={[
      styles.column,
      center ? { justifyContent: 'center' } : '',
      style
    ]}
    {...expandProps}
  >
    {children}
  </View>
  return scroll ? (
    <ScrollView showsVerticalScrollIndicator={false}>
      {view}
    </ScrollView>
  ) : view
}

const styles = Helper.createStyle({
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap'
  }
})

ColumnView.defaultProps = {
  children: null,
  scroll: false,
  center: true
}

ColumnView.propTypes = {
  children: PropTypes.node,
  scroll: PropTypes.bool,
  center: PropTypes.bool
}
