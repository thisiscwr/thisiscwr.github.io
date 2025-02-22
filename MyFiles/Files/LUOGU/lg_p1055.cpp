#include <iostream>
#include <string>

using namespace std;
const int N=110;



int main(){
  string s;
  cin>>s;
  long long sum=0;
  int nums=0;
  for(int i=0;i<11;i++){
    if (s[i]>='0' && s[i]<='9'){
      nums++;
      sum+=nums*int(s[i]-'0');
    }
  }
  
  if ((s[12]=='X' && sum%11==10) || (sum%11)==int(s[12]-'0')){
    cout<<"Right"<<endl;
  }
  else{
    for(int i=0;i<=11;i++){
      cout<<s[i];
    }
    if(sum%11==10){
      cout<<"X";
    }
    else{
      cout<<(sum%11);
    }
  }

  return 0;
}