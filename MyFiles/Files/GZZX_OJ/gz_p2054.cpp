#include <iostream>
#include <algorithm>

using namespace std;

struct stdt{
	int n;
	int c;
	int z;

}s[305];

const bool cmp(stdt& st1,stdt& st2){
	if(st1.z==st2.z){
			if(st1.c==st2.c){
				return st1.n > st2.n;
			}
			return st1.c > st2.c;
		}
		return st1.z > st2.z;
}


int main(){
	int n;
	cin>>n;
	for(int i=1;i<=n;i++){
		int c,m,e;
		cin>>c>>m>>e;
		s[i].n=i;
		s[i].c=c;
		s[i].z=c+m+e;	
	}
	sort(s+1,s+n+1,cmp);
	
	for(int i=1;i<=5;i++){
		cout<<s[i].n<<" "<<s[i].z<<endl;
	}
	
	
	return 0;
}