#include <iostream>


using namespace std;
int b[26];
int a[26];

int main(){
    string s;
    cin>>s;
    for(int i=0;i<26;i++){
    	a[i]=0;
	}
	for(int i=0;i<s.size();i++){
		a[s[i]-'a']=i;
		b[s[i]-'a']++;
	}
	int lasti=s.size();
	int lastv=-1;
	for(int i=0;i<26;i++){
		if(b[i]==1){
			if (a[i]<lasti){
				lasti=a[i];
				lastv=i;
			}
			
		}
	}
	if (lastv==-1){
		cout<<"no"<<endl;
		return 0;
	}
	cout<<char(lastv+'a');
	
    return 0;

}