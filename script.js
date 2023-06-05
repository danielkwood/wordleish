var attempts = 0;
var words_array = [];
var random_word = "";
var word_exists = false;
var guessed = false;

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                words_array = allText.split("\n")
                random_word = words_array[Math.floor(Math.random()*words_array.length)];
                console.log(random_word);
            }
        }
    }
    rawFile.send(null);
}

var valid_words = readTextFile("https://raw.githubusercontent.com/charlesreid1/five-letter-words/master/sgb-words.txt");

function checkAttempt(){
    // write your code in here
    if(attempts < 6){
        var tilerow = 'tiles' + attempts;

        var elements = document.getElementById(tilerow).children;
        
        // sets all tiles in the row to grey background colour
        for(var i = 0; i < elements.length; i++){
            elements.item(i).style.backgroundColor = "grey";
        }

        // grabs the user's attempt from the textbox
        var attempt = document.getElementById('attempt').value;

        // check if the user's attempt is a valid word
        for(var i=0; i < words_array.length; i++){
            if(attempt == words_array[i]){
                word_exists = true;
            }
        }

        // check if user's attempt is valid word AND if it is 5 letters long
        if(word_exists && attempt.length == 5){
            // check each letter in the user's attempt (word)
            for(var i=0; i < attempt.length; i++){
                var elements = document.getElementById(tilerow).children;
                elements.item(i).innerHTML = attempt[i];
                // check each letter in the actual wordle
                for(var j = 0; j < random_word.length; j++){
                    
                    if(attempt[i] == random_word[j]){
                        console.log("is " , attempt[i] , " = " , random_word[j] , "?");
                        var elements = document.getElementById(tilerow).children;
                        elements.item(i).style.backgroundColor = "orange";
                    }
                }

                // check if letter is in correct position
                if(attempt[i] == random_word[i]){
                    var elements = document.getElementById(tilerow).children;
                    elements.item(i).style.backgroundColor = "green";
                }
            }
        }
        else{
            alert("Word does not exist or is too short/long");
        }
        word_exists = false;
    }
    else{
        document.getElementById('result').innerHTML = "The word is <b>" + random_word + "</b>";
    }
    attempts += 1;
}