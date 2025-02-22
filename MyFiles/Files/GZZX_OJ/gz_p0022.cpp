#include <iostream>
#include <string>
#include <algorithm>

using namespace std;


int main(){
	string a,b;
	cin>>a>>b;
	
	reverse(a.begin(),a.end());
	reverse(b.begin(),b.end());
	string ans="";
	int jin=0;
	int as=a.size();
	int bs=b.size();
	int times=max(as,bs);
	for(int i=0;i<times;i++){
		int p1= (i<as ? a[i]-'0' : 0);
		int p2= (i<bs ? b[i]-'0' : 0);
		int tmp=p1+p2+jin;
		jin=tmp/10;
		ans=to_string(tmp%10)+ans;
	}
	if (jin>0) ans="1"+ans;
	
	cout<<ans;
	return 0;
	
}