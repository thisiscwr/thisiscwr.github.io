
#include <iostream>
#include <cmath>
#include <cstring>
#include <vector>

using namespace std;
const int N = 202;

int dis[N][N];
int vts[1000000];

struct tmp
{
  int to;
  int next;
  int w;
  int t;
} tmps[1000000];

struct Edge
{
  int to;
  int next;
  int w;
} e[1000000];

int cnt = 0;
int head[N];
void addEdge(int u, int v, int w)
{
  cnt++;
  e[cnt].to = v;
  e[cnt].w = w;
  e[cnt].next = head[u];
  head[u] = cnt;
}


int n, m, s;
void floyd()
{
  for (int k = 0; k < n; k++)
  {
    for (int i = 0; i < n; i++)
    {
      for (int j = 0; j < n; j++)
      {
        dis[i][j] = min(dis[i][k] + dis[k][j], dis[i][j]);
      }
    }
  }
}
int d[N];
const int INF = 0x3f3f3f3f;
bool vis[N];

int main()
{
  cin >> n >> m;

  for (int i = 0; i < n; i++)
  {
    cin >> vts[i];
  }
  for (int i = 0; i < m; i++)
  {
    cin >> tmps[i].to >> tmps[i].next >> tmps[i].w;
    tmps[i].t = vts[i];
  }
  int Q;
  cin >> Q;
  int lqt = -1;
  while (Q--)
  {
    int qx, qy, qt;
    cin >> qx >> qy >> qt;
    if (lqt != qt)
    {
      memset(dis, 0x3f, sizeof dis);
      for (int i = 0; i < n; i++)dis[i][i] = 0;
      for (int i = 0; i < m; i++)
      {
        if (vts[tmps[i].to] <= qt && vts[tmps[i].next] <= qt)
        {
          addEdge(tmps[i].to, tmps[i].next, tmps[i].w);
          addEdge(tmps[i].next, tmps[i].to, tmps[i].w);
          dis[tmps[i].to][tmps[i].next] = tmps[i].w;
          dis[tmps[i].next][tmps[i].to] = tmps[i].w;
        }
      }

      floyd();
    }

    if (dis[qx][qy] == 1061109567)
    {
      cout << -1 << endl;
    }
    else
    {
      cout << dis[qx][qy] << endl;
    }
  }

  return 0;
}
