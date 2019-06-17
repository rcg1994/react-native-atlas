import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import Theme from '../theme/Theme'

export default function ATText (props) {
  const {
    children,
    style,
    color,
    size,
    weight,
    content,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    lineHeight,
    ...expandProps
  } = props

  let types = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  let type = 'content'
  for (let i = 0; i < types.length; i++) {
    if (props[types[i]]) {
      type = types[i]
      break
    }
  }
  let fSize = Theme[`font_${type}`]
  if (size) {
    fSize = size
  }
  return (
    <Text
      style={[
        styles.defaultText,
        { fontSize: fSize, lineHeight: fSize * lineHeight },
        color ? { color } : '',
        weight ? { fontWeight: weight } : '',
        style
      ]}
      {...expandProps}
    >{children}</Text>
  )
}

const styles = {
  defaultText: {
    color: '#333'
  }
}

ATText.defaultProps = {
  children: '',
  content: true,
  lineHeight: Theme.font_line_height
}

ATText.propTypes = {
  children: PropTypes.node,
  content: PropTypes.bool,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  h6: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.number,
  weight: PropTypes.string
}
