

# MATLAB计算基础

## 命令窗口的常用命令

![image-20210204201639431](C:\Users\xiaojian\AppData\Roaming\Typora\typora-user-images\image-20210204201639431.png)

## MATLAB数值类型

4种基本数据类型：双精度数组、字符串数组（单引号'）、元胞数组（存放不同类型的数据）、构架数组（用指针操作符“.”链接结构变量名和属性名）

MATLAB语言中的变量无需事先定义，一个变量以其名称在语句命令中第一次合法出现而定义，运算表达式变量中不允许有未定义的变量，也不需要预先定义变量的类型，MATLAB会自动生成变量，并根据变量的操作确定其类型

MATLAB变量命名规则:区分大小写、以英文字母开始、长度小于31位、某些变量也可以当成常量使用（i）

![image-20210204204349061](C:\Users\xiaojian\AppData\Roaming\Typora\typora-user-images\image-20210204204349061.png)



对象：面向对象的MATLAB语言采用了多种对象，一些对象之间可以相互转换

## 关系运算和逻辑运算：与其他语言类似

逻辑与&

逻辑或|

逻辑非!

关系运算函数：all(),any(),xor(),bitand(),bitor(),bitxor(),bitcmp(),bitmax(),bitshift()

## 矩阵及其运算

> 所有运算都是以矩阵为单元进行的

矩阵

`A=[1 2 3; 4 5 6]`

`A=[1,2,3;4,5,6]`

特殊矩阵生成函数

![image-20210204211153039](C:\Users\xiaojian\AppData\Roaming\Typora\typora-user-images\image-20210204211153039.png)

矩阵的运算

![image-20210204212038498](C:\Users\xiaojian\AppData\Roaming\Typora\typora-user-images\image-20210204212038498.png)

常用的矩阵函数运算

![image-20210204213826781](C:\Users\xiaojian\AppData\Roaming\Typora\typora-user-images\image-20210204213826781.png)

常用的矩阵分解运算函数

![image-20210204213953081](C:\Users\xiaojian\AppData\Roaming\Typora\typora-user-images\image-20210204213953081.png)

![image-20210204214920032](C:\Users\xiaojian\AppData\Roaming\Typora\typora-user-images\image-20210204214920032.png)

**按元素的运算** ：

MATLAB通过"."来区分矩阵运算和元素运算。

`.*`

`./`

`.^`

等等

## 符号运算

符号数学工具箱是操作和解决符号表达式的符号数学工具箱（函数）集合，有复合、简化、微分、积分以及求解代数方程和微分方程的工具，还有一些用于线性代数的工具，求解逆、行列式、正则形式的精确结果。

符号运算无须事先对独立变量赋值

创建符号表达式

示例

```matlab
U=str2sym('2*x^2+5*y+2*x*y+6')
syms x y;
V=3*x^2+5*y+2*x*y+6
2*U-V+6
```

创建符号矩阵

```matlab
A=str2sym('[a,2*b;2*a,0]')
```

数值矩阵转化成符号矩阵：sym(数值矩阵)

符号矩阵转化为数值矩阵：numeric(A)

专用于符号矩阵的函数：transpose(A), determ(A)

其他可用于数值矩阵的函数，diag、triu、tril、inv、det、rank、eig，也可用于符号矩阵

符号表达式的四则运算：

factor(S)

expand(S)

collect(S)

collect(S,v)

simplify(S)

simple(S)

常用的符号运算

`limit(F,x,a,'right')`

`diff(f,x,n)`

`int(f,r,x0,x1)`

`symsum(fk,k,k0,kn)`

`dsolve('eqn1','condition','var')`

例子：

1.

$f_1=\lim_{x\to1^+}\left[\cfrac{1}{x\ln^2x}-\cfrac{1}{(x-1)^2}\right]$

```matlab
syms x a n %定义符号变量a和x
f1=limit(y,x,1,'right') %求极限
f=a*n^3+(a-1)*n^2
f2=symsum(f,n,0,50) %级数求和
```

2.

已知表达式`f=sin(ax)` 分别对其中的`x`和`a`求导

已知表达式`f=xlog(1+x)` ，求对`x`的积分和`x`在`(0,1)`上的积分值

```matlab
syms a x            %定义符号变量a和x
f=sin(a*x)			%创建函数
dfx=diff(f,x)		%对x求导
dfa=diff(f,a)		%对a求导
f1=x*log(1+x)		%创建函数f1
int1=int(f1,x)		%对x积分
int2=int(f1,x,0,1)	%求[0,1]区间上的积分
```

常微分方程符号运算实例

（1）计算常微分方程$\cfrac{dy}{dx}+3xy=xe^{-x^2}$的通解

（2）计算微分方程$xy^{'}+2y-e^{x}=0$在初始条件$y|_{x=1}=2e$的特解

（3）求$y^{''}+2y^{'}+e^x=0$的通解

```
f1=dsolve('Dy+3*x*y=x*exp(-x^2)','x')    		   %(1)
f2=dsolve('x*Dy+2*y-exp(x)=0','y(1)=2*exp(1)','x') %(2)
f3=dsolve('D2y+2*Dy+exp(x)=0','x')                 %(3)
```





# MATLAB绘图基础

（1）准备数据

（2）设置当前绘图区

（3）绘制图形

（4）设置图形中曲线和标记点格式

（5）设置坐标轴和网格线属性

（6）标注图形

（7）保存和导出图形

二维图形：

`plot(x1,y1,option1,x2,y2,option2,...)`

例子

```matlab
x=0:0.4*pi:2*pi;							%定义x坐标轴
y1=sin(x);									%定义y1与x函数关系
y2=cos(x);									%定义y2与x函数关系
y3=sin(x-0.1*pi);							%定义y3与x函数关系
y4=cos(x+0.1*pi);							%定义y4与x函数关系
plot(y1)									%绘制y1与x函数的图形
plot(x,y1,x,y2,x,y3,x,y4)					%在同一个图像中输出
```

三维图形

`plot3(x1,y1,z1,option1,x2,y2,z2,option2,...)`

三维网格曲面

`mesh()`

`surf()`

例子

```matlab
t=0:pi/50:8*pi;				%产生数据t
x=sin(t);y=cos(t);z=t;		%定义xyz与t之间的函数关系
plot3(x,y,z)				%绘制xyz三维图形
```

```matlab
x=-8:0.5:8;					%定义x坐标轴范围及刻度
y=x;						%设置y与x之间的函数关系
[X,Y]=meshgrid(x,y);		%通过meshgrid设置矩形网格
R=sqrt(X.^2+Y.^2)+eps;		%函数关系
Z=sin(R)./R;				%函数关系
mesh(X,Y,Z)					%绘制网格曲面
```

```matlab
x=-8:0.5:8;					%定义x坐标轴范围及刻度
y=x;						%设置y与x之间的函数关系
[X,Y]=meshgrid(x,y);		%通过meshgrid设置矩形网格
R=sqrt(X.^2+Y.^2)+eps;		%函数关系
Z=sin(R)./R;				%函数关系
surf(X,Y,Z)					%绘制阴影曲面图
```

### 图形的修饰

1. 选择图形窗口的命令

   打开不同的图形窗口命令：`figure(1);`,`figure(2)`,...,`figure(n)`

   图形窗口拆分命令subplot：`subplot(m,n,p)`

2. 坐标轴相关的命令

   `axis([xmin xmax ymin ymax])` 

   `axis equal`

   `axis square`

   `axis off`

   `similogx`

   `semilogy`

   `loglog`

3. 文字标识命令

   `text(x,y,'字符串')`

   `gtext('说明文字')`

   `title('字符串')`

   `xlabel('字符串')` ,`ylabel('字符串')`,`zlabel('字符串')`

   `legend('字符串1','字符串2',..,'字符串n')`

4. 在图形上添加或删除栅格命令

   `grid`

   `grid on`

   `grid off`

   `grid`

5. 图形保持或覆盖命令

   `hold on`

   `hold off`

6. 应用型绘图命令

   `bar(x,y)`

   `hist(y,x)`

   `stairs(x,y)`

   `stem(x,y)`

   ```matlab
   %绘制[0,4π]区间上的x1=10sint和x2=5cost曲线
   %x1曲线的线性为点画线，颜色为红色，数据点标记为加号，x2曲线的线性为虚线，颜色为蓝色，星号
   %表示坐标轴的显示范围和刻度线、添加栅格线
   %标注坐标轴名称、标题、相应文本
   close all
   clc
   clear
   t=[0:pi/20:4*pi];
   hold on
   axis([0 4*pi -10 10])
   plot(t, 10*sin(t), 'r+:')
   plot(t, 5*cos(t),'b*--')
   xlabel('时间t');ylabel('幅值x')
   title('简单绘图实例')
   legend('x1=10sint:点画线','x2=5cost:虚线')
   gtext('x1');gtext('x2')
   grid on
   ```

   

# MATLAB程序设计基础

## MATLAB程序的基本组成结构

```matlab
%说明
清除命令：清除workspace中的变量和图形(clear,close)
定义变量：包括全局变量的声明及参数值的设定
逐行执行命令：指MATLAB提供的运算指令或工具箱提供的专用命令
...
...
...
控制循环：包括for,if then,switch,while等语句
逐行执行命令
...
...
end
绘图命令：将运算结果绘制出来
```

M文件

1. M文件的类型

- 脚本M文件

- 函数M文件

```matlab
function t = now()
%NOW	Current date and time as date number
%	T = NOW returns the current date and time as a serial date
%	FLOOR(NOW) is the current....


```



2. M文件的结构

- 函数声明行

- H1行

- 帮助文件

- M文件正文
- 注释部分

## MATLAB程序流程控制

### 分支控制结构

`if`

```matlab
if logical_expression
	statements
elseif logical_expression
	statements
else	logical_expression
	statements
end
```

`switch`

```matlab
switch expression(scalar or string)
	case value1
		statements
	case value2
		statements
	...
	otherwise
		statements
end
```



## 程序循环控制语句

`for`

```matlab
for index = start:increment:end
	statements
end
```



`while`

```matlab
while expression
	statements
end
```

`continue`

`break`

`return`

## MATLAB函数及其调用

1. 匿名函数

`fhandle = @(arglist) expr`

```matlab
myfhd1=@(x)(x+x.^2)
myfhd1(2)
myffhd=@(a)(quad(@(x)(a.*x.^2+1./a.*x+1./a^2),0,1))
myffhd(0.5)
```

2. M文件主函数

每一个函数M文件第一行第一的函数就是M文件主函数，一个文件只能包含一个主函数，并通常习惯上将M文件名和M文件主函数名设为一致

3. 嵌套函数

在个函数内部，可以定义一个或多个函数

```matlab
function x = A(p1, p2)
...
	function y = B(p3)
	...
	end
...
end
```

```matlab
function A(x, y)
B(x, y);
D(y);
	function B(x, y)
	C(x);
	D(y);
		function C(x)
		D(x)
		end
	end
	function D(x)
	E(x);
		function E(x)
		...
		end
	end
end
```



4. 子函数

一个M文件只能包含一个子函数，但一个M文件中可以包含多个函数，这些编写在主函数后的函数都成为子函数。

5. 私有函数

对应的M文件保存在"private"的文件夹下，只能被private目录的直接父目录下的脚本M文件或M文件主函数调用

6. 重载函数

处理功能相似但是参数类型或个数不同色的函数编写中。

MATLAB重载函数通常防止在不同的文件夹下，通常文件夹名称以符号@开头，然后跟一个代表MATLAB数据类型的字符

如"@double"目录下的重载函数的输入参数应该是双精度浮点型，而"@int32"目录下的重载函数的输入参数应该是32位整型

## 函数参数传递

1. 输入和输出参数的数目

不指定输出参数调用函数时，MATLAB默认吧输出参数列表中第一个参数的值返回给工作空间变量ans

通过nargin和nargout函数确定函数调用时实际传递的输入和输出参数个数，结合条件分支语句，就可以处理函数调用中指定不同数目的输入输出参数的情况

```matlab
function [y1,y2]=mytestnio(x1,x2)
if nargin==1
	y1=x1;
	if nargout==2
		y2=x1;
	end
else
	if nargout==1
		y1=x1+x2;
	else
		y1=x1;
		y2=x2;
	end
end
```

2. 可变数目的参数传递

函数varargin和varargout把实际的函数调用时传递的参数值封装成一个元胞数组，因此，在函数实现部分的代码编写中，就要用访问元胞数组的方法访问封装在varargin或varargout中的元胞或元胞内的变量。

```matlab
function y=mytestvario(varargin)
temp=0;
for i=1:length(varargin)
	temp=temp+mean(varargin{i}(:));
end
y=temp/length(varargin);
```

函数varargin和varargout也可以放置在参数列表中某些必然出现的参数之后，其语法格式有如下几种形式

- `function [out1, out2]=example1(a,b,varargin)`表示函数example1可以接受大于等于两个输入参数，返回两个输出参数；两个必选的输入参数是a和b，其他更多的输入参数被封装在varargin中
- `function[i,j,varargout]=example2(x,y)`表示example2接受两个输入参数x和y，返回大于等于两个输出参数，前两个输出参数为i和j，其他更多的输出参数封装在varargin中

3. 返回被修改的输入参数

```matlab
function [y, x]=mynewtest(x)
x=x+5;
y=x*2;
[y,x]=mynewtest(x) %调用
```

4. 全局变量

`global variable`

在应用全局变量时，通常在各个函数内部通过global variable语句处声明，在命令窗口或脚本M文件中也要先通过global声明，然后进行赋值和调用

```matlab
function y=myprocess(x)
global T
T=T*2;
y=exp(T)*sin(x);
```

## 函数句柄

创建函数句柄的一般语法格式

`fhandle=@function_filename`

![image-20210206181743472](C:\Users\xiaojian\AppData\Roaming\Typora\typora-user-images\image-20210206181743472.png)

## MATLAB程序调试

函数只能定义在M文件中

删除句尾的分号可以输出中间结果

## MATLAB程序设计技巧

### 嵌套计算

嵌套计算不仅能够提高执行效率，而且此方法有更强的解决问题的能力。

求表达式$p(x)=a_3x^3+a_2x^2+a_1x+a_0$

可转化为$p1(x)=((a_3x+a_2)x+a_1)x+a_0$



```matlab
function ex0411()
N=100000;
a=[1:N];
x=1;
tic
p1=sum(a.*x.^[N-1:-1:0]);
p1,toc
tic,p2=a(1);
for i=2:N
	p2=p2*x + a(i);
end
p2, toc
tic,p3=polyval(a,x),toc
```

求possion分布的有限项和，$S(M)=\sum_{n=0}^{M}\frac{\lambda^n}{n!}e^{-\lambda}$

```matlab
function ex0412()
r=80;
M=160;
p=exp(-r);
S1=0;
for k=1:M
	p=p*r/k;
	S1=S1+p;
end
S1
S2=0;
for k=1:M
	p=r^k/factorial(k);%这里的r^k/k!计算起来是不准确的，k!和r^k数值上都太大了
	S2=S2+p;
end
S2*exp(-r);
S2
```

### 循环计算

尽量避免使用循环，用向量运算代替

在for循环执行前，应预先分配数组

优先考虑内联函数

应用MEX技术

### 使用例外处理机制

```matlab
function p=ex0414(a,b)
if nargin==1
	b=zeros(4,1);
elseif nargin==0
	error('empty input');
end
a=a(:).' ;b=b(:).' ;
na=length(a);nb=length(b);
p=[zeros(1,nb-na) a]+[zeros(1,na-nb) b];
```

## 使用全局变量

`global v1 v2...vn`

使用全局变量要主义一下几点

* 它可以在主程序和函数之间不需要经过输入或输出变量直接传递数据。但要注意在函数调用中使用它们时，调用结束后全局变量在工作空间中仍然存在

* 两个或多个函数也可以共有一个全局变量，只要同时在这些函数中用global语句加以定义即可

* 使用全局变量时必须十分小心，最好吧全局变量名取得长一些或全部用大写，以免与函数中的局部变量重名。如果重名，容易出现致命错误。可见，使用全局变量不是一个好的编程方法

* 一旦变量被声明为全局的，则在任何声明它的地方都可以对它进行修改。这在一定程度上破坏了子程序的独立性。如果全局变量被多个子程序修改，则用户很难知道全局变量的确切值，这使得程序的可读性大大下降。

  

## 通过varargin传递参数

在编写函数时vargrgin只能作为函数的最后一个参量，主要传递函数中调用的子函数可选项的参数是，其大小也随着输入参量的变化而发生变化。

```matlab
function ex0416() %主程序。通过varargin传递可选参数
D = 1; b1= -2; b2 = 2;
t = b1+[0:100]/100*(b2 - b1)
bounds = [b1, b2];
subplot(1,3,1), ex0416plot('ex0415') %做出x的函数图，bounds为默认值[-1,1]
axis([b1 b2 -0.4 1.2])
subplot(1,3,2),ex0416plot('ex0415',bounds) %输入两参数，做[-2,2]上x函数图
axis([b1 b2 -0.4 1.2])
subplot(1,3,3),ex0416plot('ex0415',bounds,D) %可选项输入为1
axis([b1 b2 -0.4 1.2])
function ex0416plot(ftn,bounds,varargin) %子程序。varargin为可选变量，输入时可以不考虑
if nargin < 2
	bounds = [-1 1];
end
b1 = bounds(1); b2 = bounds(2);
t = b1 + [0:100]/100*(b2 - b1);
x = feval(ftn, t, varargin(:));
plot(t,x)
```



# MATLAB优化工具箱

求解无约束条件非线性极小值

求解约束条件下非线性极小值，包括目标逼近问题、极大极小值问题以及半无限极小值问题

求解二次规划和线性规划问题

非线性最小二乘逼近和曲线拟合

非线性系统的方程求解

约束条件下的线性最小二乘优化

求解复杂结构的大规模优化问题



# 无约束一维极值问题

无约束以为极值问题可简单表述为$\min f(x),x\in R,或\min f(x),x\in [x_1,x_2]$

其中x为一维变量，相应的f(x)为一维变量x的函数

线搜索：黄金分割法、斐波那契法、牛顿法

非线性搜索法：抛物线法、三次插值法

### 进退法

进退法理论依据：

$$f(x)为单谷函数（只有一个极小点），且[a,b]为其极小点的一个搜索区间，对于任意x_1,x_2\in[a,b]，如果f(x_1)<f(x_2)，则[a,x_2]为极小点的搜索区间，如果f(x_1)>f(x_2)，则[x_1,b]为极小点的搜索区间$$

算法步骤

![image-20210304093109645](C:\Users\xiaojian\AppData\Roaming\Typora\typora-user-images\image-20210304093109645.png)

算法实现

```matlab
function [minx,maxx] = minJT(f,x0,h0,eps)
%目标函数:f;
%初始点：x0;
%初始步长：h0;
%精度：eps;
%目标函数包括极值的区间左端点：minx;
%目标函数包括极值的区间右端点：maxx;

format long;
if nargin == 3
    eps = 1.0e-6;
end

x1 = x0;
k = 0;
h = h0;
while 1
    x4 = x1 + h;
    k = k+1;
    f4 = subs(f, symvar(f),x4); %findsym deprecated!
    f1 = subs(f, symvar(f),x1); 
    if f4 < f1
        x2 = x1;
        x1 = x4;
        f2 = f1;
        f1 = f4;
        h = 2*h;
    else
        if k==1
            h = -h;
            x2 = x4;
            f2 = f4;
        else
            x3 = x2;
            x2 = x1;
            x1 = x4;
            break;
        end
    end
end

minx = min(x1,x3);
maxx = x1+x3 - minx;
format short;


```



### 黄金分割法

算法实现

````matlab
function [x,minf] = minHJ(f,a,b,eps)
%目标函数：f;
%极值区间左端点：a；
%极值区间右端点：b；
%精度：eps；
%目标函数取最小值时的自变量值：x
%目标函数的最小值：minf

format long;
if nargin == 3
    eps = 1.0e-6;
end

l = a + 0.382*(b-a);
u = a + 0.618*(b-a);
k=1;
tol = b-a;

while tol>eps && k<100000
    fl = subs(f , symvar(f), l); %findsym -> symvar
    fu = subs(f , symvar(f), u); %findsym -> symvar
    if fl > fu
        a = l;
        l = u;
        u = a + 0.618*(b - a);
    else
        b = u;
        u = l;
        l = a + 0.382*(b-a);
    end
    k = k+1;
    tol = abs(b - a);
end
if k == 100000
    disp('找不到最小值！');
    x = NaN;
    minf = NaN;
    return;
end
x = (a+b)/2;
minf = subs(f, symvar(f),x); %findsym -> symvar
format short;


````





### 斐波那契法

算法实现

```matlab
function [x,minf] = minFBNQ(f,a,b,delta,eps)
%目标函数：f；
%极值区间左端点：a；
%极值区间右端点：b；
%算法结束参数：delta
%精度：eps；
%目标函数取最小值时的自变量值：x；
%目标函数的最小值：minf
format long;
if nargin == 4
    eps = 1.0e-6;
end

F = ones(2,1);
N = (b-a)/eps;
c = F(2) - N;
n = 2;

while c<0
    n = n+1;
    F(n) = F(n-1) + F(n-2);
    c = F(n) - N;
end

l = a + F(n-2)*(b-a)/F(n);
u = a + F(n-1)*(b-a)/F(n);
k=1;

while 1
    fl = subs(f , symvar(f), l);
    fu = subs(f , symvar(f), u);
    if fl > fu
        a = l;
        l = u;
        u = a + F(n-k-1)*(b-a)/F(n-k);
        if (k == n - 3)
            break;    
        else
            k = k+1;
        end
    else
        b = u;
        u = l;
        l = a + F(n-k-2)*(b-a)/F(n-k);
        if ( k == n-3 )
            break;    
        else
            k = k+1;
        end
    end
end
if k == 100000
    disp('找不到最小值！');
    x = NaN;
    minf = NaN;
    return;
end
u = l + delta;
fl = subs(f , symvar(f), l);
fu = subs(f , symvar(f), u);
if fl > fu
    a = l;
else
    b = l;
end
x = (a+b)/2;
minf = subs(f , symvar(f), x);
format short;


```

### 牛顿法

基本牛顿法

算法实现

```matlab
function [x,minf] = minNewton(f,x0,eps)
%目标函数：f
%初始点：x0
%精度：eps
%目标函数取最小值时的自变量值：x
%目标函数的最小值:minf

format long;
if nargin == 2
    eps = 1.0e-6;
end

df = diff(f);
d2f = diff(df);
k = 0;
tol = 1;

while tol>eps
    dfx = subs(df,symvar(df),x0);
    if diff(d2f) == 0
        d2fx = double(d2f);
    else
        d2fx = subs(d2f,symvar(d2f),x0); 
    end
    x1 = x0 - dfx/d2fx;
    k = k + 1;
    tol = abs(dfx);
    x0 = x1;
end

x = double(x1);
minf =  double(subs(f,symvar(f),x));
format short;
```

全局牛顿法

算法实现

```matlab
function [x,minf] = minGlbNewton(f,x0,eps)
%目标函数: f;
%初始点: x0;
%精度: eps;
%目标函数取最小值时的子变量值: x;
%目标函数的最小值: minf

format long;
if nargin == 2
    eps = 1.0e-6;
end
var = symvar(f);
df = diff(f);     %一阶导数
d2f = diff(df);   %二阶导数
bConti = 1;

while bConti
       fx0 = Funval(f, sym(var(1)),x0);  %函数值
       dfx = Funval(df,sym(var(1)), x0); %一阶导数值
       d2fx = Funval(d2f,sym(var(1)),x0);%二阶导数值
       if dfx == 0   %一阶导数为0
           if d2fx >= 0
               x = x0;
               bConti = 0;
           end
           delta = eps;
           while 1
               fd = Funval(f, sym(var(1)),x0+delta); %向前搜索
               if fd >= fx0
                   delta = delta*2; %增大步长
                   continue;
               else
                   x0 = x0 + delta; %更新搜索点
                   break;
               end
           end
       else
            beta = d2fx;
            if beta <= 0
                beta = 1;
            end
            alpha = 1;
            while 1
                x1 = x0 - alpha*dfx/beta; %判断新的点是否可以接受
                fx1 = Funval(f,sym(var(1)), x1);
                tol = fx1 - fx0 + (dfx)^2*alpha/4/beta;
                if tol <= 0
                    if abs(x1 - x0)<=eps
                        bConti = 0;
                        x =  x1;
                        break;
                    else
                        x0 = x1;
                        break;
                    end
                else
                    alpha = alpha/2;   %缩短步长
                    continue;
                end
            end
       end
end
x = double(x1);
minf = double(subs(f,symvar(f),x));
format short;
```

### 割线法

算法实现

```matlab
function [x,minf] = minGX(f,x0,x1,eps)
%目标函数：f
%初始点：x0
%初始点：x1
%精度：eps
%目标函数取最小值时的自变量值：x
%目标函数的最小值：minf
format long;
if nargin == 3
    eps = 1.0e-6;
end

df = diff(f);  %一阶导数
k = 0;
tol = 1;

while tol>eps
    dfx1 = subs(df,symvar(df),x1); %一阶导数值
    dfx0 = subs(df,symvar(df),x0); %一阶导数值
    x2 = x1 - (x1 - x0)*dfx1/(dfx1 - dfx0); %割线法的迭代公式
    k = k + 1;
    tol = abs(dfx1);
    x0 = x1; %更新迭代点
    x1 = x2; %更新迭代点
end

x = double(x2);
minf =  double(subs(f,symvar(f),x));
format short;
```



### 抛物线法

算法实现

```matlab
function [x,minf] = minPWX(f,a,b,eps)
%目标函数：f
%初始搜索区间左端点a
%初始搜索区间右端点b
%精度：eps
%目标函数取最小值时的自变量值x
%目标函数的最小值：minf
format long;
if nargin == 3
    eps = 1.0e-6;
end

t0 = (a+b)/2;
k = 0;
tol = 1;

while tol>eps
    fa = subs(f,symvar(f),a);   %区间左端点函数值
    fb = subs(f,symvar(f),b);   %区间右端点函数值
    ft0 = subs(f,symvar(f),t0); %内插点函数值
    tu = fa*(b^2 - t0^2)+fb*(t0^2 - a^2)+ft0*(a^2 - b^2);
    td = fa*(b - t0)+fb*(t0 - a)+ft0*(a - b);
    t1 = tu/2/td; %插值多项式的极小点
    
    ft1 = subs(f,symvar(f),t1); %插值多项式的极小值
    tol = abs(t1 - t0);
    if ft1 <= ft0
        if t1<= t0
            b = t0;     %更新搜索区间右端点
            t0 = t1;    %更新内插点
        else
            a = t0;     %更新搜索区间左端点
            t0 = t1;    %更新内插点
        end
        k = k+1;
    else
       if t1<= t0
           a = t1;
       else
           b = t1;
       end
       k = k+1;
    end
end

x = t1;
minf =  subs(f,symvar(f),x);
format short;
```

### 三次插值法

算法实现

```matlab
function [x,minf] = minTri(f,a,b,eps)
%目标函数：f
%初始搜索区间左端点a
%初始搜索区间右端点b
%精度：eps
%目标函数取最小值时的自变量值x
%目标函数的最小值：minf
format long;
if nargin == 3
    eps = 1.0e-6;
end

df = diff(f);
t0 = (a+b)/2;
k = 0;
tol = 1;

while tol>eps
    fa = subs(f,symvar(f),a);
    fb = subs(f,symvar(f),b);
    dfa = subs(df,symvar(df),a);
    dfb = subs(df,symvar(df),b);

    w = 3*(fb - fa)/(b-a) - dfa - dfb;
    z = sqrt(w^2 - dfa*dfb);
    t1 = a + (z - dfa - w)*(b-a)/(2*z - dfa + dfb);
       
    dft1 = subs(df,symvar(df),t1);
    tol = abs(dft1);
    if dft1 < 0
        a = t1;
    else
        b = t1;
    end
    k = k+1;
    t0 = t1;
end

x = double(t1);
minf =  double(subs(f,symvar(f),x));
format short;



```

可接受搜索法

### Goldstein法

算法实现

```matlab
function [x,minf] = minGS(f,XMAX,sigma1,sigma2,alpha,eps)
%目标函数：f
%搜索最大值：XMAX
%可接受系数1：sigmal
%可接受系数2：sigma2
%增大搜索点系数：alpha
%精度：eps
%目标函数取最小值时的自变量值：x
%目标函数的最小值：minf
format long;
if nargin == 5
    eps = 1.0e-6;
end
if sigma1<=0 || sigma1>1
    disp('sigma1参数不对！');
    x = NaN;
    minf = NaN;
    return;
else
    if sigma2 <= sigma1
        disp('sigma2参数不对！');
        x = NaN;
        minf = NaN;
        return;
    else
        if alpha <= 1
            disp('alpha参数不对！');
            x = NaN;
            minf = NaN;
            return;
        end
    end
end

    
df = diff(f);
f0 = subs(f, findsym(f),0);
df0 = subs(df, findsym(df),0);
a = 0;
b = XMAX;
k = 0;
t = (a+b)/2;

while 1
    ft = subs(f,findsym(f),t);
    f1 = f0 + sigma1*t*df0;
    if ft <= f1
        f2 = f0 + sigma2*t*df0;
        if ft >= f2
            x = t;
            break;
        else
            a = t;
            if b < XMAX
                t = (a+b)/2;
            else
                t = alpha*t;
            end
        end
    else
        b = t;
        t = (a+b)/2;
    end
    k = k+1;
end

minf =  subs(f,findsym(f),x);
format short;



```



### Wolfe-Powell法

算法实现

```matlab
function [x,minf] = minWP(f,XMAX,sigma1,sigma2,alpha,eps)
%目标函数：f
%搜索最大值：XMAX
%可接受系数1：sigmal
%可接受系数2：sigma2
%增大搜索点系数：alpha
%精度：eps
%目标函数取最小值时的自变量值：x
%目标函数的最小值：minf    
format long;
if nargin == 5
    eps = 1.0e-6;
end
if sigma1<=0 || sigma1>1
    disp('sigma1参数不对！');
    x = NaN;
    minf = NaN;
    return;
else
    if sigma2 <= sigma1
        disp('sigma2参数不对！');
        x = NaN;
        minf = NaN;
        return;
    else
        if alpha <= 1
            disp('alpha参数不对！');
            x = NaN;
            minf = NaN;
            return;
        end
    end
end

    
df = diff(f);
f0 = subs(f, findsym(f),0);
df0 = subs(df, findsym(df),0);
a = 0;
b = XMAX;
k = 0;
t = (a+b)/2;

while 1
    ft = subs(f,findsym(f),t);
    f1 = f0 + sigma1*t*df0;
    if ft <= f1
        f2 = sigma2*t*df0;
        if ft >= f2
            x = t;
            break;
        else
            a = t;
            if b < XMAX
                t = (a+b)/2;
            else
                t = alpha*t;
            end
        end
    else
        b = t;
        t = (a+b)/2;
    end
    k = k+1;
end

minf =  subs(f,findsym(f),x);
format short;



```



# 无约束多维极值问题

无约束多维极值问题的一般表达式为$\min f(x),x\in \mathbf{R}^n$

直接法

无约束优化的直接法是不需要计算导数的方法，他们采用的方法是沿坐标轴搜索函数的下降方向或者沿预先给定的方向进行搜索，因此其本质是一种搜索试探前进的反复过程。

# 约束优化问题

todo

# 非线性最小二乘问题

todo

# 线性规划

todo

# 整数规划



# 二次规划



## 粒子群优化算法

### 算法概述

在PSO算法中，每个优化问题他的解都是搜索空间中的一只鸟，被抽象为没有质量和体积的微粒，并将其延申到N维空间。粒子i在N维空间里的位置表示为一个矢量，每个例子的飞行速度也表示为一个矢量

所以的例子都有一个由被优化的函数决定的适应值（fitesss），每个粒子还有一个速度决定他们飞翔的力向和距离。例子们知道自己到目前为止发现的最好位置（pbest）和现在的位置，这个可以看作是粒子自己的飞行经验。除此之外，每个粒子还知道到目前位置整个群体中所有的粒子发现的最好位置（gbest, gbest是pbest中的最好值），这个可以看作是粒子同伴的经验，粒子就是通过自己的经验和同伴中最好的经验来决定下一步的运动。

PSO算法首先初始化一群随机粒子（随机解），然后粒子们就追随当前的最优粒子在解空间中搜索，即通过迭代找到最优解。假设d维搜索空间中的第i个粒子的位置和速度分别为$X^i=(x_{i,1},x_{i,2},\ldots,x_{i,d})$和$V^i=(v_{i,1},v_{i,2},\ldots,v_{i,d})$，在每一次迭代中，粒子通过跟踪每个最优解来更新自己，第一个就是粒子本身找到的最优解，即个体极值pbest，$P^i=(p_{i,1},p_{i,2},\ldots,p_{i,d})$；另一个就是整个种群目前找到的最优解，即全局最优解gbest，$P_g$。在找到这两个最优解后，粒子根据如下的公式来更新自己的速度和新的位置。

$v_{i,j}(t+1)=wv_{i,j}(t)+c_1r_1[p_{i,j}-x_{i,j}(t)]+c_2r_2[p_{g,j}-x_{i,j}(t)]$

$x_{i,j}(t+1)=x_{i,j}(t)+v_{i,j}(t+1)，j=1,2,\ldots,d$

w为惯性权重，c_1和c_2为正的学习银子，r_1和r_2为0到1之间均匀分布的随机数

粒子群算法的性能很大程度上取决于算法的控制参数，如粒子数，最大速度、学习银子、惯性权重等

粒子数：一般的优化问题去20至40个粒子，简单的问题10个粒子，比较复杂的问题100

粒子的维度：问题解的维度

粒子的范围：由优化问题决定

最大速度Vmax：决定粒子在一个循环中最大的移动距离

学习因子：学习因子使粒子具有自我总结和向群体中优秀个体学习的能力，从而向群体内或领域内最优点靠近，通常取c_1和c_2为2，一般c_1等于c_2，且范围在0至4之间



惯性权重：决定了对粒子对当前速度继承的多少，合适的选择可以使粒子具有均很的探索能力和开发能力，惯性权重的取法一般有常数发、线性递减法、自适应法

### 基本粒子群算法

算法步骤

1. 随机初始化种群中各微粒的位置和速度

2. 评价每个微粒的适应度，将当前各微粒的位置和适应值存储在各微粒的pbest中，将所有pbest中适应值最优个体的位置和适应值存储于gbest中

3. 用下式更新粒子的速度和位移

   $v_{i,j}(t+1)=wv_{i,j}(t)+c_1r_1[p_{i,j}-x_{i,j}(t)]+c_2r_2[p_{g,j}-x_{i,j}(t)]$

   $x_{i,j}(t+1)=x_{i,j}(t)+v_{i,j}(t+1)，j=1,2,\ldots,d$

4. 对每个微粒，将适应值与其经历过的最好位置作比较，如果较好，则将其作为当前的最好位置

5. 比较当前所有pbest和gbest和值，更新gbest

6. 若满足停止条件（通常为预设的运算精度或迭代次数），搜索停止，输出结果，否则返回3继续搜索

算法MATLAB实现

```matlab
function [xm,fv] = PSO(fitness,N,c1,c2,w,M,D)
%待优化的目标函数：fitness
%粒子数目：N
%学习因子1：c1
%学习因子2：c2
%惯性权重：w
%最大迭代次数：M
%自变量的个数：D
%目标函数去最小值时的自变量值：xm
%目标函数的最小值：fv

format long;

%------初始化种群的个体------------

for i=1:N

    for j=1:D

        x(i,j)=randn;  %随机初始化位置

        v(i,j)=randn;  %随机初始化速度

    end

end

%------先计算各个粒子的适应度，并初始化Pi和Pg----------------------

for i=1:N

    p(i)=fitness(x(i,:));

    y(i,:)=x(i,:);

end

pg = x(N,:);             %Pg为全局最优

for i=1:(N-1)

    if fitness(x(i,:))<fitness(pg)

        pg=x(i,:);

    end

end

%------进入主要循环，按照公式依次迭代------------

for t=1:M

    for i=1:N

        v(i,:)=w*v(i,:)+c1*rand*(y(i,:)-x(i,:))+c2*rand*(pg-x(i,:));

        x(i,:)=x(i,:)+v(i,:);

        if fitness(x(i,:))<p(i)

            p(i)=fitness(x(i,:));

            y(i,:)=x(i,:);

        end

        if p(i)<fitness(pg)

            pg=y(i,:);

        end

    end

    Pbest(t)=fitness(pg);
end
xm = pg';
fv = fitness(pg);




```

### 带压缩因子的粒子群算法

学习因子c1和c2决定了粒子本身经验信息和其他粒子的经验信息对粒子运行轨迹的影响，反应了粒子群之间的信息交流。设置c1较大的值，会使粒子过多的在局部范围内徘徊，二较大的c2值，则又会促使粒子过早收敛到局部最小值。

为了有效地控制粒子的飞行速度使算法达到全局探测与局部开采两者间的有效平衡，Clerc构造了引入收缩因子的PSO算法，其速度更新公式为：

$v_{i,j}(t+1)=\varphi\{v_{i,j}(t)+c_1r_1[p_{i,j}-x_{i,j}(t)]+c_2r_2[p_{g,j}-x_{i,j}(t)]\}$

$\varphi=\cfrac{2}{|2-C-\sqrt{C^2-4C}|},C=c_1+c_2$

为报保证算法的顺利求解，c1+c2必须大于4

（1）c1=c2=2.05，此时C为4.1，收缩因子$\varphi$为0.729，这在形式上就等效于w=0.739,c1=c2=1.49445的基本PSO算法

（2）微粒规模N=30，c1=2.8,c2=1.3，此时C为4.1，收缩因子$\varphi$为0.729

算法实现

```matlab
function [xm,fv] = YSPSO(fitness,N,c1,c2,M,D)
%待优化的目标函数：fitness
%粒子数目：N
%学习因子1：c1
%学习因子2：c2
%惯性权重：w
%最大迭代次数：M
%自变量的个数：D
%目标函数去最小值时的自变量值：xm
%目标函数的最小值：fv

phi = c1 + c2;
if phi <= 4
    disp('c1 与 c2 的 和 必 须 大 于 4 ！');
    xm = NaN;
    fv = NaN;
    return;
end
format long;

%------初始化种群的个体------------

for i=1:N

    for j=1:D

        x(i,j)=randn;  %随机初始化位置

        v(i,j)=randn;  %随机初始化速度

    end

end

%------先计算各个粒子的适应度，并初始化Pi和Pg----------------------

for i=1:N

    p(i)=fitness(x(i,:));

    y(i,:)=x(i,:);

end

pg = x(N,:);             %Pg为全局最优

for i=1:(N-1)

    if fitness(x(i,:))<fitness(pg)

        pg=x(i,:);

    end

end

%------进入主要循环，按照公式依次迭代------------

for t=1:M

    for i=1:N
        ksi = 2 / abs(2 - phi - sqrt(phi^2 - 4*phi));
        v(i,:) = v(i,:)+c1*rand*(y(i,:)-x(i,:))+c2*rand*(pg-x(i,:));
        v(i,:) = ksi*v(i,:);

        x(i,:)=x(i,:)+v(i,:);

        if fitness(x(i,:))<p(i)

            p(i)=fitness(x(i,:));

            y(i,:)=x(i,:);

        end

        if p(i)<fitness(pg)

            pg=y(i,:);

        end

    end

    Pbest(t)=fitness(pg);
end
xm = pg';
fv = fitness(pg);




```

### 权重改进的粒子群算法

在微粒群算法的可调整参数中，惯性权重w时最重要的参数，较大的w有利于提高算法的全局搜索能力，能较小的w回增强算法的聚标搜索能力，根据不同的权重变化公式，可得到不同的PSO算法，常见的有线性递减权算法、自适应权重法、随机权重法

线性递减权重法

较大的惯性因子有利于跳出局部极小点，便于全局搜索，而较小的惯性因子则有理由对当前的搜索区域惊醒精确局部搜索，以利于算法收敛，因此针对PSO算法容易早熟以及算法后期易在全局最优解附近产生振荡现象，可以采用线性变化的权重，让惯性权重从最大值wmax减小到最小值wmin，w随算法迭代次数的变化公式为

$w=w_{max}-\cfrac{t*(w_{max}-w_{min})}{t_{max}}$











### 变学习因子的粒子群算法

