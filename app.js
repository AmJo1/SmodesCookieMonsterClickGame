//*********************************Global Variables*********************************

let cookieScore = 0;
let updateSeconds;
const originalTimerText = parseInt(document.querySelector('.timerCounter').innerText);
const gameMapData = cookieGenerator();

const gameOutcomeTitleOne = "Smodes: The Choc Wielding Jedi Races to Pole Position";
const gameOutcomeTextOne = "Through his relentless pursuit, he achieves the impossible: gathering an abundance of chocolate resources sufficient to thwart the oppressive grip of the Empire. " +
    "With his mission accomplished, Smodes ensures that civilization need no longer fear the Empire's tyranny. His strategic indulgence in chocolate not only fuels his strength but also becomes a " +
    "symbol of hope and freedom for all who oppose the Empire's reign. As the galaxy celebrates his triumph, Smodes stands as a testament to resilience, proving that even the sweetest cravings can " +
    "lead to the most heroic victories.";
const gameOutcomeTitleTwo = "Smodes: Jedi Connoisseur of the Sweet Rebellion";
const gameOutcomeTextTwo = "Smodes falls short of fully completing his mission. His valiant efforts force the Empire to retreat. In recognition of his bravery and dedication, Smodes is rewarded " +
    "with a sweet indulgence—a delectable ice cream treat. Not to upset Smodes, Grandfather Yoda assures Smodes of an unlimited supply of chocolate, promising to fuel his resolve for future battles against " +
    "the forces of darkness. With renewed determination and a taste of victory, Smodes is ready to stand as a beacon of hope for the galaxy again.";
const gameOutcomeTitleThree = "Smodes: A Jedi's Journey Through Defeat and Hope";
const gameOutcomeTextThree = "With each step, Smodes faced trials and adversaries, his determination unwavering even in the face of overwhelming odds. Yet, despite his valiant efforts, victory remained elusive. " +
    "The Empire's forces seemed endless, their reach stretching far beyond what Smodes had anticipated. Defeated but not broken, Smodes retreated, he found solace in the knowledge that his efforts had not been in vain. " +
    "Though he had not achieved victory, he had inspired hope in the hearts of those who had dared to defy the Empire's tyranny. For even in defeat, Smodes knew that the spirit of rebellion burned bright, fueling the hope of " +
    "a galaxy yearning for freedom. And though the taste of victory may elude him for now, Smodes remained determined to one day savor the sweet triumph of liberation.";

//*********************************Functions*********************************


 function countdownTimer() {
    let getSeconds = parseInt(document.querySelector('.countdownTime').innerText);

    let timer = setInterval(function () {
        getSeconds--;
        updateSeconds = document.querySelector('.countdownTime');
        updateSeconds.innerText = getSeconds;


        //getSeconds is the data type of number
        //console.log("getSeconds as a data type of: " + typeof getSeconds)


        if (getSeconds >0 && getSeconds <= 5) {
            updateSeconds.style.cssText = "color: red; scale: 1.1";
            const checkClassList = document.querySelector('.countdownTime');
            if (checkClassList.classList[1] === undefined) {
                checkClassList.classList.add('activePopOut');
                //console.log(checkClassList.classList) : Checking Class List
            }
        }
        if (getSeconds <= 0) {
            clearInterval(timer);
            let finalTimerCounter = document.querySelector('.countdownTime');
            finalTimerCounter.classList.remove('activePopOut');
            updateSeconds.style.cssText = "color: white; font-size: 18pt";
            finalTimerCounter.innerText = 0;
            smodes.classList.remove('smodes')
            console.log('game has ended. Has smodes disappeared??')
            const getScoreCounterText = document.querySelector('.cookieCounterText');
            console.log(getScoreCounterText.innerText);



        }

    }, 1000);

}



function resetCountdownTimer()
{
    document.querySelector('.countdownTime').innerText = originalTimerText;
}


function cookieGenerator () {

    const getCookie = document.querySelector('.cookie');


    //Get Map Data
    let getGameMapElement = document.querySelector('.gameMap');
    let getGameMapSize = getGameMapElement.getBoundingClientRect();
    const getGameMapHeight = getGameMapSize.height;
    const getGameMapWidth = getGameMapSize.width;


    //Get cookie width
    const cookieSize = getCookie.offsetWidth;

    //Calculate the maximum random position within the map
    const MaxRandomHeightCookies = getGameMapHeight - cookieSize;
    const MaxRandomWidthCookies = getGameMapWidth - cookieSize;

    //Generate random cookie position on page
    let cookieRandomHeight = Math.floor(Math.random() * MaxRandomHeightCookies);
    let cookieRandomWidth = Math.floor(Math.random() * MaxRandomWidthCookies);


    //move Cookie to a random position on the map.
    getCookie.style.position = "absolute";
    getCookie.style.transform = `translate(${cookieRandomWidth}px, ${cookieRandomHeight}px)`;

    return [getGameMapHeight, getGameMapWidth]
}

function additionalCookieGenerator(number) {

    // Create Cookie Generator
    const additionalCookie = document.createElement('div');
    const parentCookieElement = document.querySelector('.gameMap');
    const uniqueId = `cookie${number}`; // Unique identifier for the cookie
    additionalCookie.className = `cookie ${uniqueId}`;
    parentCookieElement.appendChild(additionalCookie);

    // Get Map Data
    let getGameMapElement = document.querySelector('.gameMap');
    let getGameMapSize = getGameMapElement.getBoundingClientRect();
    const getGameMapHeight = getGameMapSize.height;
    const getGameMapWidth = getGameMapSize.width;

    // Get cookie width
    const getCookie = document.querySelector(`.${uniqueId}`);
    const cookieSize = getCookie.offsetWidth;

    // Calculate the maximum random position within the map
    const MaxARandomHeightCookies = getGameMapHeight - cookieSize;
    const MaxARandomWidthCookies = getGameMapWidth - cookieSize;

    // Generate random cookie position on page
    let cookieRandomHeight = Math.floor(Math.random() * MaxARandomHeightCookies);
    let cookieRandomWidth = Math.floor(Math.random() * MaxARandomWidthCookies);

    // Move Cookie to a random position on the map.
    getCookie.style.position = "absolute";
    getCookie.style.transform = `translate(${cookieRandomWidth}px, ${cookieRandomHeight}px)`;

    return [getGameMapHeight, getGameMapWidth];
}


function identifyNextClassCookieNumber() {
    const listOfCookies = Array.from(document.querySelectorAll('.cookie'));
    const listOfCookieNames = [];

    // Iterate over each element in the listOfCookies array
    listOfCookies.forEach(cookie => {
        // Access the classList property of each element
        const classes = Array.from(cookie.classList);
        const cookieClassNumber = parseInt(classes[1].replace(/cookie/g, ""));
        listOfCookieNames.push(cookieClassNumber);
    });

    listOfCookieNames.sort((a, b) => a - b);

    // Find the next available cookie number
    let nextNumber = 1;
    for (let i = 0; i < listOfCookieNames.length; i++) {
        if (listOfCookieNames[i] !== nextNumber) {
            // Found a gap in the sequence, so nextNumber is available
            break;
        }
        nextNumber++;
    }

    return nextNumber;
}


//*********************************Cookie Increase Based on User Score*********************************

//Cookies to increase based on user score.

function scoreCheck(scoreTally) {
    let cookieCounterIncrease = 2;

    if (scoreTally % cookieCounterIncrease === 0) {
        //console.log('The score is divisible cleanly by ' + cookieCounterIncrease);
        let cookieIncrement = scoreTally / cookieCounterIncrease - 1; // Calculate the number of increments
        //console.log('cookie increment: ' + cookieIncrement);

        // Get total number of cookies on screen
        const totalNumberOfCookiesOnScreen = document.querySelectorAll('.cookie').length;
        //console.log('Total Number Of Cookies On-Screen: ' + totalNumberOfCookiesOnScreen);

        const requiredCookiesOnScreen = cookieIncrement + 1;
        const increaseCookiesBy = requiredCookiesOnScreen - totalNumberOfCookiesOnScreen;

        //console.log('You need to add ' + increaseCookiesBy + ' cookies');

        for (let i = 0; i < increaseCookiesBy; i++) {
            const nextCookieNumber = identifyNextClassCookieNumber();
            additionalCookieGenerator(nextCookieNumber);
        }
    }
}


//*********************************Overlap Check*********************************

const overlapCheck = function () {
    const smodesContainer = document.querySelector('.smodes');

    if (smodesContainer) {
        const smodesRect = smodesContainer.getBoundingClientRect(); // Get bounding rectangle

        document.querySelectorAll('.cookie').forEach(function(cookie) {
            const cookieContainer = cookie.getBoundingClientRect();

            // Check if cookieContainer is not null or undefined
            if (cookieContainer) {
                // Check for overlap between cookie and smodes container
                const overlap = !(
                    smodesRect.right < cookieContainer.left ||
                    smodesRect.left > cookieContainer.right ||
                    smodesRect.bottom < cookieContainer.top ||
                    smodesRect.top > cookieContainer.bottom
                );

                if (overlap) {
                    // Remove the overlapped cookie
                    cookie.remove();

                    // Regenerate a new cookie
                    const nextCookieNumber = identifyNextClassCookieNumber();
                    additionalCookieGenerator(nextCookieNumber);

                    // Update cookie score
                    cookieScore += 1;
                    const getScoreCounterText = document.querySelector('.cookieCounterText');
                    if (getScoreCounterText) {
                        getScoreCounterText.innerText = cookieScore;
                        scoreCheck(cookieScore);
                    }
                }
            }
        });
    }
};



//*********************************Game Map*********************************
// ----Move Smodes----

const smodes = document.querySelector('.smodes')
const smodesSize = smodes.offsetWidth;

let smodesPositionX = 0;
let smodesPositionY = 0;
const smodeSteps = 35;

const getGameMapHeight = gameMapData[0];
const getGameMapWidth = gameMapData[1];

const getNavSizeHeight = document.querySelector('.navSection').getBoundingClientRect().height;


//*********************************Game Logic*********************************


// Key Press Event Listener for Arrow Key Movement
function moveCharacter() {
    document.addEventListener('keydown', function (event) {
        const showGameMap = document.querySelector('.gameMap');
        if (smodes.classList.contains("smodes")) {
            switch (event.key) {
                //Smodes is in the class list
                case 'ArrowUp':
                    console.log('Arrow Button Pressed')
                    if ((smodesPositionY - smodeSteps) > 0) {
                        smodesPositionY -= smodeSteps;
                    } else {
                        smodesPositionY = 0;
                    }
                    break;
                case 'ArrowDown':
                    if (smodesPositionY < ((getGameMapHeight * 0.9))) {
                        smodesPositionY += smodeSteps;
                    } else {
                        smodesPositionY = (getGameMapHeight + smodesSize)
                    }
                    break;
                case 'ArrowLeft':
                    if ((smodesPositionX - smodeSteps) > 0) {
                        smodesPositionX -= smodeSteps;
                    } else {
                        smodesPositionX = 0;
                    }
                    break;
                case 'ArrowRight':
                    if (smodesPositionX < ((getGameMapWidth * 0.9) - smodesSize)) {
                        smodesPositionX += smodeSteps;
                    } else {
                        smodesPositionX = (getGameMapWidth - smodesSize);
                    }
                    break;
                default:
                    console.log('no movement');
            }

            // Apply Transform
            smodes.style.transform = `translate(${smodesPositionX}px, ${smodesPositionY}px)`;
            overlapCheck();
        }
    });
}

// Key Press Function for Landing Page and Game Finish Page
function keyPress() {
    return new Promise((resolve, reject) => {
        document.addEventListener("keydown", function (event) {
            switch (event.key) {
                case 's':
                    // Landing Page
                    const showGameMap = document.querySelector('.gameMap');
                    showGameMap.classList.remove('hidden');

                    const cookieInstructionContainerHidden = document.querySelector('.cookieInstructionContainer');
                    cookieInstructionContainerHidden.classList.add('hidden');

                    // Resolve the promise when operations are complete
                    resolve();
                    break;
                case 'r':
                    location.reload();
                    break;
                default:
                    console.log('no key pressed');
                    break;
            }
        });
    });
}



// Call keyPress() and then moveCharacter() when its promise resolves
keyPress().then(() => {
    setTimeout(function(){
        moveCharacter();
        countdownTimer();
        console.log(cookieScore)
    }, 1)

});

