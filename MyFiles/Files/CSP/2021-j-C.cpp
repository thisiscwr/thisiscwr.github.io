#include <iostream>
#include <algorithm>
#include <unordered_map>
#include <string>

using namespace std;
const int N=1000;

unordered_map<string,int>mp;

bool is_right(string ip){
	int len=ip.size();
	int t=0;
	int cnt1=0,cnt2=0;
	int num=-1;
	
	while(t<len){
		
		if(ip[t]=='.' || ip[t]==':'){
			if (ip[t]=='.') 
			{	
				if (cnt2!=0)return false;
				cnt1++;
			}
			if (ip[t]==':'){
			    if (cnt1!=3)return false;
			    cnt2++;
			    
			};
			if(num>255 || num<0) return false;
			num=-1;
		}
		else{
			if (num==-1){
				num=ip[t]-'0';
				
			}
			else{
				if (num==0) return false;
				if (ip[t]>'9' || ip[t]<'0') return false;
				num=num*10+ip[t]-'0';
			};
		};
		t++;
		
	};
	if (num>65535 || cnt1!=3 || cnt2!=1 || num<0){
		return false;
	};
	return true;
	
	
};


int main(){
	int n;
	cin>>n;
	int i=0;
	while(n--){
		
		i++;
		string op,ip;
		cin>>op>>ip;
		if (is_right(ip)){
			int cnt=mp.count(ip);
			if(op=="Server"){
				if (cnt){
					cout<<"FAIL"<<endl;
					continue;
				}
				cout<<"OK"<<endl;
				mp[ip]=i;
			}
			else{
				if (cnt){
					cout<<mp[ip]<<endl;
					continue;
				}
				cout<<"FAIL"<<endl;
				
				
			}
			
		}
		else{
			
			cout<<"ERR"<<endl;
			
		}
		
		
	}
	
	
}


