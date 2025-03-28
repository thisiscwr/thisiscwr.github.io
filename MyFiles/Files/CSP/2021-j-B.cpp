#include <iostream>
#include <algorithm>

using namespace std;
const int N=1e4+20;
int pos[N];


struct Node{
	int val;
	int idx;
	
	bool operator < (const Node& b){
		if (val==b.val) return idx<b.idx;
		return val<b.val;
	}
		
}a[N];


int main(){
    int n,Q;
    cin>>n>>Q;
    for(int i=1;i<=n;i++){
    	int tmp;
    	cin>>tmp;
    	a[i].val=tmp;
    	a[i].idx=i;
	};
    
    sort(a+1,a+n+1);
    for(int i=1;i<=n;i++){
    	pos[a[i].idx]=i;
    	
	};
    
    while(Q--){
    	int op;
    	cin>>op;
    	if (op==2){
    		int x;
    		cin>>x;
    		cout<<pos[x]<<endl;	
		}else{
			
			int x,v;
			cin>>x>>v;
			a[pos[x]].val=v;
			
			for(int i=pos[x];i>=2;i--){
				if (a[i]<a[i-1]){
					swap(a[i],a[i-1]);
				};
			};
			
			for(int i=pos[x];i<n;i++){
				if (a[i+1]<a[i]){
					swap(a[i+1],a[i]);
				};
			};
			for(int i=1;i<=n;i++){
    			pos[a[i].idx]=i;
    	
			};
			
			
		};
    	
    	
    	
	}
    
    
}