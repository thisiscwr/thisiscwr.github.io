#include <iostream>

using namespace std;

int main(){
	int n;
	cin>>n;
	int l=n*n;
	int a[n+1][n+1];
	int lx,ly;
	int nx,ny;
	
	for(int i=1;i<=n;i++){
		for(int j=1;j<=n;j++){
			a[i][j]=0;
		}
	}
	
	
	
	a[(n+1)/2][1]=1;
	ly=1;
	lx=(n+1)/2;
	
	
	for(int i=2;i<=l;i++){
		if(ly==1 && lx!=n){
			nx=lx+1;
			ny=n;
		}
		else if(lx==n && ly!=1){
			nx=1;
			ny=ly-1;
		}
		else if(ly==1 && lx==n){
			nx=lx;
			ny=ly+1;
		}
		else{
			if(!a[lx+1][ly-1]){
				nx=lx+1;
				ny=ly-1;
			}
			else{
				nx=lx;
				ny=ly+1;
				
			}
		}
		a[nx][ny]=i;
		lx=nx;
		ly=ny;
		
		
	}
	
	for(int i=1;i<=n;i++){
		for(int j=1;j<=n;j++){
			cout<<a[j][i]<<" ";
		}
		cout<<endl;
	}
	
	
	return 0;
}