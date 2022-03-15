# lc题解

390. Elimination Game

与约瑟夫环问题类似，本题也可以通常找规律，分析出公式之后进行递推求解。

定义$f[n]$为在序列$[1,2,3,\cdots,n]$中进行从左到右的间隔删除，最终左边剩余的数字，定义$f'(n)$为在连续序列$[1,2,3,\cdots,n]$中进行从右到左的间隔删除，最终左边剩余的数字。

这两个过程具有对称性，两者最终剩余的编号在连续序列中也具有对称性，有
$$
f(n) + f'(n)=n+1
$$
考虑左右轮流删除的过程，

在对连续序列进行了一次从左往右的删除之后，得到的序列为$[2,4,6,\cdots,x](x=n 或n-1)$，新序列的长度为$\left \lfloor \cfrac{n}{2}\right \rfloor$。

考虑对得到的序列进行重新编号，变为$1,2,3,\cdots,\left \lfloor \cfrac{n}{2}\right \rfloor$，然后执行从右往左的间隔删除，最终得到$f'(\left \lfloor \cfrac{n}{2}\right \rfloor)$，然后将其映射回去，有
$$
f(n)=f'(\lfloor \cfrac{n}{2}\rfloor) * 2
$$
综合以上两个公式，可以得到
$$
f(n)=2*( \lfloor \cfrac{n}{2} \rfloor+1 - f'( \lfloor \cfrac{n}{2} \rfloor))
$$


546.Remove Boxes

方法一：动态规划（bottom up）

 $f(i,j,k)$表示区间`[i,j]`右边有k个与`b[j]`同色的盒子待匹配，区间`[i,j]`消除后得到的最大分数

如果区间长度为1，则
$$
f(i,j,k) = f(i,j-1,0)+(k-1)^2
$$

$$
f(i,j,k)=max_{i\le u \lt j,\ and\ b[u]==b[j]}f(i,u,k+1)+f(u+1,j-1,0)
$$

730. 统计不同回文子序列

设$f[i][j]$表示字符串$s=[s_1,s_2,\cdots,s_n]$从$i$到$j$的不同回文子序列数目
$$
f[i,j]=\left \{\begin{align*}
& \left \{ \begin{aligned} &f[i+1][j-1]\times2+2, &\text{$s_i$ not in $s[s_{i+1},\cdots,s_{j-1}]$}\\ &f[i+1][j-1]\times 2+1,&\text{count($s[s_{i+1},\cdots,s_{j-1}]$, $s_i$)==1}\\&f[i+1][j-1]\times2-f[l+1][r-1],&\text{$l,r$ is the first/last pos of $s[i]$ in $s[s_{i+1},\cdots,s_{j-1}]$}\end{aligned}\right., &s_i=s_j \\
& f[i+1][j] + f[i][j-1] - f[i][j],&s_i\ne s_j
\end{align*}
\right.
$$



2121. 相同元素的间隔之和

保存每一个相同元素的所有序号，设$x$对应的序号序列从小到大为$indice(x)=[a_1,a_2,a_3,\cdots,a_n]$

对于其中一个序号$a_i$,间隔之和为
$$
\begin{align*}
\sum_{j=1}^{n}|a_i-a_j|
&=\sum_{j=1}^{n}(a_i-a_j)-2\sum_{j=i+1}^{n}(a_i-a_j)\\
&=n\times a_i-\sum_{j=1}^{n}a_j-2\times (n-i) \times a_i+2\times\sum_{j=i+1}^{n}a_j\\
&=(2i - n)\times a_i-\sum_{j=1}^{n}a_j + 2\sum_{j=i+1}^{n}a_j
\end{align*}
$$

2122. 还原原数组

记原始数组为$arr=[arr_0,\cdots,arr_{(n-1)/2}]$

将lower和higher拼接打乱得到的数组记为$a=[ a_0, a_1, a_3,\cdots, a_{n-1}]$，数组的长度为$n$

为了后面的所作的处理，需要先将数组$a$排序。如果我们将数组$arr$也排序，那么数组$a$中的第一个元素一定是$lower[0]=arr[0]-k$，之后，可以枚举数组中的每个元素作为对应的$higher[0]$，有$higher[0]=arr[0]+k$可求出$k$。

如何验证每次枚举的$k$是否正确呢，题目中给出的数据范围是1000,所以如果用$O(n^2)$的复杂度来验证每次枚举得到的$k$是否存在一个有效的$arr$数组对应，是无法通过的。我们需要使用双指针来加速这个过程。

假设，枚举到$a[i]$，有$k=(a[i] - a[0])/2$， 因为我们假定$arr$排序过，所以$lower$数组也是有序的，$lower[1]=arr[1]-k$必定在$lower[0]$之后，因此只需要移动到0的下一个位置就是$lower[1]$，同理也可以知道$higher[1]$也在$i$指针的后面。于是，我们可以验证$arr[i+1]==arr[1]$是否成立，如果成立，则验证下一对数。每次都可以验证一对$a$中的的元素,最后如果全部符合差值为$2*k$，则该方案就是一个可行解。我们用指针$left,right$来记录每次验证的两组数的下标，需要注意的是$left,right$需要跳过已经验证的数，这个可以使用一个hash表来标记。



```cpp
class Solution {
public:
    vector<int> recoverArray(vector<int>& nums) {
        const int n = nums.size();
        sort(nums.begin(), nums.end());
        for (int i = 1; i < n; ++i) {
            if ((nums[i] - nums[0]) % 2 != 0 || nums[i] == nums[0]) {
                continue;
            }
            vector<int> ans;
            vector<int> used(n, 0);
            int k = (nums[i] - nums[0]) / 2;
            ans.push_back(nums[0] + k);
            used[0] = used[i] = 1;
            int left = 0, right = i;
            for (int j = 2; j + j <= n; ++j) {
                while (used[left]) ++left;
                while (right < n && used[right] || right < n && nums[right] - 2 * k != nums[left]) ++right;
                if (right == n) break;
                ans.push_back(nums[left] + k);
                used[left] = used[right] = 1;
            }
            if (ans.size() == n / 2) return ans;
            else ans.clear();
        }
        return {};
    }
};
```

913. 猫和老鼠

方法一：动态规划

此题老鼠和猫轮流移动，老鼠和猫都按照最优策略进行移动。

设$f(i,j,k)$表示老鼠在$i$位置猫在$j$位置进行了了$k$轮的游戏结果，那么$f(i,j,k)$取决于$k+1$的结果，如果$k+1$是偶数，那么是老鼠移动，否则是猫移动，这两者都会从选择$k+1$的最优游戏结果即$f(k+1,i',j')$，优先选择自己胜利的结果，其次是平局，否则是输。

考虑$k$应该在什么范围内，首先比较容易想到的是一个宽松的上界$k<=2n^2$（老鼠有n个位置，猫有n个位置，两者可以交换位置，即$\binom{1}{2}\times n\times n $）。但是有一个更严格的上界$k<=2n$，没有想到严格证明

```c++
class Solution {
public:
    int catMouseGame(vector<vector<int>>& graph) {
        const int n = graph.size();
        vector<vector<vector<int>>> f(2 * n + 2, vector<vector<int>>(n, vector<int>(n, -1)));
        function<int(int , int, int)> dp = [&](int k, int i, int j) {
            if (k > 2 * n) return 0;
            if (f[k][i][j] != -1) return f[k][i][j];
            if (i == 0) return f[k][i][j] = 1;
            if (i == j) return f[k][i][j] = 2;
            bool win = false, draw = false;
            if (k % 2 == 0) {//mouse move
                for (int u: graph[i]) {
                    int ret = dp(k + 1, u, j);
                    if (ret == 1) win = true;
                    else if (ret == 0) draw = true;
                    if (win) break;
                }
                if (win) f[k][i][j] = 1;
                else if (draw) f[k][i][j] = 0;
                else f[k][i][j] = 2;
            }else {//cat move
                for (int u: graph[j]) {
                    if (u == 0) continue;
                    int ret = dp(k + 1, i, u);
                    if (ret == 2) win = true;
                    else if (ret == 0) draw = true;
                    if (win) break;
                }
                if (win) f[k][i][j] = 2;
                else if (draw) f[k][i][j] = 0;
                else f[k][i][j] = 1;
            }
            return f[k][i][j];
        };
        return dp(0, 1, 2);
    }
};
```

