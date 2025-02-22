#include <iostream>
#include <cstring>

using namespace std;

const int Maxn=1e6+10;
long long a[Maxn];

long long ml(int n,int h){
    int sum=0;
    for(int i=0;i<n;i++){
        if(a[i]>h) sum+=a[i]-h;
    }
    return sum;
}

int main(){
    long long n,m;
    cin>>n>>m;
    long long maxv=0;
    for(int i=0;i<n;i++){
        cin>>a[i];
        if(a[i]>maxv) maxv=a[i];
    }

    long long l=0;
    long long r=maxv;
    long long mid=(l+r)>>1;

    while(l+1<r){
        if(ml(n,mid)>=m){
            l=mid;
        }
        else{
            r=mid;
        }
        mid=(l+r)>>1;
    }
    cout<<mid<<endl;
    return 0;
}