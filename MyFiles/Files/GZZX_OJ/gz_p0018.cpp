#include <iostream>

using namespace std;


int main(){
	int n,m;
	cin>>n>>m;
	long long a[n+1];
	a[0]=0;
	for(int i=1;i<=n;i++){
		int tmp;
		cin>>tmp;
		a[i]=a[i-1]+tmp;
	}
	
	while(m--){
		int l,r;
		cin>>l>>r;
		cout<<a[r]-a[l-1]<<endl;
	}
	
	return 0;
	
}