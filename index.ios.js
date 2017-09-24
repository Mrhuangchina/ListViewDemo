/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    PixelRatio,
    TouchableOpacity
} from 'react-native';

// 引入本地的数据
const wineArr = require('./Wine.json');
export default class ListViewDemo extends Component {
  // 构造
  constructor(props) {
    super(props);

    // 1.创建数据源
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    // 初始状态
    this.state = {
      dataSource: ds.cloneWithRows([''])
    };
  }

  render() {
    return (
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
        />
    );
  }

  componentDidMount() {
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(wineArr)
    })
  }


  _renderRow(rowData, sectionID, rowID){
    return(
        <TouchableOpacity

            style={styles.cellViewStyle}
            onPress={()=>alert('点击了第' + sectionID + '组中的第' + rowID + '行')}
        >
          {/*左边*/}
          <Image source={{uri: rowData.image}} style={styles.cellImgStyle}/>
          {/*右边*/}
          <View style={styles.rightViewStyle}>
            <Text
                style={styles.mainTitleStyle}
                numberOfLines={2}
            >
              {rowData.name}
            </Text>
            <Text style={styles.subTitleStyle}>¥{rowData.money}.00</Text>
          </View>

        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({

  cellViewStyle:{
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor:'#ccc',

    /*主轴的方向*/
    flexDirection:'row',
    padding:10
  },

  cellImgStyle:{
    width: 90,
    height: 60,
    resizeMode:'contain'
  },

  rightViewStyle:{
    flex:1,
    // backgroundColor:'red',
    justifyContent:'space-between'
  },

  mainTitleStyle:{
    fontSize: 15,
    color:'red'
  },

  subTitleStyle:{
    color:'#999'
  }
});



AppRegistry.registerComponent('ListViewDemo', () => ListViewDemo);
