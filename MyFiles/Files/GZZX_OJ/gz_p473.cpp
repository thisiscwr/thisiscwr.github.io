#include <iostream>
#include <cmath>

using namespace std;

const int N = 1e5 + 10;

int st[N][21];

void init_st(int n)
{
  for (int i = 1; i <= n; i++)
  {
    cin >> st[i][0];
  }

  for (int i = 1; i <= n; i++)
  {
    for (int j = 1; j + (1 << i) - 1 <= n; j++)
    {
      st[j][i] = max(st[j][i - 1], st[j + (1 << (i - 1))][i - 1]);
    }
  }
}

int query(int l, int r)
{
  int tmp = log2(r - l + 1);
  return max(st[l][tmp], st[r - (1 << tmp) + 1][tmp]);
}

int main()
{
  int n;
  cin >> n;
  init_st(n);
  int m;
  cin >> m;

  while (m--)
  {
    int l, r;
    cin >> l >> r;
    int ans = query(l, r);
    cout << ans << endl;
  }
  return 0;
}