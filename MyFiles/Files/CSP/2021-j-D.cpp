#include <iostream>
#include <algorithm>

using namespace std;
const int N=2e5+1;

struct Node{
	int val;
	int idx;
	
}a[N],rest[N];


int main(){
	int n;
	scanf("%d",&n);
	int o=0;
	a[0].val=-1;
	for(int i=1;i<=n;i++){
		int tmp;
		scanf("%d",&tmp);
		a[i].val=tmp;
		a[i].idx=i;
	};
	while(n>0){
		o=0;
		for(int i=1;i<=n;i++){
			if (i==1 || a[i].val!=a[i-1].val){
				printf("%d ",a[i].idx);	
			}
			else{
				o+=1;
				rest[o]=a[i];
				
			};	
		};
		n=o;
		printf("\n");
		for(int j=1;j<=n;j++){
			a[j]=rest[j];
		};
		
	};
	return 0;
}