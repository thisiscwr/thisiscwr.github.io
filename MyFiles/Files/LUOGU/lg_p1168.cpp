#include <iostream>
#include <vector>
using namespace std;

const int N=1e5+10;
int a[N];

vector<int> vec;


void bi_sort(int num,int len){
	int l=0;
	int r=len;
	
	
	while(l+1<r){
		int mid=(l+r)>>1;
		if (num==vec[mid]){
			vec.emplace(vec.begin()+mid,num);
			return;
		}
		if(num>vec[mid-1] && num<vec[mid]){
			vec.emplace(vec.begin()+mid,num);
			return;
		}
		
		
		if(num<vec[mid]){
			r=mid;
		}
		else{
			l=mid;
		}
	}
	vec.insert(vec.begin()+l,num);
	return;
}


int main(){
	int n;
	cin>>n;
	
	for(int i=0;i<n;i++){
		int num;
		cin>>num;
		
		bool flag=true;
		
		int idx=i-1;
		
		if(i==0){
			vec.push_back(num);
			cout<<num<<endl;
			continue;
		}
		if (num >= vec[i-1]){
			vec.push_back(num);
		}
		else if(num<=vec[0]){
			vec.insert(vec.begin(),num);
			
		}
		else{
			bi_sort(num,i);
		}
		
		
		
		if(i%2==0){
			cout<<vec[i/2]<<endl;
		}
		
		
		
	}
	return 0;
}