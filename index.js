
    let history = JSON.parse(localStorage.getItem("allEntries"));
    let variabless={e:'2.178'};
    const trig=['sin','cos','tan'];
    const precedence_obj={'@':1,'(':1,')':1,'+':2,'-':2,'/':3,'*':3,'^':4};
    const operators_list=['+','-','*','/','(',')','^'];

    
    function operator_evaluate(op,y,x)
    {
        if (op == "+"){
            return(y + x);
        } else if (op == '-'){
            return(y - x);
        } else if (op == '*'){
            return(y * x);
        } else if (op == '/'){
            return(y / x);
        } else if (op == '^'){
            return(y**x);
        }
          else if(op[0]+op[1]+op[2]=='sin')
        {
            sin_value = "";
            op.split('').forEach((item,i)=>{
                i>3&&i<op.length-1?sin_value+=item:null;
            })
           
            return(Math.sin(sin_value));
        }
        else if(op[0]+op[1]+op[2]=='cos')
        {
            cos_value = "";
            op.split('').forEach((item,i)=>{
                i>3&&i<op.length-1?cos_value+=item:null;
            })
           
            return(Math.cos(cos_value));
        }
        else if(op[0]+op[1]+op[2]=='tan')
        {
            tan_value = "";
            op.split('').forEach((item,i)=>{
                i>3&&i<op.length-1?tan_value+=item:null;
            })
           
            return(Math.tan(tan_value));
        }
        else if(op[0]+op[1]+op[2]+op[3]=='sqrt')
        {
            sqrt_value = "";
            op.split('').forEach((item,i)=>{
                i>4&&i<op.length-1?sqrt_value+=item:null;
            })
           
            return(Math.sqrt(sqrt_value));
        }
    }



    function postfixEval( postfixArray ) {
        let stack_ = [];
        let x;
        let y;
        const operators_=['+','-','*','/','^'];
        postfixArray.forEach((item,i)=>{
            if(isNaN(item)){
                if (operators_.includes(item)){
                     x = stack_.pop();
                     y = stack_.pop();
                }
                stack_.push(operator_evaluate(item,y,x));
            }else {
                stack_.push( parseFloat(item) );
            }

        });
        let returnValue = null;
        while( stack_.length > 0 ){
            let element = stack_.pop();  
            if(isNaN(element)){
                continue;
            } else{
                returnValue = element;
            }
        }
        return returnValue;
    }
    

let stackarr = [];
let topp = -1;


function push(e) {
	topp++;
	stackarr[topp] = e;
}

function pop() {
	if (topp == -1)
		return 0;
	else {
		let popped_ele = stackarr[topp];
		topp--;
		return popped_ele;
	}
}

function operator(op) {
    return operators_list.includes(op)?true:false;
}

function precedency(pre) {
    return pre in precedence_obj?precedence_obj[pre]:0;
}

function InfixtoPostfix(infixval) {

	let postfix = [];
	let temp = 0;
    postfix[temp]="";
	push('@');
    
    infixval.forEach((el,i)=>{
        if (operator(el)) {
			if (el == ')') {
				while (stackarr[topp] != "(") {
					postfix[temp++] = pop();
				}
				pop();
			}

			else if (el == '(') {
				push(el);
			}

		
			else if (precedency(el) > precedency(stackarr[topp])) {
				push(el);
			}
			else {
				while (precedency(el) <=
					precedency(stackarr[topp]) && topp > -1) {
					postfix[temp++] = pop();
				}
				push(el);
			}
		}
		else {
         postfix[temp++] = el;
         
         
		}        

    });

	while (stackarr[topp] != '@') {
		postfix[temp++] = pop();
	}
	document.getElementById("ans").innerText=postfixEval(postfix);
	
}


function operator_convert(arr,i) {
	if (operators_list.includes(arr[i])) {

		return 0;
	}
    else if(trig.includes(arr[i]+[arr[i+1]+arr[i+2]]))
    {   
        return 3;

    }
	else if((arr[i]>='0'&&arr[i]<='9')|| arr[i]==".")
    {

		return 1;
    }
    else if(arr[i]>='a'&&arr[i]<='z' && !(arr[i-1]>='a'&&arr[i-1]<='z') &&!(arr[i+1]>='a'&&arr[i+1]<='z'))
    {

        return 2;
    }
    else{
        return-1;
    }

}
const Convert=(e)=>{
    let arr=  document.getElementById("text-input").value;
    let existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    !existingEntries?xistingEntries = []:null;
     let entry = {
        "expression": arr
     };
     existingEntries.push(entry);
     localStorage.setItem("allEntries", JSON.stringify(existingEntries));
    //end history
    let num_arr=[];
    let index=0;
    // arr.split('').forEach(function(item,i) {
       
    //   });
    for(let i=0;i<arr.length;i++){

        let is=operator_convert(arr,i);
        let pre_is=operator_convert(arr,i-1);
        let post_is=operator_convert(arr,i+1);
        if(is==0)
        {
            if(pre_is==1)
                index++;
            num_arr[index++]=arr[i];
        }
        else if(is==3)
        {
            let count_ = 0;

            if(pre_is==0)
          {
              sin_value = ""
              let j = i+3;
              while(arr[j]!=')')
              {
                  sin_value+=arr[j];
                  j++;
                  count_++;
              }
              //yaha pr condition lage gi agr peeche 5sin(45) ajae to
              num_arr[index++]=arr[i]+arr[i+1]+arr[i+2]+sin_value+")";
          }
          else{
              if(index!=0)
                  index++
              sin_value = ""
              let j = i+3;
              while(arr[j]!=')')
              {
                  sin_value+=arr[j];
                  j++;
                  count_++;
              }
              num_arr[index++]=arr[i]+arr[i+1]+arr[i+2]+sin_value+")";
          }
          i+=3+count_;
        }
        else if(is==2)
        {
            arr[i]in variabless?num_arr[index++]= variabless[arr[i]]:null;
        }
        else if(is==1)
        {
            if (typeof num_arr[index] == 'undefined'){
                num_arr[index]="";
            }
            num_arr[index]+=arr[i]
        }
    }
    InfixtoPostfix(num_arr);


}
//cal code

function btnInput(e) {
    let input=e.target.innerText;
    trig.includes(input)? document.getElementById("text-input").value+=input+'(':  document.getElementById("text-input").value+=input;
}

function clearInput(e) {
    document.getElementById("text-input").value="";
}

function varSection(e) {
    document.getElementById("sec-1").style.display="none";
    document.getElementById("sec-2").style.display="flex";
}

function varSet(e) {
  
    let input=e.target.innerText;
    document.getElementById("text-input").value+=input;
}

function settingVariable(e){
    
    let input=document.getElementById("text-input").value;
    let letter=input[0];
    let val="";
   
    input.split('').forEach(function(item,i) {
        i > 1 ? val+=item : null;
      });
  
  
    variabless[letter]=val;
    document.getElementById("sec-1").style.display="block";
    document.getElementById("sec-2").style.display="none";
}

function displayHistory(){
    document.getElementById("text-input").value=history.pop().expression;
}
