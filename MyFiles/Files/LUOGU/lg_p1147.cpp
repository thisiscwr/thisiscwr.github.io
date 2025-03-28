#include <iostream>
#include <unordered_set>
#include <algorithm>
#include <vector>

using namespace std;


int sum_area(int l,int r){
  int t1=(r-l+1)*l+((1+(r-l))*(r-l)/2);
  return t1;
}
unordered_set<int> us;

struct node{
  int l;
  int r;
};

vector<node> vec;
bool cmp(node n1, node n2){
  return n1.l<n2.l;

}

int main()
{
  int n;
  cin >> n;

  for (int i = 2; i <= n; i++)
  {
    int avg = n / i;
    //2000
    int left = avg - i / 2;
    if(left<0){
      left=-left+1;
    }
    //2000-2
    int right = avg + i / 2;
    //

      if (sum_area(left,right)==n && us.find(left)==us.end()){
        vec.push_back(node{left,right});
        us.insert(left);
        
      }
      //1998+2002
        
  }
  sort(vec.begin(),vec.end(),cmp);
  for(int i=0;i<vec.size();i++){
    cout<<vec[i].l<<" "<<vec[i].r<<endl;
  }

  return 0;
}
