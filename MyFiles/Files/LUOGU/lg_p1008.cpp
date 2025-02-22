#include <iostream>
#include <algorithm>
#include <unordered_set>

using namespace std;

unordered_set<int> us;

int main(){
  int n;
  cin>>n;
  int a[n];
  int ans=0;
  for(int i=0;i<n;i++){
    cin>>a[i];
    us.insert(a[i]);
  }
  sort(a,a+n);

  cout<<us.size()<<endl;
  cout<<a[0]<<" ";
  for(int i=1;i<n;i++){
    if(a[i]!=a[i-1]){
      cout<<a[i]<<" ";
    }
  }

  return 0;
}