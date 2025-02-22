#include <bits/stdc++.h>

using namespace std;

int main(){
	string x,y;
	cin>>x>>y;
	dp[x.size()][y.size()];
	int ans=0;
	
	for(int i=0;i<x.size();i++){
		for(int b=0;b<y.size();b++){
			if(x[i]==y[b]){
				dp[i][b]=max(dp[i][b-1],)
			}
		}
	}
	
	
	

	
	
	cout<<ans<<endl;
	return 0;
	
}