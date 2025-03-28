#include <iostream>
#include <string>
#include <cmath>

using namespace std;

string s1,s2,t1,t2;
int s1_0=0,s2_0=0,s1_1=0,s2_1=0;
int n;

void solve_a(){
	if(s1_1==n) cout<<s2_1<<endl;
	else cout<<s2_0<<endl;
	return;
}

void solve_b(){
	int s1a0=0,s1a1=0,s2a0=0,s2a1=0;
	int ans=0;
	for(int i=0;i<n;i++){
		if(t1[i]=='0'){
			ans+=min(s1a0,s2a0)+min(s1a1,s2a1);
			ans+=(s1[i]==s2[i]) ? 1 :0;
			s1a0=0;s1a1=0;s2a0=0;s2a1=0;
		}
		else{
			if(s1[i]=='0') s1a0++;
			else s1a1++;
			if(s2[i]=='0') s2a0++;
			else s2a1++;
		}
	}
	cout<<ans<<endl;
	return;
	
}

void solve_c(){
	
}


int main(){
	int T;
	cin>>T;
	
	while(T--){
		
		cin>>n;

		cin>>s1>>t1>>s2>>t2;
		
		for(int i=0;i<n;i++){
			if(s1[i]=='1') s1_1++;
			else s1_0++;
			if(s2[i]=='1') s2_1++;
			else s2_0++;
		}
		if(abs(s1_1-s1_0)==n){
			solve_a();
		}
		else if(t1==t2){
			solve_b();
		}
	}
	return 0;
}