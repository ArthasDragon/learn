# 数据结构与算法之美

- [复杂度分析](#complexity)
- [数组](#array)
- [链表](#linkedList)
- [栈](#stack)
- [队列](#queue)
- [递归](#recursion)

<h1 id="complexity">复杂度分析</h1>

## 大 O 复杂度表示法

T(n) = O(f(n))

- T(n) 代码执行时间
- n 数据规模的大小
- f(n) 每行代码执行的次数总和

> 大 O 时间复杂度实际上并不具体表示代码真正的执行时间， 而是表示代码执行时间随数据规模增长的变化趋势， 所以， 也叫作渐进时间复杂度， 简称时间复杂度。 

## 时间复杂度分析

三个比较实用的方法

1. 只关注循环执行次数最多的一段代码
2. 加法法则： 总复杂度等于量级最大的那段代码的复杂度
3. 乘法法则： 嵌套代码的复杂度等于嵌套内外的代码复杂度的乘积

![magnitude](./imgs/magnitude.png)

分为多项式量级和非多项式量级（O(2<sup>n</sup>)、 O(n<sup>2</sup>)）

### O(logn)

> 因为对数之间可以相互转换， 所以统一用 logn 表示

```javascript
i = 1;
while (i <= n) {
    i = i * 2;
}
```

### O(m+n)， O(m\*n)

## 空间复杂度分析

> 又叫渐进空间复杂度，表示算法的存储空间与数据规模之间的增长关系。

常见空间复杂度：O(1)，O(n)，O(n<sup>2</sup>)

## 最好、最坏、平均、均摊时间复杂度

```javascript
  // n 表示数组 array 的长度
  int find(int[] array, int n, int x) {
    int i = 0;
    int pos = -1;
    for (; i < n; ++i) {
      if (array[i] == x) {
        pos = i;
        break;
      }
    }
    return pos;
  }
```

> 最好最坏复杂度意义不大：最好情况时间复杂度：O(1)、最坏情况时间复杂度：O(n)

平均情况时间复杂度（加权平均时间复杂度）

![averageComplexity](./imgs/averageComplexity.png)


均摊时间复杂度 （摊还分析法）

![desc1](./imgs/desc1.png)

<h1 id="array">数组</h1>

> 数组是一种线性表数据结构。它用一组连续的内存空间，来存储一组具有相同类型的数据。

线性表（只有简单的前后关系）

![linearList](./imgs/linearList.png)

非线性表（不只有简单的前后关系喽）

![noLinearList](./imgs/noLinearList.png)

当计算机需要访问数组中的某个元素时，它会首先通过寻址公式，计算出该元素存储的内存地址。

```javascript
  a[i]_address = base_address + i * data_type_size
```

根据下标随机访问的时间复杂度是O(1)

## 低效的插入和删除

插入操作：

> 如果要向有序数组第 k 个位置插入一个数据，需要将之后的数据依次后移一位，平均情况时间复杂度为O(n)
> 
> 如果数组无序，可以将原来第 k 个位置的元素放到末尾，新元素放到第 k 个位置即可。

删除操作：

> 如果要删除数组第 k 个位置的数据，需要将之后的数据依次前移一位，平均情况时间复杂度为O(n)

## 警惕数组的访问越界问题

> c语言中下标越界仍然可以访问到该地址所对应的数据！

## 容器能否完全替代数组？

个人认为，ArrayList最大的优势是可以将很多数组操作的细节封装起来。还有一个优势是动态扩容。

直接使用数组的几种情况

![useArray](./imgs/useArray.png)

总结一下，对于业务开发，直接使用容器就足够了，省时省力。毕竟损耗一丢丢性能，完全不会影响到系统整体的性能。但如果你是做一些非常底层的开发，比如开发网络框架，性能的优化需要做到极致，这个时候数组就会优于容器，成为首选。

## 为什么下标从0开始

从数组存储的内存模型上来看，“下标”最确切的定义应该是“偏移（offset）”。前面也讲到，如果用 a 来表示数组的首地址，a[0] 就是偏移为 0 的位置，也就是首地址，a[k] 就表示偏移 k 个 type_size 的位置，所以计算 a[k] 的内存地址只需要用这个公式：

```
  a[k]_address = base_address + k * type_size
```

但是，如果数组从 1 开始计数，那我们计算数组元素 a[k] 的内存地址就会变为：

```
  a[k]_address = base_address + (k-1)*type_size
```

每次随机访问数组元素都多了一次减法运算，对于CPU来说就是多了一次减法指令。

> 不过我认为，上面解释得再多其实都算不上压倒性的证明，说数组起始编号非 0 开始不可。所以我觉得最主要的原因可能是历史原因。

> 实际上，很多语言中数组也并不是从 0 开始计数的，比如 Matlab。甚至还有一些语言支持负数下标，比如 Python。

<h1 id="linkedList">链表</h1>

LRU 缓存淘汰算法

> 缓存的大小有限，当缓存被用满时，哪些数据应该被清理出去，哪些数据应该被保留？这就需要缓存淘汰策略来决定。常见的策略有三种：先进先出策略 FIFO（First In，First Out）、最少使用策略 LFU（Least Frequently Used）、最近最少使用策略 LRU（Least Recently Used）。

## 五花八门的链表结构

数组与链表的区别

> 底层的存储结构

从图中可以看到，数组需要一块连续的内存空间来存储，对内存的要求比较高。如果我们申请一个 100MB 大小的数组，当内存中没有连续的、足够大的存储空间时，即便内存的剩余总可用空间大于 100MB，仍然会申请失败。

而链表恰恰相反，它并不需要一块连续的内存空间，它通过“指针”将一组零散的内存块串联起来使用，所以如果我们申请的是 100MB 大小的链表，根本不会有问题。

![array&linkedList](./imgs/array&linkedList.png)

三种最常见的链表结构：单链表、双向链表、循环链表


### 单链表：

把内存块称为<strong>“结点”</strong>。为了将所有的结点串起来，每个链表的结点除了存储数据之外，还需要记录链上的下一个结点的地址。如图所示，我们把这个记录下个结点地址的指针叫作 <strong>后继指针 next</strong>

![singleLinkedList](./imgs/singleLinkedList.png)

第一个结点（头结点），最后一个结点（尾结点）比较特殊

其中，头结点用来记录链表的基地址。有了它，我们就可以遍历得到整条链表。而尾结点特殊的地方是：指针不是指向下一个结点，而是指向一个空地址 NULL，表示这是链表上最后一个结点。

在链表中插入和删除一个数据是非常快速的，我们只需要考虑相邻结点的指针改变，所以对应的时间复杂度是 O(1)。

![insAndDelLinkedList](./imgs/insAndDelLinkedList.png)

随机访问第 k 个元素没有数组高效，因为链表中的数据并非连续存储的，所以无法像数组那样，根据首地址和下标，通过寻址公式就能直接计算出对应的内存地址，而是需要根据指针一个结点一个结点地依次遍历，直到找到相应的结点，时间复杂度为 O(n)。

### 循环链表：

> 是一种特殊的单链表

![circularLinkedList](./imgs/circularLinkedList.png)

和单链表相比，循环链表的优点是从链尾到链头比较方便。当要处理的数据具有环型结构特点时，就特别适合采用循环链表。比如著名的[约瑟夫问题](https://zh.wikipedia.org/wiki/%E7%BA%A6%E7%91%9F%E5%A4%AB%E6%96%AF%E9%97%AE%E9%A2%98)。尽管用单链表也可以实现，但是用循环链表实现的话，代码就会简洁很多。

### 双向链表

![doubleLinkedList](./imgs/doubleLinkedList.png)

用空间换时间：

> 双向链表需要额外的两个空间来存储后继结点和前驱结点的地址。所以，如果存储同样多的数据，双向链表要比单链表占用更多的内存空间。虽然两个指针比较浪费存储空间，但可以支持双向遍历，这样也带来了双向链表操作的灵活性。


删除操作：

删除结点中“值等于某个给定值”的结点。

> 不管是单链表还是双向链表，为了查找到值等于给定值的结点，都需要从头结点开始一个一个依次遍历对比，直到找到值等于给定值的结点，然后再通过指针操作将其删除。时间复杂度 O(n)

删除给定指针指向的结点。

> 已经找到了要删除的结点，但是删除某个结点 q 需要知道其前驱结点，而单链表并不支持直接获取前驱结点，所以，还是要从头结点开始遍历链表。
> 
> 所以时间复杂度单链表 O(n)，双向链表 O(1)

同理要在链表的某个结点前面插入一个结点，单链表 O(n)，双向链表 O(1)。

如果是有序链表，双向链表的按值查询的效率也要比单链表高一些，因为可以记录上次位置和值进行比对决定向前或者向后查找。

### 双向循环链表

![doubleCircularLinkedList](./imgs/doubleCircularLinkedList.png)

### 链表 VS 数组性能比拼

![compareArrayLinkedList](./imgs/compareArrayLinkedList.png)

### 用链表实现 LRU 缓存淘汰算法

> 我的思路是这样的：我们维护一个有序单链表，越靠近链表尾部的结点是越早之前访问的。当有一个新的数据被访问时，我们从链表头开始顺序遍历链表。
> 
> 1. 如果此数据之前已经被缓存在链表中了，我们遍历得到这个数据对应的结点，并将其从原来的位置删除，然后再插入到链表的头部。
> 2. 如果此数据没有在缓存链表中，又可以分为两种情况：
> - 如果此时缓存未满，则将此结点直接插入到链表的头部；
> - 如果此时缓存已满，则链表尾结点删除，将新的数据结点插入链表的头部。

## 思考

如果字符串使用单链表储存的，如何判断是否为回文字符串。

## 如何轻松写出正确的链表代码

### 一、理解指针或引用的含义

### 二、警惕指针丢失和内存泄漏

删除链表结点时，也一定要记得手动释放内存空间（c语言）

### 三、利用哨兵简化实现难度

针对链表的插入、删除操作，需要对插入第一个结点和删除最后一个结点的情况进行特殊处理。

> 哨兵，解决的是国家之间的边界问题。同理，这里说的哨兵也是解决“边界问题”的，不直接参与业务逻辑。

如果我们引入哨兵结点，在任何时候，不管链表是不是空，head 指针都会一直指向这个哨兵结点。我们也把这种有哨兵结点的链表叫带头链表。相反，没有哨兵结点的链表就叫作不带头链表

带头链表

![headLinkedList](./imgs/headLinkedList.png)

### 四、重点留意边界条件处理

经常用来检查链表代码是否正确的边界条件有这样几个：

- 如果链表为空时，代码是否能正常工作？
- 如果链表只包含一个结点时，代码是否能正常工作？
- 如果链表只包含两个结点时，代码是否能正常工作？
- 代码逻辑在处理头结点和尾结点的时候，是否能正常工作？

### 五、举例画图，辅助思考

例如

![drawLinkedList](./imgs/drawLinkedList.png)

### 六、多写多练，没有捷径

精选了 5 个常见的链表操作。只要把这几个操作都能写熟练，不熟就多写几遍，之后再也不会害怕写链表代码。

- 单链表反转
- 链表中环的检测
- 两个有序的链表合并
- 删除链表倒数第 n 个结点
- 求链表的中间结点

<h1 id="stack">栈</h1>

> 类似放置一摞盘子，先进后出，后进先出。

![stack](./imgs/stack.png)

> 栈是一种“操作受限”的线性表，只允许在一端插入和删除数据。

当某个数据集合只涉及在一端插入和删除数据，并且满足后进先出、先进后出的特性，我们就应该首选“栈”这种数据结构。

实际上，栈既可以用数组来实现，也可以用链表来实现。用数组实现的栈，我们叫作 <strong>顺序栈</strong>，用链表实现的栈，我们叫作 <strong>链式栈</strong>

## 如何实现一个栈

```JAVA
  // 基于数组实现的顺序栈
public class ArrayStack {
  private String[] items;  // 数组
  private int count;       // 栈中元素个数
  private int n;           // 栈的大小

  // 初始化数组，申请一个大小为 n 的数组空间
  public ArrayStack(int n) {
    this.items = new String[n];
    this.n = n;
    this.count = 0;
  }

  // 入栈操作
  public boolean push(String item) {
    // 数组空间不够了，直接返回 false，入栈失败。
    if (count == n) return false;
    // 将 item 放到下标为 count 的位置，并且 count 加一
    items[count] = item;
    ++count;
    return true;
  }
  
  // 出栈操作
  public String pop() {
    // 栈为空，则直接返回 null
    if (count == 0) return null;
    // 返回下标为 count-1 的数组元素，并且栈中元素个数 count 减一
    String tmp = items[count-1];
    --count;
    return tmp;
  }
}

```

## 支持动态扩容的顺序栈

![activeStack](./imgs/activeStack.png)

![popComplexity](./imgs/popComplexity.png)

## 栈在函数调用的应用

函数调用栈

我们知道，操作系统给每个线程分配了一块独立的内存空间，这块内存被组织成“栈”这种结构, 用来存储函数调用时的临时变量。每进入一个函数，就会将临时变量作为一个栈帧入栈，当被调用函数执行完成，返回之后，将这个函数对应的栈帧出栈。为了更好地理解，我们一块来看下这段代码的执行过程。

```C++
int main() {
  int a = 1; 
  int ret = 0;
  int res = 0;
  ret = add(3, 5);
  res = a + ret;
  printf("%d", res);
  reuturn 0;
}

int add(int x, int y) {
  int sum = 0;
  sum = x + y;
  return sum;
}

```

在执行到 add() 函数时，函数调用栈的情况：

![addFuncStack](./imgs/addFuncStack.png)

## 栈在表达式求值中的应用

简单起见，分析运算表达式：3+5*8-6

实际上，编译器就是通过两个栈来实现的。其中一个保存操作数的栈，另一个是保存运算符的栈。我们从左向右遍历表达式，当遇到数字，我们就直接压入操作数栈；当遇到运算符，就与运算符栈的栈顶元素进行比较。

如果比运算符栈顶元素的优先级高，就将当前运算符压入栈；如果比运算符栈顶元素的优先级低或者相同，从运算符栈中取栈顶运算符，从操作数栈的栈顶取 2 个操作数，然后进行计算，再把计算完的结果压入操作数栈，继续比较。

![operationStack](./imgs/operationStack.png)

## 栈在括号匹配中的应用

## 实现浏览器中的前进后退功能

> 用两个栈就可以非常完美地解决这个问题

使用两个栈，X 和 Y，我们把首次浏览的页面依次压入栈 X，当点击后退按钮时，再依次从栈 X 中出栈，并将出栈的数据依次放入栈 Y。当我们点击前进按钮时，我们依次从栈 Y 中取出数据，放入栈 X 中。当栈 X 中没有数据时，那就说明没有页面可以继续后退浏览了。当栈 Y 中没有数据，那就说明没有页面可以点击前进按钮浏览了。

<h1 id="queue">队列</h1>

![queue](./imgs/queue.png)

> 队列跟栈一样，也是一种操作受限的线性表数据结构

## 顺序队列和链式队列

用数组实现的队列叫作顺序队列，用链表实现的队列叫做链式队列。


基于数组的队列实现方法

```java
  // 用数组实现的队列
public class ArrayQueue {
  // 数组：items，数组大小：n
  private String[] items;
  private int n = 0;
  // head 表示队头下标，tail 表示队尾下标
  private int head = 0;
  private int tail = 0;

  // 申请一个大小为 capacity 的数组
  public ArrayQueue(int capacity) {
    items = new String[capacity];
    n = capacity;
  }

    // 入队操作，将 item 放入队尾
  public boolean enqueue(String item) {
    // tail == n 表示队列末尾没有空间了
    if (tail == n) {
      // tail ==n && head==0，表示整个队列都占满了
      if (head == 0) return false;
      // 数据搬移
      for (int i = head; i < tail; ++i) {
        items[i-head] = items[i];
      }
      // 搬移完之后重新更新 head 和 tail
      tail -= head;
      head = 0;
    }
    
    items[tail] = item;
    ++tail;
    return true;
  }


  // 出队
  public String dequeue() {
    // 如果 head == tail 表示队列为空
    if (head == tail) return null;
    // 为了让其他语言的同学看的更加明确，把 -- 操作放到单独一行来写了
    String ret = items[head];
    ++head;
    return ret;
  }
}

```

基于链表的队列实现方法

![linkedQueue](./imgs/linkedQueue.png)

## 循环队列

> 要想写出没有bug的循环队列的实现代码，关键是确定好队空和队满的判定条件

队满时

![queueFull](./imgs/queueFull.png)

(tail+1) % n = head

当队列满时，图中的 tail 指向的位置实际上是没有存储数据的。所以，循环队列会浪费一个数组的存储空间。

```java
public class CircularQueue {
  // 数组：items，数组大小：n
  private String[] items;
  private int n = 0;
  // head 表示队头下标，tail 表示队尾下标
  private int head = 0;
  private int tail = 0;

  // 申请一个大小为 capacity 的数组
  public CircularQueue(int capacity) {
    items = new String[capacity];
    n = capacity;
  }

  // 入队
  public boolean enqueue(String item) {
    // 队列满了
    if ((tail + 1) % n == head) return false;
    items[tail] = item;
    tail = (tail + 1) % n;
    return true;
  }

  // 出队
  public String dequeue() {
    // 如果 head == tail 表示队列为空
    if (head == tail) return null;
    String ret = items[head];
    head = (head + 1) % n;
    return ret;
  }
}

```

## 阻塞队列和并发队列

> 阻塞队列其实就是在队列基础上增加了阻塞操作。简单来说，就是在队列为空的时候，从队头取数据会被阻塞。因为此时还没有数据可取，直到队列中有了数据才能返回；如果队列已经满了，那么插入数据的操作就会被阻塞，直到队列中有空闲位置后再插入数据，然后再返回。

生产者-消费者模型

![blockingQueue](./imgs/blockingQueue.png)

线程安全的队列我们叫作并发队列。最简单直接的实现方式是直接在 enqueue()、dequeue() 方法上加锁，但是锁粒度大并发度会比较低，同一时刻仅允许一个存或者取操作。实际上，基于数组的循环队列，利用 CAS 原子操作，可以实现非常高效的并发队列。这也是循环队列比链式队列应用更加广泛的原因。

## 线程池

实际上，对于大部分资源有限的场景，当没有空闲资源时，基本上都可以通过“队列”这种数据结构来实现请求排队。

<h1 id="recursion">递归</h1>

## 递归需要满足的三个条件

1. 一个问题的解可以分解为几个子问题的解
2. 这个问题与分解之后的子问题，除了数据规模不同，求解思路完全一样
3. 存在递归终止条件

## 如何编写递归代码

> 关键是写出递推公式，找到终止条件





