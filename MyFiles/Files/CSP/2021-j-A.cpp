#include <iostream>

using namespace std;
int main(){
    int n,L,R;
    cin>>n>>L>>R;
    int t;
    t=L/n+1;
    if (t*n-1>=L && t*n-1<=R){
        cout<<n-1;
        return 0;
    }
    cout<<R%n;
    return 0;
    
}