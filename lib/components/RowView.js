import React from 'react'
import { View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'

export default function RowView (props) {
  const { children, style, scroll, ...expandProps } = props
  const view = <View
    style={[
      styles.row,
      style,
      scroll ? { flexWrap: 'nowrap' } : {}
    ]}
    {...expandProps}
  >
    {children}
  </View>
  return scroll ? (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {view}
    </ScrollView>
  ) : view
}

const styles = {
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  }
}

RowView.defaultProps = {
  children: null,
  scroll: false
}

RowView.propTypes = {
  children: PropTypes.node,
  scroll: PropTypes.bool
}
