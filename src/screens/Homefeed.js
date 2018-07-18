import React, { Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    ImageBackground
} from 'react-native';
import { Row, Column as Col, ScreenInfo, Grid} from 'react-native-responsive-grid';

import homefeedData from '../datasource/homefeed.json';

// column width (relative to screen size)
const sizes = {sm: 100, md: 50, lg: 25, xl: 20}

const layout = (state, focusedIndex) => {

  const numCols = Math.floor(100/sizes[ScreenInfo().mediaSize])
  const numRows = Math.ceil(homefeedData.length / numCols)
  const colWidth = state.layout.grid ? state.layout.grid.width / numCols : 0

  let layoutMatrix = [], layoutCols = []

  for (let col = 0; col < numCols; col++) {
    layoutMatrix.push([])
    for (let row = 0, i = col; row < numRows; row++, i += numCols) {
      if (homefeedData[i])
        layoutMatrix[col].push(
          <Item
                key={i}
                id={i}
                url={homefeedData[i].image_medium_url}
                height={homefeedData[i]['image_medium_size_points'].height}
                width={homefeedData[i]['image_medium_size_points'].width}
                margin={15}
                colWidth={colWidth}
                state={state}
          />
        )
    }
    layoutCols.push(
        <Col
          key={col}
          smSize={state.layout.grid ? sizes.sm : 0 }
          mdSize={state.layout.grid ? sizes.md : 0 }
          lgSize={state.layout.grid ? sizes.lg : 0 }
          xlSize={state.layout.grid ? sizes.xl : 0 }
        >
        {layoutMatrix[col]}
        </Col>
      )
  }

  return layoutCols
}

const Item = (props) => {
  if (!props.colWidth)  return null
    return (
            <Row
                style={{
                  backgroundColor: 'white',
                  margin: props.margin,
                  borderRadius: 8
                }}
                >
                <Col fullWidth>
                  <ImageBackground
                              source={{uri: props.url}}
                              style={{
                                width: props.colWidth,
                                height: props.height + ((props.colWidth - props.width) * props.height/props.width),
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}

                  >
                  {/* <Text style={{fontSize: 48, marginTop: 5}}>
                    {props.id}
                  </Text> */}
                  </ImageBackground>
                </Col>
            </Row>
        )}

class Homefeed extends Component {

  state: {
    focusedIndex: 0
  }

  render() {
    return (
      <Grid>{({state, setState}) => (
            <Row fullHeight style={{backgroundColor: 'white'}}>
            <ScrollView removeClippedSubviews={false} >
                <Row >
                  {layout(state, this.state.focusedIndex)}
                </Row>
              </ScrollView>
            </Row>
          )}
      </Grid>
    );
  }
}

export default Homefeed;
