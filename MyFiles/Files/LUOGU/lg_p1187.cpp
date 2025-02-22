#include <iostream>

using namespace std;
const int N=1010;
int a[N][N];
int n=0;
int m=0;

int get_s(int h,int l){
  int res=0;
  if(l==0) res+=a[h][l];
  if(l==n-1) res+=a[h][l];
  if(h==0) res+=a[h][l];
  if(h==m-1) res+=a[h][l];

  if(h-1>=0){
    if(a[h-1][l]<a[h][l]){
      res+=a[h][l]-a[h-1][l];
    }
  }
  if(h+1<=m-1){
    if(a[h+1][l]<a[h][l]){
      res+=a[h][l]-a[h+1][l];
    }
  }
  if(l-1>=0){
    if(a[h][l-1]<a[h][l]){
      res+=a[h][l]-a[h][l-1];
    }
  }
  if(l+1<=n-1){
    if(a[h][l+1]<a[h][l]){
      res+=a[h][l]-a[h][l+1];
    }
  }
  return res;
}


int main(){

  cin>>n>>m;

  for(int i=0;i<n;i++){
    string s;
    cin>>s;
    for(int j=0;j<m;j++){
      a[i][j]=int(s[j]-'0');
    }
  }
  int ans=0;
  for(int i=0;i<n;i++){
    for(int j=0;j<m;j++){
      ans+=get_s(i,j);
      if(a[i][j]!=0){
        ans+=2;
      }
    }
  }
  
  cout<<ans<<endl;



  return 0;
}