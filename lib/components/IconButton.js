import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

export default function ATIconButton (props) {
  const { children, onPress, imageIcon, ...expandProps } = props

  return (
    <Button
      iconOnly
      icon={children}
      onPress={onPress}
      isImageIcon={imageIcon}
      {...expandProps}
    />
  )
}

ATIconButton.defaultProps = {
  children: '',
  imageIcon: false
}

ATIconButton.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  imageIcon: PropTypes.bool
}
