# 1.介绍
诸如web email,地图,文档编辑,团队协作工具等Javascript 应用在日常工作中变得越来越重要。为了迎合使用Javascript作为编程语言的开发团队更好地构建和维护大型Javascript项目的需要,我们设计了TypeScript。TypeScript能够帮助开发团队定义不同软件组件间的接口以及洞悉现成Javascript类库的接口行为。TypeScript让团队将代码组织成动态加载的模块的形式来避免命名冲突。TypeScript的可选类型系统也使得Javascript程序员能工高效地使用开发工具，并且进行静态检查，符号查找，表达式自动提示以及代码修改。

TypeScript 是Javascript的语法糖果，它的语法规则是ECMAScript 2015(es6)的超集。每个Javascript程序实际上都是TypeScript程序.TypeScript 编译器只进行TypeScript项目的文件的单独编译,并不会对声明的变量重新排序。这使得编译输出的Javascript结果和输入TypeScript代码高度匹配。TypeScript不会转换变量的名字，这一点使得在结果Javascript代码上进行调试更容易。TypeScript可选地提供了souce map和源代码调试的功能。TypeScript工具通常在在文件保存就会触发Javascript代码的生成,同时保留在Javascript开发中常用的测试,编辑，刷新等流程（琪琪：不确定是不是这个意思）。

TypeScript 语法包括了所有在ECMAScript 2015（es6）发表的特性,如类(class),模块等。同时提供了将这些高级特性翻译到兼容更老版本的ECMAScript（如ES3,ES5）的能力。

类（class）使得程序员使用标准的方式来使用面向对象的设计模式，使得继承等特性更加可读,互操作性更高。模块使得程序员能够将他们的代码组织成组件同时避免了名称冲突。TypeScript编译器提供了模块代码生成的选项来支持静态模块加载和动态模块加载。

TypeScript 也提供了Javascript 程序员一个可选地类型注解系统,这些类型注解看起来就像是JSDoc的注释,但在TypeScript它们被整合到了语法当中。这种整合使得代码可读性更高,同时降低了同步类型注解和对应变量的维护成本。

TypeScript类型系统允许程序员表达对Javascript对象能力的限制,并使用一些工具来执行这些限制。为了减少注解的数量同时不降低这些工具的可用性,TypeScript类型系统大量地使用了类型推导。比如，下边的代码，TypeScript会将变量i的类型推导为number。

```javascript
var i = 0;
```

TypeScript 将认为下边的函数具有string类型的返回值：
```javascript
function f(){
    return "ddd";
}
```

程序员可以使用TypeScript语言服务来感受类型推导带来的好处。比如说，编辑器可以整合TypeScript语言服务，并使用服务来查找在一个字符串上的成员变量，如下边的截图那样工作:

![](https://github.com/Microsoft/TypeScript/raw/master/doc/images/image1.png "嘿嘿，琪琪你在干啥呢")

在这个例子中程序员无需提供类型注解,直接从类型推导中获得好处。有些时候，确实需要程序员手动提供类型注解。在TypeScript,我们可以表达对一个函数参数的要求，如下边代码片段所示：
```typescript
function f(s:string){
    return s;
}

f({}); 	    // 这里就出错啦，琪琪
f("hello"); // 唔，不错
```

这里参数s的类型注解使得TypeScript类型检查知道程序员需要一个字符串参数。在函数f的内部，TypeScript工具(如IDE)可以假定这个参数是字符串，然后提供对应的操作符合法性检查以及代码自动完成（自动提示）。工具同样可以检测到第一个对函数f的调用出错,因为f需要一个字符串参数而不是一个对象。对于这个函数f，经过编译后，会得到下边的Javascript代码：
```javascript
function f(s){
    return s;
}
```

在Javascript输出中，所有的类型注解都被擦除了。通常，TypeScript会擦除所有的类型注解后发布最终编译完成的Javascript代码。

## 1.1 环境声明(Ambient Declarations)
环境声明将变量引入到TypeScript作用域中,但是这个声明不会对最终编译的出来的Javascript文件有任何的影响。程序员可以先使用环境声明来告诉TypeScript编译器其它的组件将提供这个变量的定义。举个栗子,默认情况下TypeScript编译器对那些未定义的变量的使用将打印错误。为了加入一些通用的浏览器定义的变量，TypeScript程序员可以使用环境声明。下边的代码声明了由浏览器提供的‘document’对象。因为这个声明并没有指定类型,所以将把它推导为any类型（TypeScript中any类型为通用类型）。类型any意味着TypeScript工具无需对document对象做任何的假设。下面的一些例子将展示程序员应该如何使用类型来进一步描述一个对象的应有行为。

```typescript
declare var document；
document.title = "Hello,qiqi."; // 好啦,document已经声明啦
```

对于document对象,TypeScript编译器自动地提供了一个声明,因为TypeScript在默认情况下会引用一个叫做‘lib.d.ts’的文件 ，这个文件提供了內建JavaScript类库接口的声明，浏览器对象模型（Document Object Model）就是其中一个內建的接口。

TypeScript 编译器并不默认地为jQuery提供接口声明,所以需要使用jQuery的时候，程序员需要提供一个如下声明:
```typescript
declare var $;
```

Section 1.3提供了更详尽的例子来说明程序员如果为jQuery以及其它库添加类型信息。


## 1.2 函数类型
函数表达式是Javascript的一个强大的特性。这个特性使得函数定义可以创建闭包--闭包就是一个能够捕获外围作用域变量的函数。闭包是目前Javascript唯一的进行数据封装的途径。通过捕获使用外围环境的变量，闭包可以保留不能被闭包外部访问的信息。Javascript程序员经常使用闭包来表示事件处理器和其它异步回调。
TypeScript函数类型使得程序员能够表达函数的期望签名。函数的签名就是一组参数类型加上一个返回类型。下面的雷子使用了函数类型来表达一个异步点赞机制下要求回调函数的签名：

```typescript
function vote(topic: string, callback: (result:string) => any){
    // ...
}

vote("今天吃黄焖鸡",function(result:string){
    if (result.indexOf("黄焖鸡")!=-1){
        //...
    }
});
```

在这个例子中,第二个参数具有函数类型
```typescript
(result: string) => any
```

这意味着第二个参数是一个返回any但接受字符串作为参数的函数。

Section3.9.2将提供更多的关于函数类型的信息。


## 1.3对象类型
TypeScript程序员使用对象类型来声明对象行为的期望。下面的代码使用了一个字面量对象来表明MakePoint函数的返回类型。
```typescript
var MakePoint: () => {
    x: number; y: number;
};
```
程序员可以给对象类型命名。我们将命名的对象类型称为interface。举个栗子,下面的代码中，一个接口声明了一个必要字段(name)和一个可选字段(favoriteColor)：
```typescript
interface Friend {
    name: string;
    favoriteColor?: string;
}

function add(friend: Friend){
    var name = friend.name;
}
add({name: "Fred"}); //OK
add({ favoriteColor: "blue"}); //Error，name呢？
add({ name: "Jill", favoriteColor: "green"}); //OK
```

TypeScript 对象类型表达了一个Javascript对象所能表达的行为。例如，jQuery定义了一个对象'$',$全局对象有get方法(发送一个Ajax请求),也有‘browser’属性（提供浏览器厂商信息)。然而,jQuery用户也可以将$作为一个函数。这个函数的行为依赖于这个函数接收的参数。

以下的代码片段捕获了jQuery行为的一个子集,这对简单使用jQuery足够了。
```typescript
interface JQuery {
    text(content: string);
}

interface JQueryStatic {
    get(url: string, callback: (data: string) => any);
    (query: string): JQuery;
}

declare var $: JQueryStatic;

$.get("http://zxcchen.github.io",function(data: string){
    $("div").text(data);
});
```

JQueryStatic 接口引用了另一个接口jQuery，这个接口代表了包含一个或多个DOM元素的集合。jQuery库可以在这样的集合上进行很多操作，但这个例子中使用jQuery的用户只需要知道这个接口可以通过传递字符串给text方法来设置集合中的jQuery元素的text内容。JQueryStatic接口也包含了一个get方法来在给定的URL来执行Ajax get 请求并在接收到response 后调用提供的回调。

最后，JQueryStatic接口还包含了一个裸函数签名(注意这个函数类型的前边并没有名字)：
```typescript
(query: string): JQuery;
```

这个裸函数签名表明这个接口的实例是可以当做函数一样被调用的。这个例子阐明了TypeScript的函数类型只是TypeScript 对象类型的一个特例。具体来说，函数类型只是包含一个或多个调用签名的对象类型。因此，我们可以将任何的函数类型写作对象类型的形式。下边的例子用两种不同形式来描述同样的函数类型。

```typescript
var f:{ ():string};
var sameType: () => string = f;  //OK，将sameType赋值为f，能成功说明是同样的类型
var nope: () => number = sameType; //Error，类型不一致
```

我们前文提到$函数的行为依赖于它参数的类型。到目前为止，我们的jQueryStatic只捕捉了这样的行为：当接收字符串参数的时候返回一个JQuery对象.为了丰富它的行为，TypeScript支持在对象类型中重载函数签名。举个例子，我们可以添加一个额外的调用签名到JQueryStatic接口
```typescript
(ready: ()=>any): any
```
这一签名表示$函数可以接收一个函数.事实上，在jQuery库中，当$接收到一个函数的时候,jQuery将在DocumentContentReady时间发生时，调用这个函数。因为TypeScript支持重载,工具可以使用TypeScript来显示所有的函数签名以及文档提示，在相关签名被调用时给出正确的文档。
(TypeScript通过这种给变量“划重点”的方式使得在使用IDE等开发工具时对开发者十分友好，只需要提供表述类型信息的第三方库的d.ts文件，IDE就能实现智能提示)
![](https://github.com/Microsoft/TypeScript/raw/master/doc/images/image2.png)

## 1.4 结构化子类型 （Structural Subtyping）
对象类型都是通过结构化的方式来比较的。比如，在下边的代码片段中，CPoint包含了Point所要求的所有属性，所以CPoint被认为是满足Point接口的。一个类可以选择性地声明它实现了一个接口，编译器会检查声明的结构兼容性。这个例子也表明一个对象类型也可能与一个对象字面量所被推导的类型匹配，只要对象字面量提供了所有这个对象类型要求的成员。
```typescript
interface Point {  
    x: number;  
    y: number;  
}

function getX(p: Point) {  
    return p.x;  
}

class CPoint {  
    x: number;  
    y: number;  
    constructor(x: number,  y: number) {  
        this.x = x;  
        this.y = y;  
    }  
}

getX(new CPoint(0, 0));  // Ok, 字段吻合

getX({ x: 0, y: 0, color: "red" });  // 有额外字段也OK

getX({ x: 0 });  // Error，缺了y
```

Section 3.11将详细介绍类型匹配的内容。


## 1.5基于上下文的类型推导(Contextual Typing)
一般来说，TypeScript类型系统通过自底而上的方式来进行类型推导：从表达式树的叶子节点到根部。下边的例子中，TypeScript将通过从return表达式自底而上地推导出mul的返回类型为number类型。

```typescript
function mul(a: number, b: number) {  
    return a * b;  
}
```
对于没有类型注解的变量和参数，TypeScript推导为any类型。这种自底而上的方法给程序员提供了一个关于类型信息的直观感觉。
然而在一些信息有限的上下文中，类型推导将自顶而下地进行。当这种自顶而下的推导过程发生的时候，这时我们就称这样的推导为上下文推导。当程序员正在使用一种类型却不知道所有的类型细节时，上下文类型推导帮助工具提供信息。比如在上边的jQuery例子中，程序员给jQuery get方法提供了一个函数表达式作为第二个参数,在类型推导过程中工具可以假定这个函数表达式的类型正如get方法的函数签名中一样从而提供一个包含相应参数和类型的提示模板。
```typescript
$.get("http://mysite.org/divContent",  
      function (data) {  
          $("div").text(data);  // TypeScript infers data is a string  
      }  
);
```
上下文类型推导同样对写字面量对象很有帮助。当程序员写对象字面量的时候，上下文类型推导将提供对象成员自动提示的相关信息。
Section 4.23提供了更多关于基于上下文类型的信息。


## 1.6 类（Classes）
Javascript实践中有两种非常普遍的设计模式，模块模式和类模式。粗略来讲，模块模式使用闭包来隐藏名字，封装私有变量，而类模式使用原型链来实现不同的面向对象继承机制，正如prototype.js等类库的实现。TypeScript的名称空间(Namespace)是模块模式的形式化。(模块模式这个术语从某种意义上来说是不幸的，因为ECMAScript 2015正式支持了模块，而这种支持方式和模块模式大相径庭。因此ECMAScript 2015使用名称空间这一术语。)

这一节以及名称空间的章节将会展示在生成与ES3或ES5等标准兼容的代码时，TypeScript是如何将类和名称空间等新特性转换为一致的Javascript方言。TypeScript的转码目标在于精确地模拟程序员原来在无需工具辅助情况下实现类和名称空间的过程。这一部分还将讲解TypeScript如何为每一个类声明推导类型。下边我们从一个简单的BankAccount 类开始。
```TypeScript
class BankAccount {  
    balance = 0;  
    deposit(credit: number) {  
        this.balance += credit;  
        return this.balance;  
    }  
}
```
这个类将转换为下边的Javascript代码
```javascript
var BankAccount = (function () {  
    function BankAccount() {  
        this.balance = 0;  
    }  
    BankAccount.prototype.deposit = function(credit) {  
        this.balance += credit;  
        return this.balance;  
    };  
    return BankAccount;  
})();
```
这一TypeScript类声明创建了一个叫做BankAcount的变量(匿名函数里边的那个函数声明)，它的值就是BankAccount实例的构造函数。这一声明同时创建了一个具有同样名字的实例类型(匿名函数调用外部的那个变量)。如果我们将这个类型写成一个接口那么它看起来像下边这样:
```TypeScript
interface BankAccount {  
    balance: number;  
    deposit(credit: number): number;  
}
```
如果我们要写出BankAccount构造函数的函数类型，那么将是下边的形式:
```TypeScript
var BankAccount: new() => BankAccount;
```
这个函数签名使用new前缀开始的，表明BankAccount函数必须被当做一个构造函数来调用。一个函数类型可以同时具有调用签名和构造器签名。比如Javascript內建的Date对象同时包含这样的两种签名。


如果我们想要开启我们的银行账户(Bank Account)，里边带有一定的存款(balance),我们可以给BankAccount类加一个构造器声明:
```TypeScript
class BankAccount {  
    balance: number;  
    constructor(initially: number) {  
        this.balance = initially;  
    }  
    deposit(credit: number) {  
        this.balance += credit;  
        return this.balance;  
    }  
}
```
这一版本的BankAccount要求我们引入一个构造器参数，然后将它赋值为balance字段.为了简化这一通用情况,TypeScript接收下边的短语法:
```TypeScript
class BankAccount {  
    constructor(public balance: number) {  
    }  
    deposit(credit: number) {  
        this.balance += credit;  
        return this.balance;  
    }  
}
```
public关键字表示构造器参数将被保留为一个内部字段。Public是类成员的默认访问权限,但程序员可以根据自己的需要指定private或者protected访问权限。访问权限是类设计期间的限制，这种限制是在静态类型检查的过程中实施的，而不是运行时。

TypeScript类也支持继承，如下例子：
```TypeScript
class CheckingAccount extends BankAccount {  
    constructor(balance: number) {  
        super(balance);  
    }  
    writeCheck(debit: number) {  
        this.balance -= debit;  
    }  
}
```
在这个例子中，CheckingAccount从类BankAccount继承。CheckingAccount的构造函数通过super关键字调用了父亲类BankAccount的构造函数。在生成的Javascript代码中，CheckingAccount的prototype将被链向BankAccount的prototype(即CheckingAccount.prototype.__proto__===BankAccount.prototype)。

TypeScript类也可以指定静态成员，静态成员将变成类构造函数的属性。

Section 8提供了class的更多信息。


## 1.7 枚举(Enum)类型
TypeScript 允许程序员将一系列的数字常量作为一个枚举类型。下边的例子创建了一个枚举类型，表示计算器程序中的操作符:
```TypeScript
const enum Operator {  
    ADD,  
    DIV,  
    MUL,  
    SUB  
}

function compute(op: Operator, a: number, b: number) {  
    console.log("the operator is" + Operator[op]);  
    // ...  
}
```
在这个例子中，compute函数打印operator op，这使用了enum类型的一个特性,反向从枚举的值映射到对应的字符串表示.比如，Operator的声明自动地为枚举值分配了数字，从0开始。第9部分将讲解程序员如何显式地给枚举成员分配数字，以及使用任意字符串来命名该枚举值。
当枚举是用const标识符来声明的时候,TypeScript编译器将对应enum成员作为Javascript中的常量来处理(如直接在使用对应枚举的地方换成对应的常量)。这在很多Javascript引擎都将提升性能。

比如，compute函数也许包含了一个如下的switch表达式,
```TypeScript
switch (op) {  
    case Operator.ADD:  
        // execute add  
        break;  
    case Operator.DIV:  
        // execute div  
        break;  
    // ...  
}
```
对于这个switch表达式,编译器将生成如下代码:
```TypeScript
switch (op) {  
    case 0 /* Operator.ADD */:  
        // execute add  
        break;  
    case 1 /* Operator.DIV */:  
        // execute div  
        break;  
    // ...  
}
```
JavaScript实现可以根据这样的显式设定常量的代码来为这个switch语句生成更高效地底层代码，比如说根据case的值的创建一个跳跃表。


## 1.8 重载字符串参数
TypeScript的一个重要目标就是要为现有的Javascript编程模式提供准确直观的类型系统。因而,TypeScript引入了generic类型(泛型),这将在下一节讲解。这一节的主题是重载字符串参数。

Javascript编程接口经常包含那些接收一个字符串参数并且函数行为受该参数影响的函数。DOM重度地使用了这种编程模式。比如下边的截屏显示了document的createElement方法有好几个签名,其中一些签名根据输入的字符串参数来指定返回的类型。 

![](https://github.com/Microsoft/TypeScript/raw/master/doc/images/image3.png)

以下的代码片段使用了这一特性。因为span变量被推导为HTMLSpanElement类型,下边的代码可以引用span的isMultiline属性而不会报任何的静态类型检查错误。
```TypeScript
var span = document.createElement("span");  
span.isMultiLine = false;  // OK: HTMLSpanElement has isMultiline property
```
下边的截图中,编程工具结合了字符串参数重载和上下文类型识别的技术来推导变量e的类型是MouseEvent,从而认为e有一个clientX属性。

![](https://github.com/Microsoft/TypeScript/raw/master/doc/images/image4.png)

Section 3.9.2.4 提供了在签名中使用字符串字面量的相关信息。

## 1.9 泛型
正如字符串重载,泛型使得TypeScript更精确地捕捉了Javascript类库的行为。因为他们使得类型信息从客户代码流动到库代码中再回流至客户代码。泛型编程将比任何的其他TypeScript工具更能支持丰富的API的描述。

为了说明这一点,让我们来看看TypeScript对内置的Javascript数组的接口。你可以从TypeScript发行版附带的lib.d.ts文件中找到下边的接口描述.
```TypeScript
interface Array<T> {  
    reverse(): T[];  
    sort(compareFn?: (a: T, b: T) => number): T[];  
    // ...   
}
```
如上,接口的定义可以拥有一个或多个类型参数.在这个例子中,Array 接口有一个参数T,这表示了数组的元素类型。reverse方法返回了一个具有同样类型的数组。sort方法接收一个可选地参数,compareFn,这个参数是一个比较两个T类型参数并返回一个数字的函数。最后,sort返回了一个T类型的数组。

函数同样也可以有泛型参数。举个栗子,数组接口包含了一个map方法,如下定义:
```TypeScript
map<U>(func: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
```
map方法当在T类型的数组上执行时,将对数组内每一个元素应用func函数,返回一个U类型的值。
TypeScript编译器经常推导泛型方法参数,使得程序员无需显式地提供他们。在下边的例子中,编译器将map 方法的参数U推导为string,因为被传入map的方法返回了一个string类型.
```TypeScript
function numberToString(a: number[]) {  
    var stringArray = a.map(v => v.toString());  
    return stringArray;  
}
```
在这个例子中编译器认为numberToString函数返回了一个字符串数组。
在TypeScript,类可以有类型参数。下边的代码声明了一个类来实现类型T的链表。这个代码展示了程序员如何限制类型参数来扩展一个具体类型。在这个例子中,链表中的元素必须实现NamedItem接口。这使得程序员能够实现log方法来打印每个元素的名字。

```TypeScript
interface NamedItem {  
    name: string;  
}

class List<T extends NamedItem> {  
    next: List<T> = null;

    constructor(public item: T) {  
    }

    insertAfter(item: T) {  
        var temp = this.next;  
        this.next = new List(item);  
        this.next.next = temp;  
    }

    log() {  
        console.log(this.item.name);  
    }

    // ...  
}
```
3.7小节将阐述更多关于泛型的内容。

## 1.10 名称空间(Namespace)
类和接口提供了分离组件接口和实现的机制来支持大规模JavaScript应用开发项目。TypeScript在设计阶段完成了实现的封装(通过限制私有或protected成员的使用),这种封装并不能延续到运行时，因为运行时所有对象的属性都是可以被访问的。未来版本的Javascript或许会提供私有名称来确保运行时阶段的数据封装性。

在Javascript中，最常用来实现数据封装的设计模式就是模块模式。这种模块模式使用了闭包，划分了组建与组件之间的界限，提供了一种可以组织的结构和动态加载的能力，是一种自然而然的模块实现方式。模块模式也提供了引入命名空间的能力,避免了全局命名空间的滥用。

下边的代码阐述了Javascript模块模式:
```TypeScript
(function(exports) {  
    var key = generateSecretKey();  
    function sendMessage(message) {  
        sendSecureMessage(message, key);  
    }  
    exports.sendMessage = sendMessage;  
})(MessageModule);
```
这个例子展现了两个模块模式的基本要素:模块闭包和模块对象。模块闭包就是一个封装了模块实现的函数,所谓的实现指的是这个例子中key变量和sendMessage方法。模块对象包含了输出变量和输出方法。简单的模块可以创建一个模块对象。上边的模块将模块对象作为参数exports,将sendMessage方法加入到模块对象中。这种参数方式简化了动态加载模块的过程，并且支持将模块代码拆分到多个文件。

这个例子假设了外部的作用域定义了函数generateSecretKey和sendSecureMessage。它也假设外部作用域将模块对象舍弟你搞为MessageModule。
TypeScript 命名空间提供了一种机制简洁地表达了这样的模块模式。在TypeScript,程序员可以将模块模式和类模式组合起来，即将名称空间和类嵌套。
下边的例子展示了名称空间的简单实用。
```TypeScript
namespace M {  
    var s = "hello";  
    export function f() {  
        return s;  
    }  
}

M.f();  
M.s;  // Error, s is not exported
```
这个例子中variable是一个名称空间的私有变量,函数f 从namespace export到外部。对于接口和变量在名称空间的使用情况,看如下例子:
```TypeScript
interface M {  
    f(): string;  
}

var M: M;
```
接口M汇总了名称空间M的外部可见的行为。这个例子中，我们用与接口同样的名字来初始化变量,因为在TypeScript中类型名字和变量名字并不冲突。每个作用域包含了一个变量声明空间和一个类型声明空间(详细内容查看2.3节)。

TypeScript编译器为这个名称空间输出下边的Javascript代码:
```javascript
var M;  
(function(M) {  
    var s = "hello";  
    function f() {  
        return s;  
    }  
    M.f = f;  
})(M || (M = {}));
```
这个例子中编译器假设名称空间存在于全局作用域的变量M下，变量M可能被初始化也可能未被初始化。

## 1.11 模块
TypeScript也支持ECMAScript 2015的模块定义。ES2015的模块就是一系列包含高层export和import语句的JS文件。对于这类模块,TypeScript编译器可以生成ES2015兼容代码或更低版本的ES标准兼容代码，适用于各种各样的模块加载系统,如CommonJS,AMD，UMD模块规范系统等。


# 2 基础

























