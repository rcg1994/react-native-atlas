import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ViewPropTypes
} from "react-native"
import PropTypes from "prop-types"
import ATTouchable from "../Touchable"
import { Colors } from "../../theme"


export default class DefaultTabBar extends Component{
  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: ViewPropTypes.style,
    activeTabStyle: ViewPropTypes.style,
    inactiveTabStyle: ViewPropTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: ViewPropTypes.style,
  }

  static defaultProps = {
    textStyle: { fontSize: 16 },
    activeTextColor: Colors.primary,
    inactiveTextColor: Colors.dark,
    backgroundColor: '#fff',
    underlineStyle: { height: 1, backgroundColor: Colors.primary }
  }

  renderTabOption(name, page) {
  }

  renderTab = (name, page, isTabActive, onPressHandler) => {
    const { activeTextColor, inactiveTextColor, textStyle, tabStyle, activeTabStyle, inactiveTabStyle } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    return <ATTouchable
      style={{flex: 1, }}
      onPress={() => onPressHandler(page)}
      key={name}
    >
      <View style={[styles.tab, tabStyle, isTabActive ? activeTabStyle : inactiveTabStyle, ]}>
        <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
          {name}
        </Text>
      </View>
    </ATTouchable>;
  }

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: 'navy',
      bottom: 0,
    };

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0,  containerWidth / numberOfTabs],
    });
    return (
      <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage);
        })}
        <Animated.View
          style={[
            tabUnderlineStyle,
            {
              transform: [
                { translateX },
              ]
            },
            this.props.underlineStyle,
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 0,
  },
});
