#include <iostream>
#include <cstring>

using namespace std;

const int N=1e4+10;
bool a[N];

int main(){
  int len,m;
  int ans=0;
  cin>>len>>m;
  memset(a, 1, sizeof(a));
  while(m--){
    int l,r;
    cin>>l>>r;
    memset(&a[l],0,sizeof(bool)*(r-l+1));
  }
  for(int i=0;i<=len;i++){
    ans+=a[i];
  }
  cout<<ans<<endl;
  return 0;
}