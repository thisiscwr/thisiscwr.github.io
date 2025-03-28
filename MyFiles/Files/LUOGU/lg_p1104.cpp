#include <iostream>
#include <algorithm>
#include <string>

using namespace std;

const int N=110;

struct p{
  string name;
  int y;
  int m;
  int d;
  int idx;

}ps[N];

bool cmp(p& p1,p& p2){
  if(p1.y==p2.y){
    if(p1.m==p2.m){
      if(p1.d==p2.d){
        return p1.idx<p2.idx;
      }
      return p1.d>p2.d;
    }
    return p1.m>p2.m;
  }
  return p1.y>p2.y;
};

int main(){
  int n;
  cin>>n;
  for(int i=0;i<n;i++){
    cin>>ps[i].name>>ps[i].y>>ps[i].m>>ps[i].d;
    ps[i].idx=i;
  }
  sort(ps,ps+n,cmp);

  for(int i=0;i<n;i++){
    cout<<ps[n-i-1].name<<endl;
  }


  return 0;
}