#include <iostream>
#include <algorithm>
#include <string>

using namespace std;
const int N=110;

struct st{
  string name;
  int qg;
  int bg;
  string isgb;
  string issf;
  int lnum;
  int jin;
  int idx;
}sts[N];

bool cmp(st s1,st s2){
  if(s1.jin==s2.jin) return s1.idx<s2.idx;
  return s1.jin>s2.jin;
}

int get_jin(st stu){
  int ans=0;
  if(stu.qg>80 && stu.lnum>=1){
    ans+=8000;
  }
  if(stu.qg>85 && stu.bg>80){
    ans+=4000;
  }
  if(stu.qg>90){
    ans+=2000;
  }
  if(stu.issf=="Y" && stu.qg>85){
    ans+=1000;
  }
  if(stu.isgb=="Y" && stu.bg>80){
    ans+=850;
  }
  return ans;
}

int main(){
  int n;
  int sums=0;
  cin>>n;
  int times=n;
  int i=0;
  while(times--){
    cin>>sts[i].name>>sts[i].qg>>sts[i].bg;
    cin>>sts[i].isgb>>sts[i].issf>>sts[i].lnum;
    int jin=get_jin(sts[i]);
    sums+=jin;
    sts[i].jin=jin;
    sts[i].idx=i;
    i++;
  }
  sort(sts,sts+n,cmp);
  cout<<sts[0].name<<endl;
  cout<<sts[0].jin<<endl;
  cout<<sums;

  return 0;
}