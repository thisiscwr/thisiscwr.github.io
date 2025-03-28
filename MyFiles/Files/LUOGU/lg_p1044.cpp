#include <iostream>
#include <stack>
#include <string>
#include <unordered_set>

using namespace std;

unordered_set<string> us;
int ans=0;

void dfs(string s,stack<string> mid,stack<string> right){
  if(mid.size()==0 && right.size()==0){
    if(us.find(s)==us.end()){
      us.insert(s);
      ans++;
    }
    return;
  }
  if(mid.size()==0){
    string rt=right.top();
    mid.push(rt);
    right.pop();
    dfs(s,mid,right);
    return;
  }
  if(right.size()==0){
    string mt=mid.top();
    mid.pop();
    s+=mt;
    dfs(s,mid,right);
    return;
  }
  string mt=mid.top();
  string rt=right.top();

  mid.pop();
  dfs(s+mt,mid,right);

  mid.push(mt);
  mid.push(rt);
  right.pop();
  dfs(s,mid,right);
  return;

}



int main(){
  int n;
  cin>>n;

  string s="";
  stack<string> mid;
  stack<string> right;

  for(int i=1;i<=n;i++){
    right.push(to_string(i));
  }
  dfs(s,mid,right);
  cout<<ans<<endl;
  return 0;
}