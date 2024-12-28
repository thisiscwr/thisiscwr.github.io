#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int N;

bool check(string rs){
  string s=rs;
  reverse(s.begin(),s.end());
  return s==rs;
}

string add(string s){
  long long len=s.size();
  string ans="";
  bool jin=false;
  for(int i=0;i<=len;i++){
    int tmp=int(s[len-i-1]-'0')+int(s[i]-'0')+jin;
    if (tmp>=N){
      jin=true;
      ans=char(tmp%N+'0')+ans;
    }
    else{
      jin=false;
      ans=char(tmp+'0')+ans;
    }
  }
  if(jin){
    ans="1"+ans;
  }
  return ans;
}

int main(){
  string m;
  cin>>N;
  cin>>m;
  for(int j=1;j<=30;j++){
    m=add(m);
    if(check(m)){
      cout<<"STEP="<<j;
      return 0;
    }
    
  }
  cout<<"Impossible!";
  
  return 0;
}