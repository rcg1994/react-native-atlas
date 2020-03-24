import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { is } from 'ramda'
import Theme from '../theme/Theme'
import Metrics from '../theme/Metrics'
import Touchable from './Touchable'
import RefreshControl from './RefreshControl'
import Spin from './Spin'
import Helper from '../tool/Help'

export default class ATList extends Component {
  static propTypes = {
    data: PropTypes.array,
    flat: PropTypes.bool,
    refreshControl: PropTypes.any,
    divide: PropTypes.bool,
    noMore: PropTypes.bool,
    itemStyle: PropTypes.any,
    headerStyle: PropTypes.any,
    footerStyle: PropTypes.any,
    contentStyle: PropTypes.any,
    centerStyle: PropTypes.any,
    centerTextStyle: PropTypes.any,
    leftStyle: PropTypes.any,
    leftTextStyle: PropTypes.any,
    rightStyle: PropTypes.any,
    rightTextStyle: PropTypes.any,
    divideColor: PropTypes.string,
    renderItem: PropTypes.func,
    refreshData: PropTypes.func,
    loadData: PropTypes.func,
    onItemPress: PropTypes.func,
    underlayColor: PropTypes.string,
    arrowColor: PropTypes.string
  }

  static defaultProps = {
    data: [],
    flat: false,
    noMore: false,
    divide: true
  }

  state = {
    refreshing: false,
    loading: false
  }

  renderItem = (v, k) => {
    const {
      data,
      itemStyle,
      headerStyle,
      footerStyle,
      contentStyle,
      leftStyle,
      leftTextStyle,
      rightStyle,
      rightTextStyle,
      centerStyle,
      centerTextStyle,
      divide,
      divideColor,
      renderItem,
      underlayColor,
      arrowColor,
      onItemPress
    } = this.props
    const divideCom = divide && k < data.length - 1 ? <DivideCom color={divideColor} /> : null
    if (renderItem) {
      return (
        <View key={k} style={styles.itemCustomRender}>
          {renderItem(v, k)}
          {divideCom}
        </View>
      )
    }
    const canPress = onItemPress || v.onPress || v.onLongPress
    const item = v.render ? <View key={k} style={styles.itemCustomRender}>
      {v.render(v, k)}
      {divideCom}
    </View> : <View style={[styles.itemBase]}>
      {v.header ? <View style={[styles.itemHeader, headerStyle]}>{v.header}</View> : null}
      <View style={[styles.itemContent, contentStyle, v.contentStyle]}>
        <View style={[
          styles.itemContentLeft,
          { marginLeft: v.left ? Theme.base_margin : 0 },
          leftStyle,
          v.leftStyle
        ]}>
          {is(String, v.left)
            ? <Text style={[styles.itemContentLeftText, leftTextStyle, v.leftTextStyle]}>{v.left}</Text> : v.left}
        </View>
        <View style={[
          styles.itemContentMain,
          centerStyle,
          v.centerStyle
        ]}>
          {is(String, v.content) ? <Text
            style={[styles.itemContentMainText, centerTextStyle, v.centerTextStyle]}>{v.content}</Text> : v.content}
        </View>
        <View style={[
          styles.itemContentRight,
          { marginRight: v.right ? Theme.base_margin : 0 },
          v.right && v.showArrow ? { marginRight: 5 } : '',
          rightStyle,
          v.rightStyle
        ]}>
          {is(String, v.right)
            ? <Text style={[styles.itemContentRightText, rightTextStyle, v.rightTextStyle]}>{v.right}</Text> : v.right}
        </View>
        {v.showArrow ? <Image style={[styles.arrowImage, arrowColor ? { tintColor: arrowColor } : {}]} source={require('../assets/right.png')} /> : null}
      </View>
      {v.footer ? <View style={[styles.itemFooter, footerStyle]}>{v.footer}</View> : null}
      {divideCom}
    </View>

    return canPress ? (
      <Touchable
        key={k}
        underlayColor={underlayColor || Theme.list_underlay_color}
        style={[styles.itemBase, itemStyle]}
        onPress={v.onPress || (() => onItemPress(v))}
        onLongPress={v.onLongPress}
      >{item}</Touchable>
    ) : <View key={k} style={[styles.item, itemStyle]}>{item}</View>
  }

  refresh = () => {
    const { refreshData } = this.props
    if (refreshData) {
      this.setState({
        refreshing: true
      })
      refreshData(false, true).then(() => {
        Helper.sleep(500).then(() => {
          this.setState({
            refreshing: false
          })
        })
      })
    }
  }

  onEndReached = () => {
    const { data, loadData, noMore } = this.props
    const { loading } = this.state
    if (data.length > 0 && !loading && !noMore && loadData) {
      this.setState({
        loading: true
      })
      loadData(false).then(() => {
        Helper.sleep(500).then(() => {
          this.setState({
            loading: false
          })
        })
      })
    }
  }

  render () {
    const { data, style, flat, noMore, refreshControl } = this.props
    const { loading } = this.state
    const items = []
    const footer = flat && data.length === 0 ? null : <ListFooter loading={loading} noMore={noMore} />
    data.forEach((v, k) => {
      items.push(
        this.renderItem(v, k)
      )
    })
    const listView = flat ? <FlatList
      renderItem={({ item, index }) => this.renderItem(item, index)}
      data={data}
      onEndReachedThreshold={0.1}
      onEndReached={this.onEndReached}
      keyExtractor={(item, index) => index.toString()}
      refreshControl={
        refreshControl !== undefined
          ? refreshControl
          : <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.refresh}
            title={this.state.refreshing ? Theme.list_refresh_text_loading : Theme.list_refresh_text_pull}
          />
      }
      ListFooterComponent={footer}
      style={style}
    /> : <View style={[styles.list, style]}>
      {items}
    </View>
    return listView
  }
}

const DivideCom = ({ color }) => <View style={[styles.divide, color ? { backgroundColor: color } : '']} />

class ListFooter extends Component {
  static defaultProps = {
    noMore: false,
    loadingText: Theme.list_load_text_loading,
    noMoreText: Theme.list_load_text_noMore
  }

  render () {
    const { noMore, loadingText, noMoreText } = this.props
    const loadingCom = !noMore ? <View style={styles.footerBox}>
      <Spin color={Theme.list_load_spin_color} />
      <Text style={styles.footerText}>{loadingText}</Text>
    </View> : <View style={styles.footerBox}>
      <Text style={styles.footerText}>{noMoreText}</Text>
    </View>
    return <View style={styles.footer}>
      {loadingCom}
    </View>
  }
}

const styles = StyleSheet.create({
  list: {
    height: 'auto',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemCustomRender: {
    position: 'relative',
    width: '100%'
  },
  item: {
    position: 'relative'
  },
  itemHeader: {
    borderBottomWidth: Metrics.borderWidth,
    borderBottomColor: Theme.base_border_color,
    paddingHorizontal: Theme.base_margin,
    paddingVertical: Theme.list_header_padding,
    justifyContent: 'center'
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: Theme.list_content_padding
  },
  itemContentLeft: {
    marginLeft: Theme.base_margin
  },
  itemContentMain: {
    flex: 1,
    paddingHorizontal: Theme.base_margin
  },
  itemContentMainText: {
    fontSize: Theme.font_content,
    color: Theme.font_content_color
  },
  itemContentRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemContentRightText: {
    fontSize: Theme.list_right_font_size,
    color: Theme.list_right_font_color
  },
  itemContentLeftText: {
    fontSize: Theme.list_left_font_size,
    color: Theme.list_left_font_color
  },
  itemFooter: {
    borderTopWidth: Metrics.borderWidth,
    borderTopColor: Theme.base_border_color,
    paddingHorizontal: Theme.base_margin,
    paddingVertical: Theme.list_footer_padding,
    justifyContent: 'center'
  },
  itemBase: {
    width: '100%'
  },
  arrowImage: {
    height: Theme.list_arrow_size,
    width: Theme.list_arrow_size,
    marginRight: Theme.base_margin
  },
  divide: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: Metrics.borderWidth,
    backgroundColor: Theme.base_border_color
  },
  footerText: {
    fontSize: Theme.list_load_footer_font_size,
    color: Theme.list_load_footer_font_color
  },
  footerBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    height: Theme.list_load_footer_height,
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'center'
  }
})
