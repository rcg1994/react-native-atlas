import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Dimensions,
	TouchableOpacity,
  StatusBar
} from 'react-native'
import PropTypes from 'prop-types'
import ATIconButton from '../../components/IconButton'
import Tabs from "../Tabs"
import ModalBox from "../react-native-modalbox";
import { Colors, Metrics, Theme } from '../../theme'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import AREA_JSON from './area.json'

const ScrollableTabBar = Tabs.ScrollableTabBar

// { areaName: children }
const AREA_MAP = {}
function deep (arr) {
  arr.forEach(item => {
    AREA_MAP[item.name] = item.children
    if (item.children && item.children.length > 0) {
      deep(item.children)
    }
  })
}
deep(AREA_JSON)

export default class AddressView extends Component {
  static propTypes = {
    selectedAddress: PropTypes.string, // 'xx省 xx市 xx区'
    onSelectAddress: PropTypes.func,
    onFinish: PropTypes.func
  }

  static defaultProps = {
    selectedAddress: '',
    onSelectAddress: function () { },
    onFinish: function () { }
  }

  constructor (props) {
    super(props)
    this.state = {
      selectedAddress: this.initAddress(props.selectedAddress),
      visible: false
    }
  }

  initAddress (initAddress) {
    let addr = initAddress.split(' ')
    let selectedAddress = [
      {
        code: null,
        name: addr[0],
        children: AREA_MAP[addr[0]]
      },
      {
        code: null,
        name: addr[1],
        children: AREA_MAP[addr[1]]
      },
      {
        code: null,
        name: addr[2],
        children: null
      }]

    return selectedAddress
  }

  renderListItem (item, i) {
    let { selectedAddress } = this.state

    const isSelected = item.name === selectedAddress[i].name
    const checkLeft = item.name.length * 15 + 15
    return (
      <TouchableOpacity
        style={styles.itemStyle}
        key={i + item.name}
        activeOpacity={1}
        onPress={() => {
          this.pressItem(item, i)
        }}
			>
        <Text style={[styles.textStyle, isSelected && { color: Colors.primary }]}>{item.name}</Text>
        {/* {isSelected ? <Icon name='check' size={20} color={Colors.primary} style={{ position: 'absolute', top: 7, left: checkLeft }} /> : null} */}
      </TouchableOpacity>
    )
  }

  pressItem (item, i) {
    let { selectedAddress } = this.state
    const initObj = {
      code: null,
      name: null,
      children: null
    }
    let tempIndex = 0
    if (i === 0) {
      selectedAddress[0] = item
      selectedAddress[1] = initObj
      selectedAddress[2] = initObj
      tempIndex = 1
    } else if (i === 1) {
      selectedAddress[1] = item
      selectedAddress[2] = initObj
      tempIndex = 2
    } else {
      selectedAddress[2].code = item.code
      selectedAddress[2].name = item.name
      tempIndex = 2
    }
    this.setState({ selectedAddress })

    setTimeout(() => {
      this.tabView.goToPage(tempIndex)
    }, 10)
    this.props.onSelectAddress(selectedAddress.map(item => item.name).join(' '))
    i === 2 && this.finish()
  }

  finish = () => {
    this.hide()
    const addr = this.state.selectedAddress.map(item => item.name).join(' ')
    this.props.onFinish(addr)
  }

  show = () => {
    this.setState({
      visible: true
    })
  }

  hide = () => {
    this.setState({
      visible: false
    })
  }

  render () {
    const { visible, selectedAddress, style, ...props } = this.state
    return (
      <ModalBox
        ref={v => modal = v}
        position='bottom'
        coverScreen
        isOpen={visible}
        style={[styles.modal, style]}
        onClosed={this.hide}
        animationDuration={200}
        {...props}
			>
        <View style={styles.container}>
          <StatusBar backgroundColor="rgba(0,0,0,0.7)"  barStyle="light-content"/>
          <View style={[styles.header, styles.bottomLine]}>
            <Text style={styles.headerTitle}>选择地址</Text>
            <ATIconButton
              underlayColor='transparent'
              style={{ position: 'absolute', top: 10, right: 0, padding: 0, backgroundColor: 'transparent' }}
              onPress={this.hide}>
              {/* <Icon name='close' size={30} color='#999' /> */}
            </ATIconButton>
          </View>
          <Tabs
            ref={(tabView) => {
              this.tabView = tabView
            }}
            renderTabBar={(props) => (
              <ScrollableTabBar {...props} tabsContainerStyle={styles.bottomLine}/>
            )}
					>
            {selectedAddress.map((obj, i) => {
              let childList = (i === 0) ? AREA_JSON : selectedAddress[i - 1].children
              if (childList) {
                return (
                  <ScrollView
                    key={i}
                    tabLabel={obj.name || '请选择'}
                    style={styles.scrollStyleList}
									>
                    {childList.map((item, j) => {
                  return this.renderListItem(item, i)
                })}
                  </ScrollView>
                )
              }
            })}
          </Tabs>
        </View>
      </ModalBox>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    height: Theme.addr_selector_height
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 50,
  },
  headerTitle: {
    color: '#666'
  },
  bottomLine: {
    borderBottomColor: '#ccc',
    borderBottomWidth: Metrics.borderWidth
  },
  itemStyle: {
    padding: 10
  },
  itemText: {
    fontSize: 15,
    color: '#333333'
  }
})
