#include <iostream>
#include <algorithm>
#include <string>

using namespace std;

const int N=5000+10;

struct p{
  int idx;
  int fen;

}ps[N];

bool cmp(p& p1,p& p2){
  if(p1.fen==p2.fen){
    return p1.idx<p2.idx;
  }
  return p1.fen>p2.fen;
};

int main(){
  int n,m;
  cin>>n>>m;
  for(int i=0;i<n;i++){
    cin>>ps[i].idx>>ps[i].fen;
  }

  sort(ps,ps+n,cmp);

  int line_i=m*1.5;

  int line=ps[line_i-1].fen;
  int num=0;
  for(int i=0;i<n;i++){
    if(ps[i].fen>=line){
      num++;
    }
  }

  if(line_i>n){
    num=n;
  }


  cout<<line<<" "<<num<<endl;

  for(int i=0;i<n;i++){
    if(ps[i].fen>=line){
      cout<<ps[i].idx<<" "<<ps[i].fen<<endl;
    }
  }


  return 0;
}