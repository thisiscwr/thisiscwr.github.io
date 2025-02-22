#include <iostream>
#include <string>

using namespace std;

const int N=1e5+10;
char sz[N];

void show(int n,int len){
  int d1=0,d2=0;

  for(int i=0;i<len;i++){
    if(sz[i]=='W'){
      d1++;
    }
    else{
      d2++;
    }
    if((d1>=n || d2>=n)&& abs(d1-d2)>=2){
      cout<<d1<<":"<<d2<<endl;        
      d1=0;
      d2=0;
    }
  }

  cout<<d1<<":"<<d2<<endl;
}


int main()
{ 
  char st;
  int idx=0;
  while(cin>>st&&st!='E'){
    sz[idx]=st;
    idx++;
  }
  show(11,idx);
  cout<<endl;
  show(21,idx);
  return 0;
  

}