

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
            }else {
                console.log("float",parseFloat(postfixArray[i]));
                stack_.push( parseFloat(postfixArray[i]) );
            }
        }
        // for( element of postfixArray){
        //     console.log("element: " + element);

        //     if(isNaN(element)){
        //         var x = stack.pop();
        //         var y = stack.pop();
        //         console.log("var x/y: " + x + " " + y + " element: " + element) ;
        //         if (element == "+"){
        //             result = (y+x);
        //             console.log("Expected Result: " + result)
        //             stack.push(y + x);
        //         } else if (element == '-'){
        //             stack.push(y - x);
        //         } else if (element == '*'){
        //             stack.push(y * x);
        //         } else if (element == '/'){
        //             stack.push(y / x);
        //         }
        //     } else {
        //         stack.push( parseFloat(element) );
        //     }
        // }
        //final check for non numbers within the stack
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
    

// Created an empty array
var stackarr = [];

// Variable topp initialized with -1
var topp = -1;

// Push function for pushing
// elements inside stack
function push(e) {
	topp++;
	stackarr[topp] = e;
}

// Pop function for returning top element
function pop() {
	if (topp == -1)
		return 0;
	else {
		var popped_ele = stackarr[topp];
		topp--;
		return popped_ele;
	}
}

// Function to check whether the passed
// character is operator or not
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

// Function to return the precedency of operator
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

// Function to convert Infix to Postfix
function InfixtoPostfix(conv_arr) {

	// Postfix array created
	let postfix = [];
	var temp = 0;
    postfix[temp]="";
	push('@');
	//infixval = document.getElementById("text-input").value;
    infixval=conv_arr;
    //var str = infixval.replace(/(\d+)([/*-+]+)/g,' $1 $2');
    //console.log("regex"+str);
	// Iterate on infix string
	for (var i = 0; i < infixval.length; i++) {
		var el = infixval[i];

		// Checking whether operator or not
		if (operator(el)) {
			if (el == ')') {
				while (stackarr[topp] != "(") {
					postfix[temp++] = pop();
				}
				pop();
			}

			// Checking whether el is ( or not
			else if (el == '(') {
				push(el);
			}

			// Comparing precedency of el and
			// stackarr[topp]
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

	// Adding character until stackarr[topp] is @
	while (stackarr[topp] != '@') {
		postfix[temp++] = pop();
	}

	// String to store postfix expression
	var st = "";
	for (var i = 0; i < postfix.length; i++)
		st += postfix[i];

	// To print postfix expression in HTML
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
    else if(arr[i]=='s'&&arr[i+1]=='i'&&arr[i+2]=='n' )
    {
        

        return 3;

    }
	else if(arr[i]>='0'&&arr[i]<='9')
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
    if(input=="sin")
    {
    document.getElementById("text-input").value+=input+'(';
        
    }
    else
    {
    document.getElementById("text-input").value+=input;

    }
    
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


//11211
//44344

//1144 23 4411
