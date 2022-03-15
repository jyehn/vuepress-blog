





## 树与图的深度优先遍历

- acwing846 树的重心

1. 当去掉二叉树中的一个结点后，树一定被分为至多三个连通块，左子树、右子树、以及除了该结点和它的子树之外的所有结点。如果是树， 同理可以得到所有的联通块是所有的子树，以及除了以该结点为根结点的树。

2. 此题的树的输入是无向边，因此在搜索的时候，为了避免搜索子树的时候又回到父亲结点，因此要标记搜索过的结点

```cpp
#include <cstdio>
#include <cstring>
#include <algorithm>
using namespace std;
const int N = 1e5 + 10, M = 2 * N;
int h[N], e[M], nxt[M], idx = 0;
bool st[N];
void add(int a, int b) {
    e[idx] = b;
    nxt[idx] = h[a];
    h[a] = idx++;
}
int res = N, n;
int dfs(int u) {
    st[u] = true;
    int sum = 0, sz = 0;
    for (int i = h[u]; i != -1; i = nxt[i]) {
        int v = e[i];
        if (st[v]) continue;
        int s = dfs(v);
        sz = max(sz, s);
        sum += s;
    }
    sz = max(sz, n - sum - 1);
    res = min(res, sz);
    return sum + 1;
}
int main() {
    memset(h, -1, sizeof h);
    scanf("%d", &n);
    for (int i = 0; i < n - 1; ++i) {
        int a, b;
        scanf("%d%d", &a, &b);
        add(a, b);add(b, a);
    }
    dfs(1);
    printf("%d\n", res);
    return 0;
}
```

## 树与图的广度优先遍历

- acwing847 图中点的层次

```cpp
#include <cstdio>
#include <cstring>
#include <algorithm>
#include <queue>
using namespace std;
const int N = 1e5 + 10, M = 2 * N;
int h[N], e[M], nxt[M], idx = 0;
int n, m;
int d[N];
void add(int a, int b) {
    e[idx] = b;
    nxt[idx] = h[a];
    h[a] = idx++;
}
int bfs() {
    queue<int> q;
    d[1] = 0;
    q.push(1);
    while (!q.empty()) {
        int cur = q.front();
        q.pop();
        for (int i = h[cur]; i != -1; i = nxt[i]) {
            int j = e[i];
            if (d[j] == -1) {
                q.push(j);
                d[j] = d[cur] + 1;
            }
        }
    }
    return d[n];
}
int main() {
    memset(h, -1, sizeof h);
    memset(d, -1, sizeof d);
    scanf("%d%d", &n, &m);
    for (int i = 0; i < m; ++i) {
        int a, b;
        scanf("%d%d", &a, &b);
        add(a, b);
    }
    printf("%d", bfs());
    return 0;
}
```

## 拓扑排序

- acwing848 有向图的拓扑排序

```cpp
#include <cstdio>
#include <cstring>
#include <algorithm>
using namespace std;
const int N = 1e5 + 10, M = 2 * N;
int h[N], e[M], nxt[M], idx = 0;
int q[N];
int d[N];
int n, m;
void add(int a, int b) {
    e[idx] = b, nxt[idx] = h[a],h[a] = idx++;
}
bool topSort() {
    int he = 0, ta = -1;
    for (int i = 1; i <= n; ++i) {
        if (d[i] == 0)
            q[++ta] = i;
    }
    while (he <= ta) {
        int t = q[he++];
        for (int i = h[t]; i != -1; i = nxt[i]) {
            int b = e[i];
            if (--d[b] == 0)
                q[++ta] = b;
        }
    }
    return ta == n - 1;
}
int main() {
    memset(h, -1, sizeof h);
    scanf("%d%d", &n, &m);
    for (int i = 0; i < m; ++i) {
        int a, b;
        scanf("%d%d", &a, &b);
        add(a, b);
        d[b]++;
    }
    if (!topSort()) puts("-1");
    else {
        for (int i = 0; i < n; ++i) printf("%d ", q[i]);
        puts("");
    }
    return 0;
}
```

## Dijkstra

- acwing 849 Dijkstra求最短路I

```cpp
#include <cstdio>
#include <cstring>
#include <algorithm>
using namespace std;
const int N = 510, M = 1e5 + 10;
const int INF = 0x3f3f3f3f;
int h[N], e[M], nxt[M], idx = 0;
int w[M];
bool vis[N];
int d[N];
int n, m;
void add(int a, int b, int c) {
    e[idx] = b, nxt[idx] = h[a], w[idx] = c, h[a] = idx++;
}
bool dijkstra(int st, int ed) {
    memset(d, INF, sizeof d);
    d[st] = 0;
    for (int i = 0; i < n - 1; ++i) {
        int u = -1;
        for (int j = 1; j <= n; ++j) {
            if (!vis[j] && (u == -1 || d[j] < d[u]))
                u = j;
        }
        vis[u] = true;
        for (int j = h[u]; j != -1; j = nxt[j]) {
            int v = e[j];
            if (!vis[v] && d[u] + w[j] < d[v])
                d[v] = d[u] + w[j];
        }
    }
    if (d[ed] >= INF / 2) return false;
    return true;
}
int main() {
    memset(h, -1, sizeof h);
    scanf("%d%d", &n, &m);
    for (int i = 0; i < m; ++i) {
        int a, b, c;
        scanf("%d%d%d", &a, &b, &c);
        add(a, b, c);
    }
    if (dijkstra(1, n)) printf("%d\n", d[n]);
    else puts("-1");
    return 0;
}
```

- acwing 850 Dijkstra求最短路II

```cpp
#include <cstdio>
#include <cstring>
#include <queue>
using namespace std;
#define x first
#define y second
typedef pair<int, int> PII;
const int N = 1e5 + 10, M = 2 * N;
const int INF = 0x3f3f3f3f;
int h[N], e[M], w[M], nxt[M], idx = 0;
int n, m;
bool st[N];
int dis[N];
void add(int a, int b, int c) {
    e[idx] = b, w[idx] = c, nxt[idx] = h[a], h[a] = idx++;
}
bool dijkstra() {
    memset(dis, INF, sizeof dis);
    dis[1] = 0;
    priority_queue<PII, vector<PII>, greater<PII>> heap;
    heap.push({0, 1});
    while (!heap.empty()) {
        auto t = heap.top();
        heap.pop();
        int distance = t.x, u = t.y;
        if (st[u]) continue;
        st[u] = true;
        for (int i = h[u]; i != -1; i = nxt[i]) {
            int j = e[i];
            if (distance + w[i] < dis[j]) {
                dis[j] = distance + w[i];
                heap.push({dis[j], j});
            }
        }
    }
    if (dis[n] == INF) return false;
    return true;
}
int main() {
    memset(h, -1, sizeof h);
    scanf("%d%d", &n, &m);
    for (int i = 0; i < m; ++i) {
        int a, b, c;
        scanf("%d%d%d", &a, &b, &c);
        add(a, b, c);
    }
    if (dijkstra()) printf("%d", dis[n]);
    else puts("-1");
    return 0;
}
```

## bellman-ford

- acwing 853 有边数限制的最短路

```cpp
```

## spfa 

