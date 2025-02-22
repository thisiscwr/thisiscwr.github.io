#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

int main(){
	int n,d;
	cin>>n>>d;
	long long ans=0,run_dis=0;
	
	int v[n-1],a[n];
	
	for(int i=0;i<n-1;i++){
		cin>>v[i];
	}
	for(int i=0;i<n;i++){
		cin>>a[i];
	}
	
	long long min_i=0;
	vector<long long> vec;
	vector<long long> dis;
	vec.push_back(0);
	long long dist=0;
	for(int i=1;i<n;i++){
		dist+=v[i-1];
		if(a[i]<a[min_i] && i!=n-1){
			min_i=i;
			vec.push_back(i);
			dis.push_back(dist);
			dist=0;
		}
	}
	dis.push_back(dist);
	
	
	
	
	for(long long i=0;i<vec.size();i++){
		long long idx=vec[i];
		if(run_dis>dis[i]){
			run_dis-=dis[i];
			continue;
		}
		else{
			long long oil_add=(dis[i]-run_dis+d-1)/d;
			ans+=oil_add*a[idx];
			run_dis+=oil_add*d;
			run_dis=run_dis-dis[i];
		}
	
	}

	cout<<ans<<endl;
	return 0;
	
}