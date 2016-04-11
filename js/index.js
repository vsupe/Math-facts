// Device Event Listener
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    console.log('Device is Ready');

    $(".math").animate({
        left: '10vw',
        height: '+=7vh',
        width: '+=7vw'  });

  
$("#common").clone().appendTo("#subtraction,#multiplication,#division");

// op is for to ckeck which operation is selected
     var op = '';
     var opId = '' ;
  $('nav[data-role="navbar"] ul li a').on('click', function () {
    $(this).addClass('selected');
     op = this.id;
       switch(op)
       {
          case 'add' : opId = '#addition' ; break;
          case 'sub' : opId = '#subtraction' ; break;
          case 'multi' : opId = '#multiplication' ; break;
          case 'div' : opId = '#division' ; break;
       }        
       console.log(opId);
       resetIt();
  });   


    $("#easy,#interm,#adv").click(function(){
        var id = this.id;
        clearFields(opId);
        $(opId+' #mainTable').slideDown(5);

stopwatch('start');

        if(id == 'easy' ){
               $(opId+' #myTable caption').text('Easy').css("color","#FACC2E");
               switch(op){
                case 'add':add(1,10); break;
                case 'sub':subtract(id,1,10); break;
                case 'multi':multiply(1,10); break;
                case 'div':divide(id,1,10); break;
           }
          }
        else if(id == 'interm'){
               $(opId+' #myTable caption').text('Intermediate').css("color","#F79F81");
               switch(op){
                case 'add':add(10,20); break;
                case 'sub':subtract(id,10,20); break;
                case 'multi':multiply(5,20); break;
                case 'div':divide(id,5,20); break;    
              }
        }
        else if(id == 'adv'){
                 
               $(opId+' #myTable caption').text('Advanced').css("color","#FA8258");
               switch(op){
                case 'add':add(10,100); break;
                case 'sub':subtract(id,10,100); break;
                case 'multi':multiply(10,100); break;
                case 'div':divide(id,10,100); break;
             }            
        }
    });

$(opId+' .btn').click(function(){
   var option = $(this).text();
   $(opId+' #option').val(option);
});

$(opId+' #ok').click(function(){
        console.log(opId+' ok clicked...');
        var answer = $(opId+' #option').val();
        var ans = $(opId+' #ans').val();

        if(answer == "" || ans == ""){
          return;
        }
        console.log('User entered ans..'+answer+' And Correct Ans is  '+ans);

        $(opId+' #answered').val(( Number($(opId+' #answered').val()) + 1));
      if(answer == ans){
        console.log(opId+' answer is correct');
        $(opId+' p:last').css('color', 'blue');
        $(opId+' #mark').text('Correct!!'); 
        $(opId+' #correct').val(( Number($(opId+' #correct').val()) + 1));
      }
      else {
        console.log('Multiplication answer is wrong');
        $(opId+' p:last').css('color', 'red');
        $(opId+' #mark').text('Wrong!!'); 
        $(opId+' #wrong').val(( Number($(opId+' #wrong').val()) + 1));        
        }
        $(opId+' #option').val("");
        $(opId+' #ans').val("");
});


//Next Function
    $(opId+' #next').click(function(){
        console.log(opId+' next clicked...');
        $(opId+' #option').val("");
        $(opId+' #mark').text("");

           var caption = $(opId+' #myTable caption').text()
       if(caption == 'Easy'){
                switch(op){
                  case 'add':add(1,10); break;
                  case 'sub':subtract('easy',1,10); break;
                  case 'multi':multiply(1,10); break;
                  case 'div':divide('easy',1,10); break;
                  }
                }     

       else if(caption == 'Intermediate'){
          switch(op){
            case 'add':add(10,20); break;
            case 'sub':subtract('interm',10,20); break;
            case 'multi':multiply(5,20); break;
            case 'div':divide('interm',5,20); break;
          }          
        }
        else if(caption == 'Advanced'){
          switch(op){
            case 'add':add(10,100); break;
            case 'sub':subtract('adv',20,50); break;
            case 'multi':multiply(10,100); break;
            case 'div':divide('adv',10,100); break;
          }                
        }
    });        
}

var SD;
function stopwatch() {
var time = $("input[name=time]").val();  
if(time != ''){
var hour = Number(time.substr(0,2));
var min = Number(time.substr(5,2));
var sec = Number(time.substr(10,2));
}else {
var hour = 0;
var sec = -1;
var min = 0;
}
   sec++;
  if (sec == 60) {
   sec = 0;
   min = min + 1; }
  else {
   min = min; }
  if (min == 60) {
   min = 0; 
   hour += 1; }

if (sec<=9) { sec = "0" + sec; }
$("input[name=time]").val(((hour<=9) ? "0"+hour : hour) + " : " + ((min<=9) ? "0" + min : min) + " : " + sec);
 SD = window.setTimeout("stopwatch();", 1000);
}

function resetIt() {
     $("input[name=time]").val('');
     window.clearTimeout(SD);
}


function clearFields(opId){
resetIt();
        $(opId+' #myTable caption').text('');
        $(opId+' #eqn').val("");
        $(opId+' #option').val("");
        $(opId+' #mark').text("");
        $(opId+' #correct').val("");
        $(opId+' #wrong').val("");
        $(opId+' #ans').val("");
        $(opId+' #answered').val("");
        console.log('Values cleared..');

}

function add(low,high){
        var range = (high-low)+1 ;
        var i = Math.floor(Math.random() * range) + low;
        var j= Math.floor(Math.random() * range) + low;
        var ans = i+j;
        $("#addition #ans").val(ans);
           var equation = (i.toString())+' + '+(j.toString())+'  =  ';
        $("#addition #eqn").html(equation);

        // Create 4 options
        var options = [];
        var x = Math.floor((Math.random() * 3) + 0);
          switch(x)
         {
          case 0:var options = [ans,(ans+2),(ans-10),(ans+1)]; break;
          case 1:var options = [(ans-2),ans,(ans+1),(ans+5)]; break;
          case 2:var options = [(ans-1),(ans+1),ans,(ans+10)]; break;
          case 3:var options = [(ans+2),(ans-10),(ans+1),ans]; break;
         }

          // If any negative number then make it positive.
         for(var n=0, len=options.length; n<len; n++){
            var num = options[n];

            if(num < 0){ num = (-1 * num); }
            options[n] = num;

            if(options[n] == options[n+1]){options[n] = num+1;}
           }

        $("#addition #option1").text(options[0]);
        $("#addition #option2").text(options[1]);
        $("#addition #option3").text(options[2]);
        $("#addition #option4").text(options[3]);
}

function subtract(id,low,high){
        var x;
        var range = (high-low)+1 ;
        do{
        var i = Math.floor(Math.random() * range) + low;
        var j= Math.floor(Math.random() * range) + low;
         if (i<j) { i = [j, j = i][0]; } // swap i and j
         var ans = i-j;

             if(id == 'easy'){ x=1;}
               else if(ans > 5) {x=1;}
                else{x=0;}
       } while (x==0)


        $("#subtraction #ans").val(ans);
           var equation = (i.toString())+ ' &minus; '  +(j.toString())+'   =    ';
        $("#subtraction #eqn").html(equation);

        // Create 4 options
        var options = [];
        var x = Math.floor((Math.random() * 3) + 0);
          switch(x)
         {
          case 0:var options = [ans,(ans+2),(ans-10),(ans+1)]; break;
          case 1:var options = [(ans-2),ans,(ans+1),(ans+5)]; break;
          case 2:var options = [(ans-1),(ans+1),ans,(ans+10)]; break;
          case 3:var options = [(ans+2),(ans-10),(ans+1),ans]; break;
         }

          // If any negative number then make it positive.
         for(var n=0, len=options.length; n<len; n++){
            var num = options[n];

            if(num < 0){ num = (-1 * num); }
            options[n] = num;

            if(options[n] == options[n+1]){options[n] = num+1;}
           }

        $("#subtraction #option1").text(options[0]);
        $("#subtraction #option2").text(options[1]);
        $("#subtraction #option3").text(options[2]);
        $("#subtraction #option4").text(options[3]);
}


function multiply(low,high){
        var range = (high-low)+1 ;
        var i = Math.floor(Math.random() * range) + low;
        var j= Math.floor(Math.random() * range) + low;

        var ans = i*j;
        $("#multiplication #ans").val(ans);
           var equation = (i.toString())+' X '+(j.toString())+'   =    ';
        $("#multiplication #eqn").html(equation);

        // Create 4 options
        var options = [];
        var x = Math.floor((Math.random() * 3) + 0);
          switch(x)
         {
          case 0:var options = [ans,(ans+2),(ans-10),(i+j)]; break;
          case 1:var options = [(ans-2),ans,(i+j),(ans+5)]; break;
          case 2:var options = [(ans-1),(i+j),ans,(ans+10)]; break;
          case 3:var options = [(ans+2),(ans-10),(i+j),ans]; break;
         }

          // If any negative number then make it positive.
         for(var n=0, len=options.length; n<len; n++){
            var num = options[n];

            if(num < 0){ num = (-1 * num); }
            options[n] = num;

            if(options[n] == options[n+1]){options[n] = num+1;}
           }

        $("#multiplication #option1").text(options[0]);
        $("#multiplication #option2").text(options[1]);
        $("#multiplication #option3").text(options[2]);
        $("#multiplication #option4").text(options[3]);
    }


function divide(id,low,high){
        var range = (high-low)+1 ;
       
        while(i%j != 0){
            var i = Math.floor(Math.random() * range) + low;
            var j= Math.floor(Math.random() * range) + low;
           if(id != 'easy' && i == j) {i=1;j=2; continue;}
          }

        var ans = i/j;
        $("#division #ans").val(ans);
       // var equation = (i.toString())+' / '+(j.toString())+'  =  ';
       var equation = (i.toString())+ ' &#247; ' +(j.toString())+'  =  ';
       
        $("#division #eqn").html(equation);

        // Create 4 options
        var options = [];
        var x = Math.floor((Math.random() * 3) + 0);
          switch(x)
         {
          case 0:var options = [ans,(ans+2),(ans-10),(ans+5)]; break;
          case 1:var options = [(ans-2),ans,(ans+3),(ans+5)]; break;
          case 2:var options = [(ans-1),(ans-8),ans,(ans+10)]; break;
          case 3:var options = [(ans+2),(ans-10),(ans+5),ans]; break;
         }

         options.sort();

          // If any negative number then make it positive.
         for(var n=0, len=options.length; n<len; n++){
            var num = options[n];

            if(num < 0){ num = (-1 * num); }
            options[n] = num;

            if(options[n] == options[n+1]){options[n] = num+1;}
           }

        $("#division #option1").text(options[0]);
        $("#division #option2").text(options[1]);
        $("#division #option3").text(options[2]);
        $("#division #option4").text(options[3]); 
    }

