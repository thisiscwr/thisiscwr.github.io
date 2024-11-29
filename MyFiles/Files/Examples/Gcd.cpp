#include <iostream>
using namespace std;

//最小公约数算法

//递归版本
 int gcd(int a, int b) {
     if (b == 0) {
         return a;
     }
     return gcd(b, a % b);
 }


int main() {
    int a, b, tmp;
    cin >> a >> b;

    int result = gcd(a, b);


    while (b!= 0) {
        tmp = a % b;
        a = b;
        b = tmp;
    }
    //此版本结果为a
	cout<<result<<endl;
	cout<<a<<endl;

    return 0;
}