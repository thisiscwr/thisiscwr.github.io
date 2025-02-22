#include <iostream>
#include <math.h>

using namespace std;

int main(){
    int k;
    cin>>k;
    for(int i=0;i<k;i++){
    	
    	long long n,e,d;
    	cin>>n>>e>>d;
    	
    	//pq-p-q+2=e*d, p+q=n-ed+2=tmp1
    	//pq=n
    	//q=tmp1-p
    	//p(tmp1-p)=n
    	//-p^2+tmp1 p-n=0
    	
    	
    	long long tmp1=n-e*d+2;
    	long long delta=(tmp1*tmp1)-4*n;
    	if(delta<0){
    		cout<<"NO"<<endl;
    		continue;
		}
		
		delta=sqrt(delta);
		long long p=(tmp1+delta)/2;
		long long q=(tmp1-delta)/2;
		if(p*q==n && p>0 && q>0 && e*d==((p-1)*(q-1)+1))
		{
			cout << (min(p,q) )<< " " << (max(p,q))<< endl;
			continue;
			
		}
		cout<<"NO"<<endl;
		continue;
		
    	
    	
	}
    
    return 0;
}