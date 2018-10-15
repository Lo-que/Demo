# Demo
#### matrix

矩阵用例

1.matrix&&translate.html `matrix(1,0,0,1,30,30) ==translate(30px,30px)` 此时 矩阵偏移元素的中心点为(0,0)，即`x=0,y=0,a=1,b=0,c=0,d=1,e=30,f=30` 经过transform之后为`x = ax + cy + e = 1*0 + 0*0 + 30 = 30`, `y = bx + cy + f =0*0 + 1*0 + 30 = 30` 

2. to be continued...



#### flappybird

原生js + css3 + html5 实现flappybird基本功能,使用canvas绘制所有图片



#### clip-path

由svg中clippath到css3中clip-path

1.clip.html  纯css实现从方形到半圆形(实际上是切圆形)

2.clip-inset&clip-rect.html  

CSS本身就有剪裁属性`clip`,  不过，需要在`position`为`absolute`后者`fixed`时候才有作用。

clip-path实现clip的功能 inset 代替 rect

```javascript
.clip-me {   
  /* 被抛弃的剪裁 */  
  position: absolute; /* absolute或fixed定位是必须的 */  
  clip: rect(30px 200px 200px 20px); /* 或"auto" */  
  /* 如今的剪裁 (无需定位属性) */  
  clip-path: inset(30px 200px 200px 20px); /* 或"none" */
```

#### Calculator

原生js + css3实现的计算器，经过测试，初步解决了input值叠加计算的bug。

仍然存在的问题为使用js`eval()`方法直接编译字符串得到的除法的值不准确，预定解决方法为使用逆波兰式计算值。首先中缀表达式转后缀表达式：

1. 输入队列弹出一个记号
2. 如果记号为数字，添加到输出队列中
3. 如果是一个操作符（+-*/）则比较它与输出堆栈中栈顶的操作符，如果优先级小于或等于栈顶的操作符，那么将栈顶的操作符弹出并加入输出队列（循环，直到上述条件不满足），最后将本次的操作符压入堆栈。
4. 如果是一个左括号，压入堆栈
5. 如果是一个右括号，从栈中不断的弹出操作符，并加入输出队列，知道栈顶的元素为左括号。弹出左括号，不加入输出队列。如果没有发现左括号，说明原来的表达式中括号不对称，有错误。
6. 如果输入队列为空，而栈中尚有操作符时，如果栈顶的操作符为左括号，则说明原表达式有不匹配的括号。将栈中的操作符逐个弹出，加入输出队列。

之后进行逆波兰式求值：

1. 从输入队列中弹出一个记号
2. 如果是操作数，加入输出堆栈
3. 如果是一个操作符，从输出堆栈中弹出两个操作数并进行计算，并将计算得到的值压入输出堆栈。
4. 循环操作，如果输入队列为空，且输出堆栈只有一个数则这个数为结果，否则是出现了多余的操作数。

思路以上。

代码 Emmmmmmmmmmmmmmmm...
