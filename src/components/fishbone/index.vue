<template>
  <div>
    <div id="myDiagramDiv" :style="diagramStyle" />
  </div>
</template>
<script>
import go from 'gojs'
import { FishboneLink, FishboneLayout } from './FishboneLayout.js'
var $ = go.GraphObject.make
export default {
  name: 'Fishbone',
  props: {
    // 样式
    diagramStyle: {
      type: Object,
      default() {
        return {
          width: '600px',
          height: '500px',
          backgroundColor: '#fff'
        }
      }
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    allowX: {
      type: Boolean,
      default: true
    },
    allowY: {
      type: Boolean,
      default: true
    },
    allowZoom: {
      type: Boolean,
      default: true
    }

  },
  mounted() {
    var myDiagram = $(
      go.Diagram,
      'myDiagramDiv', // refers to its DIV HTML element by id
      {
        isReadOnly: true,
        initialContentAlignment: go.Spot.Center, // 居中
        allowZoom: this.allowZoom, // 允许缩放，false为否
        // 'toolManager.mouseWheelBehavior': go.ToolManager.WheelNone, // 鼠标滚轮事件禁止
        allowHorizontalScroll: this.allowX, // 水平方向移动
        allowVerticalScroll: this.allowY // 竖直方向移动
      }
    ) // do not allow the user to modify the diagram

    // define the normal node template, just some text
    myDiagram.nodeTemplate = $(
      go.Node,
      $(
        go.TextBlock,
        new go.Binding('text'),
        new go.Binding('font', '', convertFont)
      )
    )

    function convertFont(data) {
      var size = data.size
      if (size === undefined) size = 13
      var weight = data.weight
      if (weight === undefined) weight = ''
      return weight + ' ' + size + 'px sans-serif'
    }
    myDiagram.linkTemplateMap.add(
      'normal',
      $(go.Link, { routing: go.Link.Orthogonal, corner: 4 }, $(go.Shape))
    )

    // use this link template for fishbone layouts
    myDiagram.linkTemplateMap.add(
      'fishbone',
      $(
        FishboneLink, // defined above
        $(go.Shape)
      )
    )

    // here is the structured data used to build the model
    var json = this.data

    function walkJson(obj, arr) {
      var key = arr.length
      obj.key = key
      arr.push(obj)

      var children = obj.causes
      if (children) {
        for (var i = 0; i < children.length; i++) {
          var o = children[i]
          o.parent = key // reference to parent node data
          walkJson(o, arr)
        }
      }
    }

    // build the tree model
    var nodeDataArray = []
    walkJson(json, nodeDataArray)
    myDiagram.model = new go.TreeModel(nodeDataArray)
    myDiagram.startTransaction('fishbone layout')
    myDiagram.linkTemplate = myDiagram.linkTemplateMap.get('fishbone')
    myDiagram.layout = go.GraphObject.make(FishboneLayout, {
      // defined above
      angle: 180,
      layerSpacing: 10,
      nodeSpacing: 10,
      rowSpacing: 30
    })
    myDiagram.commitTransaction('fishbone layout')
  }
}
</script>
<style lang="less" scoped>
</style>
