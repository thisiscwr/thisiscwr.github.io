#include <iostream>
using namespace std;
const int N=5e6+10;
int n,k;
int ans=0;
int a[N];
bool iszhi(int n){
  for(int i=2;i*i<=n;i++){
    if(n%i==0){
      return false;
    }
  }
  return true;
}


void dfs(int deep,int sum,int begin){
  if(deep==k){
    if(iszhi(sum)) ans++;
    return;
  }
  for(int i=begin;i<n;i++){
    dfs(deep+1,sum+a[i],i+1);
  }
  return;
}



int main(){
  cin>>n>>k;
  for(int i=0;i<n;i++){
    cin>>a[i];
  }
  dfs(0,0,0);
  cout<<ans<<endl;

  
  return 0;
}