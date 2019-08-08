import React, { Component } from 'react'
import {
  ViewPropTypes,
  Dimensions,
  View,
  Animated,
  ScrollView,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import SceneComponent from './SceneComponent'
import DefaultTabBar from './DefaultTabBar'
import ScrollableTabBar from './ScrollableTabBar'

export default class ScrollableTabView extends Component {
  static DefaultTabBar = DefaultTabBar
  static ScrollableTabBar = ScrollableTabBar

  static propTypes = {
    tabBarPosition: PropTypes.oneOf([
      'top',
      'bottom',
      'overlayTop',
      'overlayBottom'
    ]),
    initialPage: PropTypes.number,
    page: PropTypes.number,
    onChangeTab: PropTypes.func,
    onScroll: PropTypes.func,
    renderTabBar: PropTypes.any,
    style: ViewPropTypes.style,
    contentProps: ViewPropTypes.style,
    scrollWithoutAnimation: PropTypes.bool,
    locked: PropTypes.bool,
    prerenderingSiblingsNumber: PropTypes.number
  }

  static defaultProps = {
    tabBarPosition: 'top',
    initialPage: 0,
    page: -1,
    onChangeTab: () => {},
    onScroll: () => {},
    contentProps: {},
    scrollWithoutAnimation: false,
    locked: false,
    prerenderingSiblingsNumber: 0
  }

  constructor (props) {
    super(props)
    this._contentMeasurements = []
    this.state = {
      currentPage: props.initialPage,
      scrollValue: new Animated.Value(props.initialPage),
      containerWidth: Dimensions.get('window').width,
      sceneKeys: this.newSceneKeys({ currentPage: props.initialPage })
    }
  }

  componentWillReceiveProps (props) {
    if (props.children !== this.props.children) {
      this.updateSceneKeys({
        page: this.state.currentPage,
        children: props.children
      })
    }

    if (props.page >= 0 && props.page !== this.state.currentPage) {
      this.goToPage(props.page)
    }
  }

  componentWillUnmount () {
    this.timer && cancelAnimationFrame(this.timer)
  }

  goToPage = pageNumber => {
    const offset = pageNumber * this.state.containerWidth
    if (this.scrollView) {
      this.scrollView.scrollTo({
        x: offset,
        y: 0,
        animated: !this.props.scrollWithoutAnimation
      })
    }

    const currentPage = this.state.currentPage
    this.updateSceneKeys({
      page: pageNumber,
      callback: this._onChangeTab.bind(this, currentPage, pageNumber)
    })
  }

  renderTabBar = props => {
    if (this.props.renderTabBar === false) {
      return null
    } else if (this.props.renderTabBar) {
      return React.cloneElement(this.props.renderTabBar(props), props)
    } else if (this.props.scrollableTabBar) {
      return <ScrollableTabBar {...props} />
    } else {
      return <DefaultTabBar {...props} />
    }
  }

  updateSceneKeys = ({
    page,
    children = this.props.children,
    callback = () => {}
  }) => {
    let newKeys = this.newSceneKeys({
      previousKeys: this.state.sceneKeys,
      currentPage: page,
      children
    })
    this.setState({ currentPage: page, sceneKeys: newKeys }, callback)
  }

  newSceneKeys = ({
    previousKeys = [],
    currentPage = 0,
    children = this.props.children
  }) => {
    let newKeys = []
    this._children(children).forEach((child, idx) => {
      let key = this._makeSceneKey(child, idx)
      if (
        this._keyExists(previousKeys, key) ||
        this._shouldRenderSceneKey(idx, currentPage)
      ) {
        newKeys.push(key)
      }
    })
    return newKeys
  }

  _shouldRenderSceneKey = (idx, currentPageKey) => {
    let numOfSibling = this.props.prerenderingSiblingsNumber
    return (
      idx < currentPageKey + numOfSibling + 1 &&
      idx > currentPageKey - numOfSibling - 1
    )
  }

  _keyExists = (sceneKeys, key) => {
    return sceneKeys.find(sceneKey => key === sceneKey)
  }

  _makeSceneKey = (child, idx) => {
    return child.props.tabLabel + '_' + idx
  }

  renderScrollableContent = () => {
    const scenes = this._composeScenes()
    return (
      <ScrollView
        horizontal
        pagingEnabled
        automaticallyAdjustContentInsets={false}
        contentOffset={{
          x: this.props.initialPage * this.state.containerWidth
        }}
        ref={scrollView => {
          this.scrollView = scrollView
        }}
        onScroll={e => {
          const offsetX = e.nativeEvent.contentOffset.x
          this._updateScrollValue(offsetX / this.state.containerWidth)
        }}
        onMomentumScrollBegin={this._onMomentumScrollBeginAndEnd}
        onMomentumScrollEnd={this._onMomentumScrollBeginAndEnd}
        scrollEventThrottle={16}
        scrollsToTop={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={!this.props.locked}
        directionalLockEnabled
        alwaysBounceVertical={false}
        keyboardDismissMode="on-drag"
        style={{ height: this.state.contentHeight }}
        {...this.props.contentProps}
      >
        {scenes}
      </ScrollView>
    )
  }

  _composeScenes = () => {
    return this._children().map((child, idx) => {
      let key = this._makeSceneKey(child, idx)
      return (
        <SceneComponent
          onLayout={this.handleSceneLayout.bind(this, idx)}
          key={child.key}
          shouldUpdated={this._shouldRenderSceneKey(
            idx,
            this.state.currentPage
          )}
          style={{ width: this.state.containerWidth }}
        >
          {this._keyExists(this.state.sceneKeys, key) ? (
            child
          ) : (
            <View tabLabel={child.props.tabLabel} />
          )}
        </SceneComponent>
      )
    })
  }

  _onMomentumScrollBeginAndEnd = e => {
    const offsetX = e.nativeEvent.contentOffset.x
    const page = Math.round(offsetX / this.state.containerWidth)
    if (this.state.currentPage !== page) {
      this._updateSelectedPage(page)
    }
  }

  _updateSelectedPage = nextPage => {
    let localNextPage = nextPage
    if (typeof localNextPage === 'object') {
      localNextPage = nextPage.nativeEvent.position
    }

    const currentPage = this.state.currentPage
    this.updateSceneKeys({
      page: localNextPage,
      callback: this._onChangeTab.bind(this, currentPage, localNextPage)
    })
  }

  _onChangeTab = (prevPage, currentPage) => {
    // this.props.onChangeTab({
    //   curIdx: currentPage,
    //   ref: this._children()[currentPage],
    //   preIndex: prevPage,
    // });
    this.props.onChangeTab(currentPage, prevPage)

    setTimeout(() => {
      this.updateView(currentPage)
    }, 600)
  }

  _updateScrollValue = value => {
    this.state.scrollValue.setValue(value)
    this.props.onScroll(value)
  }

  _handleLayout = e => {
    const { width, height } = e.nativeEvent.layout

    if (Math.round(width) !== Math.round(this.state.containerWidth)) {
      this.setState({ containerWidth: width })
      this.timer = requestAnimationFrame(() => {
        this.goToPage(this.state.currentPage)
      })
    }
  }

  _children = (children = this.props.children) => {
    return React.Children.map(children, child => child)
  }

  render () {
    let overlayTabs =
      this.props.tabBarPosition === 'overlayTop' ||
      this.props.tabBarPosition === 'overlayBottom'
    let tabBarProps = {
      goToPage: this.goToPage,
      tabs: this._children().map(child => child.props.tabLabel),
      activeTab: this.state.currentPage,
      scrollValue: this.state.scrollValue,
      containerWidth: this.state.containerWidth
    }

    if (this.props.tabBarStyle) {
      tabBarProps.style = this.props.tabBarStyle
    }
    if (this.props.tabStyle) {
      tabBarProps.tabStyle = this.props.tabStyle
    }
    if (this.props.tabBarBackgroundColor) {
      tabBarProps.backgroundColor = this.props.tabBarBackgroundColor
    }
    if (this.props.tabBarActiveTextColor) {
      tabBarProps.activeTextColor = this.props.tabBarActiveTextColor
    }
    if (this.props.tabBarInactiveTextColor) {
      tabBarProps.inactiveTextColor = this.props.tabBarInactiveTextColor
    }
    if (this.props.tabBarTextStyle) {
      tabBarProps.textStyle = this.props.tabBarTextStyle
    }
    if (this.props.tabBarActiveTextStyle) {
      tabBarProps.activeTextStyle = this.props.tabBarActiveTextStyle
    }
    if (this.props.tabBarUnderlineStyle) {
      tabBarProps.underlineStyle = this.props.tabBarUnderlineStyle
    }
    if (this.props.tabBarActiveTabStyle) {
      tabBarProps.activeTabStyle = this.props.tabBarActiveTabStyle
    }
    if (this.props.tabBarInactiveTabStyle) {
      tabBarProps.inactiveTabStyle = this.props.tabBarInactiveTabStyle
    }
    if (overlayTabs) {
      tabBarProps.style = {
        position: 'absolute',
        left: 0,
        right: 0,
        [this.props.tabBarPosition === 'overlayTop' ? 'top' : 'bottom']: 0
      }
    }

    return (
      <View
        style={[styles.container, this.props.style]}
        onLayout={this._handleLayout}
      >
        {this.props.tabBarPosition === 'top' && this.renderTabBar(tabBarProps)}
        {this.renderScrollableContent()}
        {(this.props.tabBarPosition === 'bottom' || overlayTabs) &&
          this.renderTabBar(tabBarProps)}
      </View>
    )
  }

  updateView = idx => {
    const content = this._contentMeasurements[idx] ||
      this._contentMeasurements[0] || { height: '100%' }
    const contentHeight = content.height
    // console.log('updateView', contentHeight);
    this.setState({ contentHeight })
  }
  handleSceneLayout = (idx, e) => {
    // console.log('handleSceneLayout', e.nativeEvent.layout, idx);
    if (idx === this.state.currentPage) {
      this._contentMeasurements[idx] = e.nativeEvent.layout
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollableContentAndroid: {
    flex: 1
  }
})
