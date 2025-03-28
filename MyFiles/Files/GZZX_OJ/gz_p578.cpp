#include <iostream>
#include <cmath>

using namespace std;

long long gcd(long long a,long long b){
	if(b==0) return a;
	return gcd(b,a%b);
}



int main(){
	int x,y,m,n,L;
	cin>>x>>y>>m>>n>>L;
		
	if(m==n){
		cout<<"Impossible"<<endl;
		return 0;
	}
	if(L%m==0 && L%n==0){
		cout<<"Impossible"<<endl;
		return 0;
	}
	long long d;
	if(x<y){
		d=L-y+x;
	}
	else{
		d=L-x+y;
	}
	long long tmp;
	if(m>n){
		tmp=gcd(m-n,d);
		cout<<d*(m-n)/tmp;
	}
	else{
		tmp=gcd(n-m,d);
		cout<<d*(n-m)/tmp;
	}
	
	
	
	
	
	return 0;
}