import React from 'react'
import { Text, Stylesheet } from 'react-native'
import PropTypes from 'prop-types'
import Button from './Button'

export default function ATIconButton (props) {
  const {
    children,
    onPress,
    ...expandProps
  } = props

  return (
    <Button
      iconOnly
      title={children}
      onPress={onPress}
      {...expandProps}
    />
  )
}

ATIconButton.defaultProps = {
  children: ''
}

ATIconButton.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
}