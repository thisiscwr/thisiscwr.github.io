#include <iostream>

using namespace std;

int n,len;
long long sum;
void get_hang(){
  sum=0;
  len=0;
  while(sum<n){
    len++;
    sum+=len;
  }
  len-=1;
}

int main(){
  cin>>n;
  get_hang();
  int start=sum-len;
  int idx=n-start;
  if(len%2==0){
    cout<<len-idx+1<<"/"<<idx+1<<endl;
  }
  else{
    cout<<1+idx<<"/"<<len-idx+1<<endl;
  }
  
  return 0;
}