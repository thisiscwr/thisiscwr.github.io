#include <iostream>
using namespace std;


// 二分查找算法
int binarySearch(int arr[], int len, int x) {
    int low = 0, high = len - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == x)
            return mid;
        else if (arr[mid] < x)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return -1;
}

int main() {
    int len=5;
    int arr[len] = { 2, 3, 4, 10, 40 };
    int x = 10;
    int result = binarySearch(arr, len, x);
    if (result == -1)
        cout << "Element not present in array";
    else
        cout << "Element is present at index " << result;
    return 0;
}