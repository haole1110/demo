#include <stdio.h>
#include <stdlib.h>
#include <iostream>

using namespace std;

int main() {
  int a[10] = {-8, 9, -65, 11, 45, -100, 88, 17, -4, -14};
  int k = 1;
  int t = a[0];
  int s = a[0];
  while (k!=10){
    t = (t+a[k]>a[k])?a[k]:(t+a[k]);
    s = (s>t)?t:s;
    k++;
  }
  cout<<s<<" "<<t;
  return 0;
}