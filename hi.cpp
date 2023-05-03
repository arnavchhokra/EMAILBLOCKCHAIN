#include <iostream>
using namespace std;
int addDigits(int num) {
        int b = num;
        int sum=0;
        while(b>0)
        {
            sum += b%10;
        }
        return sum;
        
    }
int main()
{
        int num;
        cin>>num;
        cout<<addDigits(num);
}