#include <iostream>
#include <cmath>

using namespace std;
//ST 表模版

const int N = 1e6+10;
int st[N][21];

//查询区间[l,r]的最大值
int query(int l,int r){
	int k=log2(r-l+1);
	return max(st[l][k],st[r-(1<<k)+1][k]);
}

int main() {
    int n,m;
    cin>>n>>m;
	
	for(int i=1;i<=n;i++){
		cin>>st[i][0];
	}
	
	for(int i=1;i<=n;i++){
		for(int j=1;j+(1<<i)-1<=n;j++){
			st[j][i]=max(st[j][i-1],st[j+(1<<(i-1))][i-1]);
		}
	}
	
	for(int i=0;i<m;i++){
		int l,r;
		cin>>l>>r;
		int ans;
		ans=query(l,r);
		cout<<ans<<endl;
	}
	return 0;
	
    
}