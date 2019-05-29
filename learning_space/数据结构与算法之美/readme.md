# 数据结构与算法之美

- [复杂度分析](#complexity)

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


均摊时间复杂度
