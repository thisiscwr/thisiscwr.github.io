#include <iostream>

using namespace std;



int main(){

    int n;
    cin>>n;
    int a[n];
    int s=0;
    int ans=0;
    bool c=false;
    
    for(int i=0;i<n;i++){
        cin>>a[i];
        s+=a[i];
    }
    int avg=s/n;
    if(a[0]!=avg){
        ans++;
    }
    if(a[n-1]!=avg){
        ans++;
    }
    for(int i=1;i<n-1;i++){
        if(a[i]!=avg){
            c=true;
            ans++;
        }
    }
    if(c){
        ans--;
    }
    cout<<ans;

    return 0;
}