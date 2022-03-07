
    let history = JSON.parse(localStorage.getItem("allEntries"));

    function postfixEval( postfixArray ) {
        var stack_ = [];

        for(let i=0;i<postfixArray.length;i++){
            console.log(postfixArray);

                 console.log("element: " + postfixArray[i]);

            if(isNaN(postfixArray[i])){
                if (postfixArray[i] == "+" || postfixArray[i] == "-" || postfixArray[i] == "*" || postfixArray[i] == "/" ||postfixArray[i] == '^'){
                    var x = stack_.pop();
                    var y = stack_.pop();
                }
                console.log("var x/y: " + x + " " + y + " element: " + postfixArray[i]) ;
                if (postfixArray[i] == "+"){
                    result = (y+x);
                    console.log("Expected Result: " + result)
                    stack_.push(y + x);
                } else if (postfixArray[i] == '-'){
                    stack_.push(y - x);
                } else if (postfixArray[i] == '*'){
                    stack_.push(y * x);
                } else if (postfixArray[i] == '/'){
                    stack_.push(y / x);
                } else if (postfixArray[i] == '^'){
                    stack_.push(y**x);
                    
                }
                else if(postfixArray[i][0]=='s' && postfixArray[i][1]=='i' && postfixArray[i][2]=='n'){
                    sin_value = ""
                    var j = 4;
                    while(postfixArray[i][j]!=')')
                    {
                        sin_value+=postfixArray[i][j];
                        j++;
                    }
                    // stack.push(Math.sin(postfixArray[i+1]));
                    console.log(sin_value)
                    console.log(Math.sin(45));
                    stack_.push(Math.sin(sin_value)); 
                }
                else if(postfixArray[i][0]=='c' && postfixArray[i][1]=='o' && postfixArray[i][2]=='s'){
                    cos_value = ""
                    var j = 4;
                    while(postfixArray[i][j]!=')')
                    {
                        cos_value+=postfixArray[i][j];
                        j++;
                    }
                    // stack.push(Math.sin(postfixArray[i+1]));
                    console.log(cos_value)
                    console.log(Math.cos(45));
                    stack_.push(Math.cos(cos_value)); 
                }
                else if(postfixArray[i][0]=='t' && postfixArray[i][1]=='a' && postfixArray[i][2]=='n'){
                    tan_value = ""
                    var j = 4;
                    while(postfixArray[i][j]!=')')
                    {
                        tan_value+=postfixArray[i][j];
                        j++;
                    }
                    // stack.push(Math.sin(postfixArray[i+1]));
                    console.log(tan_value)
                    console.log(Math.tan(45));
                    stack_.push(Math.tan(tan_value)); 
                }
            }else {
                console.log("float",parseFloat(postfixArray[i]));
                stack_.push( parseFloat(postfixArray[i]) );
            }
        }
      
        var returnValue = null;
        while( stack_.length > 0 ){
            console.log( stack_ );
            var element = stack_.pop();  
            if(isNaN(element)){
                continue;
            } else{
                returnValue = element;
            }
        }
        return returnValue;
    }
    

var stackarr = [];

var topp = -1;


function push(e) {
	topp++;
	stackarr[topp] = e;
}

function pop() {
	if (topp == -1)
		return 0;
	else {
		var popped_ele = stackarr[topp];
		topp--;
		return popped_ele;
	}
}


function operator(op) {
	if (op == '+' || op == '-' ||
		op == '^' || op == '*' ||
		op == '/' || op == '(' ||
		op == ')') {
		return true;
	}
	else
		return false;
}

function precedency(pre) {
	if (pre == '@' || pre == '(' || pre == ')') {
		return 1;
	}
	else if (pre == '+' || pre == '-') {
		return 2;
	}
	else if (pre == '/' || pre == '*') {
		return 3;
	}
	else if (pre == '^') {
		return 4;
	}
	else
		return 0;
}

function InfixtoPostfix(conv_arr) {

	let postfix = [];
	var temp = 0;
    postfix[temp]="";
	push('@');
    infixval=conv_arr;
 
	for (var i = 0; i < infixval.length; i++) {
		var el = infixval[i];

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
	}

	while (stackarr[topp] != '@') {
		postfix[temp++] = pop();
	}

	var st = "";
	for (var i = 0; i < postfix.length; i++)
		st += postfix[i];

    console.log("postfix is calculated"+ postfix);
  console.log(postfixEval(postfix));
  document.getElementById("ans").innerText=postfixEval(postfix);
	
}


function operator_convert(arr,i) {
	if (arr[i] == '+' || arr[i] == '-' ||
		arr[i] == '^' || arr[i] == '*' ||
	    arr[i] == '/' || arr[i] == '(' ||
		arr[i] == ')') {
        console.log("operator");

		return 0;
	}
    else if(arr[i]=='s'&&arr[i+1]=='i'&&arr[i+2]=='n'||arr[i]=='t'&&arr[i+1]=='a'&&arr[i+2]=='n'||arr[i]=='c'&&arr[i+1]=='o'&&arr[i+2]=='s' )
    {
        

        return 3;

    }
	else if((arr[i]>='0'&&arr[i]<='9')|| arr[i]==".")
    {
        console.log("number");

		return 1;
    }
    else if(arr[i]>='a'&&arr[i]<='z' && !(arr[i-1]>='a'&&arr[i-1]<='z') &&!(arr[i+1]>='a'&&arr[i+1]<='z'))
    {
        console.log("variable");

        return 2;
    }
    else{
        return-1;
    }

}
const Convert=(e)=>{
    let arr=  document.getElementById("text-input").value;
     var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
     if(existingEntries == null) existingEntries = [];
    
     var entry = {
        
         "expression": arr
     };
     localStorage.setItem("entry", JSON.stringify(entry));
     existingEntries.push(entry);
     localStorage.setItem("allEntries", JSON.stringify(existingEntries));
     console.log(JSON.parse(localStorage.getItem("allEntries")));
    //end history
    let num_arr=[];
    let index=0;
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
            if(pre_is==0)
          {
              // num_arr[index]=arr[i]+arr[i+1]+arr[i+2];
              sin_value = ""
              var j = i+3;
              var count_ = 0;
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
              var j = i+3;
              var count_ = 0;
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
                  for(var j = 0; j<variables.length;j++)
                  {
                      if(variables[j]["letter"]==arr[i])
                      {
                          num_arr[index++] = variables[j]["value"];
                          break;
                      }
                  }
                
        }
        else if(is==1)
        {
            if (typeof num_arr[index] == 'undefined'){
                num_arr[index]="";
            }
            num_arr[index]+=arr[i]
        }
    }
    console.log(num_arr);
    InfixtoPostfix(num_arr);


}
//cal code

function btnInput(e) {
    console.log(e.target.innerText);
    let input=e.target.innerText;
    if(input=="sin"||input=="cos"||input=="tan")
    {
    document.getElementById("text-input").value+=input+'(';
        
    }
    else
    {
    document.getElementById("text-input").value+=input;

    }
    
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
    for(let i=2;i<input.length;i++)
    {
        val+=input[i];
    }
    variables.push({"letter":letter, "value":val});
    console.log(variables);
    document.getElementById("sec-1").style.display="block";
    document.getElementById("sec-2").style.display="none";
}




var variables = [{"letter":"s", "value":"5"},{"letter":"e", "value":"2.178"},{"letter":"π", "value":"3.14"}];

function getVariableValue(e){
    console.log("variable");
    variable_ = document.getElementById("text-input").value;
    v_value = ""
    for(var i =2;i<variable_.length;i++)
    {
        v_value+=variable_[i];
    }
    var is_already_exists = false;
    for(var i = 0;i<variables.length;i++)
    {
        if(variables[i]["letter"] == variable_[0])
        {
            is_already_exists = true;
            variables[i]["value"] = v_value;
            break;
        }
    }
    if(!is_already_exists)
        variables.push({"letter": variable_[0], "value": v_value})
    console.log(variables);
}


function displayHistory(){
    document.getElementById("text-input").value=history.pop().expression;



}
