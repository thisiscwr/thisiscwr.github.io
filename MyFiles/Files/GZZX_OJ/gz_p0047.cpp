#include <bits/stdc++.h>

using namespace std;

int main(){
	int n,ans=0;
	cin>>n;
	
	int a[n];
	for(int i=0;i<n;i++){
		cin>>a[i];
	}
	a[n]=10001;
	
	
	int i=0;
	while(true){
		int min_i=i;
		int start=min_i;
		cout<<min_i<<endl;
		for(int j=i;j<n;j++){
			if(a[j]<a[min_i]){
				min_i=i;
			}
		}
		if(min_i==start && min_i!=-1){
			break;
		}
		i=min_i-1;
		i++;
		ans++;
	}
	
	
	

	
	
	cout<<ans<<endl;
	return 0;
	
}