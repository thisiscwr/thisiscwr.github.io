#include <bits/stdc++.h>

using namespace std;

int gcd(int a,int b){
	int n1,n2,ans;
	if(a==b){
		return a;
	}
	n1=min(a,b);
	n2=max(a,b);
	ans=1;
		
	for(int i=2;i<=max(abs(a),abs(b));i++){
		if(n1%i==0 && n2%i==0){
			ans=i;
		}
	}
	return ans;
	
};

int sqrt_s(int a){
	int ans=1;
	for(int i=1;i*i<=a;i++){
		if(a%(i*i)==0){
			ans=i;
		}
	}
	return ans;
	
	
}




int solve(int a,int b,int c){
	if (a<0){
		a=-a;
		b=-b;
		c=-c;
	}
	int delta,tmp,delta_h;
	delta=b*b-4*a*c;
	if(delta<0){
		cout<<"NO"<<endl;
		return 0;
	}
	
	
	tmp=sqrt(delta);
	if (tmp*tmp==delta){
		delta_h=tmp;
		int g=gcd(-b+delta_h,2*a);
		if((-b+delta_h)%(2*a)==0){
			cout<<(-b+delta_h)/(2*a)<<endl;
		}
		else{
			if((-b+delta_h)*a<0) cout<<"-";
			cout<<abs((-b+delta_h)/g)<<"/"<<abs((2*a)/g)<<endl;

		}
	}
	else{
		
		int t=gcd(-b,2*a);
		if(-b%(2*a)==0){
			if (b!=0){
				
			
				cout<<(-b)/(2*a);
			}
		}
		else{
			if((-b)*a<0) cout<<"-";
			if(b!=0){
				cout<<abs((-b)/t)<<"/"<<abs((2*a)/t);
			}
		}
		if(b!=0){
			cout<<"+";
		}
		
		int sq=sqrt_s(delta);
		delta_h=delta/(sq*sq);
		
		int g=gcd(sq,2*a);
		int t1=sq/g;
		if(t1==1){
			cout<<"sqrt("<<delta_h<<")";
		}
		else{
			cout<<t1<<"*sqrt("<<delta_h<<")";
		}
		
		if(sq%(2*a)!=0){
			cout<<"/"<<(2*a)/g<<endl;
		}
		else{
			cout<<""<<endl;
		}
		
		
		
	}
	return 0;
	
};





int main(){
	int T,M;
	cin>>T>>M;
	while(T--){
		int a,b,c;
		cin>>a>>b>>c;
		solve(a,b,c);
	}
	return 0;
}