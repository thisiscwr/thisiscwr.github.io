#include <iostream>
#include <cmath>
using namespace std;

//原理：通过标记一个数的倍数，后进行遍历，没被标记的则为质数
 
const int N=1e3+10;//假设求1e3+10内所有质数
bool a[N];//用于标记是否被筛除
int prime[N],pi=0;//prime用于存放素数，pi为prime数组的专属下标
 
void Eulerprime(int n){
    for(int i=2;i<=n;++i){
	    if(!a[i]) prime[++pi]=i; //++为先加一再用，先记录2，后记录质数
	    for(int j=1;prime[j]*i<=n;++j){
		    a[prime[j]*i]=true;//标记合法范围内，某一较小质数的所有倍数
		    if(i%prime[j]==0) break;//当取模为0的时候，则表示已经为较小的质数，则break
	    }
    }
}


int main() {
    Eulerprime(200);
    for(int i=1;i<pi;i++){
    	cout<<prime[i]<<endl;
	}
    return 0;
}