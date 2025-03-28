#include <iostream>
#include <algorithm>
#include <vector>
#include <string>

using namespace std;

const int N=1e6+10;

struct thenum{
	int num;
	int duan_1=0;
	int duan_2=0;
	
}num_l,num_r;

vector<struct thenum> nums;
vector<char> ops;

string s;
string tmps;
int ans,duan_1,duan_2;


void calculate(bool ispop){
	struct thenum num_r=nums[nums.size()-1];
	nums.pop_back();
	struct thenum num_l=nums[nums.size()-1];
	nums.pop_back();
	char op=ops[ops.size()-1];
	ops.pop_back();
	
	tmps=tmps.substr(0,tmps.size()-3);
	
	struct thenum ans={0,num_r.duan_1+num_l.duan_1,num_r.duan_2+num_l.duan_2};
	
	if (ispop){
		ops.pop_back();ops.pop_back();
		tmps=tmps.substr(0,tmps.size()-1);
	}
	
	if(op=='&'){
		if (num_l.num==0){
			ans.duan_1=1;
			ans.num=0;
		}
		else{
			ans.num=num_l.num & num_r.num;
		};
	}
	else if (op=='|'){
		if (num_l.num==1){
			ans.duan_2=1;
			ans.num=1;
		}
		else{
			ans.num=num_l.num | num_r.num;
		};
	}
	else{
		cout<<"err"<<endl;
		return;
	}
	tmps+=ans.num+'0';
	nums.push_back(ans);
	
	
	
};



int main(){
    cin>>s;
	int len=s.size();
	bool stop=true;
	int i=0;
	int r_l=0;
	bool can_cal=true;
	
	
	struct thenum temp_num;
	
	while(stop){
		if (s[i]=='&' || s[i]=='|'){
			ops.push_back(s[i]);
			tmps+=s[i];
			r_l++;
			
			
		}
		else if(s[i]=='('){
			r_l=0;
			
			ops.push_back(s[i]);
			tmps+=s[i];
			
		}
		else if(s[i]=='1' || s[i]=='0'){
			temp_num.num=s[i]-'0';
			nums.push_back(temp_num);
			tmps+=s[i];
			r_l++;
			if(r_l>=3){
				if (can_cal) calculate(false);	
				r_l=0;
			}
		}
			      
		
		else{
			if(r_l>=3){
				if (can_cal) calculate(true);	
				r_l=0;
			}
			else{
				if(s[i-2]=='('){
					ops.pop_back();
					tmps=tmps.substr(0,tmps.size()-2);
					tmps+=nums[nums.size()-1].num+'0';
					i++;
					continue;
				}
				if(len==2){
					tmps=tmps[0];
					
					break;
				}
				
				r_l=0;
				tmps+=')';
			}
			

			
		};
		
		i++;
		if (i>=len){
			s=tmps;
			len=s.size();
			if (len==1){
				break;
			}
			
			tmps="";
			nums.clear();
			ops.clear();

			i=0;
	
		}
	
		
	}
	cout<<tmps<<endl;
	cout<<duan_1<<endl;
	cout<<duan_2<<endl;

	

    return 0;
}