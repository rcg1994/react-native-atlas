import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import IconButton from './IconButton'
import PropTypes from 'prop-types'
import { Theme, Colors } from '../theme'
import { HEADER_TYPE } from '../tool/Map'
import Helper from '../tool/Help'

class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    backButtonColor: PropTypes.string,
    titleStyle: PropTypes.any,
    backButtonStyle: PropTypes.any,
    style: PropTypes.any,
    backIcon: PropTypes.any,
    headerLeft: PropTypes.any,
    headerLeftStyle: PropTypes.any,
    headerRight: PropTypes.any,
    headerRightStyle: PropTypes.any,
    fixStatusBar: PropTypes.bool,
    fixPaddingTop: PropTypes.number,
    height: PropTypes.number,
    onBack: PropTypes.func,
    statusBar: PropTypes.string,
    contentType: PropTypes.oneOf(HEADER_TYPE)
  }

  static defaultProps = {
    statusBar: 'dark',
    contentType: 'dark',
    fixStatusBar: false,
    backIcon: null,
    onBack: () => {}
  }

  back = () => {
    this.props.onBack()
  }

  render () {
    const {
      title,
      contentType,
      backButtonStyle,
      titleStyle,
      style,
      backIcon,
      headerLeft,
      headerLeftStyle,
      headerRightStyle,
      headerRight,
      fixStatusBar,
      height,
      fixPaddingTop
    } = this.props
    let headerHeight = height || Theme.header_height
    let headerPaddingTop = fixStatusBar
      ? fixPaddingTop || Theme.header_padding_top
      : 0
    const isDark = contentType === 'dark'
    const eProps = {}
    eProps.underlayColor = 'transparent'
    const headerRightNode = headerRight || null
    const backButtonSize = headerHeight - headerPaddingTop
    const commonStyle = {
      height: headerHeight,
      paddingTop: headerPaddingTop
    }
    let headerLeftNode = headerLeft || (
      <IconButton
        ghost
        imageIcon
        border={false}
        onPress={this.back}
        style={[
          styles.iconButton,
          fixStatusBar
            ? {
              height: backButtonSize,
              width: backButtonSize
            }
            : {
              height: headerHeight,
              width: headerHeight
            },
          backButtonStyle
        ]}
        {...eProps}
      >
        {backIcon || (isDark ? (
          <Image
            style={styles.arrowImage}
            source={require('../assets/back.png')}
            resizeMode="contain"
          />
        ) : (
          <Image
            style={styles.arrowImage}
            source={require('../assets/back_light.png')}
            resizeMode="contain"
          />
        ))}
      </IconButton>
    )
    if (headerLeft === null) {
      headerLeftNode = null
    }
    return (
      <View
        style={[
          styles.header,
          { backgroundColor: isDark ? '#fff' : Colors.primary },
          commonStyle,
          style
        ]}
      >
        <View style={[styles.headerLeft, commonStyle, headerLeftStyle]}>
          {headerLeftNode}
        </View>
        <Text
          style={[
            styles.title,
            {
              color: isDark
                ? Theme.header_title_font_dark_color
                : Theme.header_title_font_light_color
            },
            titleStyle
          ]}
        >
          {title}
        </Text>
        <View style={[styles.headerRight, commonStyle, headerRightStyle]}>
          {headerRightNode}
        </View>
      </View>
    )
  }
}

const styles = Helper.createStyle({
  header: {
    zIndex: 1,
    justifyContent: 'center',
    width: '100%',
    overflow: 'hidden',
    flexDirection: 'row'
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: Theme.header_title_font_size,
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  headerLeft: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 2
  },
  headerRight: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 2
  },
  arrowImage: {
    height: 20,
    width: 20
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Header
