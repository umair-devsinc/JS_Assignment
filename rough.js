const Convert=(e)=>{
    let arr=  document.getElementById("text-input").value;
    let num_arr=[];
    let index=0;
    num_arr[index]="";
    for(let i=0;i<arr.length;i++){
      let is=operator_convert(arr,i);
      let pre_is=operator_convert(arr,i-1);
      let post_is=operator_convert(arr,i+1);
      if(is==0)
      {
          if(pre_is==0)
          {
              num_arr[index++]=arr[i];
          }
          else{
              if(index!=0)
                  index++
              // if(arr[i]>='a'&&arr[i]<='z' && !(arr[i-1]>='a'&&arr[i-1]<='z') &&!(arr[i+1]>='a'&&arr[i+1]<='z'))
              // {
              //     for(var j = 0; j<variables.length;j++)
              //     {
              //         if(variables[j]["letter"]==arr[j]){
              //             num_arr[index++] = variables[j]["value"];
              //             break;
              //         }
              //     }
  
              // }
              else
                  num_arr[index++]=arr[i];
              // }
          }
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
      else if(is==1)
      {
          if (typeof num_arr[index] == 'undefined'){
              num_arr[index]="";
          }
          num_arr[index++]+=arr[i]
          console.log("the number is", num_arr);
      }
  
    }
      console.log(num_arr);
      InfixtoPostfix(num_arr);
  }
  