#include <iostream>

using namespace std;


int main(){
	string s,a,b;
	getline(cin,s);
	cin>>a>>b;
	
	
	int len=s.size();
	string tmp="";
	
	for(int i=0;i<len;i++){
		if(s[i]==' '){
			if(tmp==a){
				cout<<b<<" ";
			}
			else{
				cout<<tmp<<" ";	
			}
			tmp="";
		}
		else{
			tmp+=s[i];
		}
		
	}
	cout<<tmp<<endl;
	
	
	return 0;
}