#include <iostream>
#include <string>
#include <vector>
#include <math.h>

using namespace std;
int main(){
    int a,b;
    cin>>a>>b;
    if (pow(a,b)>pow(2,31)-1){
        cout<<-1;
        return 0;
    }
    cout<<int(pow(a,b));
    return 0;
}