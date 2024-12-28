#include <iostream>

using namespace std;
const int N=1100;

struct node{
  int t;
  int w;
}a[N];
int dp[N];

int main(){
  int T,M;
  int ans=0;
  cin>>T>>M;
  int p=0;
  int times=M;
  while(times--){ 
    cin>>a[p].t>>a[p].w;
    p++;
  }
  for(int i=0;i<M;i++){
    for(int j=T;j>=a[i].t;j--){
      dp[j]=max(dp[j],dp[j-a[i].t]+a[i].w);
    }
  }
  cout<<dp[T]<<endl;
  return 0;
}