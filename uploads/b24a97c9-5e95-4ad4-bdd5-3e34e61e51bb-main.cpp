#include <bits/stdc++.h>
#include <ext/rope>
#include <ext/pb_ds/assoc_container.hpp>
using namespace __gnu_pbds;
using namespace __gnu_cxx;
using namespace std;
template<class T> using ordered_set = tree<T, null_type, less<T>, rb_tree_tag, tree_order_statistics_node_update>;
template<class T> using ordered_multiset = tree<T, null_type, less_equal<T>, rb_tree_tag, tree_order_statistics_node_update>;
#define fr first
#define sc second
#define Fast ios_base::sync_with_stdio(false);cin.tie(NULL);cout.tie(NULL);
#define ll long long
#define lll long long int
#define ld long double
#define p(x,y) cout<<fixed<<setprecision(y)<<x<<"\n";
#define PI 3.1415926535897
#define mem(dp) memset(dp, -1, sizeof dp)
#define ones(x) __builtin_popcountll(x)
#define acc(a, n) accumulate(a, a + n,0ll);
#define ac(a, n) accumulate(a.begin(), a.begin() + n, 0ll)
#define all(x) (x).begin(), (x).end()
#define rall(x) (x).rbegin(), (x).rend()
#define sz(X) ((ll)(X).size())
#define lcm(a, b) (a / __gcd(a,b) * b)
#define pll pair<ll, ll>
#define pi pair<int, int>
#define pb push_back
#define in insert
#define al(it) it.fr << " " << it.sc << "\n"
#define _cout(v)  for(auto f : v ) cout << f << " " ;
#define _cin(v)   for(auto &it : v)cin >> it ;
#define Tmax(type)   std::numeric_limits<type>::max()
#define Tmin(type)   std::numeric_limits<type>::min()
#define debug(x) cout<<" [ " << #x << " is: " << x << " ] "<<endl
//#define mod (ll)1000000007
#define mod (ll)998244353
#define POW2(x) (1 << x)
#define N 200001
#define l 20
int main()
{
    Fast;

    std::freopen("test.txt", "w", stdout);

    cout << 1 << "\n" << 200000 << " " << 1000  << "\n";
    for(int i = 0; i < 200000; i++)
        cout << 500000500 << " ";
    cout << "\n";
}
