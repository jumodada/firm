# etu  - 一个 Vue UI 组件

[![Build Status](https://www.travis-ci.org/jumodada/My-Vue-Wheel.svg?branch=master)](https://www.travis-ci.org/jumodada/My-Vue-Wheel)

## 介绍
    vue学习过程中逐渐完善的一个UI框架
## 开始使用
   
   1.添加样式，使用本框架前，请在 CSS 中开启 border-box
     
     ```
     *,*::before,*::after{box-sizing: border-box;}
     ```
     IE8以上浏览器支持此样式
     
   2.安装etu
   ```
   npm i --save etu
   ```     
   
   3.引入etu
   ```
   import {Button,Icon,ButtonGroup} from 'my-wheel-test-01'
     import 'my-wheel-test-01/dist/index.css'
   export default {
     name: 'App',
     components:{
       'g-button':Button,
       'g-icon':Icon,
       'g-ButtonGroup':ButtonGroup
     }
   }
   ```
   4.引入svg symbols
   ```
   <script src="//at.alicdn.com/t/font_1029022_3umhd98poyq.js"></script>
   ```
     


## 文档

## 提问

## 变更记录

## 联系方式

## 如何共享代码



