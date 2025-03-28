#include <iostream>
#include <math.h>
#include <algorithm>

using namespace std;

const int N=1e4;

struct Node{
	int x;
	int y;
	
	bool operator < (const Node& b){
		if (x==b.x) return y<b.y;
		return x<b.x;
		
	}
	
}a[N];

int get_dis(Node n1,Node n2){
	return abs(n1.x-n2.x)+abs(n1.y-n2.y)-1;
}

int d[N][N];

int main(){
    int n,k;
    cin>>n>>k;
    
    int ans=0;
    for(int i=1;i<=n;i++){
    	int tmp1,tmp2;
    	cin>>tmp1>>tmp2;
    	a[i]={tmp1,tmp2};
    	
	};
	sort(a+1,a+n+1);
	for(int i=1;i<=n;i++){
		for(int z=0;z<=k;z++){
			d[i][z]=z+1;
			
			for(int j=1;j<i;j++){
				int dis=get_dis(a[i],a[j]);
				if (z-dis<0 || a[i].y<a[j].y) continue;
				d[i][z]=max(d[i][z],d[j][z-dis]+dis+1);
				ans=max(ans,d[i][z]+k-z);
				
			}
		}
		
	}
	
    cout<<ans<<endl;
    return 0;
}